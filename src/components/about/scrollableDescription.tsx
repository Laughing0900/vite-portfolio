import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const paragraph =
    "I'm Laughing, a passionate Full-Stack Developer specializing in the blockchain industry. With a strong foundation in front-end development and smart contract expertise, I have a deep understanding of decentralized applications and Web3 ecosystems. My focus is on creating secure, scalable, and user-friendly blockchain solutions. I'm proficient in smart contract development, blockchain integrations, and web animation.";

export default function ScrollableDescription() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.5", "start 0.25"],
    });

    const words = paragraph.split(" ");

    return (
        <div className="grid-template mb-40">
            <p
                ref={container}
                className="col-span-4 flex flex-wrap text-2xl leading-[1.3] sm:text-4xl md:col-span-5"
            >
                {words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + 1 / words.length;
                    return (
                        <Word
                            key={i}
                            progress={scrollYProgress}
                            range={[start, end]}
                        >
                            {word}
                        </Word>
                    );
                })}
            </p>
        </div>
    );
}

const Word = ({
    children,
    progress,
    range,
}: {
    children: React.ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
}) => {
    const amount = range[1] - range[0];
    const step = amount / (children as string).length;
    return (
        <span className="relative mx-1">
            {(children as string).split("").map((char, i) => {
                const start = range[0] + i * step;
                const end = range[0] + (i + 1) * step;
                return (
                    <Char
                        key={`c_${i}`}
                        progress={progress}
                        range={[start, end]}
                    >
                        {char}
                    </Char>
                );
            })}
        </span>
    );
};

const Char = ({
    children,
    progress,
    range,
}: {
    children: React.ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
}) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span>
            <span className="absolute opacity-20">{children}</span>
            <motion.span style={{ opacity: opacity }}>{children}</motion.span>
        </span>
    );
};
