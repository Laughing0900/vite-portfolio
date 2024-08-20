import { ArrowUpRight } from "lucide-react";
import { ProjectCardProps } from "@/components/project/types/projectTypes";
import Image from "@/components/ui/image";
import Link from "@/components/ui/link";

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
            <div className="pointer-events-auto mt-10">
                <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 flex w-full items-center justify-between"
                >
                    <p className="border-b-2 border-b-transparent text-2xl font-bold group-hover:border-b-gray-50">
                        {name}
                    </p>
                    <ArrowUpRight className="inline-block h-8 w-8 group-hover:inline-block md:hidden" />
                </Link>
                <p className="mt-2 text-lg text-gray-100/50">:- {company}</p>
            </div>
            <Image
                className="absolute bottom-3 right-3 aspect-square w-12 opacity-10 drop-shadow md:w-20"
                src={`images/pawn-white.svg`}
                alt={"my-logo"}
            />
        </div>
    );
};

export const ProjectCard = Card;
