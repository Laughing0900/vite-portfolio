import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ExperienceDesc from "@/components/experience/contentCard/experienceDesc";
import TechSkill from "@/components/experience/contentCard/techSkill";
import { ExperiencesType } from "@/components/experience/hooks/useExperiences";
import useBreakpoint from "@/hooks/useBreakpoint";

const ExperienceCard = ({
    company,
    progress,
    range,
    targetScale,
    willDisappear,
    i,
}: {
    company: ExperiencesType;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
    willDisappear: boolean;
    i: number;
}) => {
    const { isTablet } = useBreakpoint();

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: [`start end`, `start ${i * 40}px`],
    });

    const opacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0], {
        clamp: false,
    });

    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <motion.div
            className="relative h-fit min-h-[40vh] origin-top rounded-lg border-2 border-foreground bg-black/30 p-8 backdrop-blur-md"
            style={{
                scale: isTablet ? 1 : scale,
                top: isTablet ? 0 : `calc(${i * 40}px)`,
            }}
            ref={container}
        >
            <motion.div
                className="flex flex-col justify-between"
                style={{
                    opacity: willDisappear && !isTablet ? opacity : 1,
                }}
            >
                {company.description && (
                    <ExperienceDesc description={company.description} />
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                    {company.techStack.map((tech) => {
                        return (
                            <TechSkill key={company.name + tech} tech={tech} />
                        );
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ExperienceCard;
