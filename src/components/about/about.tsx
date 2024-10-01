import { BentoGrid, BentoGridItem } from "@/components/about/bento-grid";
import { useGetAbout } from "@/components/about/hooks/useGetAbout";
import { cn } from "@/lib/utils";

const About = () => {
    const { items } = useGetAbout();
    return (
        <section id="about-me">
            <h3 className="mx-auto w-full max-w-[1680px] pl-4 text-left md:pl-20">
                Who's Laughing
            </h3>

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
