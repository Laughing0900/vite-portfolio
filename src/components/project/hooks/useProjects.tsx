import { useMemo } from "react";
import useSWR from "swr";
import { ProjectCardProps } from "@/components/project/types/projectTypes";
import { fetcher } from "@/lib/utils";

export const useProjects = (): {
    projects: ReadonlyArray<ProjectCardProps>;
    isLoading: boolean;
} => {
    const { data: response, isLoading } = useSWR("/api/projects", fetcher);

    const projects = useMemo(() => {
        if (isLoading) {
            return [];
        }

        if (!response || response.status !== 200) {
            return [];
        }

        return response.body;
    }, [response, isLoading]);

    return { projects, isLoading };
};
