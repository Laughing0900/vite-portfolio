import { ReactLenis } from "lenis/react";
import { Navigate, ScrollRestoration, useParams } from "react-router-dom";
import { useProjects } from "@/components/project/hooks/useProjects";
import ProjectDetails from "@/components/projectDetails/projectDetails";

const ProjectPage = () => {
    const { id } = useParams();
    const { projects, isLoading: isProjectsLoading } = useProjects();

    if (
        !id ||
        (!isProjectsLoading && !projects.find((project) => project.id === id))
    ) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <ReactLenis
                root
                options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
            >
                <ProjectDetails id={id} />
            </ReactLenis>
            <ScrollRestoration />
        </>
    );
};

export default ProjectPage;
