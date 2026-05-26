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
            <Pills
              item="React"
              backgroundColor="bg-[var(--color-react)]"
              color="text-black"
              x="10%"
              y="10%"
            />
            <Pills
              item="TypeScript"
              backgroundColor="bg-[var(--color-typescript)]"
              color="text-white"
              x="30%"
              y="30%"
            />
            <Pills
              item="GoLang"
              backgroundColor="bg-[var(--color-golang)]"
              color="text-black"
              x="40%"
              y="20%"
            />
            <Pills
              item="Solidity"
              backgroundColor="bg-[var(--color-solidity)]"
              color="text-white"
              x="75%"
              y="10%"
            />
            <Pills
              item="Ethereum"
              backgroundColor="bg-[var(--color-ethereum)]"
              color="text-white"
              x="80%"
              y="20%"
            />
            <Pills
              item="Tron"
              backgroundColor="bg-[var(--color-tron)]"
              color="text-white"
              x="40%"
              y="20%"
            />
            <Pills
              item="Cardano"
              backgroundColor="bg-[var(--color-cardano)]"
              color="text-white"
              x="20%"
              y="90%"
            />
            <Pills
              item="Solana"
              backgroundColor="bg-gradient-to-br from-[var(--color-solana-start)] to-[var(--color-solana-end)]"
              color="text-white"
              x="50%"
              y="10%"
            />
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
