"use client";

import dynamic from "next/dynamic";

export const DeferredFlow = dynamic(
  () => import("./shader-flow").then((module) => module.ShaderFlow),
  { ssr: false }
);
