const TechSkill = ({ tech }: { tech: string }) => {
    return (
        <div className="text-md rounded-full bg-gradient-to-tr from-[#A61C81] to-[#1BA1BF] px-3 py-1 font-light">
            {tech}
        </div>
    );
};

export default TechSkill;
