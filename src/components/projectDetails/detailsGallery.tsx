import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import Image from "@/components/ui/image";
import useBreakpoint from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";

const gridItems = [
    { id: 0, gridArea: "7 / 6 / 9 / 7" },
    { id: 1, gridArea: "5 / 6 / 7 / 10" },
    { id: 2, gridArea: "2 / 8 / 5 / 12" },
    { id: 3, gridArea: "7 / 7 / 10 / 11" },
    { id: 4, gridArea: "5 / 2 / 8 / 6" },
    { id: 5, gridArea: "5 / 10 / 7 / 13" },
    { id: 6, gridArea: "3 / 5 / 5 / 8" },
];
const gridItemsMobile = [
    { id: 0, gridArea: "5 / 4 / 6 / 4" }, // scroll down
    { id: 1, gridArea: "4 / 1 / 7 / 4" }, // logo
    { id: 2, gridArea: "7 / 1 / 10 / 4" },
    { id: 3, gridArea: "10 / 1 / 13 / 3" },
    { id: 4, gridArea: "1 / 3 / 4 / 5" },
    { id: 5, gridArea: "1 / 1 / 4 / 3" },
    { id: 6, gridArea: "10 / 3 / 13 / 5" },
];

const DetailsGallery = ({ images }: { images: string[] }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
    });
    const { isTablet } = useBreakpoint();

    const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

    const data = useMemo(() => {
        if (!images || images.length < 1) {
            return [];
        }
        return images.map((image, index) => ({
            id: index + 1,
            image,
        }));
    }, [images]);

    if (data.length < 1) return <></>;

    return (
        <section className="relative h-[300dvh] w-full" ref={container}>
            <div className="sticky top-0 h-screen w-full">
                <motion.div
                    className={cn(
                        "absolute inset-0 grid grid-cols-[repeat(4,1fr)] grid-rows-[repeat(12,1fr)] gap-4 px-4 will-change-transform",
                        "lg:grid-cols-[repeat(14,1fr)] lg:grid-rows-[repeat(10,1fr)]"
                    )}
                    style={{
                        scale: scale,
                    }}
                >
                    {data.length > 0 &&
                        data.map((item, index) => (
                            <div
                                key={item.id}
                                style={{
                                    gridArea: isTablet
                                        ? gridItemsMobile[index + 1].gridArea
                                        : gridItems[index + 1].gridArea,
                                }}
                            >
                                <motion.div
                                    className={cn("relative h-full w-full")}
                                >
                                    <Image
                                        src={item.image}
                                        width="100%"
                                        className="h-full w-full object-contain object-center"
                                        alt="project image"
                                        loading="lazy"
                                    />
                                </motion.div>
                            </div>
                        ))}
                    {/* Scroll Down */}
                    <div
                        className="text-md flex flex-col items-center gap-4"
                        style={{
                            gridArea: isTablet
                                ? gridItemsMobile[0].gridArea
                                : gridItems[0].gridArea,
                        }}
                    >
                        <div className="mouse">
                            <div className="roll"></div>
                            <div className="rollshadow"></div>
                        </div>
                        Scroll
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DetailsGallery;
