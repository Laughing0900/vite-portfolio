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
                        transition: {
                            duration: 0.2,
                            delay: 0.3,
                        },
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
                    viewBox="0 0 653 465"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full"
                >
                    <motion.path
                        // background
                        d="M0 460.694c6.6-3.13 19.8-11.272 33-15.654s19.8-2.814 33-6.257 19.8.365 33-10.955 19.8-32.07 33-45.643c13.2-13.572 19.8-16.08 33-22.22s19.8-5.647 33-8.48c13.2-2.832 19.8 5.901 33-5.68 13.2-11.582 19.8-37.759 33-52.226 13.2-14.468 19.8-28.263 33-20.112 13.2 8.15 19.8 59.038 33 60.863 13.2 1.824 19.8-43.269 33-51.741s19.8 24.488 33 9.38c13.2-15.11 19.8-81.825 33-84.923s19.8 54.76 33 69.432 19.8 34.912 33 3.931 19.8-148.752 33-158.837c13.2-10.086 19.8 111.943 33 108.409 13.2-3.535 19.8-97.635 33-126.082s19.8-7.562 33-16.152 26.4-21.438 33-26.798L653 465H0Z"
                        fill={isMobile ? "#94D13D" : "#000000ff"}
                        fillOpacity="0.1"
                        variants={variants.background}
                    />
                    <motion.path
                        // path
                        d="M0 460.694c6.6-3.13 19.8-11.272 33-15.654s19.8-2.814 33-6.257 19.8.365 33-10.955 19.8-32.07 33-45.643c13.2-13.572 19.8-16.08 33-22.22s19.8-5.647 33-8.48c13.2-2.832 19.8 5.901 33-5.68 13.2-11.582 19.8-37.759 33-52.226 13.2-14.468 19.8-28.263 33-20.112 13.2 8.15 19.8 59.038 33 60.863 13.2 1.824 19.8-43.269 33-51.741s19.8 24.488 33 9.38c13.2-15.11 19.8-81.825 33-84.923s19.8 54.76 33 69.432 19.8 34.912 33 3.931 19.8-148.752 33-158.837c13.2-10.086 19.8 111.943 33 108.409 13.2-3.535 19.8-97.635 33-126.082s19.8-7.562 33-16.152 26.4-21.438 33-26.798"
                        stroke="#717171"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <motion.path
                        // path
                        d="M0 460.694c6.6-3.13 19.8-11.272 33-15.654s19.8-2.814 33-6.257 19.8.365 33-10.955 19.8-32.07 33-45.643c13.2-13.572 19.8-16.08 33-22.22s19.8-5.647 33-8.48c13.2-2.832 19.8 5.901 33-5.68 13.2-11.582 19.8-37.759 33-52.226 13.2-14.468 19.8-28.263 33-20.112 13.2 8.15 19.8 59.038 33 60.863 13.2 1.824 19.8-43.269 33-51.741s19.8 24.488 33 9.38c13.2-15.11 19.8-81.825 33-84.923s19.8 54.76 33 69.432 19.8 34.912 33 3.931 19.8-148.752 33-158.837c13.2-10.086 19.8 111.943 33 108.409 13.2-3.535 19.8-97.635 33-126.082s19.8-7.562 33-16.152 26.4-21.438 33-26.798"
                        stroke="#94D13D"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={variants.line}
                    />
                </svg>
            </div>
        </CardContainer>
    );
};
export default ChartCard;
