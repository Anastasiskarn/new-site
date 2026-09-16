"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// Container Scroll Animation by manuarora700 (Aceternity) on 21st.dev
// (https://21st.dev/@manuarora700/components/container-scroll-animation).
// Adapted for the homepage dashboard: brand bezel instead of the grey device frame, height follows the content
// instead of a fixed 40rem card, the tilt settles when the container reaches the middle of the screen, and reduced
// motion renders the flat resting state. `data-robot-stop` sits on the bezel's top edge, so the robot companion
// stops on the visible top of the tilted card.
export function ContainerScroll({ titleComponent, children }: { titleComponent?: ReactNode; children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "center center"] });
  const reduced = useReducedMotion() === true;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : isMobile ? [0.9, 1] : [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -100]);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center py-10 md:py-20">
      <div className="relative w-full" style={{ perspective: "1000px" }}>
        {titleComponent && (
          <motion.div style={{ translateY: translate }} className="mx-auto max-w-5xl text-center">
            {titleComponent}
          </motion.div>
        )}
        <motion.div
          data-robot-stop=""
          style={{
            rotateX: rotate,
            scale,
            boxShadow:
              "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
          }}
          className="container-scroll-card mx-auto w-full max-w-7xl rounded-[30px] border border-white/15 bg-dark-700 p-2 md:p-4"
        >
          <div className="w-full overflow-hidden rounded-2xl bg-dark-900">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
