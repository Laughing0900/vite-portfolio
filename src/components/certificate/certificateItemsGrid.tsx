import { ArrowUpRight } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";
import { cn } from "@/lib/utils";
import type { CertificateType } from "@/components/certificate/hooks/useCertificates";
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
        <div className="col-span-full mb-10 grid grid-cols-4 gap-x-5 border-t-gray-500 text-xl md:mb-0 md:border-t-2">
            <span className="col-span-4 text-gray-300 md:col-span-1 md:pt-4">
                {title}
            </span>
            {items.map((item, index) => {
                return (
                    <LinkPreview
                        imageSrc={`https://res.cloudinary.com/dicmdiiov/image/upload/f_auto,q_auto/v1/Pawn/portfolio/cert/${item.imageId}`}
                        url={
                            item.href ||
                            `https://res.cloudinary.com/dicmdiiov/image/upload/f_auto,q_auto/v1/Pawn/portfolio/cert/${item.imageId}`
                        }
                        className={cn(
                            "group relative col-span-4 overflow-hidden py-4 md:col-span-3 md:col-start-2",
                            index !== items.length - 1 &&
                                "border-b-2 border-b-gray-500"
                        )}
                        key={item.title}
                    >
                        <span className="max-w-sm">
                            {item.title}
                            <ArrowUpRight className="inline-block group-hover:inline-block md:hidden" />
                        </span>
                        <div className="absolute -bottom-1 right-0 -z-10 transform text-6xl font-light text-secondary opacity-0 group-hover:opacity-40">
                            {item.institution}
                        </div>
                    </LinkPreview>
                );
            })}
        </div>
    );
};

export default CertificateItemsGrid;
