import {
    motion,
    useMotionValueEvent,
    useScroll,
    useTransform,
} from "framer-motion";
import { Scale } from "lucide-react";
import { useRef, useState } from "react";
import useOnFetching from "@/hooks/useOnFetching";

const Loading = () => {
    const { isLoading } = useOnFetching();
    const [scrollOut, setScrollOut] = useState(true);
    const ref = useRef<HTMLDivElement>(null);

    const variants = {
        show: {
            scale: 1,
            transition: {
                ease: "easeOut",
                duration: 0.3,
            },
        },
        hide: {
            scale: 0,
        },
    };

    return (
        <>
            {scrollOut && (
                <motion.div
                    className="fixed left-1/2 top-0 h-[200dvh] w-full -translate-x-1/2 transform bg-white"
                    ref={ref}
                >
                    <div className="glitch-loading font-goldman text-black">
                        Load...ing
                    </div>
                    {!isLoading && (
                        <div
                            className="bottom-[10%] left-1/2 -translate-x-1/2 transform"
                            onClick={() => {
                                setScrollOut(false);
                            }}
                        >
                            Enter
                        </div>
                    )}
                </motion.div>
            )}
        </>
    );
};

export default Loading;
