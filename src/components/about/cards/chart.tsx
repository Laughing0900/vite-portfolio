import { motion } from "framer-motion";
import { useMemo } from "react";
import CardContainer from "@/components/about/cards/cardContainer";
import useBreakpoint from "@/hooks/useBreakpoint";

const ChartCard = () => {
    const { isMobile } = useBreakpoint();

    const variants = useMemo(() => {
        if (!isMobile)
            return {
                line: {
                    initial: {
                        pathLength: 0,
                        stroke: "#71717166",
                    },

                    animate: {
                        pathLength: 1,
                        stroke: "#6cc070dd",
                        transition: {
                            pathLength: {
                                type: "spring",
                                duration: 0.8,
                                bounce: 0,
                            },
                        },
                    },
                },
                background: {
                    initial: {
                        fill: "#000000ff",
                    },
                    animate: {
                        fill: "#94D13D",
                    },
                },
            };
        const cleanAnim = {
            initial: {},
            animate: {},
        };

        return {
            line: {
                ...cleanAnim,
                initial: {
                    pathLength: 1,
                    stroke: "#6cc070dd",
                },
            },
            background: cleanAnim,
        };
    }, [isMobile]);

    return (
        <CardContainer>
            <div className="grid h-full place-items-center">
                <svg
                    viewBox="0 0 537 260"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-4/5"
                >
                    <motion.path
                        // background
                        d="M4.11133 243.25L70.3336 195.4L136.556 163.5L202.778 201.78L269 128.41L335.222 67.8L401.445 102.89L467.667 115.65L533.889 4V259.2H467.667H401.445H335.222H269H202.778H136.556H70.3336H4.11133V243.25Z"
                        fill={isMobile ? "#94D13D" : "#000000ff"}
                        fill-opacity="0.2"
                        variants={variants.background}
                    />
                    <motion.path
                        // path
                        d="M4.11133 243.25L70.3336 195.4L136.556 163.5L202.778 201.78L269 128.41L335.222 67.8L401.445 102.89L467.667 115.65L533.889 4"
                        stroke="#717171"
                        stroke-width="8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <motion.path
                        // path
                        d="M4.11133 243.25L70.3336 195.4L136.556 163.5L202.778 201.78L269 128.41L335.222 67.8L401.445 102.89L467.667 115.65L533.889 4"
                        stroke="#94D13D"
                        stroke-width="8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        variants={variants.line}
                        className="z-10"
                    />
                </svg>
            </div>
        </CardContainer>
    );
};
export default ChartCard;
