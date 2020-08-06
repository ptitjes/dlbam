import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import React from "react"

import { Banner } from "../../components/Banner"
import { Container } from "../../components/Container"
import { Page, getAllPages, getPageBySlug } from "../../lib/api"

const SECTION_SLUG = "classes"

interface SimplePageProps {
  page: Page
}

const SimplePage: NextPage<SimplePageProps> = ({ page }) => {
  const { title, image, imagePosition, content } = page

  return (
    <>
      <Banner title={title} imagePath={image && image.url} imagePosition={imagePosition} />
      <Container>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<SimplePageProps> = async ({ params }) => {
  const slug = (params ? params["slug"] : "") as string
  const page = await getPageBySlug(slug)
  return { props: { page } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getAllPages(SECTION_SLUG)
  const paths = pages.map((page) => `/${SECTION_SLUG}/${page.slug}`)
  return { paths, fallback: false }
}

export default SimplePage
