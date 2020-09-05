import React, { useState } from "react"

import { Section } from "../../lib/api"
import MobileMenu from "./MobileMenu"
import ShrinkingHeader from "./ShrinkingHeader"
import TopNavigation from "./TopNavigation"

const Header: React.FC<{ sections: Section[] }> = ({ sections }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <ShrinkingHeader menuOpen={menuOpen}>
        <TopNavigation sections={sections} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </ShrinkingHeader>
      <MobileMenu sections={sections} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  )
}

export default Header
