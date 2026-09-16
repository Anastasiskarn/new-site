"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { attachLampScroll } from "@/lib/lamp-scroll";

export const LampContainer = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  const lampRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lampRef.current) return attachLampScroll(lampRef.current);
  }, []);
  return (
    <div
      ref={lampRef}
      className={cn(
        "lamp-container",
        className,
      )}
    >
      <div className="lamp-light" aria-hidden="true">
        <div className="lamp-beam" />
        <div className="lamp-source" />
      </div>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};
