import React from "react"
import styled from "styled-components"

import { ChevronDoubleDown } from "@styled-icons/bootstrap"

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

interface TitleContainerProps {
  fullScreen?: boolean
}

const TitleContainer = styled.div<TitleContainerProps>`
  height: ${(props) =>
    props.fullScreen ? `calc(100vh - ${props.theme.sizes.headerLargeSize}px)` : `${bannerHeight}px`};
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
  font-size: 1.6rem;
  line-height: 0.9;
  font-weight: normal;
  text-align: center;
  color: ghostwhite;
  margin-bottom: -24px;
  padding: 0 10px;
`

const Title = styled.h1`
  font-family: Coiny;
  font-size: 3.3rem;
  line-height: 0.9;
  font-weight: normal;
  text-align: center;
  color: ghostwhite;
  padding: 0 10px;
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

const ScrollIndicatorContainer = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, 0);
  opacity: 0.8;
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
          <BannerVideo fullScreen={fullScreen} position={imagePosition} autoPlay={true} muted={true} loop={true}>
            <source src={mediaUrl(image)} type={image.mime} />
          </BannerVideo>
        )
      ) : (
        <BannerImagePlaceholder fullScreen={fullScreen} />
      )}
      <TitleContainer fullScreen={fullScreen}>
        {surtitle && <Surtitle>{surtitle}</Surtitle>}
        {title && <Title>{title}</Title>}
        {fullScreen && (
          <ScrollIndicatorContainer>
            <ChevronDoubleDown size={40} color="ghostwhite" />
          </ScrollIndicatorContainer>
        )}
      </TitleContainer>
    </BannerContainer>
  )
}

export default Banner
