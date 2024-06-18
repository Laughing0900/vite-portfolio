import { format } from "date-fns";
import { useMemo } from "react";
import useSWR from "swr";
import { API_ENDPOINT } from "@/consts/apis";
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
    const { data: response, isLoading } = useSWR(
        API_ENDPOINT + "experience",
        fetcher
    );

    const companies = useMemo(() => {
        if (isLoading) {
            return [];
        }

        if (!response || response.status !== 200) {
            return [];
        }

        return response.body.map(
            (d: ExperiencesType & { from: string; to: string }) => {
                const formattedForm = format(d.from, "MMM yyyy");
                const formattedTo =
                    d.to !== "Present" ? format(d.to, "MMM yyyy") : d.to;

                return {
                    ...d,
                    duration: `${formattedForm} - ${formattedTo}`,
                };
            }
        );
    }, [response, isLoading]);

    return { companies, isLoading };
};
