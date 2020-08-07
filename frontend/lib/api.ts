import fetch from "isomorphic-fetch"

import markdownToHtml from "./markdown"
import { Media } from "./strapi"

export const { API_URL } = process.env

export interface Section {
  id: number
  title: string
  slug: string
  displayInNavigation: boolean
  pages: Page[]
}

export interface Page {
  id: number
  title: string
  slug: string
  image: Media
  imagePosition: string
  content: string
}

export interface Event {
  title: string
  slug: string
  date: Date
  image: Media
  imagePosition: string
  content: string
}

export interface Article {
  title: string
  slug: string
  publicationDate: Date
  image: Media
  imagePosition: string
  content: string
}

export interface ClassType {
  title: string
  slug: string
  image: Media
  imagePosition: string
  description: string
  classes: Class[]
}

export interface Class {
  id: number
  title: string
  description: string
  price: number
}

export async function getAllSections(): Promise<Section[]> {
  const res = await fetch(`${API_URL}/sections`)
  return await res.json()
}

export async function getAllPages(sectionSlug?: string): Promise<Page[]> {
  const sectionSlugQuery = sectionSlug ? `?section.slug=${sectionSlug}` : ""
  const res = await fetch(`${API_URL}/pages${sectionSlugQuery}`)
  const data = await res.json()
  return await Promise.all(data.map(mapPageElement))
}

export async function getPageBySlug(slug: string): Promise<Page | undefined> {
  const res = await fetch(`${API_URL}/pages?slug=${slug}`)
  const data = await res.json()
  return data.length > 0 ? await mapPageElement(data[0]) : undefined
}

async function mapPageElement(element: any): Promise<Page> {
  return { ...element, content: await markdownToHtml(element.content) }
}

export async function getAllClassTypes(): Promise<ClassType[]> {
  const res = await fetch(`${API_URL}/class-types`)
  const data = await res.json()
  return await Promise.all(data.map(mapClassTypeElement))
}

export async function getClassTypeBySlug(slug: string): Promise<ClassType | undefined> {
  const res = await fetch(`${API_URL}/class-types?slug=${slug}`)
  const data = await res.json()
  return data.length > 0 ? await mapClassTypeElement(data[0]) : undefined
}

async function mapClassTypeElement(element: any): Promise<ClassType> {
  return {
    ...element,
    description: await markdownToHtml(element.description),
    classes: await Promise.all(element.classes.map(mapClassElement)),
  }
}

async function mapClassElement(element: any): Promise<Class> {
  return { ...element, description: await markdownToHtml(element.description) }
}

export async function getAllEvents(): Promise<Event[]> {
  const res = await fetch(`${API_URL}/events`)
  const data = await res.json()
  return Promise.all(data.map(mapEventElement))
}

export async function getEventBySlug(slug: string): Promise<Event> {
  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const data = await res.json()
  const element = data[0]
  return await mapEventElement(element)
}

async function mapEventElement(element: any): Promise<Event> {
  return { ...element, content: await markdownToHtml(element.content) }
}

export async function getAllArticles(): Promise<Article[]> {
  const res = await fetch(`${API_URL}/articles`)
  const data = await res.json()
  return Promise.all(data.map(mapArticleElement))
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  const res = await fetch(`${API_URL}/articles?slug=${slug}`)
  const data = await res.json()
  const element = data[0]
  return await mapArticleElement(element)
}

async function mapArticleElement(element: any): Promise<Article> {
  return { ...element, content: await markdownToHtml(element.content) }
}
