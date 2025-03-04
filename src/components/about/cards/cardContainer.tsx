"use client";

import { motion } from "motion/react";
import type { FC } from "react";

type CardContainerProps = {
    children: React.ReactNode;
};
const CardContainer: FC<CardContainerProps> = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="relative h-full min-h-[6rem] w-full rounded-md bg-white/5 backdrop-blur-sm"
        >
            {children}
        </motion.div>
    );
};

export default CardContainer;
