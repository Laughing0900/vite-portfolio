"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion";
import React, { useEffect } from "react";
import Image from "@/components/ui/image";
import Link from "@/components/ui/link";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
    children: React.ReactNode;
    url: string;
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
    url,
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
    }, [setIsMounted]);

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
                        width={width}
                        height={height}
                        alt="hidden image"
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
                    className={cn("w-full text-white", className)}
                    href={url}
                >
                    {children}
                </HoverCardPrimitive.Trigger>

                <HoverCardPrimitive.Content
                    className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
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
                                <Link
                                    href={url}
                                    className="block rounded-xl bg-gray-400/50 p-1 shadow"
                                    style={{ fontSize: 0 }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {/* <div className="h-40 w-40 bg-gray-500"></div> */}
                                    <Image
                                        src={imageSrc}
                                        width={width}
                                        height={height}
                                        className="rounded-lg"
                                        alt="preview image"
                                    />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
        </>
    );
};
