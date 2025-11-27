import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const projects = await getCollection("projects");
  const items = projects
    .map((project) => ({
      title: project.data.title,
      description: project.data.description,
      categories: project.data.categories,
      link: `/projects/${project.slug}/`,
    }));

  return rss({
    title: SITE_TITLE.en,
    description: SITE_DESCRIPTION.en,
    site: context.site,
    items,
  });
}
