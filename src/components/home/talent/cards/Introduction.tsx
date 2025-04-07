import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import type React from "react";
import { memo, useRef } from "react";
import { cn } from "@/lib/utils";

type IntroductionProps = {
  paragraph: string;
};

const Introduction = memo(({ paragraph }: IntroductionProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.5", "start 0.25"],
  });

  const words = paragraph.split(" ");

  return (
    <div className="h-max-container" ref={container}>
      <div className="sticky top-1/4 h-fit px-4 md:px-10">
        <p
          className={cn(
            "flex flex-wrap text-sm leading-tight",
            "md:text-2xl md:leading-snug",
          )}
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
});

export default Introduction;

const Word = ({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const amount = range[1] - range[0];
  const step = amount / (children as string).length;
  return (
    <span className="relative mx-[0.5ch]">
      {(children as string).split("").map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;
        return (
          <Char key={`c_${i}`} progress={progress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </span>
  );
};

const Char = ({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span
      className="mx-[0.05ch] will-change-[opacity]"
      style={{ opacity: opacity }}
    >
      {children}
    </motion.span>
  );
};
