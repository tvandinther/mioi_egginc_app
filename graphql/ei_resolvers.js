const eggincAPIForwarder = require("../eggIncAPI/eggincAPIForwarder")

var getCoop = function (args) {
    return eggincAPIForwarder.getContract(args.contractName, args.coopName);
}

var getPlayerData = function (args) {
    console.log(args)
    const playerID = args.playerId;
    if (playerID.startsWith("EI")) {
        console.log(`Getting EI ID data for ${playerID}...`)
        return eggincAPIForwarder.getPlayerData(playerID);
    } else {
        console.log(`Getting Legacy ID data for ${playerID}...`)
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