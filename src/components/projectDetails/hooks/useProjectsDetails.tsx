import { useMemo } from "react";
import useSWR from "swr";
import { ProjectCardProps } from "@/components/project/types/projectTypes";
import { API_ENDPOINT } from "@/consts/apis";
import { fetcher } from "@/lib/utils";

export type ProjectType = ProjectCardProps & {
    content: string;
};

export const useProjectsDetails = ({
    projectId,
}: {
    projectId: string;
}): {
    data: ProjectType;
    isLoading: boolean;
} => {
    const { data: response, isLoading } = useSWR(
        API_ENDPOINT + `project-details?id=${projectId}`,
        fetcher
    );

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
