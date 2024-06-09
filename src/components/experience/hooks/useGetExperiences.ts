export const useGetExperiences = () => {
    const courses = [
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
            label: "UI / UX Web Design Professional Certificate",
            institution: "Maya Education center",
            url: "images/cert/UIUX_Maya.jpg",
        },
    ];
    const education = [
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
    return { courses, education };
};
