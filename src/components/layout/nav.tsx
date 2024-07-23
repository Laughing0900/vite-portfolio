import {
    AppWindowMac,
    Building2,
    GraduationCap,
    HomeIcon,
    Send,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/ui/dock";
import Link from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const DATA = {
    contact: {
        project: {
            name: "Projects",
            url: "#",
            icon: AppWindowMac,
        },
        Experience: {
            name: "Experiences",
            url: "#",
            icon: Building2,
        },
        cert: {
            name: "Cert. & Edu.",
            url: "#",
            icon: GraduationCap,
        },
    },
    navbar: [
        {
            href: "mailto:laughing0900@gmail.com",
            icon: Send,
            label: "Contact me",
        },
        { href: "#", icon: HomeIcon, label: "Home" },
    ],
};

const WithNav = () => {
    return (
        <div className="fixed bottom-5 left-0 z-50 w-full">
            <Dock direction="middle">
                {Object.entries(DATA.contact).map(([name, contact]) => (
                    <DockIcon key={name}>
                        <Link
                            href={contact.url}
                            className={cn(
                                buttonVariants({
                                    variant: "ghost",
                                    size: "icon",
                                }),
                                "size-12 rounded-full"
                            )}
                        >
                            <contact.icon className="size-4" />
                        </Link>
                    </DockIcon>
                ))}
                <Separator orientation="vertical" className="h-full" />
                {DATA.navbar.map((item) => (
                    <DockIcon key={item.label}>
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
                    </DockIcon>
                ))}
            </Dock>
        </div>
    );
};

export default WithNav;
