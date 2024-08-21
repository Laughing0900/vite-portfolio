import ExperienceDesc from "@/components/experience/contentCard/experienceDesc";
import TechSkill from "@/components/experience/contentCard/techSkill";
import { ExperiencesType } from "@/components/experience/hooks/useExperiences";

const ExperienceCard = ({ company }: { company: ExperiencesType }) => {
    return (
        <div className="min-h-[70%] rounded-lg lg:flex lg:flex-col lg:justify-between lg:border-2 lg:border-foreground lg:bg-black/55 lg:p-8 lg:backdrop-blur-md">
            {company.description && (
                <ExperienceDesc description={company.description} />
            )}

            <div className="mt-5 flex flex-wrap gap-2">
                {company.techStack.map((tech) => {
                    return <TechSkill key={company.name + tech} tech={tech} />;
                })}
            </div>
        </div>
    );
};

export default ExperienceCard;
