import { ParsedUrlQuery } from "querystring"

import { NextApiHandler } from "next"
import { SitemapStream, streamToPromise } from "sitemap"

import { getStaticPaths as getAboutStaticPaths } from "../about/[slug]"
import { getStaticPaths as getClassesStaticPaths } from "../classes/[slug]"
import { getStaticPaths as getEventsStaticPaths } from "../events/[slug]"
import { getStaticPaths as getMiscStaticPaths } from "../misc/[slug]"
import { getStaticPaths as getNewsStaticPaths } from "../news/[slug]"

async function addPaths(
  pathsPromise: Promise<{ paths: Array<string | { params: ParsedUrlQuery }> }>,
  smStream: SitemapStream,
) {
  for (const path of (await pathsPromise).paths) {
    if (!(typeof path === "string")) continue

    smStream.write({ url: path })
  }
}

const sitemap: NextApiHandler = async (req, res) => {
  const smStream = new SitemapStream({
    hostname: "https://dlbam.org",
  })

  smStream.write({ url: "/" })

  await addPaths(getAboutStaticPaths(), smStream)

  await addPaths(getClassesStaticPaths(), smStream)

  smStream.write({ url: "/events" })
  await addPaths(getEventsStaticPaths(), smStream)

  smStream.write({ url: "/news" })
  await addPaths(getNewsStaticPaths(), smStream)

  await addPaths(getMiscStaticPaths(), smStream)

  smStream.end()

  const sitemap = await streamToPromise(smStream).then((sm) => sm.toString())

  res.setHeader("Content-Type", "text/xml")
  res.write(sitemap)
  res.end()
}

export default sitemap
