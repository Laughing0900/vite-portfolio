import { MetadataRoute } from "next";
import { ProjectCardProps } from "@/components/project/types/projectTypes";
import { API_ENDPOINT, BASE_URL } from "@/consts/apis";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const data = await fetch(API_ENDPOINT + "projects").then((res) =>
        res.json()
    );
    const projects = data.body;

    let projectSitemap: MetadataRoute.Sitemap = [];
    if (projects && projects.length > 0) {
        projectSitemap = projects.map((project: ProjectCardProps) => ({
            url: `${BASE_URL}/project/${project.id}`,
            changeFrequency: "yearly",
            priority: 0.8,
        }));
    }

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
