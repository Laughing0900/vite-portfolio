import { useMemo } from "react";
import useSWR from "swr";
import { API_ENDPOINT } from "@/consts/apis";
import { fetcher } from "@/lib/utils";

export type CertificateType = {
    title: string;
    institution: string;
    imageId: string;
    href?: string;
    // url: string;
};

export const useCertificates = (): {
    courses: ReadonlyArray<CertificateType>;
    education: ReadonlyArray<CertificateType>;
    isLoading: boolean;
} => {
    const { data: response, isLoading } = useSWR(
        API_ENDPOINT + "certificates",
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
