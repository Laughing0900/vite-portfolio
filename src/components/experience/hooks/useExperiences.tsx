import { useMemo } from "react";
import useSWR from "swr";
import { formatDate } from "@/lib/display";
import { fetcher } from "@/lib/utils";

export type ExperiencesType = {
    name: string;
    role: string;
    duration: string;
    description?: string;
    techStack: string[];
};

export const useExperiences = (): {
    companies: ReadonlyArray<ExperiencesType>;
    isLoading: boolean;
} => {
    const { data: response, isLoading } = useSWR("/api/experiences", fetcher);

    const companies = useMemo(() => {
        if (isLoading) {
            return [];
        }

        if (!response || response.status !== 200) {
            return [];
        }

        return response.body.map(
            (d: ExperiencesType & { from: string; to: string }) => {
                const formattedForm = formatDate(d.from);
                const formattedTo =
                    d.to !== "Present" ? formatDate(d.to) : d.to;

                return {
                    ...d,
                    duration: `${formattedForm} - ${formattedTo}`,
                };
            }
        );
    }, [response, isLoading]);

    return { companies, isLoading };
};
