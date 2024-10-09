import { useMemo } from "react";
import useSWR from "swr";
import { CertificateType } from "@/components/certificate/type/certificateTypes";
import { fetcher } from "@/lib/utils";

export const useCertificates = (): {
    courses: ReadonlyArray<CertificateType>;
    education: ReadonlyArray<CertificateType>;
    isLoading: boolean;
} => {
    const { data: response, isLoading } = useSWR("/api/certificates", fetcher);

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
