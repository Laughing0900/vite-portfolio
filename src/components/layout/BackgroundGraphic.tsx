import { Star } from "@/assets/LayoutStar";
import { scrollAtom } from "@/atoms/scrollAtom";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  LazyMotion,
  m,
  useMotionValue,
} from "motion/react";
import { domAnimation } from "motion/react";
import { useAtom } from "jotai";
import { useEffect, useReducer } from "react";

type BackgroundGraphicProps = { className?: string };

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.125, delay: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.05 },
  },
};

type ScrollState =
  | { status: "idle" }
  | { status: "scrolling"; initialScroll: number };

const scrollReducer = (
  state: ScrollState,
  action: { type: "start"; initialScroll: number } | { type: "end" },
): ScrollState => {
  switch (action.type) {
    case "start":
      return { status: "scrolling", initialScroll: action.initialScroll };
    case "end":
      return { status: "idle" };
  }
};

const BackgroundGraphic = ({ className }: BackgroundGraphicProps) => {
  const width = useMotionValue(1);
  const [, setIsScrollingAtom] = useAtom(scrollAtom);
  const [scrollState, dispatch] = useReducer(scrollReducer, { status: "idle" });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScrollEvent = () => {
      if (scrollState.status === "idle") {
        dispatch({ type: "start", initialScroll: window.scrollY });
        setIsScrollingAtom(true);
      }

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (scrollState.status === "scrolling") {
          dispatch({ type: "end" });
          setIsScrollingAtom(false);
          width.set(1);
        }
      }, 50);
    };

    window.addEventListener("scroll", handleScrollEvent, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
      clearTimeout(timeoutId);
    };
  }, [scrollState, setIsScrollingAtom, width]);

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={cn("pointer-events-none absolute inset-0 w-full", className)}
      >
        <m.div
          className="absolute top-1/6 left-0 h-0.5 w-dvw origin-right bg-accent"
          style={{ scaleX: width }}
          will-change="transform"
        />
        <m.div
          className="absolute right-0 bottom-1/6 h-0.5 w-dvw origin-left bg-accent"
          style={{ scaleX: width }}
          will-change="transform"
        />
        <div className="absolute top-0 left-1/6 h-full w-0.5 bg-accent delay-75 duration-300 ease-in-out-circ" />
        <div className="absolute right-1/6 bottom-0 h-full w-0.5 bg-accent duration-500 ease-in-out-circ" />
        <AnimatePresence>
          {scrollState.status === "idle" && (
            <m.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Star className="-translate-x-[11px] -translate-y-[11px] absolute top-1/6 left-1/6" />
              <Star className="-translate-x-[11px] absolute bottom-1/6 left-1/6 translate-y-[11px]" />
              <Star className="-translate-y-[11px] absolute top-1/6 right-1/6 translate-x-[11px]" />
              <Star className="absolute right-1/6 bottom-1/6 translate-x-[11px] translate-y-[11px]" />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
};

export default BackgroundGraphic;
