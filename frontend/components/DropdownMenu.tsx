import React, {
  MouseEventHandler,
  TouchEventHandler,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import styled from "styled-components"

interface DropdownMenuContext {
  openMenuId: string | undefined
  setOpenMenuId: (f: (prevId: string | undefined) => string | undefined) => void
}

const DropdownMenuContext = createContext<DropdownMenuContext | undefined>(undefined)

function useDropdownMenuContext() {
  const context = useContext(DropdownMenuContext)
  if (!context) throw new Error("No DropdownMenuContext!")
  return context
}

export const DropdownMenuContextProvider: React.FC = ({ children }) => {
  const [openMenuId, setOpenMenuId] = useState<string | undefined>(undefined)

  return <DropdownMenuContext.Provider value={{ openMenuId, setOpenMenuId }}>{children}</DropdownMenuContext.Provider>
}

const DropdownRoot = styled.div`
  position: relative;
`

const DropdownContainer = styled.div`
  position: absolute;
  top: 15px;

  left: 50%;
  transform: translateX(-50%);

  padding: 5px;
  padding-bottom: 10px;
  width: fit-content;
  white-space: nowrap;

  z-index: 5;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;

  background-color: ${(props) => props.theme.colors.banner};
  border-radius: 4px;
  box-shadow: 0px 0px 8px 0 #f8f8ff99;

  &:before {
    content: " ";
    position: absolute;
    top: -5px;

    // centered version
    left: 50%;

    // left aligned version
    // left: 50px;

    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.banner};
    box-shadow: 4px 4px 8px -2px #f8f8ff99;
    transform: rotate(-135deg);
    z-index: 5;
  }
`

interface DropdownMenuProps {
  id: string
  title: string
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ id, title, children }) => {
  const { openMenuId, setOpenMenuId } = useDropdownMenuContext()

  const visible = useMemo(() => openMenuId === id, [openMenuId, id])
  const setVisible = useCallback(
    (f: (prevState: boolean) => boolean) => {
      setOpenMenuId((prevId) => (f(prevId === id) ? id : undefined))
    },
    [setOpenMenuId],
  )

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault()
    setVisible((prevState) => !prevState)
  }

  const handleTouch: TouchEventHandler = (event) => {
    event.preventDefault()
    setVisible((prevState) => !prevState)
  }

  const handleMouseEnter: MouseEventHandler = () => {
    setVisible(() => true)
  }

  const handleMouseLeave: MouseEventHandler = () => {
    setVisible(() => false)
  }

  return (
    <>
      <a
        href="#"
        onClick={handleClick}
        onTouchEnd={handleTouch}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {title}
      </a>
      <DropdownRoot style={{ visibility: visible ? "visible" : "hidden" }}>
        <DropdownContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {children}
        </DropdownContainer>
      </DropdownRoot>
    </>
  )
}
