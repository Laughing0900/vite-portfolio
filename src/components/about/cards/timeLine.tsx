import { motion } from "motion/react";
import { useMemo } from "react";
import CardContainer from "@/components/about/cards/cardContainer";
import useBreakpoint from "@/hooks/useBreakpoint";

const TimeLineCard = () => {
    const { isMobile } = useBreakpoint();
    const variants = useMemo(() => {
        if (!isMobile)
            return {
                barLeft: {
                    initial: {
                        width: "50%",
                    },
                    animate: {
                        width: "70%",
                    },
                },
                barRight: {
                    initial: {
                        width: "50%",
                    },
                    animate: {
                        width: "70%",
                    },
                },
                inner: {
                    initial: {
                        fill: "#717171",
                        color: "#717171",
                    },
                    animate: {
                        fill: "#6cc070dd",
                        color: "#f4f4f9dd",
                    },
                },
            };
        const cleanAnim = {
            initial: {},
            animate: {},
        };

        return {
            barLeft: cleanAnim,
            barRight: cleanAnim,
            inner: cleanAnim,
        };
    }, [isMobile]);

    return (
        <CardContainer>
            <div className="h-full w-full overflow-hidden">
                <motion.div
                    className="absolute bottom-1/2 left-1/2 h-10 w-1/2 -translate-x-2/3 -translate-y-1/2 transform overflow-clip rounded-md bg-gray-900/20 shadow-[0_0_6px_2px_rgba(0,0,0,0.3)] shadow-gray-400/50"
                    variants={variants.barLeft}
                >
                    <motion.div
                        className="absolute right-0 h-full w-1/3 bg-gray-700/50"
                        variants={variants.inner}
                    />
                </motion.div>
                <motion.div
                    className="absolute bottom-1/2 left-1/2 h-10 w-1/2 -translate-x-1/3 translate-y-full transform overflow-clip rounded-md bg-gray-900/20 shadow-[0_0_6px_2px_rgba(0,0,0,0.3)] shadow-gray-400/50"
                    variants={variants.barRight}
                >
                    <motion.div
                        className="absolute left-0 h-full w-1/3 bg-gray-700/50"
                        variants={variants.inner}
                    />
                </motion.div>
                <div
                    className="absolute left-1/2 top-1/2 h-full w-0.5 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-b from-gray-900/0 via-gray-100/80 to-gray-900/0"
                    id="timeLine-middle"
                />
                <div className="absolute bottom-8 left-1/2 h-px w-3/4 -translate-x-1/2 transform rounded-full bg-gray-100/50">
                    <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-[200%] -translate-y-1/2 -rotate-45 transform bg-gray-900/30 shadow-[0_0_2px_1px_rgba(0,0,0,0.3)] shadow-gray-400/50"></div>
                    <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-[200%] -rotate-45 transform bg-gray-900/30 shadow-[0_0_2px_1px_rgba(0,0,0,0.3)] shadow-gray-400/50"></div>
                </div>
            </div>
        </CardContainer>
    );
};
export default TimeLineCard;
