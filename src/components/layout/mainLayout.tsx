import WithFooter from "@/components/layout/footer";
import type { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => (
    <>
        <main className="relative z-10 min-h-dvh w-full max-w-full space-y-40 bg-background">
            {children}
        </main>
        <WithFooter />
    </>
);

export default MainLayout;
