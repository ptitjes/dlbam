import { GetStaticProps, NextPage } from "next"
import React from "react"

import { EventGrid, EventsProvider } from "../../components/events"
import { SimplePageContent } from "../../components/layout"
import { Event, Page, getAllEvents, getPageBySlug } from "../../lib/api"
import { throwError } from "../../lib/utils"

interface EventsPageProps {
  events: Event[]
  eventsPage: Page
}

const eventsPageComponents = { "event-grid": EventGrid }

const EventsPage: NextPage<EventsPageProps> = ({ events, eventsPage }) => {
  return (
    <EventsProvider events={events}>
      <SimplePageContent pageContent={eventsPage} components={eventsPageComponents} />
    </EventsProvider>
  )
}

export const getStaticProps: GetStaticProps<EventsPageProps> = async () => {
  const events = await getAllEvents()
  const eventsPage = (await getPageBySlug("events")) ?? throwError("No events page!")
  return { props: { events, eventsPage } }
}

export default EventsPage
