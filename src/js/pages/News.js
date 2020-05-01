import React, { useEffect } from "react"
import Navbar from "../components/Navbar"
import NewsCard from "../components/Dashboard/NewsCard"
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

export default function News(props) {
	const classes = useStyle()
	const news = useSelector(store => store.app.news)
	
	useEffect(() => {
        const oldTitle = document.title
        document.title = [oldTitle, "Page Not Found"].join(" | ")
        return () => document.title = oldTitle
	}, [])
	
	var children = []
	if (news.fetched) {
		for (let post of news.posts) {
			children.push(<NewsCard post={post}/>)
		}
	}

    return (
        <div>
            <Navbar title="News"/>
			<Container className={classes.root}>
				{children}
			</Container>
        </div>
    )
}