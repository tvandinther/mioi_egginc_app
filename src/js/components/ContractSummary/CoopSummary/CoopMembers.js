import React from "react"
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody } from "@material-ui/core"
import { convertSymbol, percentString } from "../../../tools/eggincTools"
import { useSelector } from "react-redux"

export default function CoopMembers(props) {
	const hourlyEggLayingRate = useSelector(store => store.settings.hourlyEggLayingRate)
	const style = {
        overflowX: "auto",
        overflowY: "auto",
    }
    const headCells = [
        {id: 0, numeric: false, disablePadding: false, label: "Name"},
        {id: 1, numeric: false, disablePadding: false, label: "Eggs Laid"},
        {id: 2, numeric: false, disablePadding: false, label: "Laying Rate"},
        {id: 3, numeric: false, disablePadding: false, label: "Contribution"},
    ]
    if (props.coop && props.coop.fetched) {
        return (
            <Paper style={style} onTouchStart={e => e.stopPropagation()}>
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
                        {props.coop.members.map(member => (
                            <TableRow key={member.id}>
                                <TableCell>{member.name}</TableCell>
                                <TableCell numeric="true">{convertSymbol(member.eggs)}</TableCell>
                                <TableCell numeric="true">
									{hourlyEggLayingRate ? convertSymbol(member.rate * 3600) + "/hr" : convertSymbol(member.rate) + "/s"}
								</TableCell>
                                <TableCell numeric="true">{percentString(member.eggs / props.coop.eggs, 2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
    else {
        return null
    }
}