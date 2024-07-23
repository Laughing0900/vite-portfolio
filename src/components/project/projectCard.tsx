import { ArrowUpRight } from "lucide-react";
import Image from "@/components/ui/image";
import Link from "@/components/ui/link";

type ProjectCardProps = {
    href: string;
    company: string;
    imageId: string;
    name: string;
};

const Card = ({ href, company, imageId, name }: ProjectCardProps) => {
    return (
        <div
            className="relative h-fit w-[400px] rounded-lg border-2 border-foreground bg-black/5 p-10 backdrop-blur-sm sm:w-[600px] md:w-[800px]"
            key={name + company}
        >
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

const Skeleton = ({ name }: Pick<ProjectCardProps, "name">) => {
    return (
        <div
            className="relative h-fit w-[400px] rounded-lg border-2 border-foreground bg-black/5 p-10 backdrop-blur-sm sm:w-[600px] md:w-[800px]"
            key={name}
        >
            <div className="aspect-video max-h-[50vh]">
                <div
                    className="h-full max-h-[60vh] animate-pulse rounded-md border-foreground bg-slate-700 object-cover"
                    style={{
                        transform: `rotate(3deg)`,
                    }}
                />
            </div>
            <div className="mt-10">
                <p className="h-[1em] w-1/2 animate-pulse rounded-full bg-slate-700 text-2xl"></p>
                <p className="mt-2 h-[1em] w-1/3 animate-pulse rounded-full bg-slate-700 text-lg"></p>
            </div>
            <Image
                className="absolute bottom-3 right-3 aspect-square w-12 opacity-10 drop-shadow md:w-20"
                src={`images/pawn-white.svg`}
                alt={"my-logo"}
            />
        </div>
    );
};

export const ProjectCard = { Card, Skeleton };
