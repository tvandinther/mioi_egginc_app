import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NativeSelect, Select, MenuItem, Button, Card, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { setFarm } from "../../actions/farmValueActions"
import ReactGA from "react-ga"
import HeadedCard from "../HeadedCard"

const useStyle = makeStyles(theme => ({
    root: {
        margin: "auto",
        maxWidth: 400,
        padding: 10,
        display: "grid",
        gridTemplateColumns: "1fr 80px",
        gridTemplateRows: "max-content",
        gridGap: 10,
    },
    selector: {
        width: "100%",
        overflow: "hidden",
    },
    selectorItem: {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridGap: 5,
        alignItems: "center",
    },
    image: {
        height: 36,
        width: "auto",
    },
}))

export default function FarmSelector(props) {
    const classes = useStyle()
    const dispatch = useDispatch()
    const playerData = useSelector(store => store.playerData)
    const activeContracts = useSelector(store => store.contract.activeContracts)
    const contracts = activeContracts ? activeContracts.contracts : undefined
    let [selected, setSelected] = useState(0)
    
    const handleFarmLoad = () => {
        let selectedFarm = playerData.farmsList[selected]
		dispatch(setFarm(selectedFarm, playerData.game))
		ReactGA.event({
			category: "Farm Value",
			action: "Farm Loaded",
			label: selectedFarm.contractId === "" ? "Home" : "Contract",
		})
    }

    // useEffect(() => {
    //     if (playerData.fetched) {
    //         handleFarmLoad()
    //     }
    // }, [playerData.fetched])

    if (playerData.fetched) {
        const playerFarms = playerData.farmsList
        const options = []
        for (let index in playerFarms) {
            let farm = playerFarms[index]
            let name
            if (farm.farmType === 2) {
                name = ["Home Farm"]
            }
            else {
                if (farm.contractId === "") continue
                let contract = contracts[farm.contractId]
                if (!contract) continue
                name = ["Contract: ", contract.title]
            }
            options.push(
                <MenuItem key={`farmSelection${index}`} value={index} className={classes.selectorItem}>
                    <img src={`/images/egg${farm.eggType}.png`} className={classes.image}/>
                    <Typography>{name}</Typography>
                </MenuItem>
            )
        }

        return (
            <HeadedCard cardID="farm_select" collapsable style={props.style} title="Load Farm" className={classes.root}>
                <Select value={selected} onChange={evt => setSelected(evt.target.value)} className={classes.selector} classes={{select: classes.selectorItem}}>
                    {options}
                </Select>
                <Button onClick={handleFarmLoad} variant="outlined">Load</Button>
            </HeadedCard>
        )
    }
    return null
}