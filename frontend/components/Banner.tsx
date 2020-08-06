import React from "react"
import styled from "styled-components"

import { API_URL } from "../lib/api"

const BannerContainer = styled.div`
  height: 300px;
  margin-bottom: 20px;
`

const TitleContainer = styled.div`
  height: 200px;
  margin-top: ${(props) => props.theme.sizes.headerLargeSize}px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.h1`
  font-family: Coiny;
  font-size: 60px;
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
  imagePath?: string
  imagePosition?: string
}

export const Banner: React.FC<BannerProps> = ({ title, imagePath, imagePosition }) => {
  return (
    <BannerContainer>
      {imagePath ? <BannerImage src={`${API_URL}${imagePath}`} position={imagePosition} /> : <BannerImagePlaceholder />}
      <TitleContainer>{title && <Title>{title}</Title>}</TitleContainer>
    </BannerContainer>
  )
}
