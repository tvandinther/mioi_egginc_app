import React from "react"
import NewsCard from "../Dashboard/NewsCard"
import { useSelector } from "react-redux"
import { Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import useStyle from "./styles"

export default function newsFeed() {
	const classes = useStyle()
	const news = useSelector(store => store.app.news)
	
	var children = []
	if (news.fetched) {
		for (let post of news.posts) {
			children.push(<NewsCard key={String(post.timePosted)} post={post}/>)
		}
	}
	
	return (
		<Container className={classes.root}>
			{children}
		</Container>
	)
}