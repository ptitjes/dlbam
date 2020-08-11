import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import React from "react"

import { SimplePageContent } from "../../components/layout"
import { Article, getAllArticles, getArticleBySlug } from "../../lib/api"

interface ArticlePageProps {
  article: Article
}

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {
  const { title, publicationDate } = article

  return <SimplePageContent pageContent={{ ...article, description: `Actualité du ${publicationDate} – ${title}` }} />
}

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({ params, preview }) => {
  const slug = (params ? params["slug"] : "") as string
  const article = await getArticleBySlug(slug, preview)
  if (article) return { props: { article }, revalidate: 1 }
  throw new Error("Unknown article")
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getAllArticles()
  const paths = articles.map((article) => `/news/${article.slug}`)
  return { paths, fallback: true }
}

export default ArticlePage
