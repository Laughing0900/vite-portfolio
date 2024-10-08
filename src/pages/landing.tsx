import { ReactLenis } from "lenis/react";
import { lazy } from "react";
import { ScrollRestoration } from "react-router-dom";
// import About from "@/components/about/about";
// import Certificate from "@/components/certificate/certificate";
// import Experiences from "@/components/experience/experiences";
import HeroBanner from "@/components/heroBanner/heroBanner";
import MainLayout from "@/components/layout/mainLayout";

// import Project from "@/components/project/project";

const About = lazy(() => import("@/components/about/about"));
const Project = lazy(() => import("@/components/project/project"));
const Experiences = lazy(() => import("@/components/experience/experiences"));
const Certificate = lazy(() => import("@/components/certificate/certificate"));

const LandingPage = () => {
    return (
        <>
            <ReactLenis
                root
                options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
            >
                <HeroBanner />

                <div className="mt-[100dvh]">
                    <MainLayout>
                        <div className="-mt-[100dvh] space-y-40 pt-40">
                            <About />
                            <Project />
                            <Experiences />
                            <Certificate />
                        </div>
                    </MainLayout>
                </div>
            </ReactLenis>
            <ScrollRestoration />
        </>
    );
};

export default LandingPage;
