import {
    AppWindowMac,
    Building2,
    GraduationCap,
    HomeIcon,
    Laugh,
    Send,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/ui/dock";
import Link from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const DATA = {
    content: {
        about: {
            name: "This Is Laughing",
            url: "#about-me",
            icon: Laugh,
        },
        project: {
            name: "Projects",
            url: "#project",
            icon: AppWindowMac,
        },
        experience: {
            name: "Experiences",
            url: "#experience",
            icon: Building2,
        },
        cert: {
            name: "Cert. & Edu.",
            url: "#certificate",
            icon: GraduationCap,
        },
    },
    navbar: [
        {
            href: "mailto:laughing0900@gmail.com",
            icon: Send,
            label: "Contact Me",
        },
        { href: "/", icon: HomeIcon, label: "Home" },
    ],
};

const WithNav = () => {
    return (
        <div className="fixed bottom-5 left-0 z-50 w-full">
            <TooltipProvider>
                <Dock direction="middle">
                    {Object.entries(DATA.content).map(([name, content]) => (
                        <DockIcon key={name}>
                            <Tooltip delayDuration={200}>
                                <TooltipTrigger>
                                    <Link
                                        href={content.url}
                                        className={cn(
                                            buttonVariants({
                                                variant: "ghost",
                                                size: "icon",
                                            }),
                                            "size-12 rounded-full"
                                        )}
                                    >
                                        <content.icon className="size-4" />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent sticky="always">
                                    <p>{content.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    ))}
                    <Separator orientation="vertical" className="h-full" />
                    {DATA.navbar.map((item) => (
                        <DockIcon key={item.label}>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            buttonVariants({
                                                variant: "ghost",
                                                size: "icon",
                                            }),
                                            "size-12 rounded-full"
                                        )}
                                    >
                                        <item.icon className="size-4" />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent sticky="always">
                                    <p>{item.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    ))}
                </Dock>
            </TooltipProvider>
        </div>
    );
};

export default WithNav;
