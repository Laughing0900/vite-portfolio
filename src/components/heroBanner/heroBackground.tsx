"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useCallback } from "react";
import useBreakpoint from "@/hooks/useBreakpoint";
import useDevice from "@/hooks/useDevice";
import { cn } from "@/lib/utils";
import type React from "react";

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
    const { isMobile: md } = useBreakpoint();
    const { isDesktop } = useDevice();
    const isMobile = !isDesktop || md;

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = useCallback(
        ({
            currentTarget,
            clientX,
            clientY,
        }: React.MouseEvent<HTMLDivElement>) => {
            if (!currentTarget || isMobile) return;
            const { left, top } = currentTarget.getBoundingClientRect();

            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        },
        [isMobile, mouseX, mouseY]
    );

    return (
        <div
            className={cn(
                "group relative h-full w-full bg-black",
                containerClassName
            )}
            onMouseMove={handleMouseMove}
        >
            <div className="pointer-events-none absolute inset-0 bg-dot-thick-neutral-800" />
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 bg-dot-thick-[#ff007a] group-hover:opacity-100"
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
