import React from "react"
import styled from "styled-components"

import { EventCard, useEvents } from "./index"

const EventGridStyles = styled.ul`
  display: grid;
  grid-auto-rows: 400px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 16px;
  row-gap: 16px;
`

interface EventGridProps {}

export const EventGrid: React.FC<EventGridProps> = ({}) => {
  const events = useEvents()
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
