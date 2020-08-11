import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import React from "react"

import { SimplePageContent } from "../../components/layout"
import { Event, getAllEvents, getEventBySlug } from "../../lib/api"

interface EventPageProps {
  event: Event
}

const EventPage: NextPage<EventPageProps> = ({ event }) => {
  const { title, date } = event

  return (
    <SimplePageContent
      pageContent={{
        ...event,
        surtitle: new Date(date).toLocaleDateString("fr"),
        description: `Événement du ${date} – ${title}`,
      }}
    />
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
