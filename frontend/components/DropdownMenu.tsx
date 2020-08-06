import React, { MouseEventHandler, useRef, useState } from "react"
import styled from "styled-components"

const DropdownRoot = styled.div`
  position: relative;

  // centered version
  margin-left: -8px;
`

const DropdownContainer = styled.div`
  position: absolute;
  top: 15px;

  // centered version
  left: 50%;
  margin-left: -100px;

  // left aligned version
  // left: 0;
  // margin-left: -12px;

  padding: 5px;
  padding-bottom: 10px;
  min-width: 200px;

  z-index: 5;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;

  background-color: ${(props) => props.theme.colors.banner};
  border-radius: 4px;
  box-shadow: 0px 0px 8px 0 #f8f8ff99;

  &:before {
    content: " ";
    position: absolute;
    top: -5px;

    // centered version
    left: 50%;

    // left aligned version
    // left: 50px;

    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.banner};
    box-shadow: 4px 4px 8px -2px #f8f8ff99;
    transform: rotate(-135deg);
    z-index: 5;
  }
`

interface DropdownMenuProps {
  title: string
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, children }) => {
  const [visible, setVisible] = useState(false)
  const leaveTimeoutHandle = useRef<number | undefined>()

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault()
    setVisible((prevState) => !prevState)
  }

  const handleMouseEnter: MouseEventHandler = () => {
    if (leaveTimeoutHandle.current) {
      clearTimeout(leaveTimeoutHandle.current)
      leaveTimeoutHandle.current = undefined
    }
    setVisible(true)
  }

  const handleMouseLeave: MouseEventHandler = () => {
    leaveTimeoutHandle.current = setTimeout(() => setVisible(false), 0)
  }

  return (
    <>
      <a href="#" onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {title}
      </a>
      <DropdownRoot style={{ visibility: visible ? "visible" : "hidden" }}>
        <DropdownContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {children}
        </DropdownContainer>
      </DropdownRoot>
    </>
  )
}
