import { isFullPage } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";
import notion, {
    getPropertyMultiSelect,
    getPropertyValue,
    projectDatabaseId,
} from "@/services/notion";

const getFilesProperty = (prop: any) =>
    prop.type === "files"
        ? prop.files.map((file: { name: string }) => file.name)
        : [];

const getUrlProperty = (prop: any) => (prop.type === "url" ? prop.url : "");

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ status: 404, body: {} });
    }

    const data = await notion.databases.query({
        database_id: projectDatabaseId,
        filter: {
            property: "url_id",
            rich_text: {
                equals: id,
            },
        },
    });

    if (!isFullPage(data.results[0])) {
        return NextResponse.json({ status: 404, body: {} });
    }

    const res = data.results[0].properties;

    const techStack = getPropertyMultiSelect(res.skill_stacks);

    const projectImage = getFilesProperty(res.project_image);
    console.log(res);

    const formatter = {
        name: getPropertyValue(res.Name, "title"),
        company: getPropertyValue(res.Company, "rich_text"),
        imageId: getPropertyValue(res.Drive_Id, "rich_text"),
        href: getUrlProperty(res.Href),
        content: getPropertyValue(res.content, "rich_text"),
        techStack: techStack,
        projectImage: projectImage,
    };

    return NextResponse.json({ status: 200, body: formatter });
}
