import { Section } from "../lib/api"

const allDynamicContent: { [slug: string]: [string, string][] } = {
  classes: [["Les sessions courtes", "/classes/short-sessions"]],
}

export function getSubMenuElements(section: Section) {
  const staticPages = section.pages

  const staticContent = staticPages.map((page) => [page.title, `/${section.slug}/${page.slug}`])
  const dynamicContent = allDynamicContent[section.slug] || []
  return [...dynamicContent, ...staticContent]
}
