"use client";
import { CodeBlock } from "@/components/ui/aceternity/code-block";
import { cn } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import {
  AnimatePresence,
  LazyMotion,
  m,
  useMotionValue,
  useTransform,
} from "motion/react";
import { domAnimation } from "motion/react";
import type React from "react";
import { useCallback, useEffect, useRef } from "react";
interface CompareProps {
  firstCode?: string;
  secondCode?: string;
  className?: string;
  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
}
export const Compare = ({
  firstCode = "",
  secondCode = "",
  className,
  initialSliderPercentage = 60,
  slideMode = "hover",
  showHandlebar = true,
}: CompareProps) => {
  // Motion value instead of state: pointer moves update the DOM directly
  // without re-rendering the component (and both CodeBlock children).
  const sliderXPercent = useMotionValue(initialSliderPercentage);
  const sliderLeft = useTransform(sliderXPercent, (v) => `${v}%`);
  const clipPath = useTransform(
    sliderXPercent,
    (v) => `inset(0 ${100 - v}% 0 0)`,
  );
  // Complementary clip so the lower (second) layer only fills the area the
  // first layer doesn't — prevents overlap now that backgrounds are transparent.
  const clipPathRight = useTransform(
    sliderXPercent,
    (v) => `inset(0 0 0 ${v}%)`,
  );
  const isDragging = useRef(false);
  const rafId = useRef<number>(undefined);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (rafId.current !== undefined) cancelAnimationFrame(rafId.current);
    };
  }, []);

  function mouseLeaveHandler() {
    if (slideMode === "hover") {
      sliderXPercent.set(initialSliderPercentage);
    }
    if (slideMode === "drag") {
      isDragging.current = false;
    }
  }

  const handleStart = useCallback(() => {
    if (slideMode === "drag") {
      isDragging.current = true;
    }
  }, [slideMode]);

  const handleEnd = useCallback(() => {
    if (slideMode === "drag") {
      isDragging.current = false;
    }
  }, [slideMode]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      if (
        slideMode === "hover" ||
        (slideMode === "drag" && isDragging.current)
      ) {
        // Batch to one update per frame; read layout inside the callback so
        // the mousemove handler itself never forces a synchronous layout.
        if (rafId.current !== undefined) cancelAnimationFrame(rafId.current);
        rafId.current = requestAnimationFrame(() => {
          const rect = sliderRef.current?.getBoundingClientRect();
          if (!rect) return;
          const percent = ((clientX - rect.left) / rect.width) * 100;
          sliderXPercent.set(Math.max(0, Math.min(100, percent)));
        });
      }
    },
    [slideMode, sliderXPercent],
  );

  const handleMouseDown = useCallback(() => handleStart(), [handleStart]);
  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd]);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => handleMove(e.clientX),
    [handleMove],
  );

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={sliderRef}
        className={cn("h-[400px] w-[400px] overflow-hidden", className)}
        style={{
          position: "relative",
          cursor: slideMode === "drag" ? "grab" : "col-resize",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={mouseLeaveHandler}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <AnimatePresence initial={false}>
          <m.div
            className="absolute top-0 z-30 m-auto h-full w-px"
            style={{
              left: sliderLeft,
              top: "0",
              zIndex: 40,
            }}
            transition={{ duration: 0 }}
          >
            <div className="-translate-y-1/2 absolute top-1/2 left-0 z-20 h-full w-36 bg-gradient-to-r from-indigo-400 via-transparent to-transparent opacity-50 [mask-image:radial-gradient(100px_at_left,white,transparent)]" />
            <div className="-translate-y-1/2 absolute top-1/2 left-0 z-10 h-1/2 w-10 bg-gradient-to-r from-cyan-400 via-transparent to-transparent opacity-100 [mask-image:radial-gradient(50px_at_left,white,transparent)]" />

            {showHandlebar && (
              <div className="-translate-y-1/2 -right-2.5 absolute top-1/2 z-30 flex h-5 w-5 items-center justify-center rounded-md bg-white shadow-[0px_-1px_0px_0px_#FFFFFF40]">
                <EllipsisVertical className="h-4 w-4 text-black" />
              </div>
            )}
          </m.div>
        </AnimatePresence>
        <div className="pointer-events-none relative z-20 h-full w-full overflow-hidden">
          <m.div
            className={cn(
              "absolute inset-0 z-20 h-full w-full shrink-0 select-none overflow-hidden rounded-2xl ",
            )}
            style={{
              clipPath,
            }}
            transition={{ duration: 0 }}
          >
            <CodeBlock language="jsx" code={firstCode} />
          </m.div>
        </div>

        <m.div
          className="absolute top-0 left-0 z-10 h-full w-full select-none overflow-hidden"
          style={{ clipPath: clipPathRight }}
          transition={{ duration: 0 }}
        >
          <CodeBlock language="jsx" code={secondCode} className="h-full w-full" />
        </m.div>
      </div>
    </LazyMotion>
  );
};
