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
                <div className="col-span-4 pb-40 text-4xl font-normal leading-[1.25] text-foreground md:col-span-6 md:col-start-2 md:text-6xl">
                    Build <br className="md:hidden" />
                    <FlipWords words={words} /> <br />
                    Project with
                </div>
                {/* @desktop */}
                <h1 className="absolute bottom-20 left-20 hidden bg-gradient-to-tr from-gray-300 to-debug bg-clip-text font-cyborg text-8xl leading-[1.5] text-transparent md:inline-block">
                    Laughing<span className="hidden">Portfolio</span>
                </h1>
            </HeroHighlight>
            {/* @mobile */}
            <div className="name-horizontal col-span-4 bg-gradient-to-tr from-gray-300 to-debug bg-clip-text font-cyborg text-5xl text-transparent md:hidden">
                Laughing<span className="hidden">Portfolio</span>
            </div>
        </section>
    );
};
export default HeroBanner;
