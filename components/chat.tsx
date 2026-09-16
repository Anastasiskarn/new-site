"use client";
import { useEffect, useRef, useState } from "react";
import type { Content } from "../lib/content";
import { pathFor, type Locale } from "../lib/routes";
type Message = { role: "user" | "assistant"; content: string };
function Reply({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(\[[^\]]+\]\([^\s)]+\)|\*\*[^*]+\*\*)/g)
        .map((part, index) => {
          const link = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
          if (
            link &&
            (/^\/(en|gr)\//.test(link[2]) ||
              /^mailto:info@aianchor\.online$/.test(link[2]))
          )
            return (
              <a key={index} className="underline text-primary" href={link[2]}>
                {link[1]}
              </a>
            );
          if (part.startsWith("**") && part.endsWith("**"))
            return <strong key={index}>{part.slice(2, -2)}</strong>;
          return part;
        })}
    </>
  );
}
export function Chat({
  lang,
  copy,
}: {
  lang: Locale;
  copy: Content["assistant"];
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const controller = useRef<AbortController | null>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (open) textarea.current?.focus();
  }, [open]);
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages, draft]);
  function close() {
    setOpen(false);
    launcher.current?.focus();
  }
  async function send(value = input) {
    const content = value.trim().slice(0, 1500);
    if (!content || busy) return;
    const transcript: Message[] = [
      ...messages,
      { role: "user" as const, content },
    ].slice(-24);
    setMessages(transcript);
    setInput("");
    setBusy(true);
    setError("");
    setDraft("");
    const abort = new AbortController();
    controller.current = abort;
    let reply = "",
      done = false;
    let characters: string[] = [],
      visible = 0,
      typingTimer: ReturnType<typeof setInterval> | undefined,
      finishTyping: (() => void) | undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reveal = () => {
      const remaining = characters.length - visible;
      // Keep the reveal close to the stream, even when several chunks arrive together.
      visible += reducedMotion.matches || document.hidden
        ? remaining
        : Math.min(remaining, Math.max(2, Math.ceil(remaining / 12)));
      setDraft(characters.slice(0, visible).join(""));
      if (visible === characters.length) {
        clearInterval(typingTimer);
        typingTimer = undefined;
        finishTyping?.();
      }
    };
    const stopTyping = () => {
      clearInterval(typingTimer);
      finishTyping?.();
    };
    abort.signal.addEventListener("abort", stopTyping, { once: true });
    const timeout = setTimeout(() => abort.abort(), 45_000);
    try {
      const response = await fetch("/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, messages: transcript }),
        signal: abort.signal,
      });
      if (!response.ok || !response.body)
        throw new Error(
          response.status === 429
            ? copy.errors.rateLimited
            : response.status === 503
              ? copy.errors.unavailable
              : copy.errors.generic,
        );
      const reader = response.body.getReader(),
        decoder = new TextDecoder();
      let buffer = "";
      const parse = (frame: string) => {
        const line = frame
          .split("\n")
          .find((line) => line.startsWith("data: "));
        if (!line) return;
        const event = JSON.parse(line.slice(6));
        if (event.type === "delta") {
          reply += event.text;
          characters = Array.from(reply);
          if (!typingTimer) {
            reveal();
            if (visible < characters.length)
              typingTimer = setInterval(reveal, 20);
          }
        }
        if (event.type === "done") done = true;
        if (event.type === "error")
          throw new Error(
            event.code === "refused"
              ? copy.errors.refused
              : event.code === "rate_limited"
                ? copy.errors.rateLimited
                : copy.errors.generic,
          );
      };
      while (true) {
        const chunk = await reader.read();
        buffer += decoder.decode(chunk.value, { stream: !chunk.done });
        const frames = buffer.split("\n\n");
        buffer = frames.pop() || "";
        frames.forEach(parse);
        if (chunk.done) break;
      }
      if (buffer.trim()) parse(buffer);
      if (!done || !reply.trim()) throw new Error(copy.errors.generic);
      clearTimeout(timeout);
      if (visible < characters.length && !abort.signal.aborted)
        await new Promise<void>((resolve) => { finishTyping = resolve; });
      if (abort.signal.aborted) throw new Error(copy.errors.generic);
      setMessages([...transcript, { role: "assistant", content: reply }]);
    } catch (failure) {
      if (!abort.signal.aborted)
        setError(
          failure instanceof Error ? failure.message : copy.errors.generic,
        );
      else setError(copy.errors.generic);
    } finally {
      clearTimeout(timeout);
      stopTyping();
      abort.signal.removeEventListener("abort", stopTyping);
      setBusy(false);
      setDraft("");
      controller.current = null;
    }
  }
  return (
    <aside id="chat-widget" className={`chat-widget ${open ? "is-open" : ""}`} aria-label={copy.name}>
      <button
        ref={launcher}
        type="button"
        className="chat-launcher btn-interactive"
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={copy.openLabel}
        onClick={() => setOpen(!open)}
      >
        <span className="chat-launcher-icon" aria-hidden="true">
          ✦
        </span>
        <span className="chat-launcher-label">{copy.launcher}</span>
      </button>
      <div
        id="chat-panel"
        hidden={!open}
        className={`chat-panel ${open ? "is-visible" : ""}`}
        role="dialog"
        aria-modal="false"
        aria-labelledby="chat-title"
        onKeyDown={(event) => {
          if (event.key === "Escape") close();
        }}
      >
        <header className="chat-header">
          <div>
            <h2 id="chat-title" className="chat-title font-display font-bold">
              {copy.name}
            </h2>
            <p className="chat-status">{copy.subtitle}</p>
          </div>
          <div className="chat-header-actions">
            <button
              type="button"
              disabled={busy}
              className="chat-icon-btn"
              aria-label={copy.reset}
              onClick={() => {
                setMessages([]);
                setError("");
              }}
            >
              ↺
            </button>
            <button
              type="button"
              className="chat-icon-btn"
              aria-label={copy.closeLabel}
              onClick={close}
            >
              ×
            </button>
          </div>
        </header>
        <div ref={log} className="chat-log">
          <p className="text-gray-200 text-sm leading-relaxed">
            {copy.greeting}
          </p>
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {copy.suggestions.map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  className="chat-chip"
                  onClick={() => send(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          <div
            role="log"
            aria-live="polite"
            aria-label={copy.transcriptLabel}
            className="space-y-4"
          >
            {messages.map((message, index) => (
              <div key={index} className={`chat-msg chat-msg-${message.role}`}>
                <div className="chat-bubble whitespace-pre-wrap">
                  <Reply text={message.content} />
                </div>
              </div>
            ))}
          </div>
          {busy && (
            <div className="chat-msg chat-msg-assistant chat-streaming" aria-live="off">
              {draft ? (
                <div className="chat-bubble whitespace-pre-wrap">
                  <Reply text={draft} />
                  <span className="chat-typing-cursor" aria-hidden="true" />
                </div>
              ) : (
                <div className="chat-waiting" role="status">
                  <span className="sr-only">{copy.typing}</span>
                  <span className="chat-typing" aria-hidden="true">
                    <span /><span /><span />
                  </span>
                </div>
              )}
            </div>
          )}
          {error && (
            <p role="alert" className="chat-notice chat-notice-error">
              {error}
            </p>
          )}
          <a
            href={pathFor(lang, "book-demo")}
            className="text-primary text-sm underline"
          >
            {copy.demoCta}
          </a>
        </div>
        <form
          className="chat-composer"
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
        >
          <label htmlFor="chat-input" className="sr-only">
            {copy.inputLabel}
          </label>
          <textarea
            ref={textarea}
            id="chat-input"
            rows={1}
            maxLength={1500}
            className="chat-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={copy.placeholder}
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="chat-send"
            aria-label={copy.send}
          >
            →
          </button>
        </form>
        <p className="chat-disclosure">{copy.disclosure}</p>
      </div>
    </aside>
  );
}
