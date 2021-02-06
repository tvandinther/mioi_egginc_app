import React from "react"
import path from "path"
import {useSelector} from "react-redux"
import {Link, RouteComponentProps} from "react-router-dom"
import ContractCard from "./ContractCard/ContractCard"
import {getExpireETA} from "../tools"
import {Container} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import Loading from "./Loading"
import {Contract} from "../../types/contract";

const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        padding: 0,
    },
    listItem: {
        maxWidth: 550,
        width: "100%",
    }
}))

export default function ContractList(props: RouteComponentProps) {
    const classes = useStyle()
    const activeContracts = useSelector(state => state.contract.activeContracts)

    if (!activeContracts.contracts) {
        return (
            <Loading/>
        )
    }

    const sortFunctions = {
        validUntil: (a: Contract, b: Contract) => a.validUntil - b.validUntil,
        title: (a: Contract, b: Contract) => a.title > b.title ? -1 : 1,
        duration: (a: Contract, b: Contract) => a.duration - b.duration,
    }
    const contractList = Object.values(activeContracts.contracts)
    const sortedContracts = contractList.sort(sortFunctions["validUntil"])
    const reversed = true
    if (reversed) {
        sortedContracts.reverse()
    }
    const contractListItems = sortedContracts.map((contract, index) => {
        // Anything valid for more than 30 days from now is put to the bottom
        let order = getExpireETA(contract.validUntil) < 60 * 60 * 24 * 30 ? index : 100 + index
        return (
            <Link style={{order: order}} className={classes.listItem}
                  to={path.join(props.match.url, "view", contract.name)} key={index}>
                <ContractCard contract={contract} index={index}/>
            </Link>
        )
    })
    return (
        <Container maxWidth="lg" className={classes.root}>
            {contractListItems}
        </Container>
    )
}