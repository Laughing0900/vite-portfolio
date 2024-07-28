import { useMemo } from "react";
import CardContainer from "@/components/about/cards/cardContainer";
import Image from "@/components/ui/image";
import OrbitingCircles from "@/components/ui/orbitingCircles";

const items = [
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
    "reactQuery.svg",
    "Jest.svg",
    "mongoDB.svg",
    "PostgreSQL.svg",
    "Prisma.svg",
];

const SkillSetCard = () => {
    const renderInnerIcons = useMemo(() => {
        const icons = items.slice(0, 4);
        const delay = 5;
        return icons.map((item, i) => (
            <OrbitingCircles
                className="size-[30px] border-none bg-transparent"
                radius={80}
                duration={icons.length * delay}
                delay={delay * i}
                key={`skill_${i}`}
            >
                <Image
                    className="aspect-square w-full drop-shadow-[2px_4px_1px_rgba(255,255,255,0.5)]"
                    src={`images/skills/${item}`}
                    alt={item}
                />
            </OrbitingCircles>
        ));
    }, []);
    const renderCenterIcons = useMemo(() => {
        const icons = items.slice(4, 12);
        const delay = 4;
        return icons.map((item, i) => (
            <OrbitingCircles
                className="size-[30px] border-none bg-transparent"
                radius={140}
                duration={icons.length * delay}
                delay={delay * i}
                reverse
            >
                <Image
                    className="aspect-square w-full drop-shadow-[2px_2px_1px_rgba(255,255,255,0.25)]"
                    src={`images/skills/${item}`}
                    alt={item}
                />
            </OrbitingCircles>
        ));
    }, []);

    const renderOuterIcons = useMemo(() => {
        const icons = items.slice(12, 24);
        const delay = 5;
        return icons.map((item, i) => (
            <OrbitingCircles
                className="size-[30px] border-none bg-transparent"
                radius={200}
                duration={icons.length * delay}
                delay={delay * i}
            >
                <Image
                    className="aspect-square w-full drop-shadow-[2px_2px_1px_rgba(255,255,255,0.25)]"
                    src={`images/skills/${item}`}
                    alt={item}
                />
            </OrbitingCircles>
        ));
    }, []);

    return (
        <CardContainer>
            <div className="mb-2 h-full overflow-clip rounded-s p-2">
                <div className="relative flex h-[500px] w-full -translate-y-[10%] flex-col items-center justify-center">
                    {/* Inner Circles */}
                    {renderInnerIcons}
                    {renderCenterIcons}
                    {renderOuterIcons}
                </div>
            </div>
        </CardContainer>
    );
};
export default SkillSetCard;
