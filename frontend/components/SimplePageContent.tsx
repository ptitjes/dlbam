import { NextPage } from "next"
import React from "react"

import { PageContent } from "../lib/api"
import Markdown, { ProvidedComponents } from "./Markdown"
import { Banner, Container } from "./layout"
import { PageSeo } from "./seo"

export interface SimplePageProps {
  pageContent: PageContent
  toc?: boolean
  components?: ProvidedComponents
}

const SimplePageContent: NextPage<SimplePageProps> = ({ pageContent, toc, components }) => {
  const { title, description, image, imagePosition, content } = pageContent

  return (
    <>
      <PageSeo title={title} description={description} image={image} />
      <Banner title={title} image={image} imagePosition={imagePosition} />
      <Container>
        <Markdown content={content} toc={toc} components={components} />
      </Container>
    </>
  )
}

export default SimplePageContent
