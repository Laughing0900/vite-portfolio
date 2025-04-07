"use client";
import { CodeBlock } from "@/components/ui/aceternity/code-block";
import { cn } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useCallback, useRef, useState } from "react";
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
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  function mouseLeaveHandler() {
    if (slideMode === "hover") {
      setSliderXPercent(initialSliderPercentage);
    }
    if (slideMode === "drag") {
      setIsDragging(false);
    }
  }

  const handleStart = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(true);
    }
  }, [slideMode]);

  const handleEnd = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(false);
    }
  }, [slideMode]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = (x / rect.width) * 100;
        requestAnimationFrame(() => {
          setSliderXPercent(Math.max(0, Math.min(100, percent)));
        });
      }
    },
    [slideMode, isDragging],
  );

  const handleMouseDown = useCallback(() => handleStart(), [handleStart]);
  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd]);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => handleMove(e.clientX),
    [handleMove],
  );

  return (
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
        <motion.div
          className="absolute top-0 z-30 m-auto h-full w-px bg-gradient-to-b from-[5%] from-transparent via-indigo-500 to-[95%] to-transparent"
          style={{
            left: `${sliderXPercent}%`,
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
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none relative z-20 h-full w-full overflow-hidden">
        <motion.div
          className={cn(
            "absolute inset-0 z-20 h-full w-full shrink-0 select-none overflow-hidden rounded-2xl bg-slate-900",
          )}
          style={{
            clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
          }}
          transition={{ duration: 0 }}
        >
          <CodeBlock
            language="jsx"
            highlightLines={[2, 4, 6, 9, 15]}
            code={firstCode}
          />
        </motion.div>
      </div>

      <CodeBlock
        language="jsx"
        highlightLines={[2, 4, 9, 10, 14, 18, 19]}
        code={secondCode}
        className="absolute top-0 left-0 h-full w-full select-none bg-slate-900"
      />
    </div>
  );
};
