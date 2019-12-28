import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"

import siteMetaData from "../siteMetadata.json"
import contractNameFormat from "../tools/eggincTools"

import Navbar from "../components/Navbar"
import ValidatedInput from "../components/ValidatedInput"

function Home(props) {
    const pageDetails = {
        title: "Welcome to Home",
        shortTitle: "Home",
    }

    useEffect(() => {
        document.title = [siteMetaData.siteTitle].join(" | ")
        return () => document.title = siteMetaData.siteTitle
    }, [])
    
    return (
        <div>
            <Navbar title={pageDetails.shortTitle}/>
            <p>
                This is the home page.
            </p>
        </div>
    )
}

export default withRouter(Home)