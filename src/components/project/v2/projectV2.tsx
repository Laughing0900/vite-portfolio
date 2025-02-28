// @Credit -> https://www.cult-ui.com/docs/components/loading-carousel
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useProjects } from "@/components/project/hooks/useProjects";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image, { cloudinaryLoader } from "@/components/ui/image";
import { TextScramble } from "@/components/ui/text-scramble";
import { cn } from "@/lib/utils";
import type { CarouselApi } from "@/components/ui/carousel";

const ProjectV2 = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const { projects, isLoading } = useProjects();

    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap());

        const onSelect = () => {
            const newIndex = api.selectedScrollSnap();
            setCurrent(newIndex);
        };

        api.on("select", onSelect);

        return () => {
            api.off("select", onSelect);
        };
    }, [api, current]);

    const handleSelect = useCallback(
        (index: number) => {
            api?.scrollTo(index);
        },
        [api]
    );

    return (
        <section
            id="project"
            className="m-auto min-h-[80vh] max-w-[1680px] px-4 pb-40 pt-20 md:px-20"
        >
            <h3>Project</h3>
            <motion.div
                className={cn(
                    "mx-auto w-full rounded-lg border-2 border-gray-500 bg-black/10 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)] backdrop-blur-xl"
                )}
            >
                <div className="w-full overflow-hidden rounded-lg">
                    <Carousel
                        setApi={setApi}
                        className="relative w-full"
                        opts={{ loop: true }}
                    >
                        <CarouselContent>
                            {isLoading ? (
                                <CarouselItem>
                                    <div
                                        className={`relative aspect-video w-full animate-pulse bg-gray-600/70`}
                                    />
                                </CarouselItem>
                            ) : (
                                projects.map((project, index) => (
                                    <CarouselItem key={index}>
                                        <Link
                                            href={`projects/${project.id}`}
                                            className="group flex h-full w-full items-center overflow-clip"
                                        >
                                            <div className="absolute inset-0 z-10 grid place-items-center bg-black/30 opacity-0 backdrop-blur-sm transition-none group-hover:opacity-90">
                                                <div className="inset-0 font-cyborg text-xl text-white">
                                                    Visit me ?
                                                </div>
                                            </div>
                                            <div
                                                className={`relative aspect-video w-full overflow-hidden`}
                                            >
                                                <Image
                                                    src={`/project/${project.imageId}`}
                                                    alt={`Visual representation for project: ${project.name}`}
                                                    loader={cloudinaryLoader}
                                                    fill
                                                    className="object-cover"
                                                    priority
                                                />
                                            </div>
                                        </Link>
                                    </CarouselItem>
                                ))
                            )}
                        </CarouselContent>
                    </Carousel>
                    <div className={cn("p-4", "lg:px-8 lg:py-6")}>
                        <div
                            className={cn(
                                "flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0",
                                "items-start gap-3 space-y-2 sm:flex-col"
                            )}
                        >
                            <div className="flex w-full space-x-2 overflow-x-auto pb-2 sm:w-auto sm:pb-0">
                                {(isLoading ? [0, 1, 2, 3] : projects).map(
                                    (_, index) => (
                                        <motion.button
                                            key={index}
                                            className={`h-2 w-10 flex-shrink-0 rounded-full ${
                                                index === current
                                                    ? "bg-muted"
                                                    : "bg-primary"
                                            }`}
                                            initial={false}
                                            animate={{
                                                backgroundColor:
                                                    index === current
                                                        ? "#dededeee"
                                                        : "#E6E6E466",
                                            }}
                                            transition={{ duration: 0.5 }}
                                            onClick={() => handleSelect(index)}
                                            aria-label={`Go to tip ${index + 1}`}
                                        />
                                    )
                                )}
                            </div>
                            <div className="flex items-center space-x-2 whitespace-nowrap text-gray-100/50">
                                <div className="flex flex-col">
                                    <Link
                                        href={`/projects/${projects[current]?.id}`}
                                        className="text-lg font-medium tracking-wide lg:text-2xl xl:font-semibold"
                                    >
                                        <TextScramble
                                            key={projects[current]?.name}
                                            duration={1.2}
                                            characterSet=". "
                                        >
                                            {projects[current]?.name ||
                                                "Loading..."}
                                        </TextScramble>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default ProjectV2;
