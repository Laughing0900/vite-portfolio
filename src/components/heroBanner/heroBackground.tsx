"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

/// @description this component install from Aceternity UI
export const HeroHighlight = ({
    children,
    className,
    containerClassName,
}: {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent<HTMLDivElement>) {
        if (!currentTarget) return;
        const { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
    return (
        <div
            className={cn(
                "group relative h-full w-full bg-black",
                containerClassName
            )}
            onMouseMove={handleMouseMove}
        >
            <div className="bg-dot-thick-neutral-800 pointer-events-none absolute inset-0" />
            <motion.div
                className="bg-dot-thick-[#ff007a] pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    WebkitMaskImage: useMotionTemplate`
                      radial-gradient(
                        400px circle at ${mouseX}px ${mouseY}px,
                        black 0%,
                        transparent 100%
                      )
                    `,
                    maskImage: useMotionTemplate`
                      radial-gradient(
                        400px circle at ${mouseX}px ${mouseY}px,
                        black 0%,
                        transparent 100%
                      )
                    `,
                }}
            />

            <div className={cn("relative z-20", className)}>{children}</div>
        </div>
    );
};
