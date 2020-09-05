import { useRouter } from "next/router"
import React, { useCallback } from "react"
import styled from "styled-components"

import { Section } from "../../lib/api"
import { getSubMenuElements } from "../section-contents"

const MobileMenuContainer = styled.nav`
  position: relative;

  color: ghostwhite;
  font-family: Coiny;
  font-size: 1.1rem;
  font-weight: normal;

  .menu-content {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;

    padding-left: 15px;
    padding-right: 15px;
    padding-top: ${(props) => props.theme.sizes.headerLargeSize}px;

    background-color: ${(props) => props.theme.colors.banner};

    display: flex;
    flex-direction: column;
    justify-content: center;

    transform: translate(0, -100%);
    transition: transform 0.2s ease-in-out;

    &.open {
      transform: translate(0, 0);
    }
  }

  ul {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;

    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;

    &.activated > a {
      opacity: 100%;
      text-decoration: underline;
    }
  }

  li + li {
    border-top: dashed 1px #f8f8ff99;
  }

  span,
  a {
    transition: 0.1s ease-in-out;
    transition-property: color, background-color;

    box-sizing: border-box;
    width: 100%;
    padding: 4px 0;
    border-radius: 8px 8px 0 0;

    text-decoration: none;
    text-align: center;

    color: ghostwhite;

    :hover {
      opacity: 80%;
    }
  }

  ul.submenu {
    flex-grow: 0;

    li {
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: unset;

      border-top: 0;
    }

    a {
      font-size: 1rem;
    }
  }
`

const MenuSection: React.FC<{
  section: Section
  setMenuOpen: (f: (open: boolean) => boolean) => void
}> = ({ section, setMenuOpen }) => {
  const router = useRouter()
  const activated = router.pathname.startsWith(`/${section.slug}`)
  const subMenuElements = getSubMenuElements(section)

  const closeMenu = useCallback(() => setMenuOpen(() => false), [setMenuOpen])

  return (
    <li className={activated ? "activated" : undefined}>
      {subMenuElements.length === 0 ? (
        <a href={`/${section.slug}`} onClick={closeMenu}>
          {section.title}
        </a>
      ) : (
        <>
          <span>{section.title}</span>
          <ul className="submenu">
            {subMenuElements.map(([title, path]) => (
              <li key={path} className={router.asPath === path ? "activated" : undefined}>
                <a href={path} onClick={closeMenu}>
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </li>
  )
}

const MobileMenu: React.FC<{
  sections: Section[]
  menuOpen: boolean
  setMenuOpen: (f: (open: boolean) => boolean) => void
}> = ({ sections, menuOpen, setMenuOpen }) => {
  return (
    <MobileMenuContainer>
      <div className={`menu-content ${menuOpen ? "open" : ""}`}>
        <ul>
          {sections
            .filter((section) => section.displayInNavigation)
            .map((section) => (
              <MenuSection key={section.id} section={section} setMenuOpen={setMenuOpen} />
            ))}
        </ul>
      </div>
    </MobileMenuContainer>
  )
}

export default MobileMenu
