import ExperienceDesc from "@/components/experience/contentCard/experienceDesc";
import TechSkill from "@/components/experience/contentCard/techSkill";
import { ExperiencesType } from "@/components/experience/hooks/useExperiences";

const ExperienceMobileCard = ({ company }: { company: ExperiencesType }) => {
    return (
        <div className="relative h-fit">
            <div className="flex flex-col justify-between">
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
            </div>
        </div>
    );
};

export default ExperienceMobileCard;
