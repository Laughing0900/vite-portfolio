import Title from "@/components/home/talent/cards/Title";
import { memo } from "react";

const Schedule = memo(() => {
  return (
    <div>
      <Title
        title="Schedule"
        description="Ensure timely delivery with efficient schedule management."
      />
      <div className="-mt-5 md:-mt-10 p-5 md:px-10">
        <svg
          width="100%"
          height="44"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax meet"
          viewBox="0 0 750 44"
        >
          <rect
            x="0"
            y="0"
            width="290"
            height="16"
            rx="8"
            ry="8"
            fill="#333333"
            opacity="0.5"
          />
          <rect
            x="0"
            y="0"
            width="160"
            height="16"
            rx="8"
            ry="8"
            fill="#7ed957"
          />

          <rect
            x="500"
            y="28"
            width="250"
            height="16"
            rx="8"
            ry="8"
            fill="#555555"
            opacity="0.5"
          />

          <rect
            x="120"
            y="28"
            width="330"
            height="16"
            rx="8"
            ry="8"
            fill="#333333"
            opacity="0.5"
          />
          <rect
            x="120"
            y="28"
            width="260"
            height="16"
            rx="8"
            ry="8"
            fill="url(#greenToTeal)"
          />

          <defs>
            <linearGradient id="greenToTeal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#7ed957", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#00c2a8", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
});

export default Schedule;
