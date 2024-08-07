import { motion } from "framer-motion";
import { useMemo } from "react";
import CardContainer from "@/components/about/cards/cardContainer";
import Image from "@/components/ui/image";
import OrbitingCircles from "@/components/ui/orbitingCircles";
import useBreakpoint from "@/hooks/useBreakpoint";

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
    "reactQuery.svg",
    "Jest.svg",
    "mongoDB.svg",
    "PostgreSQL.svg",
    "Prisma.svg",
];

const INNER_ICONS_COUNT = 6;
const CENTER_ICONS_COUNT = 8;

const INNER_RADIUS = 80;
const CENTER_RADIUS = 140;
const OUTER_RADIUS = 200;

const SkillSetCard = () => {
    const { isMobile } = useBreakpoint();

    const variants = useMemo(
        () => ({
            initial: isMobile ? {} : { filter: "grayscale(70%)" },
            animate: isMobile ? {} : { filter: "grayscale(0%)" },
        }),
        [isMobile]
    );

    const renderIcons = useMemo(() => {
        const renderIconGroup = (
            start: number,
            end: number,
            radius: number,
            delay: number,
            reverse = false
        ) =>
            SKILL_ITEMS.slice(start, end).map((item, i) => (
                <OrbitingCircles
                    key={`skill_${item}`}
                    className="size-[30px] border-none bg-transparent"
                    radius={radius}
                    duration={(end - start) * delay}
                    delay={delay * i}
                    reverse={reverse}
                >
                    <Image
                        className="aspect-square w-full drop-shadow-[2px_2px_1px_rgba(255,255,255,0.25)]"
                        src={`images/skills/${item}`}
                        alt={item}
                    />
                </OrbitingCircles>
            ));

        return (
            <>
                {renderIconGroup(0, INNER_ICONS_COUNT, INNER_RADIUS, 5)}
                {renderIconGroup(
                    INNER_ICONS_COUNT,
                    INNER_ICONS_COUNT + CENTER_ICONS_COUNT,
                    CENTER_RADIUS,
                    4,
                    true
                )}
                {renderIconGroup(
                    INNER_ICONS_COUNT + CENTER_ICONS_COUNT,
                    SKILL_ITEMS.length,
                    OUTER_RADIUS,
                    5
                )}
            </>
        );
    }, []);

    return (
        <CardContainer>
            <div className="mb-2 h-full overflow-clip rounded-s p-2">
                <motion.div
                    className="relative flex h-[500px] w-full -translate-y-[10%] flex-col items-center justify-center"
                    variants={variants}
                    initial="initial"
                    animate="animate"
                >
                    {renderIcons}
                </motion.div>
            </div>
        </CardContainer>
    );
};

export default SkillSetCard;
