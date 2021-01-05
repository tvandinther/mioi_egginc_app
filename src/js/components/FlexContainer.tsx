import React from "react"

interface Props {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    column?: "column" | "row";
}

export default function FlexContainer(props: Props) {
    const style: React.CSSProperties = {
        ...props.style as React.CSSProperties,
        display: "flex",
        justifyContent: "space-around",
        flexDirection: props.column ? "column" : "row",
    }

    return (
        <div style={style} className={props.className}>
            {props.children}
        </div>
    )
}