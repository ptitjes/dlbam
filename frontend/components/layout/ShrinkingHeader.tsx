import React from "react"
import styled from "styled-components"

const HeaderDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;

  transition: 0.2s;

  background-color: transparent;
  height: ${(props) => props.theme.sizes.headerLargeSize}px;

  .shrunk &:not(.menu-open) {
    background-color: ${(props) => props.theme.colors.banner};
    height: ${(props) => props.theme.sizes.headerSmallSize}px;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  align-content: center;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: stretch;

    & > * {
      flex-grow: 1;
    }
  }
`

const ShrinkingHeader: React.FC<{ menuOpen: boolean }> = ({ children, menuOpen }) => {
  return (
    <HeaderDiv className={menuOpen ? "menu-open" : ""}>
      <div>{children}</div>
    </HeaderDiv>
  )
}

export default ShrinkingHeader
