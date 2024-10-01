"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const BackgroundGradientAnimation = ({
    containerClassName,
}: {
    containerClassName?: string;
}) => {
    const interactiveRef = useRef<HTMLDivElement>(null);

    const [curX, setCurX] = useState(0);
    const [curY, setCurY] = useState(0);
    const [tgX, setTgX] = useState(0);
    const [tgY, setTgY] = useState(0);

    useEffect(() => {
        function move() {
            if (!interactiveRef.current) {
                return;
            }
            setCurX(curX + (tgX - curX) / 20);
            setCurY(curY + (tgY - curY) / 20);
            interactiveRef.current.style.transform = `translate(${Math.round(
                curX
            )}px, ${Math.round(curY)}px)`;
        }

        move();
    }, [tgX, tgY]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (interactiveRef.current) {
            const rect = interactiveRef.current.getBoundingClientRect();
            setTgX(event.clientX - rect.left);
            setTgY(event.clientY - rect.top);
        }
    };

    const [isSafari, setIsSafari] = useState(false);
    useEffect(() => {
        setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    }, []);

    return (
        <div className="pointer-events-none sticky top-0 -z-10 h-dvh w-full">
            <div
                className={cn(
                    "relative left-0 top-0 h-screen w-screen overflow-hidden",
                    containerClassName
                )}
            >
                <svg className="hidden">
                    <defs>
                        <filter id="blurMe">
                            <feGaussianBlur
                                in="SourceGraphic"
                                stdDeviation="10"
                                result="blur"
                            />
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                                result="goo"
                            />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>
                <div
                    className={cn(
                        "gradients-container h-full w-full blur-lg",
                        isSafari
                            ? "blur-2xl"
                            : "[filter:url(#blurMe)_blur(40px)]"
                    )}
                >
                    <div
                        className={cn(
                            `absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
                            `left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:hard-light]`,
                            `[transform-origin:center_center]`,
                            `animate-first`,
                            `opacity-100`
                        )}
                    ></div>
                    <div
                        className={cn(
                            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
                            `left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:hard-light]`,
                            `[transform-origin:calc(50%-400px)]`,
                            `animate-second`,
                            `opacity-100`
                        )}
                    ></div>
                    <div
                        className={cn(
                            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
                            `left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:hard-light]`,
                            `[transform-origin:calc(50%+400px)]`,
                            `animate-third`,
                            `opacity-100`
                        )}
                    ></div>
                    <div
                        className={cn(
                            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
                            `left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:hard-light]`,
                            `[transform-origin:calc(50%-200px)]`,
                            `animate-fourth`,
                            `opacity-70`
                        )}
                    ></div>
                    <div
                        className={cn(
                            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
                            `left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:hard-light]`,
                            `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
                            `animate-fifth`,
                            `opacity-100`
                        )}
                    ></div>

                    <div
                        ref={interactiveRef}
                        onMouseMove={handleMouseMove}
                        className={cn(
                            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
                            `-left-1/2 -top-1/2 h-full w-full [mix-blend-mode:hard-light]`,
                            `opacity-70`
                        )}
                    ></div>
                </div>
            </div>
        </div>
    );
};
