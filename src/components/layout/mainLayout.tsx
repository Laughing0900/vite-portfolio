import WithFooter from "@/components/layout/footer";
import { BoxesBackground } from "@/components/ui/background-boxes";
import type { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => (
    <>
        <main className="relative z-10 min-h-dvh w-full max-w-full bg-background">
            <BoxesBackground />
            <div className="space-y-40">{children}</div>
        </main>
        <WithFooter />
    </>
);

export default MainLayout;
