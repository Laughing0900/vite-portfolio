import { ArrowUpRight } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";
import { cn } from "@/lib/utils";
import type { CertificateType } from "@/components/certificate/hooks/useGetCert";
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
        <div className="grid grid-cols-4 gap-x-5 border-t-2 border-t-gray-500 text-xl">
            <span className="p-4">{title}</span>
            {items.map((item, index) => {
                return (
                    <LinkPreview
                        imageSrc={item.url}
                        url={item.url}
                        className={cn(
                            "group relative col-span-3 col-start-2 overflow-hidden py-4",
                            index !== items.length - 1 &&
                                "border-b-2 border-b-gray-500"
                        )}
                        key={item.label}
                    >
                        <span>
                            {item.label}
                            <ArrowUpRight className="hidden group-hover:inline-block" />
                        </span>
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
