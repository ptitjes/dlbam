import { useCallback, useEffect, useRef, useState } from "react"

export function useShrinkingClass() {
  const [shrunk, setShrunk] = useState<boolean>(false)

  const toggleShrunk = useCallback(() => {
    setShrunk(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)
  }, [])

  useEffect(() => {
    toggleShrunk()
    window.addEventListener("scroll", toggleShrunk)
    return () => {
      window.removeEventListener("scroll", toggleShrunk)
    }
  })

  return shrunk ? "shrunk" : undefined
}

export function useShrinkableRef() {
  const divElement = useRef<HTMLDivElement>(null)

  const toggleShrunk = useCallback(() => {
    if (divElement && divElement.current) {
      const needsToBeShrunk = document.body.scrollTop > 50 || document.documentElement.scrollTop > 50
      divElement.current.className = needsToBeShrunk ? "shrunk" : ""
    }
  }, [])

  useEffect(() => {
    toggleShrunk()
    window.addEventListener("scroll", toggleShrunk, { passive: true })
    return () => {
      window.removeEventListener("scroll", toggleShrunk)
    }
  })

  return divElement
}
