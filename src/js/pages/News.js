import React from "react"
import NewsFeed from "../components/NewsFeed"
import Page from "../Page"

export default function News(props) {
    return (
        <Page title="Developer News" shortTitle="News">
            <NewsFeed/>
        </Page>
    )
}