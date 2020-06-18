export const fetchNews = `
	query fetchNews($context: String!, $limit: Int) {
		mioi {
		fetchNews(context: $context, limit: $limit) {
			title
			author
			timePosted
			bodyType
			body
		}
		}
	}
`

export const getCoop = `
    query getCoop($coopName: String!, $contractName: String!) {
        eggInc {
            coop(coopName: $coopName, contractName: $contractName) {
                contract
                coop
                eggs
                totalRate
				timeLeft
				league
				public
                members {
                    name
                    eggs
					rate
					soulPower
					boostTokens
					active
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
				approxTime
                game {
					soulEggsD
					maxEggReached
					hyperLoopStation
					forceEliteContracts
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
					nextDailyGiftTime
					lastDailyGiftCollectedDay
					numDailyGiftsCollected
					eggMedalLevelList
					maxFarmSizeReachedList
					achievementsList {
						id
						achieved
					}
                }
                contracts {
                    contractsList {
                        contract {
                            identifier
                            lengthSeconds
						}
						league
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