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

export function mediaUrl(media: Media, formatName?: MediaFormatName) {
  const mediaFormat = formatName ? media.formats[formatName] : media
  return `${EXTERNAL_API_URL}${mediaFormat.url}`
}
