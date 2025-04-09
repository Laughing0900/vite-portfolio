import Introduction from "@/components/home/talent/cards/Introduction";
import Productivity from "@/components/home/talent/cards/Productivity";
import Schedule from "@/components/home/talent/cards/Schedule";
import Skills from "@/components/home/talent/cards/Skills";
import Structure from "@/components/home/talent/cards/Structure";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

import { motion, useScroll, useTransform } from "motion/react";
import { memo, useEffect, useRef } from "react";

const Talent = memo(() => {
  const isLg = useMediaQuery("lg");
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
  });

  const opacity = [
    useTransform(scrollYProgress, [0.1, 0.4], [0, 1]),
    useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
    useTransform(scrollYProgress, [0.75, 0.9], [0, 1]),
    useTransform(scrollYProgress, [0.75, 0.9], [0, 1]),
  ];

  useEffect(() => {
    window.snap.addElement(document.getElementById("talent") as HTMLElement, {
      align: ["start", "end"],
    });
  }, []);

  return (
    <section id="talent" ref={container}>
      <div className="container">
        {/* step 1: introduction */}

        <div className="relative grid grid-cols-3 ">
          <div
            className={cn(
              "relative col-span-full h-fit min-h-[50dvh] pt-40 pb-20",
              "lg:-mb-[200dvh] md:pt-120 md:pb-80 lg:col-span-2 lg:col-start-2 lg:min-h-[200dvh]",
            )}
          >
            <Introduction
              paragraph={
                "I'm Laughing, a passionate Full-Stack Developer specializing in the blockchain industry. With a strong foundation in front-end development and smart contract expertise, I have a deep understanding of decentralized applications and Web3 ecosystems. My focus is on creating secure, scalable, and user-friendly blockchain solutions. I'm proficient in smart contract development, blockchain integrations, and web animation."
              }
            />
          </div>
        </div>

        <div className="relative lg:h-[200dvh]">
          <div
            className={cn(
              "grid grid-cols-1 divide-accent max-lg:divide-y-2 lg:grid-cols-3 lg:grid-rows-4",
              "lg:sticky lg:top-one-six-dvh lg:left-1/6 lg:h-max-container",
            )}
          >
            <motion.div
              className={cn(
                "relative col-span-1 row-span-full h-one-two-dvh border-accent max-lg:border-t-2",
                "lg:col-span-1 lg:h-full lg:border-r-2",
                "hover:background-radial transition-colors duration-200 ease-in-out-circ",
              )}
              style={{ opacity: isLg ? opacity[0] : 1 }}
            >
              <Skills />
            </motion.div>

            <motion.div
              className={cn(
                "col-span-1 h-one-two-dvh",
                "border-accent lg:row-span-3 lg:h-full lg:border-r-2",
                "hover:background-radial transition-colors duration-200 ease-in-out-circ",
              )}
              style={{ opacity: isLg ? opacity[2] : 1 }}
            >
              <Structure />
            </motion.div>

            <motion.div
              className={cn(
                "col-span-1 h-one-two-dvh",
                "lg:col-span-1 lg:row-span-3 lg:h-full",
                "hover:background-radial transition-colors duration-200 ease-in-out-circ",
              )}
              style={{ opacity: isLg ? opacity[3] : 1 }}
            >
              <Productivity />
            </motion.div>
            <motion.div
              className={cn(
                "col-span-1 h-one-two-dvh",
                "border-accent lg:col-span-2 lg:row-span-1 lg:row-start-4 lg:h-full lg:border-t-2",
                "hover:background-radial transition-colors duration-200 ease-in-out-circ",
              )}
              style={{ opacity: isLg ? opacity[1] : 1 }}
            >
              <Schedule />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Talent;
