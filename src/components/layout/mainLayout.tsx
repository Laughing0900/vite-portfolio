import WithFooter from "@/components/layout/footer";
import type { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => (
    <>
        <main className="relative z-20 min-h-dvh w-full max-w-full bg-background">
            {children}
        </main>
        <WithFooter />
    </>
);

export default MainLayout;
