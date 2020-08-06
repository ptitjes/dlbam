import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import React from "react"

import { Banner } from "../../components/Banner"
import { Container } from "../../components/Container"
import { Article, getAllArticles, getArticleBySlug } from "../../lib/api"

interface ArticlePageProps {
  article: Article
}

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {
  const { title, image, imagePosition, content } = article

  return (
    <>
      <Banner title={title} imagePath={image.url} imagePosition={imagePosition} />
      <Container>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({ params }) => {
  const slug = (params ? params["slug"] : "") as string
  const data = await getArticleBySlug(slug)
  return { props: { article: data } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getAllArticles()
  const paths = data.map((page) => `/news/${page.slug}`)
  return { paths, fallback: false }
}

export default ArticlePage
