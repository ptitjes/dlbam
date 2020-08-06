import React from "react"
import styled from "styled-components"

const LOGO_ASPECT_RATIO = 750 / 513

const LogoImage = styled.img`
  height: ${(props) => props.theme.sizes.headerLargeSize - 20}px;
  filter: invert(1);

  transition: 0.5s;

  .shrunk & {
    height: ${(props) => props.theme.sizes.headerSmallSize - 10}px;
  }
`

const Logo: React.FC = () => {
  return <LogoImage src="/logo-notes-coiny-white.svg" alt="Dansons le Blues à Marseille" />
}

export default Logo
