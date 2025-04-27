import { cn } from "@/lib/utils";
import HeroBackground from "./HeroBackground";
import { memo } from "react";

const Hero = memo(() => {
  return (
    <section id="hero" className="pt-one-six-dvh text-shadow-base">
      <div className="container bg-background bg-radial-[at_0%_110%] from-[#14262966] to-90% to-[#071B1F00]">
        {/* Background */}
        <div className="absolute inset-0 h-full w-full ">
          <HeroBackground className="absolute top-0 left-0 max-md:hidden" />
        </div>

        {/* Title */}
        <h2
          className={cn(
            "silkscreen font-bold text-5xl",
            "-left-4 absolute bottom-[55.6%]",
            "md:left-[45%] lg:text-right lg:text-8xl",
          )}
        >
          Laughing
          <br />
          <p className="text-4xl text-primary lg:text-6xl">Portfolio</p>
        </h2>

        <div className="-left-4 absolute top-3/5 w-full max-w-md md:left-1/6 lg:left-8/12">
          <p className="text-balance text-left text-2xl">
            Achieve unparalleled performance and effortless development
            customized for your SaaS and Web3 endeavors.
          </p>
        </div>
      </div>
    </section>
  );
});

export default Hero;
