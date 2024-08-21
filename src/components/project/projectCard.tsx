import ProjectCardInfo from "@/components/project/projectCardInfo";
import { ProjectCardProps } from "@/components/project/types/projectTypes";
import Image from "@/components/ui/image";

const Card = ({ href, company, imageId, name }: ProjectCardProps) => {
    return (
        <div className="relative h-fit w-[400px] rounded-lg border-2 border-foreground bg-black/5 p-10 backdrop-blur-sm sm:w-[600px] md:w-[800px]">
            <div className="aspect-video max-h-[50vh]">
                <Image
                    src={`https://res.cloudinary.com/dicmdiiov/image/upload/f_auto,q_auto/v1/Pawn/portfolio/project/${imageId}`}
                    width="100%"
                    className="max-h-[60vh] rounded-md border-4 border-foreground object-cover"
                    alt="project image"
                    style={{
                        transform: `rotate(3deg)`,
                    }}
                />
            </div>

            <ProjectCardInfo href={href} company={company} name={name} />

            {/* Background icon */}
            <Image
                className="absolute bottom-3 right-3 aspect-square w-12 opacity-10 drop-shadow md:w-20"
                src={`images/pawn-white.svg`}
                alt={"my-logo"}
            />
        </div>
    );
};

export const ProjectCard = Card;
