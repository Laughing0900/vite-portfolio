import Achievement from "@/components/home/achievement/Achievement";
import Experience from "@/components/home/experience/experience";
import Hero from "@/components/home/hero/Hero";
import Project from "@/components/home/project/Project";
import Talent from "@/components/home/talent/Talent";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Talent />
      <Project />
      <Experience />
      <Achievement />
    </main>
  );
};

export default HomePage;
