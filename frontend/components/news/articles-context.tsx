import React, { createContext, useContext } from "react"

import { Article } from "../../lib/api"
import { throwError } from "../../lib/utils"

const ArticlesContext = createContext<Article[] | undefined>(undefined)

export function useArticles() {
  return useContext(ArticlesContext) ?? throwError("No ArticlesContext!")
}

export const ArticlesProvider: React.FC<{ articles: Article[] }> = ({ articles, children }) => (
  <ArticlesContext.Provider value={articles}>{children}</ArticlesContext.Provider>
)
