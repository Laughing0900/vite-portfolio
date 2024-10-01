"use client";

import { motion, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const BackgroundGradientAnimation = ({
    containerClassName,
}: {
    containerClassName?: string;
}) => {
    const interactiveRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!interactiveRef.current) {
            return;
        }

        const rect = interactiveRef.current.getBoundingClientRect();

        const px = x.get();
        const py = y.get();
        x.set(px + (event.clientX - rect.left - px) / 10);
        y.set(py + (event.clientY - rect.top - py) / 10);
    };

    return (
        <div
            className={cn(
                "sticky left-0 top-0 h-screen w-screen overflow-hidden",
                containerClassName
            )}
        >
            <div className={cn("gradients-container h-full w-full blur-2xl")}>
                <div
                    className={cn(
                        `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
                        `left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:hard-light]`,
                        `[transform-origin:calc(50%+400px)]`,
                        `animate-third`,
                        `opacity-100`
                    )}
                />

                <div
                    className={cn(
                        `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
                        `left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:hard-light]`,
                        `[transform-origin:calc(50%-200px)]`,
                        `animate-fourth`,
                        `opacity-70`
                    )}
                />

                <motion.div
                    ref={interactiveRef}
                    onMouseMove={handleMouseMove}
                    className={cn(
                        `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
                        `-left-1/2 -top-1/2 h-full w-full [mix-blend-mode:hard-light]`,
                        `opacity-70`
                    )}
                    style={{
                        x: x,
                        y: y,
                    }}
                />
            </div>
        </div>
    );
};
