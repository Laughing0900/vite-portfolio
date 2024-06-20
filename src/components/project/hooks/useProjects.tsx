import { useMemo } from "react";
import useSWR from "swr";
import { API_ENDPOINT } from "@/consts/apis";
import { fetcher } from "@/lib/utils";

export type ProjectType = {
    name: string;
    href: string;
    company: string;
    imageId: string;
    // url: string;
};

export const useProjects = (): {
    projects: ReadonlyArray<ProjectType>;
    isLoading: boolean;
} => {
    const { data: response, isLoading } = useSWR(
        API_ENDPOINT + "projects",
        fetcher
    );

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
