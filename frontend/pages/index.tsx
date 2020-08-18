import { GetStaticProps, NextPage } from "next"
import React from "react"

import { EventsProvider } from "../components/events"
import { Banner, Container } from "../components/layout"
import { Markdown } from "../components/markdown"
import { ArticlesProvider } from "../components/news"
import { PageSeo } from "../components/seo"
import { Article, Event, FrontMatter, getAllArticles, getAllEvents, getFrontMatter } from "../lib/api"
import { Media, getMedia } from "../lib/strapi"
import { eventsPageComponents } from "./events"
import { newsPageComponents } from "./news"

interface HomePageProps {
  image: Media
  frontMatter: FrontMatter
  events: Event[]
  articles: Article[]
}

const homePageComponents = { ...eventsPageComponents, ...newsPageComponents }

const Home: NextPage<HomePageProps> = ({ image, frontMatter, events, articles }) => {
  const { description, content } = frontMatter

  return (
    <EventsProvider events={events}>
      <ArticlesProvider articles={articles}>
        <PageSeo description={description} />
        <Banner fullScreen={true} image={image} imagePosition="66% 20%" />
        <Container>
          <Markdown content={content} components={homePageComponents} />
        </Container>
      </ArticlesProvider>
    </EventsProvider>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const image = await getMedia("notre-dame-de-la-garde.jpg")
  const frontMatter = await getFrontMatter()
  const events = await getAllEvents()
  const articles = await getAllArticles()
  return { props: { image, frontMatter, events, articles }, revalidate: 1 }
}

export default Home
