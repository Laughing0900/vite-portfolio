import { useMemo } from "react";
import useSWR from "swr";
import { ProjectCardProps } from "@/components/project/types/projectTypes";
import { fetcher } from "@/lib/utils";

export type ProjectType = ProjectCardProps & {
    content: string;
    techStack: string[];
    projectImage: string[];
};

export const useProjectsDetails = ({
    projectId,
}: {
    projectId: string;
}): {
    data: ProjectType;
    isLoading: boolean;
} => {
    const url = `/api/project-details?id=${projectId}`;
    const { data: response, isLoading } = useSWR(url, fetcher);

    const data = useMemo(() => {
        if (isLoading) {
            return [];
        }

        if (!response || response.status !== 200) {
            return [];
        }

        return response.body;
    }, [response, isLoading]);

    return { data, isLoading };
};
