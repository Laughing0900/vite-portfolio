import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";
import type { FC } from "react";

const WithFooter: FC = () => {
    return (
        <footer className="fixed inset-0 h-screen bg-black px-4 py-40 text-white md:p-20">
            <div className="flex flex-col items-start gap-2 text-lg">
                <Button variant="link" size="fit" asChild>
                    <Link
                        href="mailto:laughing0900@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <address>laughing0900@gmail.com</address>
                    </Link>
                </Button>

                <Button variant="link" size="fit" asChild>
                    <Link
                        href="https://www.linkedin.com/in/chengszelong/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Linkedin
                    </Link>
                </Button>

                <Button variant="link" size="fit" asChild>
                    <Link
                        href="https://github.com/Laughing0900"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </Link>
                </Button>
            </div>
            {/* @desktop */}
            <div className="absolute bottom-0 left-0 hidden w-full items-end px-20 py-4 lg:flex lg:justify-between">
                <span className="font-cyborg text-8xl leading-[1.5] text-gray-100">
                    Laughing Cheng
                </span>
                <span>@2024</span>
            </div>
            {/* @mobile */}
            <span className="absolute bottom-0 left-0 px-4 py-4 lg:hidden">
                @2024
            </span>
            <span className="name-horizontal text-nowrap font-cyborg text-6xl text-gray-100 lg:hidden">
                Laughing Cheng
            </span>
        </footer>
    );
};

export default WithFooter;
