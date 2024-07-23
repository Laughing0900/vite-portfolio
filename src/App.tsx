import About from "@/components/about/about";
import Certificate from "@/components/certificate/certificate";
import Experiences from "@/components/experience/experiences";
import MainLayout from "@/components/layout/mainLayout";
import WithNav from "@/components/layout/nav";
import Project from "@/components/project/project";

function App() {
    return (
        <MainLayout>
            <About />
            <WithNav />
            <Project />
            <Experiences />
            <Certificate />
        </MainLayout>
    );
}

export default App;
