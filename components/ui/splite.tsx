"use client";

import { Suspense, lazy } from "react";
import type { Application } from "@splinetool/runtime";

// Spline Scene by serafimcloud on 21st.dev (https://21st.dev/@serafimcloud/components/splite).
// The runtime is lazy-loaded, so the ~1MB WebGL bundle never ships to pages or viewports that don't mount this.
const Spline = lazy(() => import("@splinetool/react-spline"));

type SplineSceneProps = {
  scene: string;
  className?: string;
  onLoad?: (app: Application) => void;
};

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="spline-loader" />
        </div>
      }
    >
      <Spline scene={scene} className={className} onLoad={onLoad} />
    </Suspense>
  );
}
