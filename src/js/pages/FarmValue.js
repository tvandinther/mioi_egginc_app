import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { calculateFarmStats } from "../tools/eggincTools"
import Navbar from "../components/Navbar"
import { Container } from "@material-ui/core"

export default function FarmValue(props) {
    const pageDetails = {
        title: "Farm Value",
        shortTitle: "Farm Value",
    }
    useEffect(() => {
        const oldTitle = document.title
        document.title = [oldTitle, "Contracts"].join(" | ")
        return () => document.title = oldTitle
    }, [])
    
    const playerData = useSelector(store => store.playerData)
    var farmStats
    if (playerData.fetched) {
        let farms = playerData.farmsList
        let game = playerData.game
        let selectedFarm = farms[0]
        farmStats = calculateFarmStats(selectedFarm, game)
    }


    return (
        <div>
            <Navbar title={pageDetails.shortTitle}/>
            <Container>
                <p style={{whiteSpace: "pre-line"}}>{JSON.stringify(farmStats, undefined, "\t")}</p>
            </Container>
        </div>
    )
}