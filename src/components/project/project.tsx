import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { useProjects } from "@/components/project/hooks/useProjects";
import { ProjectCard } from "@/components/project/projectCard";
import ProjectCardSkeleton from "@/components/project/skeletons/projectCardSkeleton";
import useBreakpoint from "@/hooks/useBreakpoint";

const Project = () => {
    const { breakpoint } = useBreakpoint();
    const { projects, isLoading } = useProjects();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-85%"]);
    const containerHeight = useMemo(() => {
        let cardWidth = 800;

        if (breakpoint === "sm") {
            cardWidth = 400;
        }

        if (breakpoint === "md") {
            cardWidth = 600;
        }

        if (isLoading) {
            return 3 * (cardWidth + 80) - 40;
        }

        return projects.length * (cardWidth + 80) - 40;
    }, [breakpoint, projects, isLoading]);

    return (
        <section
            id="project"
            ref={containerRef}
            className="pointer-events-none relative"
            style={{ height: `${containerHeight}px` }}
        >
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="absolute left-0 top-20 w-full rounded-lg md:top-20">
                    <h3 className="z-10 mx-auto w-[100vw] max-w-[1680px] px-4 text-left md:px-20">
                        Project
                    </h3>
                </div>
                <motion.div className="flex gap-20 pl-4 md:pl-40" style={{ x }}>
                    {isLoading
                        ? new Array(3)
                              .fill(0)
                              .map((i) => (
                                  <ProjectCardSkeleton
                                      name={"pj_skeleton_" + i}
                                  />
                              ))
                        : projects.map((project) => (
                              <ProjectCard {...project} />
                          ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Project;
