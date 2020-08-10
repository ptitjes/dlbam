import { Plugin, Settings } from "unified"
import { Node, Parent } from "unist"
import convert from "unist-util-is/convert"
import visit from "unist-util-visit"

const isHeading = convert("heading")

function isParent(node: Node): node is Parent {
  return !!node.children
}

interface MiniTocSettings extends Settings {
  toc: boolean
}

export const remarkMiniToc: Plugin<[MiniTocSettings]> = ({ toc }) => (node) => {
  if (!toc || !isParent(node)) return

  const tocNodes: Node[] = []

  visit(node, "heading", (child: Node) => {
    if (isHeading(child) && child.depth === 1 && child.data && isParent(child)) {
      tocNodes.push({
        type: "link",
        title: null,
        url: `#${child.data.id}`,
        children: all(child.children),
      })
    }
  })

  if (tocNodes.length > 0) {
    const bar = (): Node => ({ type: "text", value: " | " })
    const toc = {
      type: "paragraph",
      children: [...tocNodes.map((e) => [bar(), e]).flat(), bar()],
    }

    node.children = [toc, ...node.children]
  }
}

function all(children: Node[] | undefined) {
  if (!children) return []

  let result: Node[] = []
  let length = children.length
  let index = -1

  while (++index < length) {
    result = result.concat(one(children[index]))
  }

  return result
}

function one(node: Node) {
  let copy

  if (
    node.type === "link" ||
    node.type === "linkReference" ||
    node.type === "footnote" ||
    node.type === "footnoteReference"
  ) {
    return all((node as Parent).children)
  }

  copy = Object.assign({}, node)

  delete copy.children
  delete copy.position

  copy = Object.assign(true, {}, copy)

  if (node.children) {
    copy.children = all((node as Parent).children)
  }

  return copy
}
