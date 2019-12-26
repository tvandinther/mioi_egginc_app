import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import contractNameFormat from "../tools/eggincTools"

import Navbar from "../components/Navbar"
import ValidatedInput from "../components/ValidatedInput"

function Home(props) {
    const pageDetails = {
        title: "Welcome to Home",
        shortTitle: "Home",
    }
    
    return (
        <div>
            <Navbar title={pageDetails.shortTitle}/>
            <p>
                This is the home page.
            </p>
            <ValidatedInput validatorFunction={value => value.replace(" ", "-").toLowerCase()}/>
        </div>
    )
}

export default withRouter(Home)