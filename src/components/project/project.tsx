import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { useGetProject } from "@/components/project/hooks/useGetProject";
import Image from "@/components/ui/image";
import useBreakpoint from "@/hooks/useBreakpoint";

const Project = () => {
    const breakpoint = useBreakpoint();
    const { projects } = useGetProject();
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
            className="relative"
            style={{ height: `${containerHeight}px` }}
        >
            <h3 className="sticky top-20 h-screen rounded-lg pl-4 md:top-12 md:pl-20">
                Project
            </h3>
            <div className="pointer-events-none sticky top-0 -mt-[110vh] flex h-screen items-center overflow-hidden">
                <motion.div className="flex gap-4 pl-4 md:pl-40" style={{ x }}>
                    {projects.map((project, i) => (
                        <motion.div
                            className="h-fit w-[400px] rounded-lg border-2 border-foreground p-10 sm:w-[600px] md:w-[800px]"
                            key={"project" + i}
                            style={{
                                rotateZ: i % 2 === 0 ? "-5deg" : "5deg",
                            }}
                        >
                            <Image
                                src={project.url}
                                width="100%"
                                className="aspect-video rounded-md border-4 border-foreground object-cover"
                                alt="project image"
                            />

                            <div className="pointer-events-auto">
                                <p className="mt-4 font-goldman text-2xl font-bold">
                                    {project.name}
                                </p>
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
