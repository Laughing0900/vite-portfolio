import ChartCard from "@/components/about/cards/chart";
import DirectoryCard from "@/components/about/cards/directory";
import PerformanceCard from "@/components/about/cards/performance";
import SkillSetCard from "@/components/about/cards/skillSet";
import TimeLineCard from "@/components/about/cards/timeLine";

const items = [
    {
        title: "Lightning-Fast",
        description: (
            <span className="text-sm">
                Experience blazing speed with optimized coding.
            </span>
        ),
        header: <PerformanceCard />,
        className: "lg:col-span-2 col-span-3",
    },
    {
        title: "Structure",
        description: (
            <span className="text-sm">
                Built with a clear and organized structure.
            </span>
        ),
        header: <DirectoryCard />,
        className: "lg:col-span-2 col-span-3",
    },
    {
        title: "Productivity",
        description: (
            <span className="text-sm">
                Maximize efficiency and streamline production processes.
            </span>
        ),
        header: <ChartCard />,
        className: "lg:col-span-2 col-span-3",
    },
    {
        title: "Schedule",
        description: (
            <span className="text-sm">
                Ensure timely delivery with efficient schedule management.
            </span>
        ),
        header: <TimeLineCard />,
        className: "lg:col-span-3 col-span-3",
    },
    {
        title: "Versatile",
        description: (
            <span className="text-sm">
                Harness a diverse skill set to drive your project to success.
            </span>
        ),
        header: <SkillSetCard />,
        className: "lg:col-span-3 md:col-span-6 col-span-3",
    },
];

export const useGetAbout = () => {
    return { items };
};
