import { useMemo } from "react";
import useSWR from "swr";
import { API_ENDPOINT } from "@/consts/apis";
import { fetcher } from "@/lib/utils";

export type ProjectType = {
    name: string;
    url: string;
    href: string;
    company: string;
};

const projects1: ReadonlyArray<ProjectType> = [
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

export const useProject = (): {
    projects: ReadonlyArray<ProjectType>;
} => {
    const { data: response, isLoading } = useSWR(
        API_ENDPOINT + "project",
        fetcher
    );

    const projects = useMemo(() => {
        if (isLoading) {
            return [];
        }

        if (!response || response.status !== 200) {
            return [];
        }

        return response.body;
    }, [response, isLoading]);

    return { projects };
};
