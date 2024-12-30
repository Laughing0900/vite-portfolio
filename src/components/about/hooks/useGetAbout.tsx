import ChartCard from "@/components/about/cards/chart";
import DirectoryCard from "@/components/about/cards/directory";
import PerformanceCard from "@/components/about/cards/performance";
import SkillCloud from "@/components/about/cards/skillCloud";
import TimeLineCard from "@/components/about/cards/timeLine";

const items = [
    {
        title: "Versatile",
        description: (
            <span className="text-sm">
                Harness a diverse skill set to drive your project to success.
            </span>
        ),
        header: <SkillCloud />,
        className: "md:col-span-8 xl:col-span-3 col-span-1 row-span-2",
    },
    {
        title: "Lightning-Fast",
        description: (
            <span className="text-sm">
                Experience blazing speed with optimized coding.
            </span>
        ),
        header: <PerformanceCard />,
        className: "md:col-span-3 xl:col-span-2 col-span-1",
    },
    {
        title: "Structure",
        description: (
            <span className="text-sm">
                Built with a clear and organized structure.
            </span>
        ),
        header: <DirectoryCard />,
        className: "md:col-span-5 xl:col-span-3 col-span-1",
    },
    {
        title: "Schedule",
        description: (
            <span className="text-sm">
                Ensure timely delivery with efficient schedule management.
            </span>
        ),
        header: <TimeLineCard />,
        className: "md:col-span-5 xl:col-span-3 col-span-1",
    },
    {
        title: "Productivity",
        description: (
            <span className="text-sm">
                Maximize efficiency and streamline production processes.
            </span>
        ),
        header: <ChartCard />,
        className: "md:col-span-3 xl:col-span-2 col-span-1",
    },
];

export const useGetAbout = () => {
    return { items };
};
