import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";

const WithFooter = () => {
    return (
        <>
            <div className="pointer-events-none relative z-30 h-dvh bg-transparent will-change-auto"></div>
            <footer className="fixed bottom-0 left-0 right-0 top-auto z-0 h-screen bg-black p-20 text-white">
                <div className="flex flex-col items-start gap-2 text-lg">
                    <Button variant="link" size="fit" asChild>
                        <Link
                            href="mailto:laughing0900@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            laughing0900@gmail.com
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
                <div className="absolute bottom-0 left-0 flex w-full items-end self-end px-20 py-4 md:justify-between">
                    <span className="text-9xl">Laughing Cheng</span>
                    <span>@2024</span>
                </div>
            </footer>
        </>
    );
};

export default WithFooter;
