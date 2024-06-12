export type CertificateType = {
    label: string;
    institution: string;
    url: string;
};

const courses: ReadonlyArray<CertificateType> = [
    {
        label: "Google UX Design",
        institution: "Google(Coursera)",
        url: "images/cert/GoogleUXDesign.webp",
    },
    {
        label: "Three.js Journey Course",
        institution: "Threejs-journey",
        url: "images/cert/ThreejsJourney.webp",
    },
    {
        label: "UI/UX Web Design Professional Cert",
        institution: "Maya Education center",
        url: "images/cert/UIUX_Maya.webp",
    },
];

const education: ReadonlyArray<CertificateType> = [
    {
        label: "Full Stack Software Engineering Bootcamp",
        institution: "Venturenix Lab",
        url: "images/cert/Venturenix.webp",
    },
    {
        label: "Higher Diploma in Game Software Development",
        institution: "IVE (TY)",
        url: "images/cert/IVE_Certificate.webp",
    },
];

export const useGetCert = (): {
    courses: ReadonlyArray<CertificateType>;
    education: ReadonlyArray<CertificateType>;
} => {
    return { courses, education };
};
