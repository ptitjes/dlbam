import React from "react"
import styled from "styled-components"

import { FacebookSquare, YoutubeSquare } from "@styled-icons/fa-brands"
import { Envelope, Newspaper, PhoneAlt } from "@styled-icons/fa-solid"

import { Section } from "../../lib/api"
import { Container } from "."

const FooterStyles = styled.div`
  margin-top: 80px;
  background-color: #eeeef5;

  .grid {
    margin-top: 80px;
    margin-bottom: 50px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  }

  .copyright {
    text-align: center;
    font-size: 0.75rem;
  }

  h1 {
    font-size: 1.1rem;
    line-height: 1.4;
  }

  ul {
    list-style: none;
    padding-left: 10px;
  }

  a {
    text-decoration: none;
  }
  svg {
    transform: translate(0, -2px);
  }
`

const Footer: React.FC<{ sections: Section[] }> = ({ sections }) => {
  const misc = sections.find((s) => s.slug === "misc")
  if (!misc) throw new Error("No misc page")

  return (
    <FooterStyles>
      <Container>
        <div className="grid">
          <div>
            <h1>Suivez-nous !</h1>
            <ul>
              <li>
                <a href="">
                  <Newspaper size={20} /> Newsletter
                </a>
              </li>
              <li>
                <a href="https://fb.me/dansons.le.blues.mars" target="_blank">
                  <FacebookSquare size={20} /> Facebook
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UC35nDao3xy7960VImPkZQIg" target="_blank">
                  <YoutubeSquare size={20} /> Youtube
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h1>En savoir plus</h1>
            <ul>
              {misc.pages.map(({ shortTitle, title, slug }) => (
                <li key={slug}>
                  <a href={`/${misc.slug}/${slug}`}>{shortTitle || title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Contact</h1>
            <ul>
              <li>
                <a href="tel:+33625136745">
                  <PhoneAlt size={20} /> 06 25 13 67 45
                </a>
              </li>
              <li>
                <a href="mailto:contact@dlbam.org">
                  <Envelope size={20} /> contact@dlbam.org
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright">Dansons le Blues à Marseille © 2020 Tous droits réservés.</div>
      </Container>
    </FooterStyles>
  )
}

export default Footer
