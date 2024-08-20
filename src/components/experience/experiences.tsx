import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useExperiences } from "@/components/experience/hooks/useExperiences";
import RoleCard from "@/components/experience/roleCard";
import TechSkill from "@/components/experience/techSkill";
import useBreakpoint from "@/hooks/useBreakpoint";

const Experiences = () => {
    const { isTablet } = useBreakpoint();
    const { companies } = useExperiences();
    const { filedCompanies, otherCompanies } = useMemo(() => {
        return {
            filedCompanies: companies.filter((company) => company.description),
            otherCompanies: companies.filter((company) => !company.description),
        };
    }, [companies]);

    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
    });

    const [selected, setSelected] = useState(0);
    const cardLength = filedCompanies.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = filedCompanies.map(
            (_, index) => index / cardLength
        );
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0
        );
        setSelected(closestBreakpointIndex);
    });

    return (
        <section className="pointer-events-none min-h-dvh" id="experience">
            {/* @mobile */}
            <h3 className="sticky top-12 z-10 rounded-lg p-4 backdrop-blur-sm md:px-20 lg:hidden">
                Experience
            </h3>

            <div className="grid-template relative">
                {/* @desktop */}
                {!isTablet && (
                    <div className="sticky top-20 col-span-4 hidden h-fit self-start lg:block">
                        <h3>Experience</h3>
                        <div>
                            {companies.map((company, index) => {
                                return (
                                    <motion.div
                                        className="py-4 pr-4 transition-all ease-linear"
                                        key={company.name}
                                        style={{
                                            opacity:
                                                selected === index ? 1 : 0.25,
                                        }}
                                    >
                                        <RoleCard
                                            name={company.name}
                                            role={company.role}
                                            duration={company.duration}
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>
                        {/* @scroll bar */}
                        <div
                            className="absolute right-0 top-40 hidden w-1 flex-col gap-4 text-[88px] lg:flex"
                            style={{
                                height: `${filedCompanies.length}em`,
                            }}
                        >
                            {filedCompanies.map((_, index) => {
                                return (
                                    <motion.div
                                        key={"exp_bar_" + index}
                                        className="relative w-full rounded-full bg-gray-700/50"
                                        style={{
                                            height: `calc(100% / ${filedCompanies.length})`,
                                        }}
                                        animate={{
                                            transition: {
                                                duration: 0.15,
                                            },
                                        }}
                                    >
                                        {selected === index && (
                                            <motion.span
                                                className="absolute inset-0 block h-full w-full rounded-full lg:bg-white"
                                                layoutId="hoverBackground"
                                                initial={{
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    transition: {
                                                        duration: 0.15,
                                                    },
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    transition: {
                                                        duration: 0.15,
                                                    },
                                                }}
                                                key={"desktop_exp_bar" + index}
                                            />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}
                <div
                    className="col-span-8 pt-4 lg:col-span-4 lg:col-start-5 lg:pt-40"
                    ref={scrollRef}
                >
                    {filedCompanies.map((company) => {
                        return (
                            <div
                                className="mb-20 py-4 lg:sticky lg:top-40 lg:mb-0 lg:h-[80vh]"
                                key={company.name + "_description"}
                                id="experience-description"
                            >
                                {/* @mobile */}
                                {isTablet && (
                                    <RoleCard
                                        name={company.name}
                                        role={company.role}
                                        duration={company.duration}
                                    />
                                )}

                                {/* @default */}
                                <div className="min-h-[70%] rounded-lg lg:flex lg:flex-col lg:justify-between lg:border-2 lg:border-foreground lg:bg-black/55 lg:p-8 lg:backdrop-blur-md">
                                    {company.description && (
                                        <ul
                                            dangerouslySetInnerHTML={{
                                                __html: company.description,
                                            }}
                                        >
                                            {}
                                        </ul>
                                    )}

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {company.techStack.map((tech) => {
                                            return (
                                                <TechSkill
                                                    key={company.name + tech}
                                                    tech={tech}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {isTablet &&
                        otherCompanies.map((company) => {
                            return (
                                <div
                                    className="mb-12 py-4 lg:mb-0 lg:h-[75vh]"
                                    key={company.name + "_mobile_description"}
                                    id="experience-description"
                                >
                                    <RoleCard
                                        name={company.name}
                                        role={company.role}
                                        duration={company.duration}
                                    />
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
    );
};

export default Experiences;
