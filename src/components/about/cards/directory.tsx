import CardContainer from "@/components/about/cards/cardContainer";
import { File, Folder, Tree } from "@/components/ui/file-tree";

type TreeElement = {
    id: string;
    name: string;
    children?: TreeElement[];
};

const DirectoryCard = () => {
    const renderFolderList = (elements: TreeElement[]) => {
        return elements.map((element) => {
            if (element.children) {
                return (
                    <Folder
                        key={element.id}
                        element={element.name}
                        value={element.id}
                    >
                        {renderFolderList(element.children)}
                    </Folder>
                );
            } else {
                return (
                    <File key={element.id} value={element.id}>
                        <p>{element.name}</p>
                    </File>
                );
            }
        });
    };
    return (
        <CardContainer>
            <div className="h-full w-full overflow-hidden">
                <Tree
                    className="overflow-hidden rounded-md bg-background p-2"
                    initialSelectedId="7"
                    initialExpandedItems={["1", "2", "7", "8", "14", "22"]}
                    elements={ELEMENTS}
                >
                    {renderFolderList(ELEMENTS)}
                </Tree>
            </div>
        </CardContainer>
    );
};
export default DirectoryCard;

const ELEMENTS: TreeElement[] = [
    {
        id: "1",
        name: "src",
        children: [
            {
                id: "2",
                name: "public",
                children: [
                    {
                        id: "3",
                        name: "fonts",
                        children: [
                            {
                                id: "4",
                                name: "Cyborg.ttf",
                            },
                        ],
                    },
                    {
                        id: "5",
                        name: "images",
                        children: [
                            {
                                id: "6",
                                name: "icon.svg",
                            },
                        ],
                    },
                ],
            },
            {
                id: "7",
                name: "components",
                children: [
                    {
                        id: "8",
                        name: "about",
                        children: [
                            {
                                id: "9",
                                name: "about.tsx",
                            },
                        ],
                    },
                    {
                        id: "10",
                        name: "certificate",
                        children: [
                            {
                                id: "11",
                                name: "certificate.tsx",
                            },
                        ],
                    },
                    {
                        id: "12",
                        name: "experience",
                        children: [
                            {
                                id: "13",
                                name: "experiences.tsx",
                            },
                        ],
                    },
                    {
                        id: "14",
                        name: "layout",
                        children: [
                            {
                                id: "15",
                                name: "header.tsx",
                            },
                            {
                                id: "16",
                                name: "footer.tsx",
                            },
                        ],
                    },
                    {
                        id: "17",
                        name: "project",
                        children: [
                            {
                                id: "18",
                                name: "project.tsx",
                            },
                            {
                                id: "19",
                                name: "projectCard.tsx",
                            },
                        ],
                    },
                    {
                        id: "20",
                        name: "ui",
                        children: [
                            {
                                id: "21",
                                name: "button.tsx",
                            },
                        ],
                    },
                ],
            },

            {
                id: "22",
                name: "lib",
                children: [
                    {
                        id: "23",
                        name: "utils.ts",
                    },
                    {
                        id: "24",
                        name: "display.ts",
                    },
                ],
            },
            {
                id: "25",
                name: "App.ts",
            },
            {
                id: "26",
                name: "index.ts",
            },
        ],
    },
    {
        id: "27",
        name: "package.json",
    },
    {
        id: "28",
        name: "tsconfig.json",
    },
    {
        id: "29",
        name: "tailwind.config.ts",
    },
    {
        id: "30",
        name: ".eslintrc.cjs",
    },
];
