"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

interface ScalablePdfPreviewProps {
  children: React.ReactNode;
  className?: string;
}

export function ScalablePdfPreview({
  children,
  className = "",
}: ScalablePdfPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentWidth, setContentWidth] = useState(0);

  // A4 dimensions in mm
  const A4_WIDTH_MM = 210;
  const A4_HEIGHT_MM = 297;
  const ASPECT_RATIO = A4_HEIGHT_MM / A4_WIDTH_MM;

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.clientWidth;

        // Set the content to A4 width in pixels (assuming 1mm = 3.7795px)
        const contentWidthPx = A4_WIDTH_MM * 3.7795;
        setContentWidth(contentWidthPx);

        // Calculate the scale factor
        const newScale = containerWidth / contentWidthPx;
        setScale(newScale);
      }
    };

    // Initial update
    updateScale();

    // Update on resize
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  console.log("[scale]: ", scale);

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden ${className}`}
      style={{
        // Set height based on container width and A4 aspect ratio
        paddingBottom: `${ASPECT_RATIO * 100}%`,
        position: "relative",
      }}
    >
      <div
        ref={contentRef}
        className="absolute left-0 top-0 origin-top-left bg-white shadow-lg"
        style={{
          width: `${contentWidth}px`,
          height: `${contentWidth * ASPECT_RATIO}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
