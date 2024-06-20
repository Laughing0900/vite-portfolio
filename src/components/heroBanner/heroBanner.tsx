import { FlipWords } from "@/components/heroBanner/flip-words";
import { HeroHighlight } from "@/components/heroBanner/heroBackground";
import type { FC } from "react";

const words = ["a Remarkable", "a Successful", "a Stunning", "an Outstanding"];

const HeroBanner: FC = () => {
    return (
        <section
            id="hero-banner"
            className="fixed bottom-auto left-0 right-0 top-0 z-10 h-dvh"
        >
            <HeroHighlight className="grid-template h-full w-full items-center">
                <div className="col-span-4 pb-40 text-5xl font-normal leading-[1.25] text-foreground md:col-span-6 md:col-start-2 md:text-6xl">
                    Build
                    <br className="md:hidden" />
                    <FlipWords words={words} /> <br />
                    Project with
                </div>
                {/* @desktop */}
                <div className="absolute bottom-20 right-20 hidden bg-gradient-to-tr from-gray-300 to-debug bg-clip-text font-goldman text-[120px] font-bold text-transparent md:inline-block">
                    Laughing
                </div>
                {/* @mobile */}
                <div className="name-horizontal bg-gradient-to-tr from-gray-300 to-debug bg-clip-text font-goldman text-[120px] font-bold text-transparent md:hidden">
                    Laughing
                </div>
            </HeroHighlight>
        </section>
    );
};
export default HeroBanner;
