import { useGetExperiences } from "@/components/experience/hooks/useGetExperiences";

const Experiences = () => {
    const { companies } = useGetExperiences();

    return (
        <section
            className="flex min-h-dvh flex-col justify-center px-20"
            id="experience"
        >
            <h3>Experience</h3>
        </section>
    );
};

export default Experiences;
