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
            playerData(playerId: $playerId) {
                gameServicesId
                eiUserId
				userName
				approxTime
                game {
					soulEggs
					maxEggReached
					hyperLoopStation
					forceEliteContracts
                    prophecyEggs
                    epicResearch {
                        id
                        level
                    }
                    piggyBank
                    boosts {
                        id
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
                    contracts {
                        contract {
                            id
                            lengthSeconds
						}
						league
                        accepted
                        timeAccepted
                        coopId
                    }
                }
                farms {
                    eggType
                    farmType
                    contractId
                    numChickens
                    eggsLaid
                    eggsPaidFor
                    silosOwned
                    habs
                    habPopulations
                    commonResearch {
                        id
                        level
                    }
                    vehicles
                    hyperloopCars
                    activeBoosts {
                        id
                        timeRemaining
                        referenceValue
                    }
                }
                stats {
                    eggTotals
                    prestigeCount
                    lostPiggyIncrements
                    droneTakedowns
                    droneTakedownsElite
                    boostsUsed
                    piggyBreakCount
                }
            }
        }
    }
`