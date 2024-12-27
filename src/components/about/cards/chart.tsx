"use client";

import { Area, AreaChart } from "recharts";
import CardContainer from "@/components/about/cards/cardContainer";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
    { month: "January", performance: 15 },
    { month: "February", performance: 25 },
    { month: "March", performance: 56 },
    { month: "April", performance: 79 },
    { month: "May", performance: 100 },
    { month: "June", performance: 120 },
];
const chartConfig = {
    performance: {
        label: "Performance",
        color: "#00ab66",
    },
} satisfies ChartConfig;

const ChartCard = () => {
    return (
        <CardContainer>
            <div className="size-full">
                <ChartContainer config={chartConfig}>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient
                                id="fillDesktop"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#00ab66"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#00ab66"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>

                        <Area
                            dataKey="performance"
                            type="natural"
                            fill="url(#fillDesktop)"
                            fillOpacity={0.4}
                            stroke="#00ab66"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </div>
        </CardContainer>
    );
};
export default ChartCard;
