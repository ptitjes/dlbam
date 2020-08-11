import React from "react"
import styled from "styled-components"

import { sortBy } from "../../lib/utils"
import { EventCard, useEvents } from "./index"

const EventGridStyles = styled.ul`
  display: grid;
  grid-auto-rows: 400px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 16px;
  row-gap: 16px;
`

interface EventGridProps {
  filter: "future" | "past"
  reversed: boolean
}

export const EventGrid: React.FC<EventGridProps> = ({ filter = "future", reversed = false }) => {
  const now = new Date()
  const events = sortBy(
    useEvents().filter((event) => {
      const isFutureEvent = new Date(event.date) >= now
      return filter === "future" ? isFutureEvent : !isFutureEvent
    }),
    (event) => +new Date(event.date) * (reversed ? -1 : 1),
  )
  return (
    <EventGridStyles>
      {events.map((event) => (
        <li key={event.slug}>
          <EventCard event={event} />
        </li>
      ))}
    </EventGridStyles>
  )
}

export default EventGrid
