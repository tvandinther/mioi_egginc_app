import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import * as eiTools from "../tools/eggincTools"
import Navbar from "../components/Navbar"
import FarmValueContainer from "../components/FarmValueContainer"
import { Container, Typography } from "@material-ui/core"

export default function FarmValue(props) {
    const pageDetails = {
        title: "Farm Value",
        shortTitle: "Farm Value",
    }
    useEffect(() => {
        const oldTitle = document.title
        document.title = [oldTitle, pageDetails.shortTitle].join(" | ")
        return () => document.title = oldTitle
    }, [])
    
    return (
        <div>
            <Navbar title={pageDetails.shortTitle}/>
            <FarmValueContainer/>
        </div>
    )
}