import { NextPage } from "next"
import { Banner } from "./Banner"
import { Container } from "./Container"
import React from "react"
import { Page } from "../lib/api"

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

export default SimplePage
