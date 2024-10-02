import { useState } from "react";
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

            <main className="relative z-30 min-h-dvh w-full overflow-clip bg-background">
                <BackgroundGradientAnimation />
                {children}
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
