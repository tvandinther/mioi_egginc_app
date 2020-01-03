import React from "react"
import { Paper, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody } from "@material-ui/core"
import { convertSymbol, percentString } from "../../tools/eggincTools"

export default function CoopMembers(props) {
    const style = {
        maxHeight: "300px",
        overflowX: "auto",
        overflowY: "auto",
    }
    const headCells = [
        {id: 0, numeric: false, disablePadding: false, label: "Name"},
        {id: 0, numeric: false, disablePadding: false, label: "Eggs Laid"},
        {id: 0, numeric: false, disablePadding: false, label: "Laying Rate"},
        {id: 0, numeric: false, disablePadding: false, label: "Contribution"},
    ]
    return (
        <Paper style={style}>
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
                            <TableCell numeric>{convertSymbol(member.eggs)}</TableCell>
                            <TableCell numeric>{convertSymbol(member.rate)}</TableCell>
                            <TableCell numeric>{percentString(member.eggs / props.coop.eggs, 2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}