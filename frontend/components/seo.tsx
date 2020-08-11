import { DefaultSeo, DefaultSeoProps, NextSeo } from "next-seo"
import { useRouter } from "next/router"
import React from "react"

import { Media, mediaFormats, mediaUrl } from "../lib/strapi"

const BASE_URL = "https://dlbam.org"
const SITE_TITLE = "Dansons le Blues à Marseille"

export function makeTitle(title?: string) {
  return title ? `${title} | ${SITE_TITLE}` : SITE_TITLE
}

const globalConfig: DefaultSeoProps = {
  title: makeTitle(),
  description: `Le site de ${SITE_TITLE}`,
  canonical: `${BASE_URL}/`,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${BASE_URL}/`,
    site_name: makeTitle(),
  },
}

export const GlobalSeo: React.FC = () => <DefaultSeo {...globalConfig} />

interface PageSeoProps {
  title?: string
  description: string
  image?: Media
}

export const PageSeo: React.FC<PageSeoProps> = ({ title, description, image }) => {
  const { asPath } = useRouter()
  const url = `${BASE_URL}${asPath}`

  const commonConfig = { title: makeTitle(title), description }

  const imagesConfig = !image
    ? {}
    : {
        images: mediaFormats.map((format) => ({
          url: mediaUrl(image, format),
          width: image.formats[format].width,
          height: image.formats[format].height,
          alt: image.alternativeText,
        })),
      }

  return (
    <NextSeo
      {...commonConfig}
      canonical={url}
      openGraph={{
        url,
        ...commonConfig,
        ...imagesConfig,
      }}
    />
  )
}
