import { isFullPage } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NextResponse } from "next/server";
import notion, {
    activeFilter,
    expDatabaseId,
    getPropertyDate,
    getPropertyDateEnd,
    getPropertyMultiSelect,
    getPropertyValue,
} from "@/services/notion";

export async function GET() {
    const data = await notion.databases.query({
        database_id: expDatabaseId,
        filter: activeFilter,
        sorts: [
            {
                property: "Duration",
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
            role: getPropertyValue(properties.Role, "rich_text"),
            from: getPropertyDate(properties.Duration, "date"),
            to: getPropertyDateEnd(properties.Duration, "date") || "Present",
            description: getPropertyValue(properties.Description, "rich_text"),
            techStack: getPropertyMultiSelect(properties.Skills),
        };
    });

    return NextResponse.json({ status: 200, body: formatter });
}
