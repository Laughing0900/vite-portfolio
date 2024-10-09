import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
export default notion;

export const certDatabaseId = process.env.CERT_DATABASE_ID || "";
export const educationDatabaseId = process.env.EDUCATION_DATABASE_ID || "";
export const projectDatabaseId = process.env.PROJECT_DATABASE_ID || "";

export const activeFilter = {
    property: "Active",
    checkbox: {
        equals: true,
    },
};

export const getPropertyValue = (
    prop: any,
    type: string,
    key: string = "plain_text"
) => (prop.type === type && prop[type].length > 0 ? prop[type][0][key] : "");

export const getPropertyDate = (prop: any, type: string) =>
    prop.type === type ? prop[type].start : "";
