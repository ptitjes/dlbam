import { NextPage } from "next"
import React from "react"

import { Page } from "../lib/api"
import Markdown from "./Markdown"
import { Banner, Container } from "./layout"
import { PageSeo } from "./seo"

export interface SimplePageProps {
  page: Page
}

const SimplePage: NextPage<SimplePageProps> = ({ page }) => {
  const { title, description, image, imagePosition, content } = page

  return (
    <>
      <PageSeo title={title} description={description} />
      <Banner title={title} image={image} imagePosition={imagePosition} />
      <Container>
        <Markdown content={content} toc={true} />
      </Container>
    </>
  )
}

export default SimplePage
