import { CornerDownLeft, SquareArrowOutUpRight } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import MainLayout from "@/components/layout/mainLayout";
import { useProjectsDetails } from "@/components/projectDetails/hooks/useProjectsDetails";
import Link from "@/components/ui/link";

const ProjectDetails: React.FC<{ id: string }> = ({ id }) => {
    const { data: response, isLoading } = useProjectsDetails({ projectId: id });
    const { imageId, company, name, content, href } = response;

    return (
        <MainLayout>
            <section className="grid-template py-10" id="certificate">
                {/* Left */}
                <div className="col-span-full lg:col-span-3">
                    <div className="rounded-8 w-full border-2 border-gray-500 p-10">
                        <h2 className="text-wrap font-cyborg text-2xl leading-normal">
                            Project
                        </h2>
                        <p className="mt-4 text-2xl font-bold">{name}</p>
                        <p className="mt-2 text-lg text-gray-100/50">
                            :- {company}
                        </p>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-5">
                        <div className="rounded-8 aspect-square border-2 border-gray-500 p-10 hover:bg-gray-500/50">
                            <RouterLink to="/vite-portfolio">
                                <CornerDownLeft className="h-full w-full" />
                            </RouterLink>
                        </div>
                        <Link
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-8 col-start-3 block aspect-square border-2 border-gray-500 p-10 hover:bg-gray-500/50"
                        >
                            <SquareArrowOutUpRight className="h-full w-full" />
                        </Link>
                    </div>
                </div>

                {/* right */}
                <div className="rounded-8 col-span-full h-fit border-2 border-gray-500 p-10 lg:col-span-5">
                    <ul
                        dangerouslySetInnerHTML={{
                            __html: content || "",
                        }}
                    >
                        {}
                    </ul>
                </div>
            </section>
        </MainLayout>
    );
};

export default ProjectDetails;
