import { useState } from "react";
import HeroBanner from "@/components/heroBanner/heroBanner";
import WithFooter from "@/components/layout/footer/footer";
import FooterOverlay from "@/components/layout/footer/footerOverlay";
import WithGrid from "@/components/layout/grid";
import WithHeader from "@/components/layout/header";
import WithNav from "@/components/layout/nav";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import type { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    const [openGrid, setOpenGrid] = useState(false);

    return (
        <>
            <WithHeader setOpenGrid={setOpenGrid} openGrid={openGrid} />
            <WithNav />

            {/* @hero banner */}
            <HeroBanner />

            <main className="relative z-30 mt-[100dvh] min-h-dvh w-full bg-background">
                <BackgroundGradientAnimation />
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
