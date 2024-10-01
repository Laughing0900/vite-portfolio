const TechSkill = ({ tech }: { tech: string }) => {
    return (
        <div className="text-md rounded-full bg-gradient-to-tr from-[#e571c6] to-[#0cd2ff] px-3 py-1">
            {tech}
        </div>
    );
};

export default TechSkill;
