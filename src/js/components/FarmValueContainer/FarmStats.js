import React, { useEffect } from "react"
import { Card, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import * as eiTools from "../../tools/eggincTools"
import HeadedCard from "../HeadedCard"
import { useSelector, useDispatch } from "react-redux"
import { calculateStats } from "../../actions/farmValueActions"

const useStyle = makeStyles(theme => ({
    root: {
        flexGrow: 2,
    },
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
            <Typography>Farm Value: {eiTools.convertSymbol(farmStats.farmValue)}</Typography>
            <Typography>({(Math.log(farmStats.farmValue) / Math.LN10).toFixed(2)} OoM)</Typography>
            <Typography>Earnings Bonus: {eiTools.convertSymbol(farmStats.earningsBonus * 100)}%</Typography>
            <Typography>Egg Value: {eiTools.convertSymbol(farmStats.eggValue)}</Typography>
            <Typography>Soul Egg Bonus: {eiTools.convertSymbol(farmStats.soulEggBonus * 100)}%</Typography>
            <Typography>Egg Laying Rate: {eiTools.convertSymbol(farmStats.layingRate)} eggs/min</Typography>
            <Typography>Int. Hatchery Rate: {eiTools.convertSymbol(farmStats.hatchRate)} min/hab</Typography>
            <Typography>Max Hab Capacity: {farmStats.maxHabCapacity.toLocaleString()}</Typography>
			<Typography>Income per second: {eiTools.convertSymbol(farmStats.eggValue * farmStats.layingRate * farmStats.earningsBonus / 60)}</Typography>
        </HeadedCard>
    )
}