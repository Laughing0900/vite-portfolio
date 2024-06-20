import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
    useTransform,
} from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useExperiences } from "@/components/experience/hooks/useExperiences";
import useBreakpoint from "@/hooks/useBreakpoint";

const Experiences = () => {
    const { breakpoint, isMobile } = useBreakpoint();
    const { companies } = useExperiences();
    const filedCompanies = useMemo(() => {
        return companies.filter((company) => company.description);
    }, [companies]);
    const otherCompanies = useMemo(() => {
        return companies.filter((company) => !company.description);
    }, [companies]);

    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
    });

    const opacity = useTransform(
        scrollYProgress,
        [0, 1 / (filedCompanies.length - 1)],
        [0, 1],
        { clamp: false }
    );

    const [selected, setSelected] = useState(0);
    useMotionValueEvent(opacity, "change", (latest) => {
        setSelected(+latest.toFixed(0));
    });

    return (
        <section className="pointer-events-none min-h-dvh" id="experience">
            {/* @mobile */}
            <h3 className="sticky top-12 z-10 rounded-lg p-4 backdrop-blur-sm md:hidden">
                Experience
            </h3>

            <div className="grid-template relative">
                {/* @desktop */}
                {!isMobile && (
                    <div className="sticky top-20 col-span-4 hidden h-fit self-start md:block">
                        <h3>Experience</h3>
                        <div>
                            {companies.map((company, index) => {
                                return (
                                    <motion.div
                                        className="py-4 transition-all ease-linear"
                                        key={company.name}
                                        style={{
                                            opacity:
                                                selected === index ? 1 : 0.25,
                                        }}
                                    >
                                        <p>
                                            <span className="text-xl font-bold">
                                                {company.role}{" "}
                                            </span>
                                            {breakpoint === "lg" && (
                                                <br className="hidden md:block" />
                                            )}
                                            <span className="text-lg text-gray-300/50">
                                                //{company.duration}
                                            </span>
                                        </p>

                                        <p className="text-lg font-light">
                                            {company.name}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                        {/* @scroll bar */}
                        <div className="absolute right-0 top-1/2 hidden h-1/2 w-1 -translate-y-1/2 transform flex-col gap-4 md:flex">
                            {filedCompanies.map((_, index) => {
                                return (
                                    <motion.div
                                        key={"exp_bar_" + index}
                                        className="relative w-full rounded-full bg-gray-700/50"
                                        style={{
                                            height: `calc(${selected === index ? 70 : 50}% /
                                            ${filedCompanies.length})`,
                                        }}
                                        animate={{
                                            transition: {
                                                duration: 0.15,
                                            },
                                        }}
                                    >
                                        <AnimatePresence>
                                            {selected === index && (
                                                <motion.span
                                                    className="absolute inset-0 block h-full w-full rounded-full md:bg-white"
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
                                                            delay: 0.2,
                                                        },
                                                    }}
                                                    key={
                                                        "desktop_exp_bar" +
                                                        index
                                                    }
                                                />
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}
                <div
                    className="col-span-4 pt-4 md:col-start-5 md:pt-40"
                    ref={scrollRef}
                >
                    {filedCompanies.map((company) => {
                        return (
                            <div
                                className="mb-20 py-4 md:mb-0 md:h-[75vh]"
                                key={company.name + "_description"}
                                id="experience-description"
                            >
                                <div
                                    className="mb-4 border-b-2 border-b-gray-500 py-2 md:hidden"
                                    key={company.name}
                                >
                                    <p>
                                        <span className="text-2xl font-bold">
                                            {company.role}{" "}
                                        </span>
                                    </p>
                                    <p className="flex w-full justify-between">
                                        <span className="text-lg font-light">
                                            {company.name}
                                        </span>
                                        <span className="text-md text-gray-300/50">
                                            //{company.duration}
                                        </span>
                                    </p>
                                </div>
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
                                            <div
                                                key={company.name + tech}
                                                className="text-md rounded-full bg-gradient-to-tr from-[#21d4fd]/60 to-[#b721ff]/60 px-3 py-1 font-light"
                                            >
                                                {tech}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                    {isMobile &&
                        otherCompanies.map((company) => {
                            return (
                                <div
                                    className="mb-12 py-4 md:mb-0 md:h-[75vh]"
                                    key={company.name + "_mobile_description"}
                                    id="experience-description"
                                >
                                    <div
                                        className="mb-4 border-b-2 border-b-gray-500 py-2"
                                        key={company.name}
                                    >
                                        <p>
                                            <span className="text-2xl font-bold">
                                                {company.role}{" "}
                                            </span>
                                        </p>
                                        <p className="flex w-full justify-between">
                                            <span className="text-lg font-light">
                                                {company.name}
                                            </span>
                                            <span className="text-sm text-gray-300/50">
                                                //{company.duration}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                    {/* <div className="hidden h-[25dvh] md:block" /> */}
                </div>
            </div>
        </section>
    );
};

export default Experiences;
