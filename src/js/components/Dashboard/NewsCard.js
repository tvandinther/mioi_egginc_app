import React from "react"
import HeadedCard from "../HeadedCard"
import { Typography } from "@material-ui/core"

export default function NewsCard(props) {
    let data = props.data

    data = {
        title: "First Post! - Thanks for testing",
        author: "Tom",
        timePosted: 1582234310,
        body: "The app is coming along nicely. The contract search is pretty much complete. I have also added the ability for users to input their player IDs and to have a dashboard be populated with their relevant contracts.\n\nFor the solo contracts (or where a co-op has not been joined), I need to calculate the laying rate from raw farm stats. This requires that I implement the farm value calculator brawn into the app to use for calculating this figure. I have yet to add the farm value page, but it will come along with the aforementioned improvement.\n\nThere are still several niggles in the interface which I will need to iron out but it will get there. Luckily this is a test version and those reading this are helping me test the site :)\n\nThe shippable product is coming nearer to completion, and then the refactoring begins (see: continues). Thank you for reading!"
        // body: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
    }

    return (
        <HeadedCard collapsable title="News">
            <Typography variant="overline" align="right">
                {new Date(data.timePosted * 1000).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                    hour12: false,
                })}
            </Typography>
            <Typography variant="h5">{data.title}</Typography>
            <Typography variant="subtitle2">by {data.author}</Typography>
            <br/>
            <Typography paragraph style={{whiteSpace: "pre-line"}} display="inline" variant="body2">{data.body}</Typography>
        </HeadedCard>
    )
}