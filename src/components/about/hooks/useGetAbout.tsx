import { motion } from "framer-motion";
import PerformanceCard from "@/components/about/cards/performance";
import SkillSetCard from "@/components/about/cards/skillSet";

const SkeletonTwo = () => {
    const variants = {
        initial: {
            width: 0,
        },
        animate: {
            width: "100%",
            transition: {
                duration: 0.2,
            },
        },
        hover: {
            width: ["0%", "100%"],
            transition: {
                duration: 2,
            },
        },
    };
    const arr = new Array(6).fill(0);
    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2"
        >
            {arr.map((_, i) => (
                <motion.div
                    key={"skelenton-two" + i}
                    variants={variants}
                    style={{
                        maxWidth: Math.random() * (100 - 40) + 40 + "%",
                    }}
                    className="flex h-4 w-full flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-neutral-100 p-2 dark:border-white/[0.2] dark:bg-black"
                ></motion.div>
            ))}
        </motion.div>
    );
};

const items = [
    {
        title: "Performance",
        description: (
            <span className="text-sm">Get high performance coding.</span>
        ),
        header: <PerformanceCard />,
        className: "md:col-span-1",
    },
    {
        title: "Multiple skill set",
        description: (
            <span className="text-sm">
                A wide range of skills to help you with your project.
            </span>
        ),
        header: <SkillSetCard />,
        className: "md:col-span-1",
    },
    {
        title: "Contextual Suggestions",
        description: (
            <span className="text-sm">
                Get AI-powered suggestions based on your writing context.
            </span>
        ),
        header: <SkeletonTwo />,
        className: "md:col-span-1",
    },
    {
        title: "Sentiment Analysis",
        description: (
            <span className="text-sm">
                Understand the sentiment of your text with AI analysis.
            </span>
        ),
        header: <SkeletonTwo />,
        className: "md:col-span-2",
    },

    {
        title: "Text Summarization",
        description: (
            <span className="text-sm">
                Summarize your lengthy documents with AI technology.
            </span>
        ),
        header: <SkeletonTwo />,
        className: "md:col-span-1",
    },
];

export const useGetAbout = () => {
    return { items };
};
