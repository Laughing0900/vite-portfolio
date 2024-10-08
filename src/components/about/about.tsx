"use client";

import { BentoGrid, BentoGridItem } from "@/components/about/bento-grid";
import { useGetAbout } from "@/components/about/hooks/useGetAbout";
import ScrollableDescription from "@/components/about/scrollableDescription";
import { cn } from "@/lib/utils";

const About = () => {
    const { items } = useGetAbout();
    return (
        <section id="about-me" className="pt-20">
            <h3 className="mx-auto w-full max-w-[1680px] pl-4 text-left md:pl-20">
                Who&#39;s Laughing
            </h3>

            <ScrollableDescription />

            <BentoGrid>
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        className={cn("[&>p:text-lg]", item.className)}
                    />
                ))}
            </BentoGrid>
        </section>
    );
};

export default About;
