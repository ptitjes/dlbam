import { NextPage } from "next"
import React from "react"

import { PageContent } from "../../lib/api"
import { Markdown, ProvidedComponents } from "../markdown"
import { PageSeo } from "../seo"
import { Banner, Container } from "./index"

export interface SimplePageProps {
  pageContent: PageContent
  toc?: boolean
  components?: ProvidedComponents
}

const SimplePageContent: NextPage<SimplePageProps> = ({ pageContent, toc, components }) => {
  const { surtitle, title, description, image, imagePosition, content } = pageContent

  return (
    <>
      <PageSeo title={title} description={description} image={image} />
      <Banner surtitle={surtitle} title={title} image={image} imagePosition={imagePosition} />
      <Container>
        <Markdown content={content} toc={toc} components={components} />
      </Container>
    </>
  )
}

export default SimplePageContent
