import React from "react"
import styled from "styled-components"

import { sortBy } from "../../lib/utils"
import { TwoColumnsGrid } from "../layout"
import { useArticles } from "./articles-context"
import { ArticleCard } from "./index"

const ArticleGridList = styled(TwoColumnsGrid)`
  grid-auto-rows: 400px;
  margin: 24px 0;
`

interface ArticleGridProps {
  limit?: number
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ limit }) => {
  const articles = sortBy(useArticles(), (article) => -new Date(article.publicationDate)).slice(0, limit)

  return (
    <ArticleGridList className={articles.length % 2 === 1 ? "span-first" : ""}>
      {articles.map((article) => (
        <li key={article.slug}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ArticleGridList>
  )
}

export default ArticleGrid
