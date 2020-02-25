const axios = require('axios');
const ei = require('./egginc_pb');
const b = require('base64-arraybuffer');

const clientVersion = 99;

var exports = module.exports = {};

function ei_request(path, message, responsePB) {
    return new Promise((resolve, reject) => {
        let options = {
            url : `http://www.auxbrain.com/ei/${path}`,
            method : 'get'
        }
        if (message) {
            options.method = 'post';
            options.data = 'data=' + b.encode(message.serializeBinary())
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
    return exports.getPeriodicals().then(periodicals => periodicals.contracts.contractsList)
}

exports.getPeriodicals = async function() {
    let message = new ei.GetPeriodicalsRequest();
    message.setCurrentClientVersion(clientVersion);
    return await ei_request('get_periodicals', message, ei.PeriodicalsResponse)
}

exports.getContract = async function(contractName, coopName) {
    let message = new ei.ContractCoopStatusRequest();
    message.setContractIdentifier(contractName);
    message.setCoopIdentifier(coopName);
    return ei_request('coop_status', message, ei.ContractCoopStatusResponse).then(response => {
        members = response.contributorsList.map(obj => {
            return {
                name : obj.userName,
                id : obj.userId,
                eggs : obj.contributionAmount,
                rate : obj.contributionRate
            }
        });
        return {
            contract : response.contractIdentifier,
            coop : response.coopIdentifier,
            eggs : response.totalAmount,
            totalRate : members.reduce((accumulator, member) => accumulator + member.rate, 0),
            timeLeft : response.secondsRemaining,
            members : members
        }
    });
}

exports.getPlayerData = async function(identifier) {
    let message = new ei.EggIncFirstContactRequest();
    message.setUserId(identifier);
    // message.setX02(0);
    // message.setX03(1);
    return await ei_request('first_contact', message, ei.EggIncFirstContactResponse).then(response => response.backup);
}

// exports.getPlayerData('114601960711341662698').then(x => {
//     console.log(x);
// })

// exports.getContract('federal-reggserve', 'eggboi2').then(x => {
//     console.log(x); 
// });

// exports.getContractAll().then( x => {
//     console.log(x)
// })