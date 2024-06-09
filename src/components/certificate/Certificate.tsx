import CertificateItemsGrid from "@/components/certificate/CertificateItemsGrid";
import { useGetCert } from "@/components/certificate/hooks/useGetCert";
import type { FC } from "react";

const Certificate: FC = () => {
    const { courses, education } = useGetCert();

    return (
        <div className="flex min-h-dvh flex-col justify-center px-20">
            <h3>CERT. & EDUCATION</h3>

            <CertificateItemsGrid title={"Certificate"} items={courses} />
            <CertificateItemsGrid title={"Education"} items={education} />
        </div>
    );
};

export default Certificate;
