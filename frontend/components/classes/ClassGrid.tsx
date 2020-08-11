import React from "react"
import styled from "styled-components"

import { TwoColumnsGrid } from "../layout"
import { Markdown } from "../markdown"
import { useClassTypeContext } from "./class-type-context"

const ClassGridStyles = styled(TwoColumnsGrid)`
  li {
    padding: 8px;
    border-radius: 16px;
    border: solid 0.5px #e1e1e3;
    box-shadow: 2px 2px 10px #e1e1e3;
  }

  h2,
  p {
    margin: 4px;
  }
`

const ClassGrid: React.FC = () => {
  const { classes } = useClassTypeContext()

  return (
    <ClassGridStyles className={classes.length % 2 === 1 ? "span-first" : ""}>
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
