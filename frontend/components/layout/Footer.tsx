import React from "react"
import { FaEnvelope, FaFacebookSquare, FaNewspaper, FaPhoneAlt, FaYoutubeSquare } from "react-icons/fa"
import styled from "styled-components"

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
  }

  ul {
    list-style: none;
    padding-left: 10px;
  }

  a {
    text-decoration: none;
  }
  svg {
    transform: translate(0, 3px);
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
            <h3>Suivez-nous !</h3>
            <ul>
              <li>
                <a href="">
                  <FaNewspaper /> Newsletter
                </a>
              </li>
              <li>
                <a href="https://fb.me/dansons.le.blues.mars">
                  <FaFacebookSquare /> Facebook
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UC35nDao3xy7960VImPkZQIg">
                  <FaYoutubeSquare /> Youtube
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3>En savoir plus</h3>
            <ul>
              {misc.pages.map(({ shortTitle, title, slug }) => (
                <li key={slug}>
                  <a href={`/${misc.slug}/${slug}`}>{shortTitle || title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li>
                <a href="tel:+33625136745">
                  <FaPhoneAlt /> 06 25 13 67 45
                </a>
              </li>
              <li>
                <a href="mailto:contact@dlbam.org">
                  <FaEnvelope /> contact@dlbam.org
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
