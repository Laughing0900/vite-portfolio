import type { FC, PropsWithChildren } from "react";

// @deprecated
const GridBackground: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="sticky top-0 h-dvh w-full">
            <div className="relative flex h-full w-full items-center justify-center bg-black bg-grid-white/[0.2]">
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                {children}
            </div>
        </div>
    );
};

export default GridBackground;
