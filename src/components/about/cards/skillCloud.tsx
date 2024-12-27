import CardContainer from "@/components/about/cards/cardContainer";
import { IconCloud } from "@/components/ui/IconCloud";

const SKILL_ITEMS = [
    "1nextjs.svg",
    "1Solidity.svg",
    "1tailwind.svg",
    "AWS.svg",
    "Chainlink.svg",
    "DigitalOcean.svg",
    "Ethereum.svg",
    "Framer.svg",
    "Hardhat.svg",
    "ChatGPT.svg",
    "Material.svg",
    "Moralis.svg",
    "openzeppelin.svg",
    "react.svg",
    "Notion.svg",
    "Scrum.svg",
    "1typescript.svg",
    "Vercel.svg",
    "vite.svg",
    "Docker.svg",
    "reactQuery.svg",
    "Jest.svg",
    "mongoDB.svg",
    "PostgreSQL.svg",
    "Prisma.svg",
    "Nx.svg",
    "Neon.svg",
];

const SkillCloud = () => {
    const iconsPath = SKILL_ITEMS.map((item) => `images/skills/${item}`);

    return (
        <CardContainer>
            <div className="relative flex size-full items-center justify-center overflow-hidden rounded-lg px-20 pb-20 pt-8">
                <IconCloud imageArray={iconsPath} />
            </div>
        </CardContainer>
    );
};

export default SkillCloud;
