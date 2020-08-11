import React from "react"
import styled from "styled-components"

import { Article } from "../../lib/api"
import { mediaUrl } from "../../lib/strapi"
import { Markdown } from "../markdown"

const ArticleCardStyles = styled.div`
  border-radius: 16px;
  border: solid 0.5px #e1e1e3;
  box-shadow: 9px 9px 10px #e1e1e3;

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
const ArticleCardImage = styled.img<{ position?: string }>`
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: ${(props) => props.position || "center 20%"};
  filter: brightness(66%);
`

interface ArticleCardProps {
  article: Article
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { title, publicationDate, image, imagePosition, content } = article

  return (
    <ArticleCardStyles>
      <a href={`/events/${article.slug}`}>
        <div className="banner">
          <ArticleCardImage src={`${mediaUrl(image, "large")}`} alt={image.alternativeText} position={imagePosition} />
          <div className="title">
            <h5>{new Date(publicationDate).toLocaleDateString("fr")}</h5>
            <h3>{title}</h3>
          </div>
        </div>

        <div className="container">
          <Markdown content={content} />
        </div>
      </a>
    </ArticleCardStyles>
  )
}

export default ArticleCard
