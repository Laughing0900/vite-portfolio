const TechSkill = ({ tech }: { tech: string }) => {
    return (
        <div className="w-fit rounded-full bg-gradient-to-tr from-[#e571c6de] to-[#0cd2ff99] px-3 py-1">
            {tech}
        </div>
    );
};

export default TechSkill;
