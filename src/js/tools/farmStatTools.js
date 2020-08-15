import ReactGA from "react-ga"
import research from "./research.json"
import eggTypes from "./eggTypes.json"
import habs from "./habs.json"

export default function calculateFarmStats(farm, game) {
    let playerResearch = {
        common: farm.commonResearch,
        epic: game.epicResearch,
    }

    let initialParameters = {
        population: farm.numChickens,
        eggTypeValue: eggTypes[farm.eggType].value,
        eggMultiplier: 1 + (0.5 * (farm.eggType - 1)),
        maxHabCapacity: farm.habsList.reduce((acc, habIndex) => acc + habs[habIndex].capacity, 0),
        layingRate: 2, // eggs per minute per chicken
        eggValue: 1, // base multiplier
        hatchRefill: 1, // base multiplier
        runningBonus: 1, // base multiplier
        maxRunningBonus: 1.5, // base value
        shippingCapacity: farm.eggsPaidFor || 5000, // base value
        habCapacity: 1, // base multiplier
        hatchRate: 0, // base value
        hatchCapacity: 1, // base multiplier
		vehicleCapacityMultiplier: 1, // base multiplier
		hoverVehicleCapacityMultiplier: 1,
        maxFleetSize: 4, // base value
        silos: farm.silosOwned,
        meBonus: mysticalBonusFormula(game.soulEggsD, game.eggsOfProphecy, playerResearch), // base value
		accTricks: 1, // base value
		hatchCalm: 1,
		prophecyBonus: 1,
		soulFood: 1,
		trainLength: 5,
		trainCapacityMultiplier: 1,
    }

    let updatedParameters = iterateResearch(playerResearch, initialParameters, farm) // mutates parameters
	updatedParameters.maxHabCapacity = Math.ceil(updatedParameters.habCapacity * updatedParameters.maxHabCapacity)
	updatedParameters.population = Math.min(updatedParameters.population, updatedParameters.maxHabCapacity)
    updatedParameters.farmValue = farmValueFormula(updatedParameters)

	const farmStats = {
		earningsBonus: updatedParameters.meBonus,
        eggValue: updatedParameters.eggTypeValue * updatedParameters.eggValue,
        layingRate: updatedParameters.layingRate * updatedParameters.population,
		hatchRate: updatedParameters.hatchRate,
        maxHabCapacity: updatedParameters.maxHabCapacity,
        soulEggBonus: game.soulEggsD * (10 + (1 * playerResearch.epic["soul_eggs"])) / 100,
		farmValue: updatedParameters.farmValue,
		shippingCapacity: updatedParameters.shippingCapacity,
		income: calculateIncome(updatedParameters),
	}
	if (process.env.NODE_ENV == "development") console.log("Farm Stats: ", farmStats)
    return farmStats
}

function calculateIncome(parameters) {
	return (parameters.eggTypeValue * parameters.eggValue) * (Math.min(parameters.layingRate * parameters.population, parameters.shippingCapacity) / 60) * parameters.meBonus
}

