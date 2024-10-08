"use client";

import { ReactLenis } from "lenis/react";
import About from "@/components/about/about";
import Certificate from "@/components/certificate/certificate";
import Experiences from "@/components/experience/experiences";
import HeroBanner from "@/components/heroBanner/heroBanner";
import MainLayout from "@/components/layout/mainLayout";
import Project from "@/components/project/project";

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
        </>
    );
};

export default LandingPage;
