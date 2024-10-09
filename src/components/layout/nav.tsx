import {
    AppWindowMacIcon,
    Building2Icon,
    GraduationCapIcon,
    HomeIcon,
    Laugh,
    Send,
} from "lucide-react";
import { FloatingDock } from "@/components/ui/floating-dock";

const links = [
    {
        title: "This Is Laughing",
        href: "#about-me",
        icon: <Laugh />,
    },
    {
        title: "Projects",
        href: "#project",
        icon: <AppWindowMacIcon />,
    },
    {
        title: "Experiences",
        href: "#experience",
        icon: <Building2Icon />,
    },
    {
        title: "Cert. & Edu.",
        href: "#certificate",
        icon: <GraduationCapIcon />,
    },
    {
        separator: true,
    },
    {
        title: "Contact Me",
        href: "mailto:laughing0900@gmail.com",
        icon: <Send />,
    },
    { href: "/", icon: <HomeIcon />, title: "Home" },
];

const WithNav = () => {
    return (
        <div className="fixed bottom-5 left-0 z-50 w-full">
            <FloatingDock items={links} />
        </div>
    );
};

export default WithNav;
