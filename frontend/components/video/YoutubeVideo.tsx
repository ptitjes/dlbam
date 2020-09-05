import React from "react"
import styled from "styled-components"

const YoutubeVideoContainer = styled.div`
  .aspect-ratio {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;

    iframe {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
  .caption {
    width: 100%;
    margin: 10px 0;
    font-size: 0.9rem;
    text-align: center;
  }
`

const YoutubeVideo: React.FC<{ id: string }> = ({ id, children }) => {
  return (
    <YoutubeVideoContainer>
      <div className="aspect-ratio">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={children?.toString()}
          frameBorder="0"
          allowFullScreen
        />
      </div>
      <div className="caption">{children}</div>
    </YoutubeVideoContainer>
  )
}

export default YoutubeVideo
