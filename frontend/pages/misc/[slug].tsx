import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import React from "react"

import SimplePage from "../../components/SimplePage"
import { Page, getAllPages, getPageBySlug } from "../../lib/api"

const SECTION_SLUG = "misc"

interface MiscPageProps {
  page: Page
}

const MiscPage: NextPage<MiscPageProps> = ({ page }) => {
  return <SimplePage page={page} />
}

export const getStaticProps: GetStaticProps<MiscPageProps> = async ({ params }) => {
  const slug = (params ? params["slug"] : "") as string
  const page = await getPageBySlug(slug)
  if (page) return { props: { page } }
  throw new Error("Unknown page")
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getAllPages(SECTION_SLUG)
  const paths = pages.map((page) => `/${SECTION_SLUG}/${page.slug}`)
  return { paths, fallback: false }
}

export default MiscPage
