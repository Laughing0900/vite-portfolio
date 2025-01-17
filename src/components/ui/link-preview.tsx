"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion";
import React, { useEffect } from "react";
import Image, { cloudinaryLoader } from "@/components/ui/image";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
    children: React.ReactNode;
    // url: string;
    className?: string;
    width?: number;
    height?: number;
    quality?: number;
    layout?: string;
    imageSrc: string;
};

/// @description this component install from Aceternity UI
export const LinkPreview = ({
    children,
    // url,
    className,
    width = 300,
    height = 150,
    imageSrc = "",
}: LinkPreviewProps) => {
    const src = imageSrc;

    const [isOpen, setOpen] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const springConfig = { stiffness: 100, damping: 15 };
    const x = useMotionValue(0);

    const translateX = useSpring(x, springConfig);

    const handleMouseMove = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        const targetRect = event.currentTarget.getBoundingClientRect();
        const eventOffsetX = event.clientX - targetRect.left;
        const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Reduce the effect to make it subtle
        x.set(offsetFromCenter);
    };

    return (
        <>
            {isMounted ? (
                <div className="invisible hidden">
                    <Image
                        src={src}
                        loader={cloudinaryLoader}
                        width={width}
                        height={height}
                        alt="hidden image"
                        loading="lazy"
                    />
                </div>
            ) : null}

            <HoverCardPrimitive.Root
                openDelay={50}
                closeDelay={100}
                onOpenChange={(open) => {
                    setOpen(open);
                }}
            >
                <HoverCardPrimitive.Trigger
                    onMouseMove={handleMouseMove}
                    className={cn(
                        "w-full cursor-pointer text-white",
                        className
                    )}
                >
                    {children}
                </HoverCardPrimitive.Trigger>

                <HoverCardPrimitive.Content
                    className="z-10 [transform-origin:var(--radix-hover-card-content-transform-origin)]"
                    side="top"
                    align="center"
                >
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                    },
                                }}
                                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                className="rounded-xl shadow-xl"
                                style={{
                                    x: translateX,
                                }}
                            >
                                <div className="rounded-xl bg-gray-500/50 p-1 shadow">
                                    <Image
                                        src={src}
                                        loader={cloudinaryLoader}
                                        width={width}
                                        height={height}
                                        className="rounded-lg"
                                        alt="preview image"
                                        loading="lazy"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
        </>
    );
};
