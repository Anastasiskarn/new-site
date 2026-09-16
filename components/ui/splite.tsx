"use client";

import { Suspense, lazy } from "react";
import type { Application } from "@splinetool/runtime";

// Spline Scene by serafimcloud on 21st.dev (https://21st.dev/@serafimcloud/components/splite).
// Keep one shared import so desktop callers can warm the chunk before mounting.
// Other routes and mobile viewports still skip the WebGL runtime.
let splineImport: Promise<typeof import("@splinetool/react-spline")> | undefined;
export function preloadSpline() {
  return splineImport ??= import("@splinetool/react-spline");
}
const Spline = lazy(preloadSpline);

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
