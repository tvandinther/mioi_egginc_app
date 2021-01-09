import React, {CSSProperties} from "react"
import { useTheme, makeStyles } from "@material-ui/core/styles"
import { Typography, IconButton } from "@material-ui/core"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useDispatch } from "react-redux"
import { hideSidebar } from "../../actions/UIActions"
import useStyle from "./styles"

export default function SidebarMenuHeader(props: { left: boolean }) {
    const classes = useStyle()
    const dispatch = useDispatch()
    const style: { [key: string]: CSSProperties } = {
        root: {
            flexDirection: props.left ? undefined : "row-reverse",
        },
        icon: {
            transform:  props.left ? undefined : "scaleX(-1)",
        }
    }

    return (
        <div className={classes.menuHeader} style={style.root}>
            <Typography>
                
            </Typography>
            <IconButton onClick={() => dispatch(hideSidebar())} aria-label="Hide Menu">
                <ArrowBackIosIcon style={style.icon}/>
            </IconButton>
        </div>
    )
}