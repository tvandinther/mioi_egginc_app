import React from "react"
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { convertSymbol, percentString } from "../../../tools/eggincTools"
import { useSelector } from "react-redux"
import Image from "../../Decorator/Image"
import HelpTooltip from "../../Decorator/HelpTooltip"
import { Coop, Member } from "../../../../types/contract"

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

export default function CoopMembers({ coop }: { coop: Coop }) {
	const hourlyEggLayingRate = useSelector(store => store.settings.hourlyEggLayingRate)
	const classes = useStyle()
	const members = coop.members
    const headCells = [
        {id: 0, numeric: false, disablePadding: false, label: "Name"},
        {id: 1, numeric: false, disablePadding: false, label: "Eggs Laid"},
        {id: 2, numeric: false, disablePadding: false, label: "Laying Rate"},
		{id: 3, numeric: false, disablePadding: false, label: "Contribution"},
		{id: 4, numeric: false, disablePadding: false, label: "Earnings Bonus"},
	]
	
	function sum(array: Array<any>, predicate: Function) {
		return array.reduce((acc, n) => acc + predicate(n), 0)
	}

    if (coop && coop.fetched) {
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
                                <TableCell>
									{convertSymbol(member.eggs)}
									</TableCell>
                                <TableCell>
									{hourlyEggLayingRate ? convertSymbol(member.rate * 3600) + "/hr" : convertSymbol(member.rate) + "/s"}
								</TableCell>
                                <TableCell>
									{percentString(member.eggs / coop.eggs, 2)}
								</TableCell>
								<TableCell>
									{convertSymbol(Math.pow(10, member.soulPower) * 100)}%
								</TableCell>
                            </TableRow>
                        ))}
						{/* Total */}
						<TableRow key="total">
							<TableCell>
								<b>Total</b>
								<Image inline itemId="b_icon_token" className={classes.tokenIcon}/>
								<b>{sum(members, (member: Member) => member.boostTokens)}</b>
							</TableCell>
							<TableCell>
								<b>{convertSymbol(coop.eggs)}</b>
							</TableCell>
							<TableCell>
								<b>{hourlyEggLayingRate ? convertSymbol(coop.totalRate * 3600) + "/hr" : convertSymbol(coop.totalRate) + "/s"}</b>
							</TableCell>
							<TableCell>
								<b>100%</b>
							</TableCell>
							<TableCell>
								<b>{convertSymbol(Math.pow(10, sum(members, (member: Member) => member.soulPower) / members.length) * 100)}%</b>{"   "}<HelpTooltip helpText="This figure is an average."/>
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