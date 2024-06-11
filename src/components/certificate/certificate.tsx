import CertificateItemsGrid from "@/components/certificate/certificateItemsGrid";
import { useGetCert } from "@/components/certificate/hooks/useGetCert";
import type { FC } from "react";

const Certificate: FC = () => {
    const { courses, education } = useGetCert();

    return (
        <section className="px-4 pb-40 md:px-20" id="certificate">
            <h3>CERT. & EDUCATION</h3>

            <CertificateItemsGrid title={"Certificate"} items={courses} />
            <CertificateItemsGrid title={"Education"} items={education} />
        </section>
    );
};

export default Certificate;