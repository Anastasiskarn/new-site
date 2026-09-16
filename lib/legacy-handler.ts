import type { IncomingMessage, ServerResponse } from "node:http";
type Handler = (
  request: IncomingMessage,
  response: ServerResponse,
) => Promise<unknown>;
// Bridge the proven handler contract to App Router without buffering SSE replies.
export async function invokeHandler(
  request: Request,
  handler: Handler,
): Promise<Response> {
  const origin = request.headers.get("origin");
  if (
    origin &&
    ![
      "https://aianchor.online",
      "https://www.aianchor.online",
      new URL(request.url).origin,
    ].includes(origin)
  )
    return Response.json({ error: "origin_not_allowed" }, { status: 403 });
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 65536)
    return Response.json({ error: "invalid_body" }, { status: 413 });
  let size = 0;
  const chunks: Uint8Array[] = [];
  if (request.body) {
    const reader = request.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 65536) {
        await reader.cancel();
        return Response.json({ error: "invalid_body" }, { status: 413 });
      }
      chunks.push(value);
    }
  }
  let body: unknown;
  try {
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    body = null;
  }
  const headers = Object.fromEntries(request.headers);
  const req = {
    method: request.method,
    headers,
    body,
    socket: { remoteAddress: headers["x-forwarded-for"] || "unknown" },
  };
  const responseHeaders = new Headers();
  let status = 200,
    started = false,
    closed = false;
  let resolveResponse: (response: Response) => void = () => {};
  let streamController: ReadableStreamDefaultController<Uint8Array>;
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
    },
    cancel() {
      closed = true;
    },
  });
  const responsePromise = new Promise<Response>((resolve) => {
    resolveResponse = resolve;
  });
  const begin = () => {
    if (!started) {
      started = true;
      resolveResponse(
        new Response(stream, { status, headers: responseHeaders }),
      );
    }
  };
  const res = {
    setHeader(key: string, value: string) {
      responseHeaders.set(key, value);
      return res;
    },
    status(code: number) {
      status = code;
      return res;
    },
    writeHead(code: number, values: Record<string, string>) {
      status = code;
      Object.entries(values).forEach(([key, value]) =>
        responseHeaders.set(key, value),
      );
      begin();
      return res;
    },
    write(value: string) {
      begin();
      if (!closed) streamController.enqueue(encoder.encode(value));
      return !closed;
    },
    end(value?: string) {
      if (value) res.write(value);
      begin();
      if (!closed) {
        closed = true;
        streamController.close();
      }
    },
    json(value: unknown) {
      responseHeaders.set("Content-Type", "application/json");
      res.end(JSON.stringify(value));
      return res;
    },
  };
  handler(req as unknown as IncomingMessage, res as unknown as ServerResponse)
    .catch(() => {
      if (!started) {
        status = 500;
        res.json({ error: "internal_error" });
      } else res.end();
    })
    .finally(() => {
      if (!closed) res.end();
    });
  return responsePromise;
}
