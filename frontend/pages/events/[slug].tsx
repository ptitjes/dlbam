import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import React from "react"

import Markdown from "../../components/Markdown"
import { Banner, Container } from "../../components/layout"
import { PageSeo } from "../../components/seo"
import { Event, getAllEvents, getEventBySlug } from "../../lib/api"

interface EventPageProps {
  event: Event
}

const EventPage: NextPage<EventPageProps> = ({ event }) => {
  const { title, date, image, imagePosition, content } = event

  return (
    <>
      <PageSeo title={title} description={`Événement du ${date} – ${title}`} image={image} />
      <Banner title={title} image={image} imagePosition={imagePosition} />
      <Container>
        <Markdown content={content} />
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<EventPageProps> = async ({ params }) => {
  const slug = (params ? params["slug"] : "") as string
  const event = await getEventBySlug(slug)
  if (event) return { props: { event } }
  throw new Error("Unknown event")
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getAllEvents()
  const paths = events.map((event) => `/events/${event.slug}`)
  return { paths, fallback: false }
}

export default EventPage
