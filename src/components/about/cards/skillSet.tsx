import { motion } from "framer-motion";
import Image from "@/components/ui/image";

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
    const variants = {
        initial: {
            filter: "grayscale(0.9)",
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

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="grid h-full min-h-[6rem] w-full grid-cols-4 place-items-center gap-2 overflow-clip"
        >
            {items.map((item, i) => (
                <motion.div
                    className="flex aspect-square w-full items-center p-1"
                    variants={variants}
                    custom={i}
                >
                    <Image src={`images/skills/${item}`} alt={item} />
                </motion.div>
            ))}
        </motion.div>
    );
};
export default SkillSetCard;
