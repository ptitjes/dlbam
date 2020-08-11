import { GetStaticProps, NextPage } from "next"
import React from "react"

import SimplePageContent from "../../components/SimplePageContent"
import { ArticleGrid, ArticlesProvider } from "../../components/news"
import { Article, Page, getAllArticles, getPageBySlug } from "../../lib/api"
import { throwError } from "../../lib/utils"

interface NewsPageProps {
  articles: Article[]
  newsPage: Page
}

const newsPageComponents = { "article-grid": ArticleGrid }

const NewsPage: NextPage<NewsPageProps> = ({ articles, newsPage }) => {
  return (
    <>
      <ArticlesProvider articles={articles}>
        <SimplePageContent pageContent={newsPage} components={newsPageComponents} />
      </ArticlesProvider>
    </>
  )
}

export const getStaticProps: GetStaticProps<NewsPageProps> = async () => {
  const articles = await getAllArticles()
  const newsPage = (await getPageBySlug("news")) ?? throwError("No news page!")
  return { props: { articles, newsPage } }
}

export default NewsPage
