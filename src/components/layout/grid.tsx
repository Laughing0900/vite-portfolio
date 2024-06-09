import { FC } from "react";

type WithGridProps = {
    open: boolean;
};

const WithGrid: FC<WithGridProps> = ({ open }) => {
    return (
        <div className="pointer-events-none fixed bottom-auto left-0 right-0 top-0 z-50">
            <div className="grid-template">
                {open &&
                    new Array(8)
                        .fill(0)
                        .map((_, i) => (
                            <div
                                className="col-span-1 h-dvh bg-gray-500/20"
                                key={"grid_" + i}
                            />
                        ))}
            </div>
        </div>
    );
};

export default WithGrid;
