import React from "react"
import styled from "styled-components"

import { Media, MediaFormatName, mediaUrl } from "../../lib/strapi"

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

const Surtitle = styled.p`
  font-family: Coiny;
  font-size: 30px;
  line-height: 0.9;
  font-weight: normal;
  text-align: center;
  color: ghostwhite;
  margin-bottom: -24px;
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
  surtitle?: string
  title?: string

  image?: Media
  imageFormat?: MediaFormatName
  imagePosition?: string
}

export const Banner: React.FC<BannerProps> = ({ surtitle, title, image, imageFormat, imagePosition }) => {
  return (
    <BannerContainer>
      {image ? (
        <BannerImage src={mediaUrl(image, imageFormat)} alt={image.alternativeText} position={imagePosition} />
      ) : (
        <BannerImagePlaceholder />
      )}
      <TitleContainer>
        {surtitle && <Surtitle>{surtitle}</Surtitle>}
        {title && <Title>{title}</Title>}
      </TitleContainer>
    </BannerContainer>
  )
}

export default Banner
