import { cn } from "@/lib/utils";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div className="grid-template pointer-events-none">
            <div
                className={cn(
                    "z-10 col-span-6 grid auto-rows-[24rem] grid-cols-1 gap-5 md:col-start-2 md:auto-rows-[18rem] md:grid-cols-6",
                    className
                )}
            >
                {children}
            </div>
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "group/bento pointer-events-auto relative row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-gray-400/50 bg-black/40 p-4 shadow-none transition duration-200 hover:shadow-xl",
                className
            )}
        >
            {header}
            <div className="transition duration-200 group-hover/bento:translate-x-2">
                <div className="mb-2 mt-2 font-sans font-bold text-foreground">
                    {title}
                </div>
                <div className="font-sans text-xs font-normal text-foreground">
                    {description}
                </div>
            </div>
        </div>
    );
};
