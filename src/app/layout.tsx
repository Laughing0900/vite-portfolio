import { Metadata } from "next";
import "./index.css";

export const metadata: Metadata = {
    title: "Laughing's Portfolio",
    description:
        "Laughing's showcasing innovative web projects. Explore my portfolio for creative solutions, user-friendly interfaces, and cutting-edge web technologies. Available for exciting job opportunities.",
    keywords:
        "Frontend Developer, Web Development, React, Animation, Responsive Design, Portfolio, BlockChain, Web3",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    );
}
