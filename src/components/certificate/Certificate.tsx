import { LinkPreview } from "@/components/ui/link-preview";
import type { FC } from "react";

const Certificate: FC = () => {
    // todo fetch data at public
    //  useGetCertificate();
    return (
        <div className="z-10 flex h-screen flex-col items-start justify-center px-4">
            <p className="mb-10 max-w-3xl text-left text-xl text-neutral-500 dark:text-neutral-400 md:text-3xl">
                Visit{" "}
                <LinkPreview
                    url="https://aimee-beastroid.polkafantasy.com/#home"
                    className="bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text font-bold text-transparent"
                >
                    Beastroid NFT project BY KEIJI INAFUNE
                </LinkPreview>{" "}
                and for amazing Tailwind and Framer Motion components.
            </p>
        </div>
    );
};

export default Certificate;
