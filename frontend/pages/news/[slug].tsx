import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import React from "react"

import Markdown from "../../components/Markdown"
import { Banner, Container } from "../../components/layout"
import { PageSeo } from "../../components/seo"
import { Article, getAllArticles, getArticleBySlug } from "../../lib/api"

interface ArticlePageProps {
  article: Article
}

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {
  const { title, image, imagePosition, content, publicationDate } = article

  return (
    <>
      <PageSeo title={title} description={`Actualité du ${publicationDate} – ${title}`} />
      <Banner title={title} image={image} imagePosition={imagePosition} />
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
