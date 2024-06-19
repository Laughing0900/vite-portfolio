import { useMemo } from "react";
import useSWR from "swr";
import { API_ENDPOINT } from "@/consts/apis";
import { fetcher } from "@/lib/utils";

export type CertificateType = {
    title: string;
    institution: string;
    url: string;
    imageId: string;
    href?: string;
};

export const useCert = (): {
    courses: ReadonlyArray<CertificateType>;
    education: ReadonlyArray<CertificateType>;
    isLoading: boolean;
} => {
    const { data: response, isLoading } = useSWR(
        API_ENDPOINT + "certificate",
        fetcher
    );

    const { courses, education } = useMemo(() => {
        if (isLoading) {
            return { courses: [], education: [] };
        }

        if (!response || response.status !== 200) {
            return { courses: [], education: [] };
        }

        return {
            courses: response.body.certification,
            education: response.body.education,
        };
    }, [response, isLoading]);

    return { courses, education, isLoading };
};
