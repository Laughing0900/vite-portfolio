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
    "Material.svg",
    "Moralis.svg",
    "openzeppelin.svg",
    "react.svg",
    "Scss.svg",
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
                    const delay = (i % 4) * 0.05;
                    return {
                        filter: "grayscale(0.2)",
                        y: -80,
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
            <div className="grid h-full grid-cols-5 place-items-center gap-2 overflow-clip rounded-sm bg-gray-700/30 p-2 sm:grid-cols-6 md:grid-cols-4">
                {items.map((item, i) => (
                    <motion.div
                        className="flex aspect-square w-full items-center p-1 drop-shadow"
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
        </CardContainer>
    );
};
export default SkillSetCard;
