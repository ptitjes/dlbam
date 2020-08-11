import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import React from "react"

import { SimplePageContent } from "../../components/layout"
import { Page, getAllPages, getPageBySlug } from "../../lib/api"

const SECTION_SLUG = "about"

interface AboutPageProps {
  page: Page
}

const AboutPage: NextPage<AboutPageProps> = ({ page }) => {
  return <SimplePageContent pageContent={page} />
}

export const getStaticProps: GetStaticProps<AboutPageProps> = async ({ params, preview }) => {
  const slug = (params ? params["slug"] : "") as string
  const page = await getPageBySlug(slug, preview)
  if (page) return { props: { page }, revalidate: 1 }
  throw new Error("Unknown page")
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getAllPages(SECTION_SLUG)
  const paths = pages.map((page) => `/${SECTION_SLUG}/${page.slug}`)
  return { paths, fallback: true }
}

export default AboutPage
