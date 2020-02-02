import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"


import Navbar from "../components/Navbar"
import { Card, Typography, Container } from "@material-ui/core"

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
            <Container>
                <Card>
                    <Typography variant="h4">
                        Welcome to mioi.io's Egg, Inc. Companion App
                    </Typography>
                </Card>
            </Container>
        </div>
    )
}

export default withRouter(Home)