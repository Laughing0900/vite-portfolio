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
                <div className="font-cyborg absolute bottom-20 left-20 hidden bg-gradient-to-tr from-gray-300 to-debug bg-clip-text text-8xl leading-[1.5] text-transparent md:inline-block">
                    Laughing
                </div>
            </HeroHighlight>
            {/* @mobile */}
            <div className="name-horizontal font-cyborg col-span-4 bg-gradient-to-tr from-gray-300 to-debug bg-clip-text text-5xl text-transparent md:hidden">
                Laughing
            </div>
        </section>
    );
};
export default HeroBanner;
