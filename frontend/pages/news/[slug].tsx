import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import React from "react"

import { Banner } from "../../components/Banner"
import { Container } from "../../components/Container"
import Markdown from "../../components/Markdown"
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
        <Markdown content={content} />
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({ params }) => {
  const slug = (params ? params["slug"] : "") as string
  const article = await getArticleBySlug(slug)
  if (article) return { props: { article } }
  throw new Error("Unknown article")
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getAllArticles()
  const paths = articles.map((article) => `/news/${article.slug}`)
  return { paths, fallback: false }
}

export default ArticlePage
