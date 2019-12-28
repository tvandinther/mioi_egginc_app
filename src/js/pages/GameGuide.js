import React, { useEffect } from "react"
import siteMetaData from "../siteMetadata.json"
import Navbar from "../components/Navbar.js"

export default function GameGuide(props) {
    useEffect(() => {
        document.title = [siteMetaData.siteTitle, "Game Guide"].join(" | ")
        return () => document.title = siteMetaData.siteTitle
    }, [])

    return (
        <div>
            <Navbar title="Game Guide"/>
            <p>
                We got mad info over here
            </p>
        </div>
    )
}