function iterateResearch(playerResearch, parameters, farm) {
    let newParameters = Object.assign({}, parameters)
    let researchTierArray = [...research.common, research.epic]
    let flattenedPlayerResearch = { ...playerResearch.common, ...playerResearch.epic }
    for (let tier of researchTierArray) {
        var subParametersSum = {} // for parameters that simply add on previous tiers (not compounding)
        var subParametersMultiplier = {} // for parameters that are compounding on previous tiers
        var subParametersPower = {} // for parameters that have final priority on compounding

        for (let researchItem of tier.research) {
            if (!(researchItem.parameter instanceof Array)) researchItem.parameter = [researchItem.parameter]
            let level = flattenedPlayerResearch[researchItem.id] || 0
            let value = researchItem.factor * level
            if (researchItem.tag) { // special cases requiring conditional value alteration
                switch (researchItem.tag) {
                    case "portalHab": { // some research improves the capacity of portal habs specifically
                        let count = farm.habsList.reduce((acc, habIndex) => habs[habIndex].tag === "portalHab" ? acc + 1 : acc, 0)
                        value = (count / farm.habsList.length) * value
                    }
                    break
                }
            }
            for (let parameter of researchItem.parameter) {
                switch (researchItem.factorType) {
                    case "sum": {
                        subParametersSum[parameter] = (subParametersSum[parameter] || 0) + value
                        break
                    }
                    case "multiplier": {
                        subParametersMultiplier[parameter] = (subParametersMultiplier[parameter] || 1) + value
                        break
                    }
                    case "power": {
                        subParametersPower[parameter] = (subParametersPower[parameter] || 1) * Math.pow(researchItem.factor, level)
                        // newParameters[parameter] *= (subParametersMultiplier[parameter] || 1) * Math.pow(researchItem.factor, level) // is this one wrong?? looks weird
                    }
                }
            }
        }
        // Combine subParameters with main parameter object
        for (let [key, value] of Object.entries(subParametersSum)) { // Combine the sums into the main object by addition
            newParameters[key] += value
        }
        for (let [key, value] of Object.entries(subParametersMultiplier)) { // Combine the multipliers into the main object by multiplication
			newParameters[key] *= value
        }
        for (let [key, value] of Object.entries(subParametersPower)) { // Combine the powers into the main object by multiplication
            newParameters[key] *= value
		}
	}
    return newParameters
}

function farmValueFormula(parameters) {
	console.log(parameters)
    //SUB CALCULATIONS
    let eggsMin = parameters.population * parameters.layingRate
    let eggValue = (parameters.eggTypeValue * parameters.eggValue) * (1 + parameters.meBonus)
    let eggsDelivered = Math.min(parameters.shippingCapacity, eggsMin)
    let weightedPopulation = (Math.ceil(eggsDelivered / parameters.layingRate) + (Math.ceil((eggsMin - eggsDelivered) / parameters.layingRate) * 0.2))
	
	//FINAL CALCULATION
	let subValue1 = weightedPopulation + Math.pow(parameters.maxHabCapacity - parameters.population, 0.6) + (180 * parameters.hatchRate * parameters.silos)
	let subValue2 = parameters.accTricks * parameters.eggMultiplier * parameters.layingRate * eggValue * 1000
	let subValue3 = Math.pow(parameters.maxRunningBonus, 0.25)

	if (isNaN(subValue1) || isNaN(subValue2)) {
		let valueString = isNaN(subValue1) ? "subValue1" : "subValue2"
		ReactGA.exception({
			description: `${valueString} is NaN`,
			fatal: false,
		})
	}
    return subValue1 * subValue2 * subValue3;
}

function mysticalBonusFormula(soulEggs, prophecyEggs, playerResearch) {
    let soulFood = playerResearch.epic["soul_eggs"]
    let prophecyBonus = playerResearch.epic["prophecy_bonus"]
    // 
    if (Math.pow(105 + (1 * prophecyBonus), prophecyEggs) === Infinity) {
		// Try to use BigInt
		
        if (window.BigInt !== undefined) {
			var soulEggComponent = (BigInt(10) + (BigInt(1) * BigInt(soulFood))) / BigInt(100)
			// var intNumerator = (BigInt(105) + (BigInt(1) * BigInt(prophecyBonus))) ** BigInt(prophecyEggs)
			// var intDenominator = (BigInt(100) ** BigInt(prophecyEggs))
			var intNumerator = eval(`(BigInt(105) + (BigInt(1) * BigInt(${prophecyBonus}))) ** BigInt(${prophecyEggs})`)
			var intDenominator = eval(`(BigInt(100) ** BigInt(${prophecyEggs}))`)
			var prophecyEggComponent = intNumerator / intDenominator
			var result = BigInt(soulEggs) * (soulEggComponent * prophecyEggComponent)
			return Number(result)
        }
        return -1
    }
    else {
        let soulEggComponent = (10 + (1 * soulFood)) / 100
        let prophecyEggComponent = Math.pow(105 + (1 * prophecyBonus), prophecyEggs) / Math.pow(100, prophecyEggs)
        return soulEggs * (soulEggComponent * prophecyEggComponent)
    }
}