import research from "./research.json"
import eggTypes from "./eggTypes.json"
import habs from "./habs.json"

export default function calculateFarmStats(farm, game) {
    let playerResearch = {
        common: {},
        epic: {},
    }
    let parameters = {
        population: farm.numChickens,
        eggTypeValue: eggTypes[farm.eggType-1].value, // -1 to offset index 0000000000 ???
        eggMultiplier: 1 + (0.5 * farm.eggType),
        maxHabCapacity: farm.habsList.reduce((acc, habIndex) => acc + habs[habIndex+1].capacity, 0), // +1 to offset index 0 reserved for no hab
        layingRate: 2, // eggs per minute per chicken
        eggValue: 1, // base multiplier
        hatchRefill: 1, // base multiplier
        runningBonus: 1, // base multiplier
        maxRunningBonus: 1.5, // base value
        shippingCapacity: 5000, // base value
        habCapacity: 1, // base multiplier
        hatchRate: 0, // base value
        hatchCapacity: 1, // base multiplier
        vehicleCapacityMultiplier: 1, // base multiplier
        maxFleetSize: 4, // base value
        silos: farm.silosOwned,
        meBonus: 0, // base value
        accTricks: 1, // base value
    }

    for (let item of farm.commonResearchList) {
        Object.assign(playerResearch.common, {[item.id]: item.level})
    }
    for (let item of game.epicResearchList) {
        Object.assign(playerResearch.epic, {[item.id]: item.level})
    }
    return {
        test: "complete",
        parameters: parameters,
    }
}

function farmValueFormula(parameters) {
    //SUB CALCULATIONS
    let habSpace = Math.ceil(parameters.habCapacity * parameters.maxHabCapacity);
    let eggsMin = parameters.population * parameters.layingRate;
    let eggValue = (parameters.eggTypeValue * parameters.eggValue) * (1 + parameters.meBonus);
    let eggsDelivered = Math.min(parameters.shippingCapacity, eggsMin)
    let weightedPopulation = (Math.floor(eggsDelivered / parameters.layingRate) + (Math.ceil((eggsMin - eggsDelivered) / parameters.layingRate) * 0.2));
    let subValue1 = weightedPopulation + Math.pow(habSpace - parameters.population, 0.6) + (180 * parameters.hatchRate * parameters.silos)
    let subValue2 = parameters.accTricks  * parameters.eggMultiplier * parameters.layingRate / 2 * eggValue * 2000
    //FINAL CALCULATION
    parameters['farmValue'] = subValue1 * subValue2;
}

function mysticalBonusFormula(soulEggs, prophecyEggs, playerResearch) {
    let soulFood = playerResearch.epic["soul_eggs"]
    let prophecyBonus = playerResearch.epic["prophecy_bonus"]
    // 
    return Math.pow(105 + (1 * prophecyBonus), prophecyEggs) == Infinity ? alert("Javascript can not count that high :(") : soulEggs * (((10 + (1 * soulFood)) / 100) * ((Math.pow(105 + (1 * prophecyBonus), prophecyEggs) / Math.pow(100, prophecyEggs))));
}