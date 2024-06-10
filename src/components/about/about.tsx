import { BentoGrid, BentoGridItem } from "@/components/about/bento-grid";
import { useGetAbout } from "@/components/about/hooks/useGetAbout";
import { cn } from "@/lib/utils";

const About = () => {
    const { items } = useGetAbout();
    return (
        <section className="pb-40" id="about-me">
            <h3 className="pl-4 md:pl-20">Who's Laughing</h3>

            <BentoGrid className="md:auto-rows-[20rem]">
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
