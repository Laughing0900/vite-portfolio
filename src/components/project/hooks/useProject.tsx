import { useMemo } from "react";
import useSWR from "swr";
import { API_ENDPOINT } from "@/consts/apis";
import { fetcher } from "@/lib/utils";

export type ProjectType = {
    name: string;
    url: string;
    href: string;
    company: string;
};

export const useProject = (): {
    projects: ReadonlyArray<ProjectType>;
} => {
    const { data: response, isLoading } = useSWR(
        API_ENDPOINT + "project",
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

    return { projects };
};
