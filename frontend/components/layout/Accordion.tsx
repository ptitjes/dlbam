import React, { useCallback, useEffect, useRef } from "react"
import styled from "styled-components"

const AccordionStyles = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  .collapsible-header {
    padding: 1rem;
    cursor: pointer;
    user-select: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }

  .collapsible-body {
    box-sizing: border-box;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.15s ease-out;

    font-style: italic;
  }

  .collapsible-body > p {
    padding: 1rem 2rem;
    padding-bottom: 0px;
    margin: 0px;
  }

  .collapsible-body > p:last-child {
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
`

const Accordion: React.FC = ({ children }) => {
  const elementRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(function (this: HTMLDivElement) {
    const thisBody = this.nextElementSibling as HTMLDivElement | null
    if (!thisBody) return

    if (thisBody.style.maxHeight) {
      thisBody.style.maxHeight = ""
    } else {
      thisBody.style.maxHeight = thisBody.scrollHeight + "px"
    }

    const bodies = document.querySelectorAll<HTMLDivElement>(".collapsible-body")
    for (const body of bodies) {
      if (body !== thisBody) body.style.maxHeight = ""
    }
  }, [])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const headers = element.querySelectorAll<HTMLDivElement>(".collapsible-header")
    for (const header of headers) {
      header.addEventListener("click", handleClick)
    }

    return () => {
      const element = elementRef.current
      if (!element) return

      const headers = element.querySelectorAll<HTMLDivElement>(".collapsible-header")
      for (const header of headers) {
        header.removeEventListener("click", handleClick)
      }
    }
  }, [])

  return <AccordionStyles ref={elementRef}>{children}</AccordionStyles>
}

export default Accordion
