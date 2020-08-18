import React from "react"
import styled from "styled-components"

import { Media, MediaFormatName, imageTagProperties, mediaUrl } from "../../lib/strapi"

const bannerHeight = 300

interface BannerContainerProps {
  fullScreen?: boolean
}

const BannerContainer = styled.div<BannerContainerProps>`
  height: ${(props) =>
    props.fullScreen ? `calc(100vh - ${props.theme.sizes.headerLargeSize}px)` : `${bannerHeight}px`};
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
  fullScreen?: boolean
  position?: string
}

const BannerImage = styled.img<BannerImageProps>`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${(props) => (props.fullScreen ? "100%" : `${props.theme.sizes.headerLargeSize + bannerHeight}px`)};
  object-fit: cover;
  object-position: ${(props) => props.position || "center 20%"};
  filter: brightness(66%);
`

interface BannerVideoProps {
  fullScreen?: boolean
  position?: string
}

const BannerVideo = styled.video<BannerVideoProps>`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${(props) => (props.fullScreen ? "100%" : `${props.theme.sizes.headerLargeSize + bannerHeight}px`)};
  object-fit: cover;
  object-position: ${(props) => props.position || "center 20%"};
  filter: brightness(66%);
`

interface BannerImagePlaceholderProps {
  fullScreen?: boolean
}

const BannerImagePlaceholder = styled.div<BannerImagePlaceholderProps>`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${(props) => (props.fullScreen ? "100%" : `${props.theme.sizes.headerLargeSize + bannerHeight}px`)};
  background-color: ${(props) => props.theme.colors.banner};
`

interface BannerProps {
  surtitle?: string
  title?: string

  fullScreen?: boolean

  image?: Media
  imageFormat?: MediaFormatName
  imagePosition?: string
}

export const Banner: React.FC<BannerProps> = ({ surtitle, title, fullScreen, image, imageFormat, imagePosition }) => {
  return (
    <BannerContainer fullScreen={fullScreen}>
      {image ? (
        !image.mime.startsWith("video/") ? (
          <BannerImage
            fullScreen={fullScreen}
            {...imageTagProperties(image, imageFormat, "100vw")}
            position={imagePosition}
          />
        ) : (
          <BannerVideo fullScreen={fullScreen} position={imagePosition} autoPlay muted loop>
            <source src={mediaUrl(image)} type={image.mime} />
          </BannerVideo>
        )
      ) : (
        <BannerImagePlaceholder fullScreen={fullScreen} />
      )}
      <TitleContainer>
        {surtitle && <Surtitle>{surtitle}</Surtitle>}
        {title && <Title>{title}</Title>}
      </TitleContainer>
    </BannerContainer>
  )
}

export default Banner
