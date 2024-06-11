import About from "@/components/about/about";
import Certificate from "@/components/certificate/certificate";
import Experiences from "@/components/experience/experiences";
import MainLayout from "@/components/layout/mainLayout";
import Project from "@/components/project/project";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

function App() {
    return (
        <>
            <MainLayout>
                <About />
                {/* Skills */}
                {/* Project */}
                <Project />
                <Experiences />
                <Certificate />
            </MainLayout>
            <Dialog defaultOpen>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Is this ready?</DialogTitle>
                        <DialogDescription>
                            This portfolio is still under development. Some
                            feature may not be stable. Keep going to beta
                            version.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default App;
