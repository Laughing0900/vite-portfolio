import CardContainer from "@/components/about/cards/cardContainer";
import { File, Folder, Tree } from "@/components/ui/file-tree";

const DirectoryCard = () => {
    return (
        <CardContainer>
            <div className="h-full w-full overflow-hidden">
                <Tree
                    className="overflow-hidden rounded-md bg-background p-2"
                    initialSelectedId="7"
                    initialExpandedItems={["1", "2", "7", "8", "14", "22"]}
                    elements={ELEMENTS}
                >
                    <Folder element="src" value="1">
                        <Folder value="2" element="public">
                            <Folder value="3" element="fonts">
                                <File value="4">
                                    <p>Cyborg.ttf</p>
                                </File>
                            </Folder>
                            <Folder value="5" element="images">
                                <File value="6">
                                    <p>icon.svg</p>
                                </File>
                            </Folder>
                        </Folder>

                        <Folder value="7" element="components">
                            <Folder value="8" element="about">
                                <File value="9">
                                    <p>index.tsx</p>
                                </File>
                            </Folder>
                            <Folder value="10" element="certificate">
                                <File value="11">
                                    <p>index.tsx</p>
                                </File>
                            </Folder>
                            <Folder value="12" element="experience">
                                <File value="13">
                                    <p>index.tsx</p>
                                </File>
                            </Folder>
                            <Folder value="14" element="layout">
                                <File value="15">
                                    <p>header.tsx</p>
                                </File>
                                <File value="16">
                                    <p>footer.tsx</p>
                                </File>
                            </Folder>
                            <Folder value="17" element="project">
                                <File value="18">
                                    <p>index.tsx</p>
                                </File>
                                <File value="19">
                                    <p>projectCard.tsx</p>
                                </File>
                            </Folder>
                            <Folder value="20" element="ui">
                                <File value="21">
                                    <p>button.tsx</p>
                                </File>
                            </Folder>
                        </Folder>
                        <Folder value="22" element="lib">
                            <File value="23">
                                <p>utils.ts</p>
                            </File>
                            <File value="24">
                                <p>display.ts</p>
                            </File>
                        </Folder>
                        <File value="25">
                            <p>App.ts</p>
                        </File>
                        <File value="26">
                            <p>index.ts</p>
                        </File>
                    </Folder>
                    <File value="27">
                        <p>package.json</p>
                    </File>
                    <File value="28">
                        <p>tsconfig.json</p>
                    </File>
                    <File value="29">
                        <p>tailwind.config.ts</p>
                    </File>
                    <File value="30">
                        <p>.eslintrc.cjs</p>
                    </File>
                </Tree>
            </div>
        </CardContainer>
    );
};
export default DirectoryCard;

const ELEMENTS = [
    {
        id: "1",
        isSelectable: true,
        name: "src",
        children: [
            {
                id: "2",
                isSelectable: true,
                name: "app",
                children: [
                    {
                        id: "3",
                        isSelectable: true,
                        name: "layout.tsx",
                    },
                    {
                        id: "4",
                        isSelectable: true,
                        name: "page.tsx",
                    },
                ],
            },
            {
                id: "5",
                isSelectable: true,
                name: "components",
                children: [
                    {
                        id: "6",
                        isSelectable: true,
                        name: "header.tsx",
                    },
                    {
                        id: "7",
                        isSelectable: true,
                        name: "footer.tsx",
                    },
                ],
            },
            {
                id: "8",
                isSelectable: true,
                name: "lib",
                children: [
                    {
                        id: "9",
                        isSelectable: true,
                        name: "utils.ts",
                    },
                    {
                        id: "12",
                        isSelectable: true,
                        name: "display.ts",
                    },
                ],
            },
            {
                id: "13",
                isSelectable: true,
                name: "App.ts",
            },
            {
                id: "14",
                isSelectable: true,
                name: "index.ts",
            },
        ],
    },
];
