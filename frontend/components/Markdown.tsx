import React from "react"
import rehypeParse from "rehype-parse"
import remarkParse from "remark-parse"
import remarkReact from "remark-react"
import unified from "unified"

import { VideoGrid, YoutubeVideo } from "./video-components"

const baseComponents = {
  "video-grid": VideoGrid,
  "youtube-video": YoutubeVideo,
}

const rehypeParser = unified().use(rehypeParse, { fragment: true })

interface MarkdownContentProps {
  content: string
  components?: { [name: string]: any }
}

const Markdown: React.FC<MarkdownContentProps> = ({ content, components }) => {
  const transformer = unified()
    .use(remarkParse)
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

export default Markdown
