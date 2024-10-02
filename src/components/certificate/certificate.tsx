import CertificateItemsGrid from "@/components/certificate/certificateItemsGrid";
import { useCertificates } from "@/components/certificate/hooks/useCertificates";
import type { FC } from "react";

const Certificate: FC = () => {
    const { courses, education } = useCertificates();

    return (
        <section
            className="grid-template min-h-[80vh] px-4 pb-40 pt-20 md:px-20"
            id="certificate"
        >
            <h3 className="col-span-full">CERT. & EDUCATION</h3>

            <CertificateItemsGrid title={"Cert & Reward"} items={courses} />
            <CertificateItemsGrid title={"Education"} items={education} />
        </section>
    );
};

export default Certificate;
