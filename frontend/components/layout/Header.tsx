import React from "react"

import { Section } from "../../lib/api"
import ShrinkingHeader from "./ShrinkingHeader"
import TopNavigation from "./TopNavigation"

const Header: React.FC<{ sections: Section[] }> = ({ sections }) => {
  return (
    <ShrinkingHeader>
      <TopNavigation sections={sections} />
    </ShrinkingHeader>
  )
}

export default Header
