import type { MotionValue } from "motion/react";
import { AnimatePresence, LazyMotion, m } from "motion/react";
import { domAnimation } from "motion/react";
import { memo } from "react";

interface AchievementPreviewProps {
  selected: {
    side: "academic" | "credentials";
    imageId: string;
  } | null;
  translateX: MotionValue<number>;
  translateY: MotionValue<number>;
}

export const AchievementPreview = memo(
  ({ selected, translateX, translateY }: AchievementPreviewProps) => {
    return (
      <LazyMotion features={domAnimation}>
        <div className="pointer-events-none absolute inset-0 grid grid-cols-2 max-lg:hidden">
          {["academic", "credentials"].map((side) => (
            <div
              key={side}
              className="flex h-full w-full items-end justify-center p-5"
            >
              <AnimatePresence>
                {selected?.side === side && (
                  <m.img
                    src={`https://res.cloudinary.com/dicmdiiov/image/upload/f_auto,c_limit,w_640,q_auto/v1/Pawn/portfolio/cert/${selected.imageId}`}
                    alt={`${selected.imageId} preview`}
                    className="max-w-xs rounded-sm border-2 border-accent object-cover opacity-90"
                    style={{ x: translateX, y: translateY }}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </LazyMotion>
    );
  },
);
