const eggincAPIForwarder = require("../eggIncAPI")

var getCoop = function (args) {
    return eggincAPIForwarder.getContract(args.contractName, args.coopName);
}

var getPlayerData = function (args) {
    const playerID = args.playerId;
    if (playerID.startsWith("EI")) {
        return eggincAPIForwarder.getPlayerData(playerID);
    } else {
        return eggincAPIForwarder.getPlayerDataLegacy(playerID);
    }
}


var getPeriodicals = function (args) {
    return eggincAPIForwarder.getPeriodicals();
}

module.exports = {
    coop: getCoop,
    playerData: getPlayerData,
    periodicals: getPeriodicals
}