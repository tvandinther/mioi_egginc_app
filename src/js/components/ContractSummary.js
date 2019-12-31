import React, { useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { useSwipeable, Swipeable } from "react-swipeable"
import ValidatedInput from "./ValidatedInput"
import { contractNameFormat } from "../tools/eggincTools"

export default function ContractSummary(props) {
    let { contractId } = useParams()
    useEffect(() => {
        props.showContract()
        return props.hideContract
    }, [])
    const history = useHistory()
    const goBack = () => {
        history.push(props.match.url)
        props.hideContract()
    }
    const swipeHandlers = useSwipeable({
        onSwipedRight: () => {
            if (!props.UI.isSidebarVisible) goBack() // Ideally want to prevent additonal handlers from firing but this will do the trick
        },
        delta: 100,
    })

    if (props.activeContracts) {
        let bgColour = props.contractApp.shownContracts[contractId] ? props.contractApp.shownContracts[contractId].colour : null
        const contract = props.activeContracts.find(contract => contract.name === contractId)
        if (!contract) return null
        const BackButton = () => {
            if (props.UI.sizeFormat === "small") {
                return (
                    <Link to={props.match.url}>
                        <span onClick={goBack} style={{textDecoration: "underline", cursor: "pointer"}} onClick={props.hideContract}>Back</span>
                    </Link>
                )
            }
            return null
        }
        return (
            <div {...swipeHandlers} className="ContractSummary card" style={{backgroundColor: bgColour}}>
                <BackButton />
                <h1>{contract.title}</h1>
                <span>{contract.description}</span><br/>
                <br/>
                <span>Co-op allowed: {contract.coopAllow ? "Yes" : "No"}</span><br/>
                <span>Co-op size: {contract.coopSize}</span><br/>
                <span>Boosts allowed: {contract.boostsAllowed}</span><br/>
                <br/>
                <ValidatedInput {...contract.coopSearch} updateContractCoopSearchString={props.updateContractCoopSearchString} contractId={contractId} validatorFunction={contractNameFormat}/>
                <br/>
                <br/>
                <span>Rewards: {JSON.stringify(contract.rewards, null, '\t')}</span>
                
            </div>
        )
    }
}