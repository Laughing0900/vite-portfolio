import About from "@/components/about/about";
import Certificate from "@/components/certificate/certificate";
import Experiences from "@/components/experience/experiences";
import Loading from "@/components/layout/loading";
import MainLayout from "@/components/layout/mainLayout";
import Project from "@/components/project/project";
import useOnFetching from "@/hooks/useOnFetching";

function App() {
    const { isLoading } = useOnFetching();
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <MainLayout>
                    <About />
                    {/* Skills */}
                    {/* Project */}
                    <Project />
                    <Experiences />
                    <Certificate />
                </MainLayout>
            )}
        </>
    );
}

export default App;
