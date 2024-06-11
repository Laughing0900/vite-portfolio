export type ProjectType = {
    name: string;
    url: string;
    href?: string;
    company: string;
};

const projects: ReadonlyArray<ProjectType> = [
    {
        name: "KnightSafe",
        company: "KS Lab",
        url: "images/project/Knightsafe.webp",
    },
    {
        name: "PEX - ZkSync Exchange",
        company: "Pex Exchange",
        url: "images/project/Pex.webp",
    },
    {
        name: "ITS glass branding page",
        company: "ITS Glass",
        url: "images/project/ITSGlass.webp",
    },
    {
        name: "DearShare",
        company: "WeMakeApp",
        url: "images/project/DearShare.webp",
    },
    {
        name: "Beastroid",
        company: "Polkafantasy",
        url: "images/project/Beastroid.webp",
    },

    {
        name: "Polkafantasy Landing Page",
        company: "Polkafantasy",
        url: "images/project/Polkafantasy.webp",
    },
    {
        name: "Polkafantasy Game Page",
        company: "Polkafantasy",
        url: "images/project/PolkafantasyGame.webp",
    },
];

export const useGetProject = (): {
    projects: ReadonlyArray<ProjectType>;
} => {
    return { projects };
};
