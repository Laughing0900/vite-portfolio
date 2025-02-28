"use client";

import About from "@/components/about/about";
import Certificate from "@/components/certificate/certificate";
import Experiences from "@/components/experience/experiences";
import HeroBanner from "@/components/heroBanner/heroBanner";
import MainLayout from "@/components/layout/mainLayout";
import ProjectV2 from "@/components/project/v2/projectV2";

const LandingPage = () => {
    return (
        <>
            <HeroBanner />
            <div className="mt-[100dvh]"></div>
            <MainLayout>
                <div className="-mt-[100dvh] space-y-40 pt-40">
                    <About />
                    <ProjectV2 />
                    <Experiences />
                    <Certificate />
                </div>
            </MainLayout>
        </>
    );
};

export default LandingPage;
