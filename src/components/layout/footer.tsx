import { FC } from "react";
import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";

const WithFooter: FC = () => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 top-auto h-screen bg-black px-4 py-40 text-white md:p-20">
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
            <div className="absolute bottom-0 left-0 hidden w-full items-end px-20 py-4 md:flex md:justify-between">
                <span className="text-9xl">Laughing Cheng</span>
                <span>@2024</span>
            </div>
            {/* @mobile */}
            <span className="left-0px-4 absolute bottom-0 py-4 md:hidden">
                @2024
            </span>
            <span className="name-horizontal text-nowrap text-7xl md:hidden">
                Laughing Cheng
            </span>
        </footer>
    );
};

export default WithFooter;
