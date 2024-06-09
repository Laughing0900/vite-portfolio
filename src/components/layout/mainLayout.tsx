import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import HeroBanner from "@/components/heroBanner/heroBanner";
import WithFooter from "@/components/layout/footer";
import WithGrid from "@/components/layout/grid";
import { BoxesBackground } from "@/components/ui/background-boxes";
import type { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    const footerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"],
    });
    const opacity = useTransform(scrollYProgress, [0.7, 1], [0.8, 0]);

    const [openGrid, setOpenGrid] = useState(true);

    const toggleGrid = useCallback(() => {
        setOpenGrid((prev) => !prev);
    }, []);

    return (
        <>
            <header className="grid-template fixed top-0 z-50 grid w-full pt-8">
                {/* @TODO disable on awwward */}
                <button
                    className="col-start-8 bg-white text-black"
                    onClick={toggleGrid}
                >
                    toggleGrid
                </button>
            </header>
            <HeroBanner scrollYProgress={scrollYProgress} />
            <main className="relative z-10 mt-[100dvh] min-h-dvh w-full bg-background">
                <BoxesBackground />
                <div className="-mt-[100dvh] space-y-40 pt-40">{children}</div>
            </main>
            <motion.div
                ref={footerRef}
                className="pointer-events-none relative z-10 h-dvh bg-background will-change-auto"
                style={{ opacity: opacity }}
            />
            <WithFooter />
            <WithGrid open={openGrid} />
        </>
    );
};

export default MainLayout;
