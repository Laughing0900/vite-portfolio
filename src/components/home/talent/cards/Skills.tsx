import Title from "@/components/home/talent/cards/Title";
import { cn } from "@/lib/utils";
import { lazy, memo, Suspense } from "react";

// Lazy load the physics engine to reduce initial bundle size
const Gravity = lazy(() =>
  import("@/components/ui/fancy/physics/gravity").then((module) => ({
    default: module.default,
  })),
);
const MatterBody = lazy(() =>
  import("@/components/ui/fancy/physics/gravity").then((module) => ({
    default: module.MatterBody,
  })),
);

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
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          }
        >
          <Gravity>
            <Suspense fallback={null}>
              <MatterBody
                matterBodyOptions={{
                  friction: 0.5,
                  restitution: 0.2,
                }}
                x="10%"
                y="10%"
              >
                <div className="rounded-full bg-[#61dafb] px-6 py-2 text-black text-lg hover:cursor-grab">
                  React
                </div>
              </MatterBody>
              <MatterBody
                matterBodyOptions={{
                  friction: 0.5,
                  restitution: 0.2,
                }}
                x="30%"
                y="30%"
              >
                <div className="rounded-full bg-[#3178C6] px-6 py-2 text-lg text-white hover:cursor-grab">
                  TypeScript
                </div>
              </MatterBody>
              <MatterBody
                matterBodyOptions={{
                  friction: 0.5,
                  restitution: 0.2,
                }}
                x="40%"
                y="20%"
              >
                <div className="rounded-full bg-[#00ADD9] px-6 py-2 text-black text-lg hover:cursor-grab">
                  GoLang
                </div>
              </MatterBody>
              <MatterBody
                matterBodyOptions={{
                  friction: 0.5,
                  restitution: 0.2,
                }}
                x="75%"
                y="10%"
              >
                <div className="rounded-full bg-[#2C2C2C] px-6 py-2 text-lg text-white hover:cursor-grab">
                  Solidity
                </div>
              </MatterBody>
              <MatterBody
                matterBodyOptions={{
                  friction: 0.5,
                  restitution: 0.2,
                }}
                x="80%"
                y="20%"
              >
                <div className="rounded-full bg-[#1C1C1C] px-6 py-2 text-lg text-white hover:cursor-grab">
                  Ethereum
                </div>
              </MatterBody>
              <MatterBody
                matterBodyOptions={{
                  friction: 0.5,
                  restitution: 0.2,
                }}
                x="40%"
                y="20%"
              >
                <div className="rounded-full bg-[#FE0301] px-6 py-2 text-lg text-white hover:cursor-grab">
                  Tron
                </div>
              </MatterBody>
              <MatterBody
                matterBodyOptions={{
                  friction: 0.5,
                  restitution: 0.2,
                }}
                x="20%"
                y="90%"
              >
                <div className="rounded-full bg-[#0031B4] px-6 py-2 text-lg text-white hover:cursor-grab">
                  Cardano
                </div>
              </MatterBody>
              <MatterBody
                matterBodyOptions={{
                  friction: 0.5,
                  restitution: 0.2,
                }}
                x="50%"
                y="10%"
              >
                <div className="rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] px-6 py-2 text-lg text-white hover:cursor-grab">
                  Solana
                </div>
              </MatterBody>
            </Suspense>
          </Gravity>
        </Suspense>
      </div>

      <Title
        title="Versatile"
        description="Harness a diverse skill set to drive your project to success."
      />
    </div>
  );
});

export default Skills;
