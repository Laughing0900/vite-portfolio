import { motion, useTransform } from "framer-motion";
import { FC } from "react";
import type { MotionValue } from "framer-motion";

type HeroBannerProps = {
    scrollYProgress: MotionValue;
};

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
            className="fixed bottom-auto left-0 right-0 top-0 z-10 h-dvh bg-black"
            style={{ opacity, visibility }}
        >
            <div className="grid place-items-center bg-gray-950 text-6xl">
                <span>Hero banner</span>
            </div>
        </motion.section>
    );
};
export default HeroBanner;
