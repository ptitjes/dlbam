import React, { createContext, useContext } from "react"

import { Event } from "../../lib/api"
import { throwError } from "../../lib/utils"

const EventsContext = createContext<Event[] | undefined>(undefined)

export function useEvents() {
  return useContext(EventsContext) ?? throwError("No EventsContext!")
}

export const EventsProvider: React.FC<{ events: Event[] }> = ({ events, children }) => (
  <EventsContext.Provider value={events}>{children}</EventsContext.Provider>
)
