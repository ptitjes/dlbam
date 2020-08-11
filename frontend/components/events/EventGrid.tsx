import React from "react"
import styled from "styled-components"

import { sortBy } from "../../lib/utils"
import { TwoColumnsGrid } from "../layout"
import { EventCard, useEvents } from "./index"

const EventGridStyles = styled(TwoColumnsGrid)`
  grid-auto-rows: 400px;
  margin: 24px 0;
`

interface EventGridProps {
  filter: "future" | "past"
  reversed: boolean
  limit?: number
}

export const EventGrid: React.FC<EventGridProps> = ({ filter = "future", reversed = false, limit }) => {
  const now = new Date()

  const events = sortBy(
    useEvents().filter((event) => {
      const isFutureEvent = new Date(event.date) >= now
      return filter === "future" ? isFutureEvent : !isFutureEvent
    }),
    (event) => +new Date(event.date) * (reversed ? -1 : 1),
  ).slice(0, limit)

  return (
    <EventGridStyles className={events.length % 2 === 1 ? "span-first" : ""}>
      {events.map((event) => (
        <li key={event.slug}>
          <EventCard event={event} />
        </li>
      ))}
    </EventGridStyles>
  )
}

export default EventGrid
