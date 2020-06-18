const eggincAPI = require('../eggIncAPI');

var getCoop = function(args) {
    return eggincAPI.getContract(args.contractName, args.coopName);
}

var getPlayerData = function(args) {
	return eggincAPI.getPlayerData(args.playerID);
	// let data = eggincAPI.getPlayerData(args.playerID);
	// return {
	// 	...data,
	// 	game: {
	// 		...data.game,
	// 		epicResearch: data.game.epicResearchList.reduce((obj, item) => {
	// 			obj[item.id] = item.level
	// 			return obj
	// 		}, {})
	// 	}
	// }
}

var getPeriodicals = function(args) {
    return eggincAPI.getPeriodicals();
}

module.exports = {
    coop: getCoop,
    playerData: getPlayerData,
    periodicals: getPeriodicals
}

// getCoop({contractName: "summer-solstice-2020", coopName: "backyard"}).then(x => console.log(x.members[0]))