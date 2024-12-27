"use client";

import WithFooter from "@/components/layout/footer/footer";
import FooterOverlay from "@/components/layout/footer/footerOverlay";
import WithNav from "@/components/layout/nav";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import type { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <WithNav />

            <main className="relative z-30 min-h-dvh w-full overflow-clip bg-background">
                <BackgroundGradientAnimation />
                {children}
            </main>

            {/* @footer overlay*/}
            <FooterOverlay>
                <WithFooter />
            </FooterOverlay>
        </>
    );
};

export default MainLayout;
