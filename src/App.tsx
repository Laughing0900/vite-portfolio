import { ReactLenis } from "lenis/react";
import About from "@/components/about/about";
import Certificate from "@/components/certificate/certificate";
import Experiences from "@/components/experience/experiences";
import MainLayout from "@/components/layout/mainLayout";
import Project from "@/components/project/project";

function App() {
    return (
        <ReactLenis
            root
            options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
        >
            <MainLayout>
                <About />
                <Project />
                <Experiences />
                <Certificate />
            </MainLayout>
        </ReactLenis>
    );
}

export default App;
