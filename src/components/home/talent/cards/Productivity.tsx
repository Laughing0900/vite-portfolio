import Title from "@/components/home/talent/cards/Title";
import { memo } from "react";
const Productivity = memo(() => {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="20 20 540 740">
        <path
          d="M15,560 C38,600 75,640 113,560 C150,480 188,400 225,370 C263,340 300,390 338,400 C375,410 413,380 450,500 C488,620 525,560 563,360"
          fill="none"
          stroke="#EEEEEE44"
          stroke-width="3"
          stroke-dasharray="10,5"
        />

        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="40%" stop-color="#8A85D2" />
            <stop offset="100%" stop-color="#21CEBA" />
          </linearGradient>
        </defs>

        <path
          d="M15,700 C53,520 90,380 128,390 C165,400 195,520 225,480 C263,440 300,300 338,240 C375,200 413,240 450,260 C488,280 525,240 563,160"
          fill="none"
          stroke="url(#lineGradient)"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <Title
        title="Productivity"
        description="Maximize efficiency and streamline production processes."
      />
    </div>
  );
});

export default Productivity;
