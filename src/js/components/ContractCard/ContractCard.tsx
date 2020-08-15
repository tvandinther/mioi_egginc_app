import React, { useState } from "react"
import * as eiTools from "../../tools/eggincTools"
import ContractCardProgressBar from "./ContractCardProgressBar"
import ContractCardBody from "./ContractCardBody"
import { useTheme, makeStyles } from "@material-ui/core/styles"
import { Card } from "@material-ui/core"
import ContractCardHeader from "./ContractCardHeader"

const useStyle = makeStyles(theme => ({
    root: {
        display: "grid",
        margin: "12px 15px 12px 15px",
        gridTemplateRows: "40px 5px 1fr",
        gridTemplateColumns: "100%",
        gridTemplateAreas: `
            "title title"
            "progressBar progressBar"
        `,
        justifyContent: "center",
        alignItems: "center",
        // height: "180px",
        transition: "all 200ms ease",
        cursor: "pointer",
        userSelect: "none",
    }
}))

export default function ContractCard(props) {
    const classes = useStyle()
    let [raised, setRaised] = useState(false)
    const toggleRaised = () => {
        setRaised(!raised)
    }
    
    
    
    const contractLength = (60 * 60 * 24 * 21)
    const barProgress = ((new Date() / 1000) - (props.contract.validUntil - contractLength)) / contractLength
    const expireString = eiTools.getExpireETA(props.contract.validUntil, true)
    const progressBarHoverText =  expireString <= 0 ? "Expired!" : "Expires in " + expireString
    return (
        <Card raised={raised} onMouseOver={toggleRaised} onMouseOut={toggleRaised} className={classes.root} id={props.contract.name}>
            <ContractCardHeader text={props.contract.title}/>
            <ContractCardProgressBar progress={barProgress} hoverText={progressBarHoverText}/>
            <ContractCardBody contract={props.contract}/>
        </Card>
    )
}