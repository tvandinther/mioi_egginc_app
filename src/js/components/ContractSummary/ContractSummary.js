import React, { useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { useSwipeable } from "react-swipeable"
import * as eiTools from "../../tools/eggincTools"
import CoopSearch from "./CoopSearch"
import IconLabel from "../IconLabel"
import { Timer, PeopleAlt } from '@material-ui/icons'
import FlexContainer from "../FlexContainer"
import ContractRewards from "./ContractRewards"
import CoopExpiry from "./CoopExpiry"
import CoopMembers from "./CoopMembers"
import { Typography, Card, Button } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"

export default function ContractSummary(props) {
    const theme = useTheme()
    const style = {
        backgroundColor: theme.palette.common.white,
    }

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
            if (!props.isSidebarVisible) goBack() // Ideally want to prevent additonal handlers from firing but this will do the trick
        },
        delta: 100,
    })

    const contract = props.contractApp.activeContracts.contracts[contractId]
    const coop = props.contractApp.coops[contractId]
    if (contract) {
        const BackButton = () => {
            if (props.sizeFormat === "small") {
                return (
                    <Link to={props.match.url}>
                        <Button variant="outlined" onClick={goBack} onClick={props.hideContract}>❮ Back</Button>
                    </Link>
                )
            }
            return null
        }
        const coopSearch = contract.coopAllow ? 
            <CoopSearch {...contract.coopSearch} getCoop={props.getCoop} updateContractCoopSearchString={props.updateContractCoopSearchString} contractId={contractId}/> :
            null
        let memberTable = null
        if (coop && coop.fetched && !coop.error) {
            console.log(coop)
            memberTable = <CoopMembers coop={coop}/>
        }
        return (
            <Card style={style} {...swipeHandlers} className="ContractSummary">
                <BackButton />
                <div style={{display: "flex", alignItems: "center", margin: 10}}>
                    <img style={{height: "6rem"}} src={`/images/egg${contract.egg}.png`}></img>
                    <Typography variant="h3">{contract.title}</Typography>
                </div>
                <Typography variant="subtitle1">{contract.description}</Typography>
                <br/>
                <FlexContainer>
                    <IconLabel icon={Timer} label={eiTools.convertEpoch(contract.duration, true)}/>
                    <IconLabel icon={PeopleAlt} label={contract.coopSize ? contract.coopSize : 0}/>
                    <span>Boost Token Interval: {contract.boostsAllowed}</span><br/>
                </FlexContainer>
                {coopSearch}
                <br/>
                <br/>
                <ContractRewards coop={coop} rewards={contract.rewards}/>
                <br/>
                <CoopExpiry duration={contract.duration} timeLeft={coop ? coop.timeLeft : null}/>
                <br/>
                {memberTable}
                
            </Card>
        )
    }
    return null
}