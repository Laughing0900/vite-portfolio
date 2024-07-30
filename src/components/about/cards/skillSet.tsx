import { motion } from "framer-motion";
import { useMemo } from "react";
import CardContainer from "@/components/about/cards/cardContainer";
import Image from "@/components/ui/image";
import OrbitingCircles from "@/components/ui/orbitingCircles";
import useBreakpoint from "@/hooks/useBreakpoint";

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
    "jest.svg",
    "mongodb.svg",
    "postgresql.svg",
    "prisma.svg",
];

const SkillSetCard = () => {
    const { isMobile } = useBreakpoint();
    const variants = useMemo(() => {
        if (!isMobile)
            return {
                initial: {
                    filter: "grayscale(70%)",
                },

                animate: {
                    filter: "grayscale(0%)",
                },
            };
        const cleanAnim = {
            initial: {},
            animate: {},
        };

        return {
            ...cleanAnim,
        };
    }, [isMobile]);

    const renderInnerIcons = useMemo(() => {
        return items.slice(0, 6).map((item, i) => (
            <OrbitingCircles
                className="size-[30px] border-none bg-transparent"
                duration={60}
                delay={10 * i}
                radius={80}
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
    const renderOuterIcons = useMemo(() => {
        return items.slice(6, 24).map((item, i) => (
            <OrbitingCircles
                className="size-[30px] border-none bg-transparent"
                radius={160}
                duration={380}
                delay={20 * i}
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

    return (
        <CardContainer>
            <div className="mb-2 h-full overflow-clip rounded-s p-2">
                <motion.div
                    className="relative flex h-[500px] w-full -translate-y-[10%] flex-col items-center justify-center"
                    variants={variants}
                >
                    {/* Inner Circles */}
                    {renderInnerIcons}
                    {renderOuterIcons}
                </motion.div>
            </div>
        </CardContainer>
    );
};
export default SkillSetCard;
