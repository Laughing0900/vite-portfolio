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
        if (projects.length === 0) {
            return 4 * (400 + 20) - 20;
        }
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
                <div className="absolute left-0 top-20 w-full rounded-lg md:top-12">
                    <h3 className="z-10 mx-auto w-[100vw] max-w-[1680px] px-4 text-left md:px-20">
                        Project
                    </h3>
                </div>
                <motion.div className="flex gap-4 pl-4 md:pl-40" style={{ x }}>
                    {projects && projects.length > 0
                        ? projects.map((project, i) => (
                              <motion.div
                                  className="relative h-fit w-[400px] rounded-lg border-2 border-foreground bg-black/5 p-10 backdrop-blur-sm sm:w-[600px] md:w-[800px]"
                                  key={"project" + i}
                              >
                                  <div className="aspect-video max-h-[50vh]">
                                      <Image
                                          src={`https://res.cloudinary.com/dicmdiiov/image/upload/f_auto,q_auto/v1/Pawn/portfolio/project/${project.imageId}`}
                                          width="100%"
                                          className="max-h-[60vh] rounded-md border-4 border-foreground object-cover"
                                          alt="project image"
                                          style={{
                                              transform: `rotate(3deg)`,
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
                                          <p className="border-b-2 border-b-transparent text-2xl font-bold group-hover:border-b-gray-50">
                                              {project.name}
                                          </p>
                                          <ArrowUpRight className="inline-block h-8 w-8 group-hover:inline-block md:hidden" />
                                      </Link>
                                      <p className="mt-2 text-lg text-gray-100/50">
                                          :- {project.company}
                                      </p>
                                  </div>
                                  <Image
                                      className="absolute bottom-3 right-3 aspect-square w-12 opacity-10 drop-shadow md:w-20"
                                      src={`images/pawn-white.svg`}
                                      alt={"my-logo"}
                                  />
                              </motion.div>
                          ))
                        : new Array(4).fill(0).map((i) => (
                              <motion.div
                                  className="relative h-fit w-[400px] rounded-lg border-2 border-foreground bg-black/5 p-10 backdrop-blur-sm sm:w-[600px] md:w-[800px]"
                                  key={"project" + i}
                              >
                                  <div className="aspect-video max-h-[50vh]">
                                      <div
                                          className="h-full max-h-[60vh] animate-pulse rounded-md border-foreground bg-slate-700 object-cover"
                                          style={{
                                              transform: `rotate(3deg)`,
                                          }}
                                      />
                                  </div>
                                  <div className="mt-10">
                                      <p className="h-[1em] w-1/2 animate-pulse rounded-full bg-slate-700 text-2xl"></p>
                                      <p className="mt-2 h-[1em] w-1/3 animate-pulse rounded-full bg-slate-700 text-lg"></p>
                                  </div>
                                  <Image
                                      className="absolute bottom-3 right-3 aspect-square w-12 opacity-10 drop-shadow md:w-20"
                                      src={`images/pawn-white.svg`}
                                      alt={"my-logo"}
                                  />
                              </motion.div>
                          ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Project;
