import { CornerDownLeft, SquareArrowOutUpRight } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import MainLayout from "@/components/layout/mainLayout";
import { useProjectsDetails } from "@/components/projectDetails/hooks/useProjectsDetails";
import Image from "@/components/ui/image";
import Link from "@/components/ui/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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
                    <TooltipProvider>
                        <div className="mt-4 grid grid-cols-3 gap-5">
                            <div className="rounded-8 aspect-square border-2 border-gray-500 p-10 hover:bg-gray-500/50">
                                <RouterLink to="/vite-portfolio">
                                    <Tooltip delayDuration={100}>
                                        <TooltipTrigger asChild>
                                            <CornerDownLeft className="h-full w-full" />
                                        </TooltipTrigger>
                                        <TooltipContent sticky="always">
                                            <p>Back to home</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </RouterLink>
                            </div>

                            <Link
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-8 re col-start-3 block aspect-square border-2 border-gray-500 p-10 hover:bg-gray-500/50"
                            >
                                <Tooltip delayDuration={100}>
                                    <TooltipTrigger asChild>
                                        <SquareArrowOutUpRight className="h-full w-full" />
                                    </TooltipTrigger>

                                    <TooltipContent sticky="always">
                                        <p>View</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Link>
                        </div>
                    </TooltipProvider>
                </div>

                {/* right */}
                <div className="rounded-8 col-span-full h-fit overflow-clip border-2 border-gray-500 lg:col-span-5">
                    <Image
                        src={`https://res.cloudinary.com/dicmdiiov/image/upload/f_auto,q_auto/v1/Pawn/portfolio/project/${imageId}`}
                        width="100%"
                        className="object-cove mb-10 h-full w-full"
                        alt="project image"
                    />

                    <div
                        dangerouslySetInnerHTML={{
                            __html: content || "",
                        }}
                        className="p-10 drop-shadow"
                    >
                        {}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default ProjectDetails;
