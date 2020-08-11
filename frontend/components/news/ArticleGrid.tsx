import React from "react"
import styled from "styled-components"

import { useArticles } from "./articles-context"
import { ArticleCard } from "./index"

const ArticleGridList = styled.ul`
  display: grid;
  grid-auto-rows: 400px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 16px;
  row-gap: 16px;
`

interface ArticleGridProps {}

const ArticleGrid: React.FC<ArticleGridProps> = ({}) => {
  const articles = useArticles()
  return (
    <ArticleGridList>
      {articles.map((article) => (
        <li key={article.slug}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ArticleGridList>
  )
}

export default ArticleGrid
