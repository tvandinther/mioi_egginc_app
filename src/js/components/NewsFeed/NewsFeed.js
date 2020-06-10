import React from "react"
import NewsCard from "../Dashboard/NewsCard"
import { useSelector } from "react-redux"
import { Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyle = makeStyles(theme => ({
	root: {
		display: "flex",
		flexDirection: "column",
		padding: "10px 15px",

		"&>*": {
			margin: "10px 0px",
		}
	}
}))

export default function newsFeed(props) {
	const classes = useStyle()
	const news = useSelector(store => store.app.news)
	
	var children = []
	if (news.fetched) {
		for (let post of news.posts) {
			children.push(<NewsCard key={post.timePosted} post={post}/>)
		}
	}
	
	return (
		<Container className={classes.root}>
			{children}
		</Container>
	)
}