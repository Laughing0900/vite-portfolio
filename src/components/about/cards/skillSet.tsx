import CardContainer from "@/components/about/cards/cardContainer";
import IconCloud from "@/components/ui/icon-cloud";

const items = [
    "nodedotjs",
    "typescript",
    "shadcnui",
    "tailwindcss",
    "amazonwebservices",
    "chainlink",
    "digitalocean",
    "ethereum",
    "openai",
    "framer",
    "mui",
    "openzeppelin",
    "alchemy",
    "react",
    "notion",
    "asana",
    "graphql",
    "vite",
    "solidity",
    "figma",
    "cloudinary",
    "vercel",
    "stripe",
    "swagger",
    "prisma",
];

const SkillSetCard = () => {
    return (
        <CardContainer>
            <div className="mb-2 h-full overflow-clip rounded-s p-2">
                <IconCloud iconSlugs={items} />
            </div>
        </CardContainer>
    );
};
export default SkillSetCard;
