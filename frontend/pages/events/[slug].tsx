import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import React from "react"

import { SimplePageContent } from "../../components/layout"
import { Event, getAllEvents, getEventBySlug } from "../../lib/api"

interface EventPageProps {
  event: Event
}

const EventPage: NextPage<EventPageProps> = ({ event }) => {
  const { title, date } = event
  const dateString = new Date(date).toLocaleDateString("fr-FR")

  return (
    <SimplePageContent
      pageContent={{ ...event, surtitle: dateString, description: `Événement du ${dateString} – ${title}` }}
    />
  )
}

export const getStaticProps: GetStaticProps<EventPageProps> = async ({ params, preview }) => {
  const slug = (params ? params["slug"] : "") as string
  const event = await getEventBySlug(slug, preview)
  if (event) return { props: { event }, revalidate: 1 }
  throw new Error("Unknown event")
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getAllEvents()
  const paths = events.map((event) => `/events/${event.slug}`)
  return { paths, fallback: true }
}

export default EventPage
