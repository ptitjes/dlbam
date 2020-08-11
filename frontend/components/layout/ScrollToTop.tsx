import React, { useCallback, useEffect, useState } from "react"
import { FaChevronUp } from "react-icons/fa/index"
import styled from "styled-components"

const ScrollToTopContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 30px;

  pointer-events: none;

  button {
    transition: opacity 200ms ease-in-out, transform 200ms ease-in-out;
    opacity: 0;
    transform: scale(0.001);

    &.visible {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
    }

    svg {
      transform: translate(0, 2px);
    }
  }
`

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false)

  const scrollToTop = useCallback(() => {
    window.scrollTo(0, 0)
  }, [])

  const adjustVisibility = useCallback(() => {
    setVisible(window.scrollY > 100)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", adjustVisibility)
    return () => {
      window.removeEventListener("scroll", adjustVisibility)
    }
  }, [adjustVisibility])

  return (
    <ScrollToTopContainer>
      <button
        className={`mui-btn mui-btn--fab mui-btn--primary ${visible ? "visible" : ""}`}
        aria-label="Remonter en haut de la page"
        onClick={scrollToTop}
      >
        <FaChevronUp />
      </button>
    </ScrollToTopContainer>
  )
}

export default ScrollToTop
