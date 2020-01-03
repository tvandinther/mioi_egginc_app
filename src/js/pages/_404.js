import React, { useEffect } from "react"

export default function _404(props) {
    useEffect(() => {
        const oldTitle = document.title
        document.title = [oldTitle, "Page Not Found"].join(" | ")
        return () => document.title = oldTitle
    }, [])

    return (
        <div>
            <p>
                Cannot find the requested page
            </p>
        </div>
    )
}