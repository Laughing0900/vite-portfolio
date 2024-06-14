import { motion } from "framer-motion";
import { useMemo } from "react";
import CardContainer from "@/components/about/cards/cardContainer";
import Image from "@/components/ui/image";
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
    "Scss.svg",
    "Scrum.svg",
    "1typescript.svg",
    "Vercel.svg",
    "vite.svg",
];

const SkillSetCard = () => {
    const { isMobile } = useBreakpoint();

    const variants = useMemo(() => {
        if (!isMobile)
            return {
                initial: {
                    filter: "grayscale(0.8)",
                    y: 0,
                },

                animate: (i: number) => {
                    const delay = (i % 6) * 0.05;
                    return {
                        filter: "grayscale(0.2)",
                        y: i % 2 === 0 ? -20 : 20,
                        transition: {
                            y: {
                                delay,
                                type: "spring",
                                duration: 0.8,
                                bounce: 0,
                            },
                            duration: 0.3,
                        },
                    };
                },
            };

        return {
            initial: {},
            animate: {},
        };
    }, [isMobile]);

    return (
        <CardContainer>
            <div className="mb-2 h-full overflow-clip rounded-s p-2">
                <div className="grid h-full w-full -rotate-12 transform grid-cols-6 place-items-center gap-0.5">
                    {items.map((item, i) => (
                        <motion.div
                            className="flex aspect-square w-full items-center rounded-xl border border-gray-300/20 bg-gray-700/30 p-2 drop-shadow"
                            key={"skill_" + i}
                            variants={variants}
                            custom={i}
                        >
                            <Image
                                className="drop-shadow"
                                src={`images/skills/${item}`}
                                alt={item}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </CardContainer>
    );
};
export default SkillSetCard;
