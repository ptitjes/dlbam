import React from "react"
import styled from "styled-components"

const LogoImage = styled.img`
  height: ${(props) => props.theme.sizes.headerLargeSize - 20}px;
  filter: invert(1);

  transition: 0.2s;

  .shrunk &&:not(.menu-open) {
    height: ${(props) => props.theme.sizes.headerSmallSize - 10}px;
  }
`

const Logo: React.FC<{ menuOpen: boolean }> = ({ menuOpen }) => {
  return (
    <LogoImage
      className={menuOpen ? "menu-open" : ""}
      src="/assets/logo-notes-coiny-white.svg"
      alt="Dansons le Blues à Marseille"
    />
  )
}

export default Logo
