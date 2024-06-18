import CertificateItemsGrid from "@/components/certificate/certificateItemsGrid";
import { useCert } from "@/components/certificate/hooks/useCert";
import type { FC } from "react";

const Certificate: FC = () => {
    const { courses, education } = useCert();

    return (
        <section className="px-4 pb-40 md:px-20" id="certificate">
            <h3>CERT. & EDUCATION</h3>

            <CertificateItemsGrid title={"Cert & Reward"} items={courses} />
            <CertificateItemsGrid title={"Education"} items={education} />
        </section>
    );
};

export default Certificate;
