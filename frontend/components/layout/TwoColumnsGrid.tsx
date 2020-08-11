import styled from "styled-components"

import { breakpoints } from "../theme"

const TwoColumnsGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 16px;
  row-gap: 16px;

  @media (min-width: ${breakpoints.small}px) {
    &.span-first li:first-child {
      grid-column-end: span 2;
    }

    li.span {
      grid-column-end: span 2;
    }
  }
`

export default TwoColumnsGrid
