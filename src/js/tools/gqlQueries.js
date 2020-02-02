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

export const getUser = `
    query getCoop($playerId: String!) {
        eggInc {
            playerData(playerID: $playerId) {
                userName
                game {
                    soulEggsD
                    eggsOfProphecy
                }
            }
        }
    }
`