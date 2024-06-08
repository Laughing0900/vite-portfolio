import { LinkPreview } from "@/components/ui/link-preview";
import { cn } from "@/lib/utils";
import type { FC } from "react";

type CertificateItemsGridProps = {
    title: string;
    items: {
        label: string;
        institution: string;
        url: string;
    }[];
};

const CertificateItemsGrid: FC<CertificateItemsGridProps> = ({
    title,
    items,
}) => {
    if (items.length === 0) return null;
    return (
        <div className="py-2s grid grid-cols-4 gap-x-5 border-t-2 border-t-gray-500 text-xl">
            <h3 className="p-4">{title}</h3>
            {items.map((item, index) => {
                return (
                    <LinkPreview
                        isStatic={true}
                        imageSrc={item.url}
                        url={item.url}
                        className={cn(
                            "group relative col-span-3 col-start-2 overflow-hidden py-4",
                            index !== items.length - 1 &&
                                "border-b-2 border-b-gray-500"
                        )}
                    >
                        <span className="z-10">{item.label}</span>
                        <div className="absolute -bottom-1 right-0 -z-10 transform text-6xl font-light text-secondary opacity-0 group-hover:opacity-60">
                            {item.institution}
                        </div>
                    </LinkPreview>
                );
            })}
        </div>
    );
};

export default CertificateItemsGrid;
