import { FC } from "react";

type RoleCardProps = {
    name: string;
    role: string;
    duration: string;
};

const RoleCard: FC<RoleCardProps> = ({ name, role, duration }) => {
    return (
        <div
            className="mb-4 flex flex-col gap-2 border-b-2 border-b-gray-500 py-2 md:mb-0 md:border-b-0 md:py-4 md:pr-4 lg:items-end"
            key={name + "description"}
        >
            <p>
                <span className="text-2xl font-bold lg:text-xl">{role}</span>
            </p>
            <p className="flex w-full items-end justify-between lg:justify-end">
                <span className="text-lg font-light">{name}</span>
                <span className="text-sm text-gray-300/50 md:text-lg">
                    //{duration}
                </span>
            </p>
        </div>
    );
};

export default RoleCard;
