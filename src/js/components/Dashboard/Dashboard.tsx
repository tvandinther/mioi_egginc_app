import React, { useEffect, useState } from "react"
import { useTheme } from "@material-ui/core/styles"
import { Container } from "@material-ui/core"
import useStyle from "./styles"
import DashboardOptions from "../../../types/dashboard"
import PlayerCard from "./PlayerCard"
import NewsCard from "./NewsCard"
import CoopCard from "./CoopSummaryCard"
import QuickLinkCard from "./QuickLinkCard"
import PlayerIDPromptCard from "./PlayerIDPromptCard"

export default function Dashboard({ options }: { options: DashboardOptions }) {
    const classes = useStyle()
    
    const theme = useTheme()
    let [columnCount, setColumnCount] = useState(1)

	function flattenDashboardOptions(dashboardOptions: DashboardOptions) {
		let cards: JSX.Element[] = []
		if(dashboardOptions.cards.player) cards.push(
			dashboardOptions.cards.player.playerData ? // TODO: Move this responsibility to the manager.
				<PlayerCard {...dashboardOptions.cards.player}/>
				: <PlayerIDPromptCard/>
		)
		if(dashboardOptions.cards.news) cards.push(<NewsCard {...dashboardOptions.cards.news}/>)
		if(dashboardOptions.cards.contracts) dashboardOptions.cards.contracts.forEach(options => cards.push(<CoopCard {...options}/>))
		if(dashboardOptions.cards.links) dashboardOptions.cards.links.forEach(options => cards.push(<QuickLinkCard {...options}/>))
		return cards
	}

	let cards = flattenDashboardOptions(options)
	let orderedContent = cards.sort((a, b) => a.props.priority - b.props.priority)

	let columnElements = []
	for (let i = 0; i < columnCount; i++) {
            columnElements.push(
				<div
					key={`column${i+1}`}
					className={classes.column}
				>
					{orderedContent.filter((item, index) => index % columnCount === i)}
				</div>
			)
        }

    useEffect(() => {
        if (window.innerWidth > theme.breakpoints.values.lg) setColumnCount(3)
        else if (window.innerWidth > theme.breakpoints.values.md) setColumnCount(2)
        else setColumnCount(1)
    }, [window.innerWidth])
    
    return (
		<Container>
			<div className={classes.root} style={{display: "grid", gridTemplateColumns: "1fr ".repeat(columnCount)}}>
				{columnElements}
			</div>
		</Container>
    )
}