import React from "react"
import ContractCardImage from "./ContractCardImage"
import ContractCardDetails from "./ContractCardDetails"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
	}
}))

export default function ContractCardBody(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <ContractCardImage src={`/images/egg${props.contract.egg}.png`}/>
            <ContractCardDetails contract={props.contract}/>
        </div>
    )
}