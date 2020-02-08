export const getCoop = `
    query getCoop($coopName: String!, $contractName: String!) {
        eggInc {
            coop(coopName: $coopName, contractName: $contractName) {
                contract
                coop
                eggs
                totalRate
                timeLeft
                members {
                    name
                    id
                    eggs
                    rate
                }
            }
        }
    }
`

export const getPlayerData = `
    query getPlayerData($playerId: String!) {
        eggInc {
            playerData(playerID: $playerId) {
                userId
                userName
                game {
                    soulEggsD
                    eggsOfProphecy
                    epicResearchList {
                        id
                        level
                    }
                    piggyBank
                    boostsList {
                        boostId
                        count
                    }
                }
                contracts {
                    contractsList {
                        contract {
                            identifier
                            lengthSeconds
                        }
                        accepted
                        timeAccepted
                        coopIdentifier
                    }
                }
                farmsList {
                    eggType
                    farmType
                    contractId
                    numChickens
                    eggsLaid
                    eggsPaidFor
                    silosOwned
                    habsList
                    habPopulation
                    commonResearchList {
                        id
                        level
                    }
                    vehiclesList
                    trainLengthList
                    activeBoostsList {
                        boostId
                        timeRemaining
                        referenceValue
                    }
                }
                stats {
                    eggTotalsList
                    numPrestiges
                    lostPiggyIncrements
                    droneTakedowns
                    droneTakedownsElite
                    boostsUsed
                    numPiggyBreaks
                }
            }
        }
    }
`