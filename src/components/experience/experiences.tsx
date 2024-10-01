import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import ExperienceCard from "@/components/experience/contentCard/experienceCard";
import { useExperiences } from "@/components/experience/hooks/useExperiences";
import RoleCard from "@/components/experience/roleCard";
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
                        {/* <ExperiencesScrollBar selected={selected} /> */}
                    </div>
                )}
                <div
                    className="col-span-8 pt-4 lg:col-span-4 lg:col-start-5 lg:pt-40"
                    ref={scrollRef}
                >
                    {filedCompanies.map((company, i) => {
                        const targetScale =
                            1 - (filedCompanies.length - i) * 0.05;
                        return (
                            <div
                                className="top-40 py-4 lg:sticky"
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
                                <ExperienceCard
                                    company={company}
                                    willDisappear={
                                        i < filedCompanies.length - 1
                                    }
                                    range={[i * 0.25, 1]}
                                    targetScale={targetScale}
                                    progress={scrollYProgress}
                                    i={i}
                                />
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
