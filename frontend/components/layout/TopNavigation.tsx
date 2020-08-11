import { useRouter } from "next/router"
import React from "react"
import { FaBars } from "react-icons/fa"
import styled from "styled-components"

import { Section } from "../../lib/api"
import { DropdownMenu, DropdownMenuContextProvider } from "./DropdownMenu"
import Logo from "./Logo"

const NavigationContainer = styled.nav`
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 960px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (min-width: 640px) {
    padding-left: 30px;
    padding-right: 30px;
  }

  padding-left: 15px;
  padding-right: 15px;

  .navbar-left,
  .navbar-right {
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    flex-grow: 0;
  }

  .navbar-right {
    margin-left: auto;
  }

  display: flex;
  position: relative;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    &.activated > a {
      opacity: 100%;
      text-decoration: underline;
    }
  }

  a {
    transition: 0.1s ease-in-out;
    transition-property: color, background-color;

    box-sizing: border-box;
    min-height: 80px;
    padding: 24px 10px;
    border-radius: 8px 8px 0 0;

    font-size: 0.9rem;
    text-decoration: none;
    text-align: center;

    color: ghostwhite;

    :hover {
      opacity: 80%;
    }
  }

  ul.dropdown {
    flex-direction: column;
    align-items: stretch;

    li {
      display: flex;
      align-items: stretch;
    }

    a {
      min-height: unset;
      padding: 5px 16px;
    }
  }
`

const allDynamicContent: { [slug: string]: [string, string][] } = {
  classes: [["Les sessions courtes", "/classes/short-sessions"]],
}

const NavigationSection: React.FC<{ section: Section }> = ({ section }) => {
  const router = useRouter()

  const activated = router.pathname.startsWith(`/${section.slug}`)

  const hasDynamicContent = false
  const staticPages = section.pages
  const hasSubMenu = hasDynamicContent || staticPages.length > 0

  const staticContent = staticPages.map((page) => [page.title, `/${section.slug}/${page.slug}`])
  const dynamicContent = allDynamicContent[section.slug] || []
  const subMenuElements = [...dynamicContent, ...staticContent]

  return (
    <li className={activated ? "activated" : undefined}>
      {!hasSubMenu && <a href={`/${section.slug}`}>{section.title}</a>}
      {hasSubMenu && (
        <DropdownMenu id={section.slug} title={section.title}>
          <ul className="dropdown">
            {subMenuElements.map(([title, path]) => (
              <li key={path} className={router.asPath === path ? "activated" : undefined}>
                <a href={path}>{title}</a>
              </li>
            ))}
          </ul>
        </DropdownMenu>
      )}
    </li>
  )
}

const TopNavigation: React.FC<{ sections: Section[] }> = ({ sections }) => {
  return (
    <NavigationContainer>
      <div className="navbar-left">
        <ul>
          <li>
            <a href="/">
              <Logo />
            </a>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <DropdownMenuContextProvider>
          <ul className="visible@s">
            {sections
              .filter((section) => section.displayInNavigation)
              .map((section) => (
                <NavigationSection key={section.id} section={section} />
              ))}
          </ul>
        </DropdownMenuContextProvider>
        <a href="#" className="hidden@s">
          <FaBars />
        </a>
      </div>
    </NavigationContainer>
  )
}

export default TopNavigation
