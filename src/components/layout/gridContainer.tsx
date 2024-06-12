import { FC, PropsWithChildren } from "react";

const GridContainer: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="bg-grid-white/[0.2] relative flex h-[50rem] w-full items-center justify-center bg-black">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            {children}
        </div>
    );
};

export default GridContainer;
