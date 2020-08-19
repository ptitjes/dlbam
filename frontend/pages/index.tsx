import { GetStaticProps, NextPage } from "next"
import React from "react"

import { EventsProvider } from "../components/events"
import { Banner, Container } from "../components/layout"
import { Markdown } from "../components/markdown"
import { ArticlesProvider } from "../components/news"
import { PageSeo } from "../components/seo"
import { Article, Event, FrontMatter, getAllArticles, getAllEvents, getFrontMatter } from "../lib/api"
import { eventsPageComponents } from "./events"
import { newsPageComponents } from "./news"

interface HomePageProps {
  frontMatter: FrontMatter
  events: Event[]
  articles: Article[]
}

const homePageComponents = { ...eventsPageComponents, ...newsPageComponents }

const Home: NextPage<HomePageProps> = ({ frontMatter, events, articles }) => {
  const { description, title, surtitle, showToc, content, image, imagePosition } = frontMatter

  return (
    <EventsProvider events={events}>
      <ArticlesProvider articles={articles}>
        <PageSeo description={description} />
        <Banner fullScreen={true} image={image} imagePosition={imagePosition} title={title} surtitle={surtitle} />
        <Container>
          <Markdown content={content} toc={showToc} components={homePageComponents} />
        </Container>
      </ArticlesProvider>
    </EventsProvider>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const frontMatter = await getFrontMatter()
  const events = await getAllEvents()
  const articles = await getAllArticles()
  return { props: { frontMatter, events, articles }, revalidate: 1 }
}

export default Home
