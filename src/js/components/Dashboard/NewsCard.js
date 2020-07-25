import React, { useEffect } from "react"
import HeadedCard from "../HeadedCard"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { fetchNews } from "../../actions/appActions"
import { useDispatch, useSelector } from "react-redux"
import ReactMarkdown from "react-markdown"

const useStyle = makeStyles(theme => ({
	markdown: {
		whiteSpace: "pre-line",

		"& a": {
			color: theme.palette.info.dark,

			"&:hover": {
				color: theme.palette.info.main,
			},
		}
	}
}))

export default function NewsCard(props) {
	const { post } = props
	const classes = useStyle()
	
	return (
        <HeadedCard cardID={`news_${post.timePosted.toString(36)}`} collapsable title={`News: ${post.title}`}>
            <Typography variant="overline" align="right">
                {new Date(post.timePosted * 1000).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                    hour12: false,
                })}
            </Typography>
            <Typography variant="h5">{post.title}</Typography>
            <Typography variant="subtitle2">by {post.author}</Typography>
            <ReactMarkdown className={classes.markdown} source={post.body} />
        </HeadedCard>
		)
}