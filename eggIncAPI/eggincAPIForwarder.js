const axios = require('axios');

const URL = "https://us-central1-mioi-egginc.cloudfunctions.net/egginc-api-dotnet"

const leagueThreshold = 11.0 // Soul power below this value is considered "standard"

var exports = module.exports = {};

exports.getContractAll = async function () {
    return await axios.get(`${URL}/get_contracts`).then(response => response.data);
}

exports.getPeriodicals = async function () {
    return await axios.get(`${URL}/get_periodicals`).then(response => response.data)
}

exports.getContract = function (contractName, coopName) {
    const params = new URLSearchParams();
    params.append("contractId", contractName);
    params.append("coopId", coopName);
    return axios.post(`${URL}/get_coop_status`, params).then(response => {
        const data = response.data;
        members = data.contributors.map(obj => {
            return {
                name: obj.userName,
                id: obj.userId,
                eggs: obj.contributionAmount,
                rate: obj.contributionRate,
                soulPower: obj.soulPower,
                boostTokens: obj.boostTokens,
                platform: obj.platform === 1 ? "IOS" : "ANDROID",
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
    const params = new URLSearchParams()
    params.append("id", identifier)
    return axios.post(`${URL}/get_backup`, params).then(response => response.data);
}

exports.getPlayerDataLegacy = function (identifier) {
    const params = new URLSearchParams()
    params.append("id", identifier)
    return axios.post(`${URL}/get_backup_legacy`, params).then(response => response.data);
}
