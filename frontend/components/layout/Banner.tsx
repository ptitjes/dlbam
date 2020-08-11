import React from "react"
import styled from "styled-components"

import { EXTERNAL_API_URL } from "../../lib/strapi"
import { MediaFormat, mediaUrl } from "../../lib/strapi"

const bannerHeight = 300

const BannerContainer = styled.div`
  height: ${bannerHeight}px;
  margin-bottom: 20px;
`

const TitleContainer = styled.div`
  height: ${bannerHeight}px;
  margin-top: ${(props) => props.theme.sizes.headerLargeSize}px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`

const Title = styled.h1`
  font-family: Coiny;
  font-size: 60px;
  line-height: 0.9;
  font-weight: normal;
  text-align: center;
  color: ghostwhite;
`

interface BannerImageProps {
  position?: string
}

const BannerImage = styled.img<BannerImageProps>`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${(props) => props.theme.sizes.headerLargeSize + 300}px;
  object-fit: cover;
  object-position: ${(props) => props.position || "center 20%"};
  filter: brightness(66%);
`

const BannerImagePlaceholder = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${(props) => props.theme.sizes.headerLargeSize + 300}px;
  background-color: ${(props) => props.theme.colors.banner};
`

interface BannerProps {
  title?: string
  image?: MediaFormat
  imagePath?: string
  imagePosition?: string
}

export const Banner: React.FC<BannerProps> = ({ title, image, imagePath, imagePosition }) => {
  return (
    <BannerContainer>
      {image ? (
        <BannerImage src={mediaUrl(image)} position={imagePosition} />
      ) : imagePath ? (
        <BannerImage src={`${EXTERNAL_API_URL}${imagePath}`} position={imagePosition} />
      ) : (
        <BannerImagePlaceholder />
      )}
      <TitleContainer>{title && <Title>{title}</Title>}</TitleContainer>
    </BannerContainer>
  )
}

export default Banner
