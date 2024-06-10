export type CertificateType = {
    label: string;
    institution: string;
    url: string;
};

const courses: ReadonlyArray<CertificateType> = [
    {
        label: "Google UX Design",
        institution: "Google(Coursea)",
        url: "images/cert/GoogleUXDesign.jpg",
    },
    {
        label: "Three.js Journey Course",
        institution: "Threejs-journey",
        url: "images/cert/ThreejsJourney.jpg",
    },
    {
        label: "UI/UX Web Design Professional Cert",
        institution: "Maya Education center",
        url: "images/cert/UIUX_Maya.jpg",
    },
];

const education: ReadonlyArray<CertificateType> = [
    {
        label: "Full Stack Software Engineering Bootcamp",
        institution: "Venturenix Lab",
        url: "images/cert/Venturenix.jpg",
    },
    {
        label: "Higher Diploma in Game Software Development",
        institution: "IVE (TY)",
        url: "images/cert/IVE_Certificate.jpg",
    },
];

export const useGetCert = (): {
    courses: ReadonlyArray<CertificateType>;
    education: ReadonlyArray<CertificateType>;
} => {
    return { courses, education };
};
