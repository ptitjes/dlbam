import fetch from "isomorphic-fetch"

import { Media } from "./strapi"

export const { INTERNAL_API_URL } = process.env

export interface FrontMatter {
  description: string
  content: string
}

export interface PageContent {
  title: string
  surtitle?: string
  description: string
  image: Media
  imagePosition: string
  content: string
}

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
}

export interface Event {
  title: string
  slug: string
  date: string
  image: Media
  imagePosition: string
  content: string
}

export interface Article {
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
  const res = await fetch(`${INTERNAL_API_URL}/front-matter`)
  return await res.json()
}

export async function getAllSections(): Promise<Section[]> {
  const res = await fetch(`${INTERNAL_API_URL}/sections`)
  return await res.json()
}

export async function getAllPages(sectionSlug?: string): Promise<Page[]> {
  const sectionSlugQuery = sectionSlug ? `?section.slug=${sectionSlug}` : ""
  const res = await fetch(`${INTERNAL_API_URL}/pages${sectionSlugQuery}`)
  return await res.json()
}

export async function getPageBySlug(slug: string): Promise<Page | undefined> {
  const res = await fetch(`${INTERNAL_API_URL}/pages?slug=${slug}`)
  const data = await res.json()
  return data.length > 0 ? data[0] : undefined
}

export async function getAllClassTypes(): Promise<ClassType[]> {
  const res = await fetch(`${INTERNAL_API_URL}/class-types`)
  return await res.json()
}

export async function getClassTypeBySlug(slug: string): Promise<ClassType | undefined> {
  const res = await fetch(`${INTERNAL_API_URL}/class-types?slug=${slug}`)
  const data = await res.json()
  return data.length > 0 ? data[0] : undefined
}

export async function getAllEvents(): Promise<Event[]> {
  const res = await fetch(`${INTERNAL_API_URL}/events`)
  return await res.json()
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  const res = await fetch(`${INTERNAL_API_URL}/events?slug=${slug}`)
  const data = await res.json()
  return data.length > 0 ? data[0] : undefined
}

export async function getAllArticles(): Promise<Article[]> {
  const res = await fetch(`${INTERNAL_API_URL}/articles`)
  return await res.json()
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const res = await fetch(`${INTERNAL_API_URL}/articles?slug=${slug}`)
  const data = await res.json()
  return data.length > 0 ? data[0] : undefined
}
