import { motion } from "framer-motion";
import CardContainer from "@/components/about/cards/cardContainer";

const items = ["Performance", "Accessibility", "Best practices", "Visibility"];
const PerformanceCard = () => {
    const variants = {
        line: {
            initial: {
                pathLength: 0.3,
                stroke: "#71717166",
            },

            animate: (i: number) => {
                const delay = i * 0.25;
                return {
                    pathLength: 0.9,
                    stroke: "#6cc070dd",
                    transition: {
                        pathLength: {
                            delay,
                            type: "spring",
                            duration: 0.8,
                            bounce: 0,
                        },
                    },
                };
            },
        },
        text: {
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

    return (
        <CardContainer>
            <div className="grid h-full grid-cols-2 grid-rows-2 place-items-center gap-y-2">
                {items.map((item, i) => (
                    <div
                        className="flex flex-col items-center gap-1"
                        key={item}
                    >
                        <svg
                            id="progress"
                            width="60"
                            height="60"
                            viewBox="0 0 100 100"
                            style={{
                                strokeLinecap: "round",
                            }}
                        >
                            <circle
                                cx="50"
                                cy="50"
                                r="30"
                                pathLength="1"
                                strokeWidth="12"
                                opacity="0.1"
                                fill="#000000dd"
                            />
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                strokeWidth={10}
                                pathLength={0.3}
                                strokeLinecap="round"
                                variants={variants.line}
                                will-change="transform"
                                custom={i}
                            />
                            <motion.text
                                fill="#717171"
                                className="text-xl"
                                x="50"
                                y="50"
                                dx={"-12"}
                                dy={"7.5"}
                                variants={variants.text}
                            >
                                99
                            </motion.text>
                        </svg>
                        <motion.p
                            variants={variants.text}
                            className="text-center text-sm"
                        >
                            {item}
                        </motion.p>
                    </div>
                ))}
            </div>
        </CardContainer>
    );
};
export default PerformanceCard;
