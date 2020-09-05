import React from "react"
import styled from "styled-components"

const BurgerIconContainer = styled.div`
  margin: 1em;
  width: 24px;
  margin: 10px 10px;

  &:after,
  &:before,
  & div {
    background-color: #fff;
    border-radius: 3px;
    content: "";
    display: block;
    height: 3px;
    margin: 5px 0;
    transition: all 0.2s ease-in-out;
  }

  &.menu-open:before {
    transform: translateY(8px) rotate(135deg);
  }

  &.menu-open:after {
    transform: translateY(-8px) rotate(-135deg);
  }

  &.menu-open div {
    transform: scale(0);
  }
`

export const BurgerIcon: React.FC<{
  menuOpen: boolean
  setMenuOpen: (f: (open: boolean) => boolean) => void
}> = ({ menuOpen, setMenuOpen }) => {
  return (
    <BurgerIconContainer
      className={`hidden@s ${menuOpen ? "menu-open" : ""}`}
      onClick={() => setMenuOpen((open) => !open)}
    >
      <div></div>
    </BurgerIconContainer>
  )
}
