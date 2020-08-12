import fetch from "isomorphic-fetch"

import { INTERNAL_API_URL } from "./api"
import { throwError } from "./utils"

export const { EXTERNAL_API_URL } = process.env

export interface Media extends MediaFormat {
  id: number
  alternativeText: string
  caption: string
  formats: { [name in MediaFormatName]: MediaFormat }
  previewUrl?: string
  provider: string
}

export type MediaFormatName = "thumbnail" | "small" | "medium" | "large"

export const mediaFormats: MediaFormatName[] = ["large", "medium", "small", "thumbnail"]

export interface MediaFormat {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  url: string
}

export async function getMedia(name: string): Promise<Media> {
  const media = await findOne<Media>("upload/files", { name })
  return media ?? throwError(`Can't find media: ${name}`)
}

export function mediaUrl(media: Media, formatName?: MediaFormatName) {
  const mediaFormat = formatName ? media.formats[formatName] : media
  return `${EXTERNAL_API_URL}${mediaFormat.url}`
}

export function imageTagProperties(media: Media, defaultFormat: MediaFormatName = "large", expectedSize: string) {
  const srcSet = mediaFormats.map((format) => `${mediaUrl(media, format)} ${media.formats[format].width}w`).join(", ")
  return { src: mediaUrl(media, defaultFormat), srcSet, sizes: expectedSize, alt: media.alternativeText }
}

export async function findAll<T>(collection: string, query?: DeepPartial<T>): Promise<T[]> {
  const queryString = query ? `?${createQuery(query)}` : ""
  const res = await fetch(`${INTERNAL_API_URL}/${collection}${queryString}`)
  return await res.json()
}

export async function findOne<T>(collection: string, query?: DeepPartial<T>): Promise<T | undefined> {
  const data = await findAll<T>(collection, query)
  return data.length > 0 ? data[0] : undefined
}

export async function getSingle<T>(single: string): Promise<T> {
  const res = await fetch(`${INTERNAL_API_URL}/${single}`)
  return await res.json()
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

function createQuery(query: DeepPartial<any> | any, currentPath: string[] = []): string {
  if (typeof query === "object") {
    return Object.entries(query)
      .map(([key, value]) => createQuery(value, [...currentPath, key]))
      .join("&")
  } else {
    return `${currentPath.join(".")}=${query}`
  }
}
