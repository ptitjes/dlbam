import React from "react"
import rehypeParse from "rehype-parse"
import remarkExternalLinks from "remark-external-links"
import remarkParse from "remark-parse"
import remarkReact from "remark-react"
import remarkSlug from "remark-slug"
import unified from "unified"

import { remarkMiniToc } from "../lib/remark-mini-toc"
import { markdownComponents } from "./markdown-components"

const rehypeParser = unified().use(rehypeParse, { fragment: true })

interface MarkdownContentProps {
  content: string
  toc?: boolean
  components?: { [name: string]: any }
}

const Markdown: React.FC<MarkdownContentProps> = ({ content, toc = false, components }) => {
  const transformer = unified()
    .use(remarkParse)
    .use(remarkSlug)
    .use(remarkMiniToc, { toc })
    .use(remarkExternalLinks)
    .use(remarkReact, {
      createElement: React.createElement,
      toHast: {
        handlers: {
          html: (h: any, node: any) => rehypeParser.parse(node.value).children,
        },
      },
      remarkReactComponents: { ...components, ...markdownComponents },
      sanitize: false,
    })

  return <>{transformer.processSync(content).contents}</>
}

export default Markdown
