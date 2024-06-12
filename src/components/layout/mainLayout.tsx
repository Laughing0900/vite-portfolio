import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import HeroBanner from "@/components/heroBanner/heroBanner";
import WithFooter from "@/components/layout/footer";
import WithGrid from "@/components/layout/grid";
import WithHeader from "@/components/layout/header";
import { BoxesBackground } from "@/components/ui/background-boxes";
import GridBackground from "@/components/ui/background-grids";
import { WithDevAlert } from "@/components/ui/developmentMode";
import useBreakpoint from "@/hooks/useBreakpoint";
import type { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    const { isMobile } = useBreakpoint();
    const [openGrid, setOpenGrid] = useState(false);
    const footerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"],
    });
    const opacity = useTransform(scrollYProgress, [0.7, 1], [0.8, 0]);
    const progress = [0, 0.1];
    const heroOpacity = useTransform(scrollYProgress, progress, [1, 0]);
    const visibility = useTransform(scrollYProgress, progress, [
        "inherit",
        "hidden",
    ]);

    const Background = useMemo(() => {
        if (isMobile) {
            return <GridBackground />;
        }
        return <BoxesBackground />;
    }, [isMobile]);

    return (
        <>
            <WithHeader setOpenGrid={setOpenGrid} openGrid={openGrid} />
            {/* @hero banner */}
            <motion.div style={{ opacity: heroOpacity, visibility }}>
                <HeroBanner />
            </motion.div>

            <main className="relative z-10 mt-[100dvh] min-h-dvh w-full bg-background">
                {Background}
                <div className="-mt-[100dvh] space-y-40 pt-40">{children}</div>
            </main>

            {/* @footer overlay*/}
            <motion.div
                ref={footerRef}
                className="pointer-events-none relative z-10 h-dvh bg-background will-change-auto"
                style={{ opacity: opacity }}
            />
            <WithFooter />
            <WithGrid open={openGrid} />
            {isMobile && <WithDevAlert />}
        </>
    );
};

export default MainLayout;
