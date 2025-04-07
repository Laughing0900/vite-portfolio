import { Star } from "@/assets/LayoutStar";
import { scrollAtom } from "@/atoms/scrollAtom";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect } from "react";

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

const BackgroundGraphic = ({ className }: BackgroundGraphicProps) => {
  const width = useMotionValue(1);
  const [isScrolling, setIsScrollingAtom] = useAtom(scrollAtom);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let initialScroll = 0;
    let isScrolling = false;

    const handleScrollStart = () => {
      if (!isScrolling) {
        initialScroll = window.scrollY;
        setIsScrollingAtom(true);
        isScrolling = true;
      }
    };

    const handleScroll = () => {
      if (isScrolling) {
        const currentScroll = window.scrollY;
        const distance = Math.abs(currentScroll - initialScroll);
        const viewportHeight = window.innerHeight;
        const widthPercentage = 1 - distance / viewportHeight;

        width.set(Math.max(widthPercentage, 0));
      }
    };

    const handleScrollEnd = () => {
      if (isScrolling) {
        isScrolling = false;
        setIsScrollingAtom(false);
        width.set(1);
      }
    };

    const handleScrollEvent = () => {
      handleScrollStart();
      handleScroll();
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScrollEnd, 50);
    };

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
      clearTimeout(timeoutId);
    };
  }, [width]);

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 w-full", className)}
    >
      <motion.div
        className="absolute top-1/6 left-0 h-0.5 w-dvw origin-right bg-accent"
        style={{ scaleX: width }}
      />
      <motion.div
        className="absolute right-0 bottom-1/6 h-0.5 w-dvw origin-left bg-accent"
        style={{ scaleX: width }}
      />
      <div className="absolute top-0 left-1/6 h-full w-0.5 bg-accent delay-75 duration-300 ease-in-out-circ" />
      <div className="absolute right-1/6 bottom-0 h-full w-0.5 bg-accent duration-500 ease-in-out-circ" />
      <AnimatePresence>
        {!isScrolling && (
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Star className="-translate-x-[11px] -translate-y-[11px] absolute top-1/6 left-1/6" />
            <Star className="-translate-x-[11px] absolute bottom-1/6 left-1/6 translate-y-[11px]" />
            <Star className="-translate-y-[11px] absolute top-1/6 right-1/6 translate-x-[11px]" />
            <Star className="absolute right-1/6 bottom-1/6 translate-x-[11px] translate-y-[11px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BackgroundGraphic;
