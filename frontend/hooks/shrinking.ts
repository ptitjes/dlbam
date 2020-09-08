import { useCallback, useEffect, useState } from "react"

export function useShrinkingClass() {
  const [shrunk, setShrunk] = useState<boolean>(false)

  const toggleShrunk = useCallback(() => {
    setShrunk(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", toggleShrunk, { passive: true })
    return () => {
      window.removeEventListener("scroll", toggleShrunk)
    }
  }, [toggleShrunk])

  return shrunk ? "shrunk" : undefined
}
