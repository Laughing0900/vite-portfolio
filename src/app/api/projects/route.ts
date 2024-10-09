import { isFullPage } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NextResponse } from "next/server";
import notion, {
    activeFilter,
    getPropertyValue,
    projectDatabaseId,
} from "@/services/notion";

export async function GET() {
    const data = await notion.databases.query({
        database_id: projectDatabaseId,
        filter: activeFilter,
        sorts: [
            {
                property: "Published_day",
                direction: "descending",
            },
        ],
    });

    const formatter = data.results.map((result) => {
        if (!isFullPage(result)) {
            return {};
        }

        const page = result as PageObjectResponse;
        const properties = page.properties;

        return {
            name: getPropertyValue(properties.Name, "title"),
            company: getPropertyValue(properties.Company, "rich_text"),
            imageId: getPropertyValue(properties.Drive_Id, "rich_text"),
            href: getPropertyValue(properties.Href, "url"),
            id: getPropertyValue(properties.url_id, "rich_text"),
        };
    });

    return NextResponse.json({ status: 200, body: formatter });
}
