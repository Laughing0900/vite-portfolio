import { CertificateType } from "@/components/certificate/type/certificateTypes";
import { LinkPreview } from "@/components/ui/link-preview";
import { cn } from "@/lib/utils";
import type { FC } from "react";

type CertificateItemsGridProps = {
    title: string;
    items: ReadonlyArray<CertificateType>;
};

const CertificateItemsGrid: FC<CertificateItemsGridProps> = ({
    title,
    items,
}) => {
    if (items.length === 0) return null;
    return (
        <div className="mb-10 grid h-fit grid-cols-4 gap-x-5 border-t-gray-500 text-xl md:mb-0 md:border-t-2">
            <span className="col-span-4 text-gray-300 md:col-span-1 md:pt-4">
                {title}
            </span>
            {items.map((item, index) => {
                return (
                    <LinkPreview
                        imageSrc={`/cert/${item.imageId}`}
                        // url={item.href || `/cert/${item.imageId}`}
                        className={cn(
                            "group relative col-span-4 overflow-hidden py-4 md:col-span-3 md:col-start-2",
                            index !== items.length - 1 &&
                                "border-b-2 border-b-gray-500"
                        )}
                        key={item.title}
                    >
                        <span className="max-w-sm">{item.title}</span>
                        <div className="absolute -bottom-1 left-0 -z-10 transform text-nowrap text-6xl font-light text-secondary opacity-0 group-hover:opacity-40">
                            {item.institution}
                        </div>
                    </LinkPreview>
                );
            })}
        </div>
    );
};

export default CertificateItemsGrid;
