"use client";

import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
    AnimatePresence,
    motion,
    MotionValue,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type FloatingDockProps = {
    items: FloatingDockPropsItems[];
    desktopClassName?: string;
    mobileClassName?: string;
};

type FloatingDockPropsItems =
    | { title: string; icon: React.ReactNode; href: string }
    | { separator: boolean };

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
}: FloatingDockProps) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobile items={items} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    className,
}: {
    items: FloatingDockPropsItems[];
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    const lenis = useLenis();

    const handleNav = (url: string) => {
        return lenis?.scrollTo(url);
    };

    return (
        <div
            className={cn(
                "absolute bottom-0 right-4 block md:hidden",
                className
            )}
        >
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2.5"
                    >
                        {items.map((item, idx) =>
                            "separator" in item ? (
                                <Separator key={idx} orientation="horizontal" />
                            ) : (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 10,
                                        transition: {
                                            delay: idx * 0.05,
                                        },
                                    }}
                                    transition={{
                                        delay: (items.length - 1 - idx) * 0.05,
                                    }}
                                >
                                    <Link
                                        href={item.href}
                                        key={item.title}
                                        className="flex h-14 w-14 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm"
                                        onClick={() => handleNav(item.href)}
                                    >
                                        <div className="h-6 w-6">
                                            {item.icon}
                                        </div>
                                    </Link>
                                </motion.div>
                            )
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-800"
            >
                <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-400" />
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    className,
}: {
    items: FloatingDockPropsItems[];
    className?: string;
}) => {
    const mouseX = useMotionValue(Infinity);

    const lenis = useLenis();

    const handleNav = (url: string) => {
        console.log(url);
        if (url.includes("#")) {
            return lenis?.scrollTo(url);
        }
    };

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "mx-auto hidden h-16 w-fit items-end gap-4 rounded-2xl bg-black/30 px-4 pb-3 backdrop-blur-sm md:flex",
                className
            )}
        >
            {items.map((item, idx) =>
                "separator" in item ? (
                    <div className="h-full pt-3" key={idx}>
                        <Separator orientation="vertical" />
                    </div>
                ) : (
                    <IconContainer
                        mouseX={mouseX}
                        key={item.title}
                        {...item}
                        onClick={() => handleNav(item.href)}
                    />
                )
            )}
        </motion.div>
    );
};

function IconContainer({
    mouseX,
    title,
    icon,
    href,
    onClick,
}: {
    mouseX: MotionValue;
    title: string;
    icon: React.ReactNode;
    href: string;
    onClick: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: 0,
        };

        return val - bounds.x - bounds.width / 2;
    });

    const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const heightTransform = useTransform(
        distance,
        [-150, 0, 150],
        [40, 80, 40]
    );

    const widthTransformIcon = useTransform(
        distance,
        [-150, 0, 150],
        [20, 40, 20]
    );
    const heightTransformIcon = useTransform(
        distance,
        [-150, 0, 150],
        [20, 40, 20]
    );

    const width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    const height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const widthIcon = useSpring(widthTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    const heightIcon = useSpring(heightTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);

    return (
        <Link href={href}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative flex aspect-square items-center justify-center rounded-full bg-neutral-800"
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md border border-neutral-900 bg-neutral-800 px-2 py-0.5 text-xs text-white"
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    style={{ width: widthIcon, height: heightIcon }}
                    className="flex items-center justify-center"
                    onClick={onClick}
                >
                    {icon}
                </motion.div>
            </motion.div>
        </Link>
    );
}
