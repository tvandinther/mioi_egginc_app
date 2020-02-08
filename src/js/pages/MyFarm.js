import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"


import Navbar from "../components/Navbar"
import { Card, Typography, Container } from "@material-ui/core"
import Dashboard from "../components/Dashboard"

function Home(props) {
    const pageDetails = {
        title: "Dashboard",
        shortTitle: "Dashboard",
    }

    useEffect(() => {
        const oldTitle = document.title
        document.title = [oldTitle].join(" | ")
        return () => document.title = oldTitle
    }, [])
    


    return (
        <div>
            <Navbar title={pageDetails.shortTitle}/>
            <Container>
                <Dashboard/>
            </Container>
        </div>
    )
}

export default withRouter(Home)