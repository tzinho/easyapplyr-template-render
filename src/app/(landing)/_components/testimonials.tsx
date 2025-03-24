"use client";

import React from "react";

import { InfiniteMovingCards } from "./nfinite-moving-cards";
import { reviews } from "~/config/reviews";

export function Testimonials() {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md antialiased">
      <InfiniteMovingCards items={reviews} direction="right" speed="slow" />
      <InfiniteMovingCards items={reviews} direction="left" speed="slow" />
    </div>
  );
}
