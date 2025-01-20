"use client";

import About from "@/components/about/about";
import Certificate from "@/components/certificate/certificate";
import Experiences from "@/components/experience/experiences";
import HeroBanner from "@/components/heroBanner/heroBanner";
import MainLayout from "@/components/layout/mainLayout";
import Project from "@/components/project/project";

const LandingPage = () => {
    return (
        <>
            <HeroBanner />
            <div className="mt-[100dvh]"></div>
            {/* <div className="mt-[100dvh]"> */}
            <MainLayout>
                <div className="-mt-[100dvh] space-y-40 pt-40">
                    <About />
                    <Project />
                    <Experiences />
                    <Certificate />
                </div>
            </MainLayout>
            {/* </div> */}
        </>
    );
};

export default LandingPage;
