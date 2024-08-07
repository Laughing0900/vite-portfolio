import { useState } from "react";
import HeroBanner from "@/components/heroBanner/heroBanner";
import WithFooter from "@/components/layout/footer/footer";
import FooterOverlay from "@/components/layout/footer/footerOverlay";
import WithGrid from "@/components/layout/grid";
import WithHeader from "@/components/layout/header";
import WithNav from "@/components/layout/nav";
import { BoxesBackground } from "@/components/ui/background-boxes";
import GridBackground from "@/components/ui/background-grids";
import useBreakpoint from "@/hooks/useBreakpoint";
import useDevice from "@/hooks/useDevice";
import type { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    const { isMobile: md } = useBreakpoint();
    const { isDesktop } = useDevice();
    const isMobile = !isDesktop || md;

    const [openGrid, setOpenGrid] = useState(false);

    return (
        <>
            <WithHeader setOpenGrid={setOpenGrid} openGrid={openGrid} />
            <WithNav />

            {/* @hero banner */}
            <HeroBanner />

            <main className="relative z-30 mt-[100dvh] min-h-dvh w-full bg-background">
                {isMobile ? <GridBackground /> : <BoxesBackground />}
                <div className="-mt-[100dvh] space-y-40 pt-40">{children}</div>
            </main>

            {/* @footer overlay*/}
            <FooterOverlay>
                <WithFooter />
            </FooterOverlay>

            <WithGrid open={openGrid} />
        </>
    );
};

export default MainLayout;
