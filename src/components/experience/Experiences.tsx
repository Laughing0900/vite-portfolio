import {
    motion,
    useMotionValueEvent,
    useScroll,
    useTransform,
} from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useGetExperiences } from "@/components/experience/hooks/useGetExperiences";

const Experiences = () => {
    const { companies } = useGetExperiences();
    const filedCompanies = useMemo(() => {
        return companies.filter((company) => company.description);
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
        <section
            className="pointer-events-none min-h-dvh"
            style={{
                height: `${filedCompanies.length * 75}vh`,
            }}
            id="experience"
        >
            <div className="grid-template relative">
                <div className="sticky top-20 col-span-4 h-dvh self-start">
                    <h3>Experience</h3>
                    <div>
                        {companies.map((company, index) => {
                            return (
                                <motion.div
                                    className="py-4 transition-all ease-linear"
                                    key={company.name}
                                    style={{
                                        opacity: selected === index ? 1 : 0.25,
                                    }}
                                >
                                    <p>
                                        <span className="text-xl font-bold">
                                            {company.role}{" "}
                                        </span>
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

                    <div className="absolute right-0 top-1/3 flex h-1/2 w-2 -translate-y-1/2 transform flex-col gap-4">
                        {filedCompanies.map((_, index) => {
                            return (
                                <motion.div
                                    key={"exp_bar_" + index}
                                    className="w-full bg-white transition-all ease-linear"
                                    style={{
                                        height: `calc(${selected === index ? 70 : 50}% /
                                            ${filedCompanies.length})`,
                                        opacity: selected === index ? 1 : 0.25,
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="col-span-4 col-start-5 pt-40" ref={scrollRef}>
                    {filedCompanies.map((company) => {
                        return (
                            <div
                                className="h-[75vh] py-4"
                                key={company.name + "_description"}
                                id="experience-description"
                            >
                                <ul>{company.description} </ul>

                                <div>
                                    {company.techStack.map((tech) => {
                                        return (
                                            <div key={company.name + tech}>
                                                <span className="text-lg font-light">
                                                    {tech}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}

                    <div className="hidden h-32 md:block" />
                </div>
            </div>
        </section>
    );
};

export default Experiences;
