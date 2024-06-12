import { easeInOut, motion } from "framer-motion";
import CardContainer from "@/components/about/cards/cardContainer";

const StatusCard = () => {
    const variants = {
        bar: {
            initial: {
                fill: "#71717166",
                y: 0,
            },
            animate: (i: number) => {
                const delay = i * 0.05;
                return {
                    fill: "#6cc070dd",
                    y: -40,
                    transition: {
                        y: {
                            delay,
                            type: "spring",
                            duration: 0.8,
                            stiffness: 200,
                            easeInOut,
                        },
                        duration: 0.3,
                    },
                };
            },
        },
        text: {
            initial: {
                color: "#717171",
            },
            animate: {
                color: "#f4f4f9dd",
                transition: {
                    duration: 0.3,
                },
            },
        },
    };

    return (
        <CardContainer>
            <div className="flex h-full w-full flex-col justify-center gap-2 overflow-clip pt-5">
                <svg
                    className="w-[120%]"
                    id="progress"
                    height="100"
                    viewBox="0 0 448 34"
                    style={{
                        strokeLinecap: "round",
                    }}
                >
                    {new Array(40).fill(0).map((_, i) => (
                        <motion.rect
                            width={10}
                            height={80}
                            x={i * 16}
                            y={0}
                            variants={variants.bar}
                            will-change="fill transform"
                            custom={i}
                            key={"bar_" + i}
                        />
                    ))}
                </svg>
                <div className="flex justify-center">
                    <motion.span color="#717171" variants={variants.text}>
                        100 %
                    </motion.span>
                </div>
            </div>
        </CardContainer>
    );
};
export default StatusCard;
