import React from "react"
import styled from "styled-components"

const VideoGrid = styled.div`
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 16px;
  row-gap: 8px;
`

export default VideoGrid
