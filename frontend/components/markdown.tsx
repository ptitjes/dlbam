import React from "react"
import rehypeParse from "rehype-parse"
import remarkExternalLinks from "remark-external-links"
import remarkParse from "remark-parse"
import remarkReact from "remark-react"
import remarkSlug from "remark-slug"
import unified from "unified"

import { remarkMiniToc } from "../lib/remark-mini-toc"
import Accordion from "./layout/Accordion"
import { VideoGrid, YoutubeVideo } from "./video"

export interface ProvidedComponents {
  [name: string]: React.FC<any>
}

const baseComponents: ProvidedComponents = {
  accordion: Accordion,
  "video-grid": VideoGrid,
  "youtube-video": YoutubeVideo,
}

const rehypeParser = unified().use(rehypeParse, { fragment: true })

interface MarkdownContentProps {
  content: string
  toc?: boolean
  components?: ProvidedComponents
}

export const Markdown: React.FC<MarkdownContentProps> = ({ content, toc = false, components }) => {
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
      remarkReactComponents: { ...components, ...baseComponents },
      sanitize: false,
    })

  return <>{transformer.processSync(content).contents}</>
}
