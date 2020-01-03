import React, { useEffect } from "react"
import Navbar from "../components/Navbar.js"

export default function GameGuide(props) {
    useEffect(() => {
        const oldTitle = document.title
        document.title = [oldTitle, "Game Guide"].join(" | ")
        return () => document.title = oldTitle
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