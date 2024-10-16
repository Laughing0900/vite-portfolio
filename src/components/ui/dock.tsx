"use client";

import { cva } from "class-variance-authority";
import {
    motion,
    MotionValue,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import React, { PropsWithChildren, useRef } from "react";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

export interface DockProps extends VariantProps<typeof dockVariants> {
    className?: string;
    magnification?: number;
    distance?: number;
    direction?: "top" | "middle" | "bottom";
    children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
    "mx-auto w-max mt-8 h-[58px] p-2 flex gap-2 rounded-2xl border bg-black/30 supports-backdrop-blur:dark:bg-black/30 backdrop-blur-md"
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
    (
        {
            className,
            children,
            magnification = DEFAULT_MAGNIFICATION,
            distance = DEFAULT_DISTANCE,
            direction = "bottom",
            ...props
        },
        ref
    ) => {
        const mouseMove = useMotionValue(Infinity);

        const renderChildren = () => {
            return React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === DockIcon) {
                    return React.cloneElement(child, {
                        ...child.props,
                        mouseMove: mouseMove,
                        magnification: magnification,
                        distance: distance,
                    });
                }
                return child;
            });
        };

        return (
            <motion.div
                ref={ref}
                onMouseMove={(e) => mouseMove.set(e.pageX)}
                onMouseLeave={() => mouseMove.set(Infinity)}
                {...props}
                className={cn(dockVariants({ className }), {
                    "items-start": direction === "top",
                    "items-center": direction === "middle",
                    "items-end": direction === "bottom",
                })}
            >
                {renderChildren()}
            </motion.div>
        );
    }
);

Dock.displayName = "Dock";

export interface DockIconProps {
    magnification?: number;
    distance?: number;
    mouseMove: MotionValue<number>;
    className?: string;
    children?: React.ReactNode;
    props?: PropsWithChildren;
}

const DockIcon = ({
    magnification = DEFAULT_MAGNIFICATION,
    distance = DEFAULT_DISTANCE,
    mouseMove,
    className,
    children,
    ...props
}: DockIconProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const distanceCalc = useTransform(mouseMove, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: 0,
        };

        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(
        distanceCalc,
        [-distance, 0, distance],
        [40, magnification, 40]
    );

    const width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className={cn(
                "flex aspect-square cursor-pointer items-center justify-center rounded-full",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
