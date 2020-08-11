import { GetStaticProps, NextPage } from "next"
import Head from "next/head"
import React from "react"
import styled from "styled-components"

import Markdown from "../../components/Markdown"
import { Banner, Container } from "../../components/layout"
import { Event, getAllEvents } from "../../lib/api"
import { makeTitle } from "../../lib/seo"
import { mediaUrl } from "../../lib/strapi"

const EventCardStyles = styled.div`
  border-radius: 16px;
  border: solid 0.5px #e1e1e3;
  box-shadow: 2px 2px 10px #e1e1e3;

  height: 100%;
  display: flex;
  flex-flow: column;

  position: relative;
  overflow: hidden;

  &:after {
    content: "";
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 1.5em;
    background: linear-gradient(to bottom, transparent, ghostwhite 75%);
  }

  a {
    color: unset;
    text-decoration: none;
  }

  .banner {
    display: flex;
    align-items: center;
    position: relative;

    img {
      border-radius: 16px 16px 0 0;
    }

    .title {
      position: absolute;
      top: 60%;
      margin-top: auto;
      width: 100%;
      text-align: center;

      color: ghostwhite;

      * {
        margin: 0;
      }
    }
  }

  .container {
    padding: 8px 16px;
    text-overflow: ellipsis;
  }
`

const EventCardImage = styled.img<{ position?: string }>`
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: ${(props) => props.position || "center 20%"};
  filter: brightness(66%);
`

interface EventCardProps {
  event: Event
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { title, date, image, imagePosition, content } = event

  return (
    <EventCardStyles>
      <a href={`/events/${event.slug}`}>
        <div className="banner">
          <EventCardImage src={`${mediaUrl(image, "large")}`} alt={image.alternativeText} position={imagePosition} />
          <div className="title">
            <h5>{new Date(date).toLocaleDateString("fr")}</h5>
            <h3>{title}</h3>
          </div>
        </div>

        <div className="container">
          <Markdown content={content} />
        </div>
      </a>
    </EventCardStyles>
  )
}

const EventGridList = styled.ul`
  display: grid;
  grid-auto-rows: 400px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 16px;
  row-gap: 16px;
`

interface EventsPageProps {
  events: Event[]
}

const EventsPage: NextPage<EventsPageProps> = ({ events }) => {
  return (
    <>
      <Head>
        <title>{makeTitle("Les événements")}</title>
        <meta name="description" content="Les événements de Dansons le Blues à Marseille" />
      </Head>
      <Banner imagePath="/uploads/events_major_blues_4579ee317d.jpg" imagePosition="center 33%" title="Événements" />
      <Container>
        <h1>Prochains événements</h1>
        <EventGridList>
          {events.map((event) => (
            <li key={event.slug}>
              <EventCard event={event} />
            </li>
          ))}
        </EventGridList>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<EventsPageProps> = async () => {
  const events = await getAllEvents()
  return { props: { events } }
}

export default EventsPage
