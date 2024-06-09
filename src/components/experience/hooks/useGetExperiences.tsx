export type ExperiencesType = {
    name: string;
    role: string;
    duration: string;
    description?: React.ReactNode;
    techStack: string[];
};

const companies: ReadonlyArray<ExperiencesType> = [
    {
        name: "KS Labs Limited",
        role: "Software Engineer",
        duration: "Aug. 2023 - Current",
        description: (
            <>
                <li>
                    Forked a DEX to the ZkSync{" "}
                    <span className="highlight">layer 2</span> chain and
                    revamped the UI from design, enhancing performance and user
                    experience.
                </li>
                <li>
                    Developed a <span className="highlight">comprehensive</span>{" "}
                    wallet solution project including application and smart
                    contract integration.
                </li>
                <li>
                    Implemented Continuous Integration (CI) logic from GitLab to
                    AWS Lambda and S3, improving deployment efficiency and
                    reliability.
                </li>
            </>
        ),
        techStack: ["React", "TypeScript", "Solidity", "AWS"],
    },
    {
        name: "WeMakeApp Limited",
        role: "Software Engineer",
        duration: "Dec. 2022 - May. 2023",
        description: (
            <>
                <li>
                    Designed and developed a full-stack website using the T3
                    Stack, Apollo server, and Stripe, resulting in a{" "}
                    <span className="highlight">robust</span> and{" "}
                    <span className="highlight">scalable</span> product that met
                    client needs and exceeded performance expectations.
                </li>
                <li>
                    Maintained and stabilized the website using Datadog and
                    Sentry, proactively monitoring and resolving issues to
                    ensure <span className="highlight">maximum uptime</span> and
                    optimal user experience. This included setting up automated
                    alerts, performance metrics, and conducting regular code
                    audits.
                </li>
            </>
        ),
        techStack: ["Next.js", "TypeScript", "Apollo", "Stripe"],
    },
    {
        name: "Polkafantasy",
        role: "Full-Stack Programmer",
        duration: "Nov. 2021 - Dec. 2022",
        description: (
            <>
                <li>
                    Designed and developed a Web3 project using Solidity and
                    Next.js, resulting in a secure and user-friendly{" "}
                    <span className="highlight">decentralized application</span>
                    .
                </li>
                <li>
                    Led the <span className="highlight">collaboration</span>{" "}
                    with the design team to develop a smart contract product
                    that met user needs and business requirements. This involved
                    conducting user research, creating wireframes and
                    prototypes, and writing clean, efficient code for
                    implementation.
                </li>
            </>
        ),
        techStack: ["Next.js", "FramerMotion", "Solidity", "Web3"],
    },
    {
        name: "Speedy Group Corporation Ltd.",
        role: "Technical Support Assistant",
        duration: "Aug. 2020 - Jul. 2021",
        techStack: [],
    },
    {
        name: "Great Game Asia",
        role: "Web Programmer",
        duration: "Dec. 2017 - Nov. 2021",
        techStack: [],
    },
];

export const useGetExperiences = (): {
    companies: ReadonlyArray<ExperiencesType>;
} => {
    return { companies };
};
