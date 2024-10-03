import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import Image from "@/components/ui/image";
import { cn } from "@/lib/utils";

const gridItems = [
    { id: 1, gridArea: "5 / 6 / 7 / 10" },
    { id: 2, gridArea: "2 / 8 / 5 / 12" },
    { id: 3, gridArea: "7 / 7 / 10 / 11" },
    { id: 4, gridArea: "5 / 2 / 8 / 6" },
    { id: 5, gridArea: "5 / 10 / 7 / 13" },
    { id: 5, gridArea: "3 / 5 / 5 / 8 " },
];

const DetailsGallery = ({ images }: { images: string[] }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

    const data = useMemo(() => {
        if (!images || images.length < 1) {
            return [];
        }
        return images.map((image, index) => ({
            id: index + 1,
            gridArea: gridItems[index].gridArea,
            image,
        }));
    }, [images]);

    return (
        <section className="relative h-[300dvh] w-full" ref={container}>
            <div className="sticky top-0 h-screen w-full">
                <motion.div
                    className={cn(
                        "absolute inset-0 grid grid-cols-[repeat(14,1fr)] grid-rows-[repeat(10,1fr)] gap-4"
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
                                    gridArea: gridItems[index].gridArea,
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
                            gridArea: " 7 / 6 / 9 / 7 ",
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
