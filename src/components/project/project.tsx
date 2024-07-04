import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useRef } from "react";
import { useProjects } from "@/components/project/hooks/useProjects";
import Image from "@/components/ui/image";
import Link from "@/components/ui/link";
import useBreakpoint from "@/hooks/useBreakpoint";

const Project = () => {
    const { breakpoint } = useBreakpoint();

    const { projects } = useProjects();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-85%"]);
    const containerHeight = useMemo(() => {
        if (breakpoint === "sm") {
            return projects.length * (400 + 20) - 20;
        }

        if (breakpoint === "md") {
            return projects.length * (600 + 30) - 30;
        }
        return projects.length * (800 + 40) - 40;
    }, [breakpoint, projects]);

    return (
        <section
            id="project"
            ref={containerRef}
            className="pointer-events-none relative"
            style={{ height: `${containerHeight}px` }}
        >
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <h3 className="absolute left-0 top-20 rounded-lg pl-4 md:top-12 md:pl-20">
                    Project
                </h3>
                <motion.div className="flex gap-4 pl-4 md:pl-40" style={{ x }}>
                    {projects.map((project, i) => (
                        <motion.div
                            className="h-fit w-[400px] rounded-lg border-2 border-foreground p-10 sm:w-[600px] md:w-[800px]"
                            key={"project" + i}
                        >
                            <div className="aspect-video max-h-[60vh]">
                                <Image
                                    src={`https://res.cloudinary.com/dicmdiiov/image/upload/f_auto,q_auto/v1/Pawn/portfolio/project/${project.imageId}`}
                                    width="100%"
                                    className="max-h-[60vh] rounded-md border-4 border-foreground object-cover"
                                    alt="project image"
                                    style={{
                                        transform: `rotate(7deg)`,
                                    }}
                                />
                            </div>
                            <div className="pointer-events-auto mt-10">
                                <Link
                                    href={project.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group mt-4 flex w-full items-center justify-between"
                                >
                                    <p className="border-b-2 border-b-transparent font-goldman text-2xl font-bold group-hover:border-b-gray-50">
                                        {project.name}
                                    </p>
                                    <ArrowUpRight className="inline-block h-8 w-8 group-hover:inline-block md:hidden" />
                                </Link>
                                <p className="mt-2 text-lg text-gray-100/50">
                                    :- {project.company}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Project;
