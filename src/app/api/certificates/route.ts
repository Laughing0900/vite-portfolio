import { isFullPage } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NextResponse } from "next/server";
import { CertificateType } from "@/components/certificate/type/certificateTypes";
import notion, {
    activeFilter,
    certDatabaseId,
    getPropertyDate,
    getPropertyValue,
} from "@/services/notion";

export async function GET() {
    const data = await notion.databases.query({
        database_id: certDatabaseId,
        filter: activeFilter,
        sorts: [
            {
                property: "Issue_day",
                direction: "descending",
            },
        ],
    });

    const formatter = data.results.reduce(
        (
            acc: {
                certification: CertificateType[];
                education: CertificateType[];
            },
            result
        ) => {
            if (!isFullPage(result)) {
                return acc;
            }

            const page = result as PageObjectResponse;
            const properties = page.properties;

            const data = {
                title: getPropertyValue(properties.Title, "title"),
                issue_day: getPropertyDate(properties.Issue_day, "date"),
                institution: getPropertyValue(
                    properties.Institution,
                    "rich_text"
                ),
                imageId: getPropertyValue(properties.Drive_Id, "rich_text"),
                href: getPropertyValue(properties.Href, "rich_text"),
            };

            const category =
                properties.Category.type === "select"
                    ? properties.Category.select?.name
                    : "";

            if (category === "Certification") {
                acc.certification.push(data);
            } else {
                acc.education.push(data);
            }

            return acc;
        },
        {
            certification: [],
            education: [],
        }
    );

    return NextResponse.json({ status: 200, body: formatter });
}
