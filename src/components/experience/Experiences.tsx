import { useGetExperiences } from "@/components/experience/hooks/useGetExperiences";

const Experiences = () => {
    const { companies } = useGetExperiences();

    return (
        <div className="flex min-h-dvh flex-col justify-center px-20">
            <h3>Experience</h3>
        </div>
    );
};

export default Experiences;
