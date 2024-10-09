import Link from "next/link";
import ProjectCardInfo from "@/components/project/projectCardInfo";
import { ProjectCardProps } from "@/components/project/types/projectTypes";
import Image, { cloudinaryLoader } from "@/components/ui/image";
import { cn } from "@/lib/utils";

const Card = ({ href, company, imageId, name, id }: ProjectCardProps) => {
    return (
        <div
            className={cn(
                "relative h-fit w-[600px] rounded-lg border-2 border-gray-500 bg-black/10 p-4 backdrop-blur-xl",
                "sm:w-[600px] sm:p-10 md:w-[800px]"
            )}
        >
            <div
                className="mx-auto aspect-video md:max-h-[50vh]"
                onClick={() => window.scrollTo(0, 0)}
            >
                <Link
                    href={`projects/${id}`}
                    className="group mt-4 flex h-full w-full items-center overflow-clip rounded-md border-2 border-gray-500"
                >
                    <div className="absolute inset-0 grid place-items-center bg-black/50 opacity-0 backdrop-blur-sm transition-none group-hover:opacity-100">
                        <div className="inset-0 font-cyborg text-xl text-white">
                            Visit me ?
                        </div>
                    </div>
                    <Image
                        src={`/project/${imageId}`}
                        className="h-full w-full object-cover"
                        alt="project image"
                        loader={cloudinaryLoader}
                        fill={true}
                        sizes="(min-width: 768px) 800px, (min-width: 640px) 600px, 600px"
                    />
                </Link>
            </div>

            <ProjectCardInfo href={href} company={company} name={name} />

            {/* Background icon */}
            <Image
                className="absolute bottom-3 right-3 aspect-square w-12 opacity-10 drop-shadow md:w-20"
                src={`images/pawn-white.svg`}
                alt={"my-logo"}
                width={48}
                height={48}
            />
        </div>
    );
};

export const ProjectCard = Card;
