import { useParams } from "react-router-dom";
import ProjectDetails from "@/components/projectDetails/projectDetails";

const ProjectPage = () => {
    const { id } = useParams();

    if (!id) {
        return <>Place holder</>;
    }

    return <ProjectDetails id={id} />;
};

export default ProjectPage;
