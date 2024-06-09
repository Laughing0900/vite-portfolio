import About from "@/components/about/about";
import Certificate from "@/components/certificate/certificate";
import Experiences from "@/components/experience/experiences";
import MainLayout from "@/components/layout/mainLayout";

function App() {
    return (
        <MainLayout>
            <About />
            {/* Skills */}
            {/* Project */}
            <Experiences />
            <Certificate />
        </MainLayout>
    );
}

export default App;
