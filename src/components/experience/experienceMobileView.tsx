import { useMemo } from "react";
import ExperienceMobileCard from "@/components/experience/contentCard/experienceMobileCard";
import { useExperiences } from "@/components/experience/hooks/useExperiences";
import RoleCard from "@/components/experience/roleCard";

const ExperienceMobileView = () => {
    const { companies } = useExperiences();
    const { filedCompanies, otherCompanies } = useMemo(() => {
        return {
            filedCompanies: companies.filter((company) => company.description),
            otherCompanies: companies.filter((company) => !company.description),
        };
    }, [companies]);

    return (
        <section className="pointer-events-none min-h-dvh" id="experience">
            <h3 className="sticky top-12 z-10 rounded-lg p-4 backdrop-blur-sm md:px-20">
                Experience
            </h3>

            <div className="grid-template relative">
                <div className="col-span-8 space-y-8 pt-4">
                    {filedCompanies.map((company) => {
                        return (
                            <div
                                className="top-40 py-4 lg:sticky"
                                key={company.name + "_description"}
                                id="experience-description"
                            >
                                <RoleCard
                                    name={company.name}
                                    role={company.role}
                                    duration={company.duration}
                                />

                                <ExperienceMobileCard company={company} />
                            </div>
                        );
                    })}
                    {otherCompanies.map((company) => {
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

export default ExperienceMobileView;
