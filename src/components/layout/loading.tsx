import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Loading = () => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"],
    });

    const scale = useTransform(scrollYProgress, [0.7, 1], [0.8, 0]);

    return (
        <div className="fixed left-0 top-0 h-screen w-full" ref={ref}>
            <div className="text-[calc(100vw/6)]">
                <div className="">LOAD...ING</div>
                <div className="">LAUGHING</div>
            </div>
            <div className="">READY</div>
        </div>
    );
};

export default Loading;
