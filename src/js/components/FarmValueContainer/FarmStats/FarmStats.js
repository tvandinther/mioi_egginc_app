import React, { useEffect } from "react"
import { Card, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import * as eiTools from "../../../tools/eggincTools"
import HeadedCard from "../../HeadedCard"
import { useSelector, useDispatch } from "react-redux"
import { calculateStats } from "../../../actions/farmValueActions"
import NextEgg from "./NextEgg"
import FarmValueStat from "./FarmValueStat"

const useStyle = makeStyles(theme => ({
    root: {
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "row",
		flexGrow: 2,
		justifyContent: "space-between",
		
		"& > *": {
			margin: 5,
		}
	},
	stat: {
		border: "1px solid",
		borderColor: theme.palette.grey[400],
		borderRadius: 5,
		padding: 5,
		flexGrow: 1,
	}
}))

export default function FarmStats(props) {
	const classes = useStyle()
	const dispatch = useDispatch()
	const farm = useSelector(store => store.farmValue.farm)
	const game = useSelector(store => store.farmValue.game)
	useEffect(() => {
		dispatch(calculateStats(farm, game))
	}, [farm, game])
    const farmStats = useSelector(store => store.farmValue.stats)
    
    if (!farmStats) return null
    return (
        <HeadedCard collapsable title="Farm Stats" style={props.style} className={classes.root}>
            <FarmValueStat farmValue={farmStats.farmValue}/>
            <Typography className={classes.stat}>Earnings Bonus: {eiTools.convertSymbol(farmStats.earningsBonus * 100)}%</Typography>
            <Typography className={classes.stat}>Egg Value: {eiTools.convertSymbol(farmStats.eggValue)}</Typography>
            <Typography className={classes.stat}>Soul Egg Bonus: {eiTools.convertSymbol(farmStats.soulEggBonus * 100)}%</Typography>
            <Typography className={classes.stat}>Egg Laying Rate: {eiTools.convertSymbol(farmStats.layingRate)} eggs/min</Typography>
            <Typography className={classes.stat}>Int. Hatchery Rate: {eiTools.convertSymbol(farmStats.hatchRate)} min/hab</Typography>
            <Typography className={classes.stat}>Max Hab Capacity: {farmStats.maxHabCapacity.toLocaleString()}</Typography>
			<Typography className={classes.stat}>Income per second: {eiTools.convertSymbol(farmStats.eggValue * farmStats.layingRate * farmStats.earningsBonus / 60)}</Typography>
			<NextEgg farmValue={farmStats.farmValue} currentEggType={farm.eggType}/>
        </HeadedCard>
    )
}