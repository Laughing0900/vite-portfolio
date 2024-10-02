import { Navigate, useParams } from "react-router-dom";
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

    return <ProjectDetails id={id} />;
};

export default ProjectPage;
