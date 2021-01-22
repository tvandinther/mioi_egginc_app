const axios = require('axios');
const ei = require('./egginc_pb');
const b = require('base64-arraybuffer');

const CLIENT_VERSION = 99
const DEVICE_ID = "MIOI"
const leagueThreshold = 11.0 // Soul power below this value is considered "standard"
const ELITE = 0
const STANDARD = 1
const URL = "http://afx-2-dot-auxbrainhome.appspot.com"
const LEGACY_URL = "http://www.auxbrain.com"

var exports = module.exports = {};

function ei_request(path, message, responsePB) {
    return new Promise((resolve, reject) => {
        let options = {
            url: `${URL}/ei/${path}`,
            method: 'get'
        }
        if (message) {
            const params = new URLSearchParams();
            params.append("data", b.encode(message.serializeBinary()));
            options.method = 'post';
            options.data = params;
        }
        axios(options).then((response) => {
            let byteArray = b.decode(response.data);
            let msgInstance = responsePB.deserializeBinary(byteArray);
            resolve(msgInstance.toObject());
        }).catch(err => {
            reject(err);
        })
    })
}

exports.getContractAll = async function() {
    // return ei_request('get_contracts', null, ei.GetContractsResponse).then(contracts => contracts.contractsList);
    return exports.getPeriodicals().then(periodicals => periodicals.contracts.contracts)
}

exports.getPeriodicals = async function() {
    let message = new ei.PeriodicalsRequest();
    message.setCurrentClientVersion(CLIENT_VERSION);
    return await ei_request('get_periodicals', message, ei.PeriodicalsResponse)
}

exports.getContract = async function(contractName, coopName) {
    let message = new ei.ContractCoopStatusRequest();
    message.setContractIdentifier(contractName);
    message.setCoopIdentifier(coopName);
    return ei_request('coop_status', message, ei.ContractCoopStatusResponse).then(response => {
        members = response.contributors.map(obj => {
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
            contract : response.contractIdentifier,
            coop : response.coopIdentifier,
            league : (function(members) {
                for (member of members) {
                    if (member.soulPower < leagueThreshold) {
                        return "standard"
                    }
                }
                return "elite"
            })(members),
            eggs : response.totalAmount,
            totalRate : members.reduce((accumulator, member) => accumulator + member.rate, 0),
            timeLeft : response.secondsRemaining,
            members : members
        }
    });
}

exports.queryCoop = async function(contractName, coopName) {
	let message = new ei.QueryCoopRequest();
	message.setContractIdentifier(contractName);
	message.setCoopIdentifier(coopName);
	message.setLeague(ELITE);
	message.setClientVersion(CLIENT_VERSION);
	return await ei_request("query_coop", message, ei.QueryCoopResponse);
}

exports.getPlayerData = async function (identifier) {
    let message = new ei.FirstContactRequest();
    identifier.startsWith("EI") ? message.setEiUserId(identifier) : message.setUserId(identifier);
    message.setDeviceId(DEVICE_ID);
    message.setClientVersion(CLIENT_VERSION);

    return await ei_request('first_contact', message, ei.FirstContactResponse).then(response => response);
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