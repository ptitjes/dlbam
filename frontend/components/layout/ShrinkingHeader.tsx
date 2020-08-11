import React from "react"
import styled from "styled-components"

const HeaderDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  color: ghostwhite;
  font-family: Coiny;
  font-size: 1rem;
  font-weight: normal;

  transition: 0.5s;

  background-color: transparent;
  height: ${(props) => props.theme.sizes.headerLargeSize}px;

  .shrunk & {
    background-color: ${(props) => props.theme.colors.banner};
    height: ${(props) => props.theme.sizes.headerSmallSize}px;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  align-content: center;

  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: stretch;

    & * {
      flex-grow: 1;
    }
  }
`

const ShrinkingHeader: React.FC = ({ children }) => {
  return (
    <HeaderDiv>
      <div>{children}</div>
    </HeaderDiv>
  )
}

export default ShrinkingHeader
