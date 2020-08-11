import { NextPage } from "next"
import Head from "next/head"
import React from "react"

import { Page } from "../lib/api"
import { makeTitle } from "../lib/seo"
import Markdown from "./Markdown"
import { Banner, Container } from "./layout"

export interface SimplePageProps {
  page: Page
}

const SimplePage: NextPage<SimplePageProps> = ({ page }) => {
  const { title, description, image, imagePosition, content } = page

  return (
    <>
      <Head>
        <title>{makeTitle(title)}</title>
        <meta name="description" content={description} />
      </Head>
      <Banner title={title} image={image} imagePosition={imagePosition} />
      <Container>
        <Markdown content={content} toc={true} />
      </Container>
    </>
  )
}

export default SimplePage
