const axios = require('axios');

const URL = "https://us-central1-mioi-egginc.cloudfunctions.net/egginc-api-dotnet"

const leagueThreshold = 11.0 // Soul power below this value is considered "standard"

var exports = module.exports = {};

exports.getContractAll = async function () {
    return await axios.get(`${URL}/get_contracts`).then(response => response.data);
    // return ei_request('get_contracts', null, ei.GetContractsResponse).then(contracts => contracts.contractsList);
    // return exports.getPeriodicals().then(periodicals => periodicals.contracts.contractsList)
}

exports.getPeriodicals = async function () {
    return await axios.get(`${URL}/get_periodicals`).then(response => response.data)
}

exports.getContract = async function (contractName, coopName) {
    const params = new URLSearchParams();
    params.append("contractId", contractName);
    params.append("coopId", coopName);
    return axios.post(`${URL}/get_coop_status`, params).then(response => {
        const data = response.data;
        console.log(data);
        members = data.contributors.map(obj => {
            return {
                name: obj.userName,
                id: obj.userId,
                eggs: obj.contributionAmount,
                rate: obj.contributionRate,
                soulPower: obj.soulPower,
                boostTokens: obj.boostTokens,
                platform: obj.platform == 1 ? "IOS" : "ANDROID",
                active: obj.active,
                timeCheatDetected: obj.timeCheatDetected,
                pushId: obj.pushId,
                banVotes: obj.banVotes,
                rankChange: obj.rankChange
            }
        });
        return {
            contract: data.contractId,
            coop: data.coopId,
            league: (function (members) {
                for (member of members) {
                    if (member.soulPower < leagueThreshold) {
                        return "standard"
                    }
                }
                return "elite"
            })(members),
            eggs: data.totalAmount,
            totalRate: members.reduce((accumulator, member) => accumulator + member.rate, 0),
            timeLeft: data.secondsRemaining,
            members: members
        }
    });
}

exports.getPlayerData = function (identifier) {
    console.log(identifier);
    return axios.post(`${URL}/get_backup`, identifier, {
        headers: {
            "Content-Type": "text/plain"
        }
    }).then(response => response.data);
}

exports.getPlayerDataLegacy = function (identifier) {
    console.log(identifier);
    return axios.post(`${URL}/get_backup_legacy`, identifier, {
        headers: {
            "Content-Type": "text/plain"
        }
    }).then(response => response.data);
}

// 114601960711341662698
// EI5573821022601216
// exports.getPlayerData('EI5573821022601216').then(x => {
//     console.log(x);
// })

// exports.getContract('federal-reggserve', 'eggboi2').then(x => {
//     console.log(x); 
// });

// exports.getContractAll().then( x => {
//     console.log(x)
// })

// exports.queryCoop('space-eggs', 'envy').then(x => console.log(x))