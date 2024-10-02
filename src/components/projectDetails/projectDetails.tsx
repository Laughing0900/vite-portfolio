import { CornerDownLeft, SquareArrowOutUpRight } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import TechSkill from "@/components/experience/contentCard/techSkill";
import MainLayout from "@/components/layout/mainLayout";
import { useProjectsDetails } from "@/components/projectDetails/hooks/useProjectsDetails";
import ProjectDetailsSkeleton from "@/components/projectDetails/skeletons/projectDetailsSkeletons";
import Image from "@/components/ui/image";
import Link from "@/components/ui/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import useBreakpoint from "@/hooks/useBreakpoint";

const ProjectDetails: React.FC<{ id: string }> = ({ id }) => {
    const { data: response, isLoading } = useProjectsDetails({ projectId: id });
    const { isMobile } = useBreakpoint();

    if (isLoading) return <ProjectDetailsSkeleton />;

    const { imageId, company, name, content, href, techStack } = response;
    const btnSize = isMobile ? 40 : 60;

    return (
        <MainLayout>
            <section className="grid-template py-20">
                {/* Left */}
                <div className="col-span-full lg:col-span-3">
                    <div className="rounded-8 w-full border-2 border-gray-500 p-10">
                        <h2 className="text-wrap font-cyborg text-2xl leading-normal">
                            Project
                        </h2>
                        <p className="mt-4 text-2xl font-bold">{name}</p>
                        <h4 className="mt-2 text-lg text-gray-100/50">
                            :- {company}
                        </h4>
                    </div>
                    <TooltipProvider>
                        <div className="mt-4 grid grid-cols-4 gap-5 md:grid-cols-3">
                            <div className="rounded-8 aspect-square border-2 border-gray-500 hover:bg-gray-500/50">
                                <RouterLink to="/">
                                    <Tooltip delayDuration={100}>
                                        <TooltipTrigger asChild>
                                            <div className="grid h-full w-full place-items-center">
                                                <CornerDownLeft
                                                    size={btnSize}
                                                />
                                            </div>
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
                                className="rounded-8 col-start-4 aspect-square border-2 border-gray-500 hover:bg-gray-500/50 md:col-start-3"
                            >
                                <Tooltip delayDuration={100}>
                                    <TooltipTrigger asChild>
                                        <div className="grid h-full w-full place-items-center">
                                            <SquareArrowOutUpRight
                                                size={btnSize}
                                            />
                                        </div>
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
                <div className="col-span-full h-fit space-y-10 lg:col-span-5">
                    <Image
                        src={`https://res.cloudinary.com/dicmdiiov/image/upload/f_auto,q_auto/v1/Pawn/portfolio/project/${imageId}`}
                        width="100%"
                        className="object-cove rounded-8 h-full w-full"
                        alt="project image"
                    />

                    <div
                        dangerouslySetInnerHTML={{
                            __html: content || "",
                        }}
                        className="rounded-8 project-details space-y-5 border-2 border-gray-500 bg-white/10 p-10 drop-shadow backdrop-blur-xl"
                    ></div>

                    <div className="flex flex-wrap gap-4">
                        {techStack.map((tech) => {
                            return <TechSkill key={tech} tech={tech} />;
                        })}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default ProjectDetails;
