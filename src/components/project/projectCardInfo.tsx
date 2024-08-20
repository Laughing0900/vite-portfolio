import { ArrowUpRight } from "lucide-react";
import { ProjectCardProps } from "@/components/project/types/projectTypes";
import Link from "@/components/ui/link";

const ProjectCardInfo = ({
    href,
    company,
    name,
}: Omit<ProjectCardProps, "imageId">) => {
    return (
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
    );
};

export default ProjectCardInfo;
