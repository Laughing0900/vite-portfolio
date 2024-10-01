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

        offset: [`start end`, `start ${160 + i * 25}px`],
    });

    const opacity = useTransform(scrollYProgress, [0.95, 1], [1, 0], {
        clamp: false,
    });

    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-full">
            <motion.div
                className="min-h-[70%] origin-top rounded-lg lg:flex lg:flex-col lg:justify-between lg:border-2 lg:border-foreground lg:bg-black/55 lg:p-8 lg:backdrop-blur-md"
                style={{
                    opacity: willDisappear && !isTablet ? opacity : 1,
                    scale: isTablet ? 1 : scale,
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
        </div>
    );
};

export default ExperienceCard;
