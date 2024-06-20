import { useEffect } from "react";
import { useLockBodyScroll, useToggle } from "react-use";
import About from "@/components/about/about";
import Certificate from "@/components/certificate/certificate";
import Experiences from "@/components/experience/experiences";
import Loading from "@/components/layout/loading";
import MainLayout from "@/components/layout/mainLayout";
import Project from "@/components/project/project";
import useOnFetching from "@/hooks/useOnFetching";

function App() {
    const { isLoading } = useOnFetching();

    const [locked, toggleLocked] = useToggle(false);
    useLockBodyScroll(locked);

    useEffect(() => {
        toggleLocked(isLoading);
    }, [isLoading, toggleLocked]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <MainLayout>
                    <About />
                    <Project />
                    <Experiences />
                    <Certificate />
                </MainLayout>
            )}
        </>
    );
}

export default App;
