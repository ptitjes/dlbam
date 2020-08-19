import { Media, findAll, findOne, getSingle } from "./strapi"

export const { INTERNAL_API_URL } = process.env

enum Status {
  Preview = "preview",
  Published = "published",
  Archived = "archived",
}

export interface Content {
  status: Status
}

export interface PageContent extends Content {
  title: string
  surtitle?: string
  description: string
  image: Media
  imagePosition: string
  showToc?: boolean
  content: string
}

export interface FrontMatter extends PageContent {}

export interface Section {
  id: number
  title: string
  slug: string
  displayInNavigation: boolean
  pages: Page[]
}

export interface Page extends PageContent {
  id: number
  shortTitle: string
  slug: string
  section?: Section
}

export interface Event extends Content {
  title: string
  slug: string
  date: string
  image: Media
  imagePosition: string
  content: string
}

export interface Article extends Content {
  title: string
  slug: string
  publicationDate: string
  image: Media
  imagePosition: string
  content: string
}

export interface ClassType extends PageContent {
  slug: string
  classes: Class[]
}

export interface Class {
  id: number
  title: string
  description: string
  price: number
}

export async function getFrontMatter(): Promise<FrontMatter> {
  return getSingle<FrontMatter>("front-matter")
}

export async function getAllSections(): Promise<Section[]> {
  return await findAll<Section>("sections")
}

export async function getAllPages(sectionSlug: string, preview = false): Promise<Page[]> {
  return await findAll<Page>("pages", { section: { slug: sectionSlug }, ...status(preview) })
}

export async function getPageBySlug(slug: string, preview = false): Promise<Page | undefined> {
  return findOne<Page>("pages", { slug, ...status(preview) })
}

export async function getAllClassTypes(preview = false): Promise<ClassType[]> {
  return await findAll<ClassType>("class-types", status(preview))
}

export async function getClassTypeBySlug(slug: string, preview = false): Promise<ClassType | undefined> {
  return findOne<ClassType>("class-types", { slug, ...status(preview) })
}

export async function getAllEvents(preview = false): Promise<Event[]> {
  return await findAll<Event>("events", status(preview))
}

export async function getEventBySlug(slug: string, preview = false): Promise<Event | undefined> {
  return findOne<Event>("events", { slug, ...status(preview) })
}

export async function getAllArticles(preview = false): Promise<Article[]> {
  return await findAll<Article>("articles", status(preview))
}

export async function getArticleBySlug(slug: string, preview = false): Promise<Article | undefined> {
  return findOne<Article>("articles", { slug, ...status(preview) })
}

function status(preview: boolean) {
  return !preview ? { status: Status.Published } : {}
}
