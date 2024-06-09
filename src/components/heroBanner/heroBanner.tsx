import { motion, useTransform } from "framer-motion";
import { FC } from "react";
import { FlipWords } from "@/components/heroBanner/flip-words";
import { HeroHighlight } from "@/components/heroBanner/heroBackground";
import type { MotionValue } from "framer-motion";

type HeroBannerProps = {
    scrollYProgress: MotionValue;
};

const words = ["a Remarkable", "a Successful", "a Stunning", "an Outstanding"];

const HeroBanner: FC<HeroBannerProps> = ({ scrollYProgress }) => {
    const progress = [0, 0.1];
    const opacity = useTransform(scrollYProgress, progress, [1, 0]);
    const visibility = useTransform(scrollYProgress, progress, [
        "inherit",
        "hidden",
    ]);
    return (
        <motion.section
            id="hero-banner"
            className="fixed bottom-auto left-0 right-0 top-0 z-10 h-dvh"
            style={{ opacity, visibility }}
        >
            <HeroHighlight className="grid h-full w-full grid-cols-8 items-center gap-5 p-20">
                <div className="col-span-6 col-start-2 text-6xl font-normal text-foreground">
                    Build <FlipWords words={words} /> <br />
                    Project with
                </div>

                <div className="absolute bottom-20 right-20 bg-gradient-to-tr from-gray-300 to-debug bg-clip-text font-goldman text-[120px] font-bold text-transparent">
                    Laughing
                </div>
            </HeroHighlight>
        </motion.section>
    );
};
export default HeroBanner;
