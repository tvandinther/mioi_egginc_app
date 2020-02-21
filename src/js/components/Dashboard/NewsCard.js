import React from "react"
import DashboardCard from "./DashboardCard"
import { Typography } from "@material-ui/core"

export default function NewsCard(props) {
    let data = props.data

    data = {
        title: "First Post!",
        author: "mioi.io",
        timePosted: 1582234310,
        body: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
    }

    return (
        <DashboardCard>
            <Typography variant="overline" align="right">
                {new Date(data.timePosted * 1000).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                    hour12: false,
                })}
            </Typography>
            <Typography variant="h4">{data.title}</Typography>
            <Typography variant="subtitle2">by {data.author}</Typography>
            <br/>
            <Typography variant="body2">{data.body}</Typography>
        </DashboardCard>
    )
}