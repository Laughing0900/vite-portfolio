import { motion, useScroll, useTransform } from "motion/react";
import { useMemo, useRef } from "react";
import { useProjects } from "@/components/project/hooks/useProjects";
import { ProjectCard } from "@/components/project/projectCard";
import ProjectCardSkeleton from "@/components/project/skeletons/projectCardSkeleton";
import useBreakpoint from "@/hooks/useBreakpoint";

const skeletons = new Array(3).fill(0);

type Breakpoint = "sm" | "md" | "default";
const CARD_WIDTHS: Record<Breakpoint, number> = {
    sm: 600,
    md: 600,
    default: 800,
};

const Project = () => {
    const { breakpoint, isMobile } = useBreakpoint();
    const { projects, isLoading } = useProjects();

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });

    const cardWidth =
        CARD_WIDTHS[breakpoint as Breakpoint] || CARD_WIDTHS.default;
    const cardGap = isMobile ? 32 : 80;

    const containerHeight = useMemo(() => {
        if (isLoading) {
            return 3 * (cardWidth + cardGap) - cardGap;
        }

        return projects.length * (cardWidth + cardGap) - cardGap;
    }, [isLoading, projects.length, cardWidth, cardGap]);

    const endPosition = useMemo(() => {
        const viewportWidth =
            typeof window !== "undefined" ? window.innerWidth : 0;

        const fill = cardWidth / 3;
        return containerHeight - viewportWidth + fill;
    }, [cardWidth, containerHeight]);

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        ["0px", `-${endPosition}px`]
    );

    return (
        <section
            id="project"
            ref={containerRef}
            className="pointer-events-none relative"
            style={{ height: `${containerHeight}px` }}
        >
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="absolute left-0 top-20 w-full rounded-lg md:top-20">
                    <h3 className="z-10 mx-auto w-screen max-w-[1680px] px-4 text-left md:px-20">
                        Project
                    </h3>
                </div>
                <motion.div
                    className="flex gap-8 pl-4 will-change-transform md:gap-20 md:pl-40"
                    style={{ x }}
                >
                    {isLoading
                        ? skeletons.map((_, i) => (
                              <ProjectCardSkeleton key={"pj_skeleton_" + i} />
                          ))
                        : projects.map((project) => (
                              <ProjectCard
                                  key={project.name + project.company}
                                  {...project}
                              />
                          ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Project;
