import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import ExperienceCard from "@/components/experience/contentCard/experienceCard";
import { useExperiences } from "@/components/experience/hooks/useExperiences";
import RoleCard from "@/components/experience/roleCard";

const ExperienceDesktopView = () => {
    const { companies } = useExperiences();

    const { filedCompanies } = useMemo(() => {
        return {
            filedCompanies: companies.filter((company) => company.description),
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
            <div className="grid-template relative">
                {/* @desktop */}
                <div className="sticky top-20 col-span-4 h-fit self-start">
                    <h3>Experience</h3>
                    <div>
                        {companies.map((company, index) => {
                            return (
                                <motion.div
                                    className="py-4 pr-4 transition-all ease-linear"
                                    key={company.name}
                                    style={{
                                        opacity: selected === index ? 1 : 0.25,
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
                </div>
                <div
                    className="col-span-4 col-start-5 pt-4 pt-40"
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
                </div>
            </div>
        </section>
    );
};

export default ExperienceDesktopView;
