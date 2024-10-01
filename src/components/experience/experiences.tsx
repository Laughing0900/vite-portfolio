import ExperienceDesktopView from "@/components/experience/experienceDesktopView";
import ExperienceMobileView from "@/components/experience/experienceMobileView";
import useBreakpoint from "@/hooks/useBreakpoint";

const Experiences = () => {
    const { isTablet } = useBreakpoint();

    return (
        <section className="pointer-events-none min-h-dvh" id="experience">
            {isTablet ? <ExperienceMobileView /> : <ExperienceDesktopView />}
        </section>
    );
};

export default Experiences;
