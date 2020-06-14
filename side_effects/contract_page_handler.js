const mioidb = require('./mioi-firestore');
const eggincAPI = require("../eggIncAPI/eggincAPI");
const Readable = require('stream').Readable;
const { Storage } = require('@google-cloud/storage');

exports = module.exports = {}

exports.init = function() {
    now = new Date() / 1000; // current time in seconds
    timeout = 5 * 60 // 5 minutes

    var storage = new Storage({
        projectId : 'mioi-egginc'
    })
    var bucket = storage.bucket('mioi-egginc-public');

    function getActiveContracts() {
        mioidb.getActiveContracts().then(activeContracts => {
            var stream = new Readable();
            stream.push(JSON.stringify(activeContracts));
            stream.push(null); // End-Of-File
            let gcFile = bucket.file(`activeContracts.json`);
            stream.pipe(gcFile.createWriteStream({
                resumable  : false,
                validation : false,
                contentType: "application/json",
                metadata   : {
                    cacheControl: 'public, max-age=300'}
            }))
            console.log(`Updated contract cache`);
        });
    }

    if (!global.getActiveContractsLastExecuted || (global.getActiveContractsLastExecuted < (now - timeout))) {
        global.getActiveContractsLastExecuted = now;
        console.log(`Checking completeness of contract cache...`);
        bucket.file(`activeContracts.json`).exists((err, exists) => {
            if (!exists) {
                getActiveContracts();
            }
        });

        eggincAPI.getContractAll().then(contracts => {
            contracts.forEach(contract => {
                let id = contract.identifier;
                mioidb.checkFor('contract', id).then(exists => {
                    if (!exists) {
                        console.log(`Adding contract "${id}" to database...`);
                        mioidb.addcontract(id, contract).then( () => {
                            console.log(`Completed adding new contract to database`)
                            console.log(`Updating contract cache...`);
                            getActiveContracts();
                        });
                    }
                });
            });
            // getActiveContracts();
            console.log(`Contract check complete!`);
        })
    }
    else {
        // console.log(`Will invoke again after ${Math.ceil(global.getActiveContractsLastExecuted + timeout - now)} seconds`);
    }
}