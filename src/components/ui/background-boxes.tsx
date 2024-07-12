import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

/// @description this component install from Aceternity UI
export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
    const rows = new Array(60).fill(1);
    const cols = new Array(50).fill(1);
    const colors = [
        "#59163699",
        "#A61C8199",
        "#BF34A899",
        "#0D437399",
        "#1BA1BF99",
    ];
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="sticky top-0 h-dvh w-full overflow-hidden" {...rest}>
            <div
                style={{
                    transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
                }}
                className={cn(
                    "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2",
                    className
                )}
            >
                {rows.map((_, i) => (
                    <motion.div
                        key={`row` + i}
                        className="relative h-16 w-32 border-l border-gray-700/70"
                    >
                        {cols.map((_, j) => (
                            <motion.div
                                whileHover={{
                                    backgroundColor: `var(${getRandomColor()})`,
                                    transition: { duration: 0 },
                                }}
                                animate={{
                                    transition: { duration: 2 },
                                }}
                                key={`col` + j}
                                className="relative h-16 w-32 border-r border-t border-gray-700/40"
                            >
                                {j % 2 === 0 && i % 2 === 0 ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="pointer-events-none absolute -left-[40px] -top-[24px] h-10 w-16 stroke-[1px] text-gray-500/70"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v12m6-6H6"
                                        />
                                    </svg>
                                ) : null}
                            </motion.div>
                        ))}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export const BoxesBackground = React.memo(BoxesCore);
