import { ProjectCardProps } from "@/components/project/types/projectTypes";
import ProjectDetails from "@/components/projectDetails/projectDetails";
import { API_ENDPOINT } from "@/consts/apis";

export async function generateStaticParams() {
    const data = await fetch(API_ENDPOINT + "projects").then((res) =>
        res.json()
    );
    const projects = data.body;
    if (!projects || projects.length === 0) {
        return [];
    }
    return projects.map((post: ProjectCardProps) => ({
        id: post.id,
    }));
}

const ProjectPage = ({ params }: { params: { id: string } }) => {
    const id = params?.id;

    return (
        <>
            <ProjectDetails id={id} />
        </>
    );
};

export default ProjectPage;
