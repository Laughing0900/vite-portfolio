export type ProjectType = {
    name: string;
    url: string;
    href: string;
    company: string;
};

const projects: ReadonlyArray<ProjectType> = [
    {
        name: "KnightSafe",
        company: "KS Lab",
        url: "images/project/Knightsafe.webp",
        href: "https://www.knightsafe.io/",
    },
    {
        name: "PEX - ZkSync Exchange",
        company: "Pex Exchange",
        url: "images/project/Pex.webp",
        href: "https://www.pex.exchange/",
    },
    {
        name: "ITS glass branding page",
        company: "ITS Glass",
        url: "images/project/ITSGlass.webp",
        href: "https://www.itsglass.com.hk/",
    },
    {
        name: "DearShare",
        company: "WeMakeApp",
        url: "images/project/DearShare.webp",
        href: "https://www.dearshare.com/",
    },
    {
        name: "Beastroid",
        company: "Polkafantasy",
        url: "images/project/Beastroid.webp",
        href: "https://aimee-beastroid.polkafantasy.com/",
    },
    {
        name: "Polkafantasy Landing Page",
        company: "Polkafantasy",
        url: "images/project/Polkafantasy.webp",
        href: "https://polkafantasy.com/",
    },
    {
        name: "Polkafantasy Game Page",
        company: "Polkafantasy",
        url: "images/project/PolkafantasyGame.webp",
        href: "https://game.polkafantasy.com/404/",
    },
];

export const useGetProject = (): {
    projects: ReadonlyArray<ProjectType>;
} => {
    return { projects };
};
