import React from "react"
import styled from "styled-components"

import { Markdown } from "../markdown"
import { breakpoints } from "../theme"
import { useClassTypeContext } from "./class-type-context"

const ClassGridStyles = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 16px;
  row-gap: 16px;

  li {
    padding: 8px;
    border-radius: 16px;
    border: solid 0.5px #e1e1e3;
    box-shadow: 2px 2px 10px #e1e1e3;
  }

  @media (min-width: ${breakpoints.small}px) {
    &.odd-count li:first-child {
      grid-column-end: span 2;
    }
  }

  h2,
  p {
    margin: 4px;
  }
`

const ClassGrid: React.FC = () => {
  const { classes } = useClassTypeContext()

  return (
    <ClassGridStyles className={classes.length % 2 === 1 ? "odd-count" : ""}>
      {classes.map(({ id, title, description }) => (
        <li key={id}>
          <div>
            <h2>{title}</h2>
            <Markdown content={description} />
          </div>
        </li>
      ))}
    </ClassGridStyles>
  )
}

export default ClassGrid
