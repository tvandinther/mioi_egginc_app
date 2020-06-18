import React from "react"
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { convertSymbol, percentString } from "../../../tools/eggincTools"
import { useSelector } from "react-redux"
import Image from "../../Decorator/Image"
import HelpTooltip from "../../Decorator/HelpTooltip"

const useStyle = makeStyles(theme => ({
	root: {
		overflowX: "auto",
        overflowY: "auto",
	},
	tokenIcon: {
		marginLeft: 12,
		marginRight: 4,
	},
}))

export default function CoopMembers(props) {
	const hourlyEggLayingRate = useSelector(store => store.settings.hourlyEggLayingRate)
	const classes = useStyle()
	const members = props.coop.members
	console.log(props.coop)
    const headCells = [
        {id: 0, numeric: false, disablePadding: false, label: "Name"},
        {id: 1, numeric: false, disablePadding: false, label: "Eggs Laid"},
        {id: 2, numeric: false, disablePadding: false, label: "Laying Rate"},
		{id: 3, numeric: false, disablePadding: false, label: "Contribution"},
		{id: 4, numeric: false, disablePadding: false, label: "Earnings Bonus"},
	]
	
	function sum(array, predicate) {
		return array.reduce((acc, n) => acc + predicate(n), 0)
	}

    if (props.coop && props.coop.fetched) {
        return (
            <Paper className={classes.root} onTouchStart={e => e.stopPropagation()}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {headCells.map(headCell => (
                                <TableCell
                                    key={headCell.id}
                                    align={headCell.numeric ? "right" : "left"}
                                    padding={headCell.disablePadding ? "none" : "default"}
                                >
                                    {headCell.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members.map((member, index) => (
                            <TableRow key={index}>
                                <TableCell>
									{member.name}
									<Image inline itemId="b_icon_token" className={classes.tokenIcon}/>
									{member.boostTokens}
									</TableCell>
                                <TableCell numeric="true">
									{convertSymbol(member.eggs)}
									</TableCell>
                                <TableCell numeric="true">
									{hourlyEggLayingRate ? convertSymbol(member.rate * 3600) + "/hr" : convertSymbol(member.rate) + "/s"}
								</TableCell>
                                <TableCell numeric="true">
									{percentString(member.eggs / props.coop.eggs, 2)}
								</TableCell>
								<TableCell numeric="true">
									{convertSymbol(Math.pow(10, member.soulPower) * 100)}%
								</TableCell>
                            </TableRow>
                        ))}
						{/* Total */}
						<TableRow key="total">
							<TableCell>
								<b>Total</b>
								<Image inline itemId="b_icon_token" className={classes.tokenIcon}/>
								<b>{sum(members, (member) => member.boostTokens)}</b>
							</TableCell>
							<TableCell numeric="true">
								<b>{convertSymbol(props.coop.eggs)}</b>
							</TableCell>
							<TableCell numeric="true">
								<b>{hourlyEggLayingRate ? convertSymbol(props.coop.totalRate) + "/hr" : convertSymbol(props.coop.totalRate) + "/s"}</b>
							</TableCell>
							<TableCell numeric="true">
								<b>100%</b>
							</TableCell>
							<TableCell numeric="true">
								<b>{convertSymbol(Math.pow(10, sum(members, (member) => member.soulPower) / members.length) * 100)}%</b>{"   "}<HelpTooltip helpText="This figure is an average."/>
							</TableCell>
						</TableRow>
                    </TableBody>
                </Table>
            </Paper>
        )
    }
    else {
        return null
    }
}