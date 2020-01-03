import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"


import Navbar from "../components/Navbar"

function Home(props) {
    const pageDetails = {
        title: "Welcome to Home",
        shortTitle: "Home",
    }

    useEffect(() => {
        const oldTitle = document.title
        document.title = [oldTitle].join(" | ")
        return () => document.title = oldTitle
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