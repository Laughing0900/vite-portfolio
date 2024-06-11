import PerformanceCard from "@/components/about/cards/performance";
import SkillSetCard from "@/components/about/cards/skillSet";
import StatusCard from "@/components/about/cards/status";

const items = [
    {
        title: "Performance",
        description: (
            <span className="text-sm">Get high performance coding.</span>
        ),
        header: <PerformanceCard />,
        className: "lg:col-span-2 md:col-span-3",
    },
    {
        title: "Multiple skill set",
        description: (
            <span className="text-sm">
                A wide range of skills to help you with your project.
            </span>
        ),
        header: <SkillSetCard />,
        className: "lg:col-span-2 md:col-span-3",
    },
    {
        title: "Contextual Suggestions",
        description: (
            <span className="text-sm">
                Get AI-powered suggestions based on your writing context.
            </span>
        ),
        header: <StatusCard />,
        className: "lg:col-span-2 md:col-span-3",
    },
    {
        title: "Sentiment Analysis",
        description: (
            <span className="text-sm">
                Understand the sentiment of your text with AI analysis.
            </span>
        ),
        header: <PerformanceCard />,
        className: "lg:col-span-4 md:col-span-6",
    },
    {
        title: "Text Summarization",
        description: (
            <span className="text-sm">
                Summarize your lengthy documents with AI technology.
            </span>
        ),
        header: <PerformanceCard />,
        className: "lg:col-span-2 md:col-span-3",
    },
];

export const useGetAbout = () => {
    return { items };
};
