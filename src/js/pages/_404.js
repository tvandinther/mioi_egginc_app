import React, { useEffect } from "react"
import siteMetaData from "../siteMetadata.json"

export default function _404(props) {
    useEffect(() => {
        document.title = [siteMetaData.siteTitle, "Page Not Found"].join(" | ")
        return () => document.title = siteMetaData.siteTitle
    }, [])

    return (
        <div>
            <p>
                Cannot find the requested page
            </p>
        </div>
    )
}