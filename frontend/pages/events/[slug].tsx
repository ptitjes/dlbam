import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import React from "react"

import { Banner } from "../../components/Banner"
import { Container } from "../../components/Container"
import { Event, getAllEvents, getEventBySlug } from "../../lib/api"

interface EventPageProps {
  event: Event
}

const EventPage: NextPage<EventPageProps> = ({ event }) => {
  const { title, image, imagePosition, content } = event

  return (
    <>
      <Banner title={title} imagePath={image.url} imagePosition={imagePosition} />
      <Container>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<EventPageProps> = async ({ params }) => {
  const slug = (params ? params["slug"] : "") as string
  const data = await getEventBySlug(slug)
  return { props: { event: data } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getAllEvents()
  const paths = data.map((page) => `/events/${page.slug}`)
  return { paths, fallback: false }
}

export default EventPage
