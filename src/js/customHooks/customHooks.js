import { useEffect } from "react"

export function useClickAway(func, ref) {
    const handleClickAway = evt => {
        if (ref.current && !ref.current.contains(evt.target)) {
            // evt.preventDefault()
            func(evt)
        }
    }
    useEffect(() => {
        if (ref.current) {
            document.addEventListener("click", handleClickAway)
        }

        return () => document.removeEventListener("click", handleClickAway)
    }, [func, ref])
}