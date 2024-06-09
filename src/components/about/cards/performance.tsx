import { motion } from "framer-motion";

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
                    pathLength: 1,
                    stroke: "#f4f4f9cc",
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
                fill: "#f4f4f9dd",
                color: "#f4f4f9dd",
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="grid h-full min-h-[6rem] w-full grid-cols-2 grid-rows-2 place-items-center gap-2"
        >
            {items.map((item, i) => (
                <div className="flex flex-col items-center gap-1">
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
                            {Math.floor(Math.random() * 8) + 92}
                        </motion.text>
                    </svg>
                    <motion.span variants={variants.text} className="text-sm">
                        {item}
                    </motion.span>
                </div>
            ))}
        </motion.div>
    );
};
export default PerformanceCard;
