import { MetadataRoute } from "next";
import { API_ENDPOINT, BASE_URL } from "@/consts/apis";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const data = await fetch(API_ENDPOINT + "projects").then((res) =>
        res.json()
    );
    const projects = data.body;

    const projectSitemap = projects.map((project: any) => ({
        url: `${BASE_URL}/project/${project.id}`,
        changeFrequency: "yearly",
        priority: 0.8,
    }));

    return [
        {
            url: "laughing-portfolio.vercel.app",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        ...projectSitemap,
    ];
}
