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
        <div className="py-2s grid grid-cols-4 gap-2 border-t-2 border-t-gray-500 text-xl">
            <h3 className="p-4">{title}</h3>
            {items.map((item, index) => {
                return (
                    <div
                        className={cn(
                            "group relative col-span-3 col-start-2 py-4",
                            index !== items.length - 1 &&
                                "border-b-2 border-b-gray-500"
                        )}
                    >
                        <LinkPreview
                            isStatic={true}
                            imageSrc={item.url}
                            url={item.url}
                        >
                            <span className="z-10">{item.label}</span>
                        </LinkPreview>
                        <div className="absolute bottom-2 right-0 -z-10 transform text-3xl font-black text-gray-500 opacity-0 group-hover:opacity-100">
                            {item.institution}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CertificateItemsGrid;
