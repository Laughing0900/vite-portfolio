import Gravity, { MatterBody } from "@/components/ui/fancy/physics/gravity";
import Title from "@/components/home/talent/cards/Title";
import { cn } from "@/lib/utils";
import { memo } from "react";

const Pills = ({
  item,
  color,
  backgroundColor,
  x,
  y,
}: {
  item: string;
  color: string;
  backgroundColor: string;
  x: string;
  y: string;
}) => {
  return (
    <MatterBody
      matterBodyOptions={{
        friction: 0.5,
        restitution: 0.2,
      }}
      x={x}
      y={y}
    >
      <div
        className={cn(
          "rounded-full px-6 py-2 text-lg hover:cursor-grab",
          backgroundColor,
          color,
        )}
      >
        {item}
      </div>
    </MatterBody>
  );
};

const Skills = memo(() => {
  return (
    <div className="relative flex h-full w-full flex-col overflow-clip">
      <div className="relative h-full w-full">
        <Gravity>
          <Pills
            item="React"
            color="text-black"
            backgroundColor="bg-[#61dafb]"
            x="30%"
            y="10%"
          />
          <Pills
            item="TypeScript"
            color="text-white"
            backgroundColor="bg-[#3178C6]"
            x="30%"
            y="30%"
          />
          <Pills
            item="GoLang"
            color="text-black"
            backgroundColor="bg-[#00ADD9]"
            x="40%"
            y="20%"
          />
          <Pills
            item="Solidity"
            color="text-white"
            backgroundColor="bg-[#2C2C2C]"
            x="75%"
            y="10%"
          />
          <Pills
            item="Ethereum"
            color="text-white"
            backgroundColor="bg-[#1C1C1C]"
            x="80%"
            y="20%"
          />
          <Pills
            item="Solana"
            color="text-white"
            backgroundColor="bg-gradient-to-r from-[#9945FF] to-[#14F195]"
            x="50%"
            y="10%"
          />
        </Gravity>
      </div>

      <Title
        title="Versatile"
        description="Harness a diverse skill set to drive your project to success."
      />
    </div>
  );
});

export default Skills;
