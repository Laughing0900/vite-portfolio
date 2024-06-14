import PerformanceCard from "@/components/about/cards/performance";
import SkillSetCard from "@/components/about/cards/skillSet";
import StatusCard from "@/components/about/cards/status";
import TimeLineCard from "@/components/about/cards/timeLine";

const items = [
    {
        title: "Versatile",
        description: (
            <span className="text-sm">
                Leverage a wide array of skills to propel your project forward.
            </span>
        ),
        header: <SkillSetCard />,
        className: "lg:col-span-3 md:col-span-3",
    },
    {
        title: "Lightning-Fast",
        description: (
            <span className="text-sm">
                Optimized coding for superior performance.
            </span>
        ),
        header: <PerformanceCard />,
        className: "lg:col-span-2 md:col-span-3",
    },
    {
        title: "Stability",
        description: (
            <span className="text-sm">
                Ensuring systems robust stability for unparalleled reliability.
            </span>
        ),
        header: <StatusCard />,
        className: "lg:col-span-2 md:col-span-3",
    },
    {
        title: "Schedule",
        description: (
            <span className="text-sm">Ensuring systems delivery on time.</span>
        ),
        header: <TimeLineCard />,
        className: "lg:col-span-3 md:col-span-3",
    },
];

export const useGetAbout = () => {
    return { items };
};
