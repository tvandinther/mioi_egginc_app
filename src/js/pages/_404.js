import React, { useEffect } from "react"
import Navbar from "../components/Navbar"

export default function _404(props) {
    useEffect(() => {
        const oldTitle = document.title
        document.title = [oldTitle, "Page Not Found"].join(" | ")
        return () => document.title = oldTitle
    }, [])

    return (
        <div>
            <Navbar title="Page Not Found"/>
            <p>
                Cannot find the requested page
            </p>
        </div>
    )
}