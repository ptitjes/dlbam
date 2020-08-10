import { NextPage } from "next"
import React from "react"

import { Page } from "../lib/api"
import { Banner } from "./Banner"
import { Container } from "./Container"
import Markdown from "./Markdown"

export interface SimplePageProps {
  page: Page
}

const SimplePage: NextPage<SimplePageProps> = ({ page }) => {
  const { title, image, imagePosition, content } = page

  return (
    <>
      <Banner title={title} image={image} imagePosition={imagePosition} />
      <Container>
        <Markdown content={content} toc={true} />
      </Container>
    </>
  )
}

export default SimplePage
