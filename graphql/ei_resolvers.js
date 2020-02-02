const eggincAPI = require('../eggIncAPI');

var getCoop = function(args) {
    return eggincAPI.getContract(args.contractName, args.coopName);
}

var getPlayerData = function(args) {
    return eggincAPI.getPlayerData(args.playerID);
}

var getPeriodicals = function(args) {
    return eggincAPI.getPeriodicals();
}

module.exports = {
    coop: getCoop,
    playerData: getPlayerData,
    periodicals: getPeriodicals
}