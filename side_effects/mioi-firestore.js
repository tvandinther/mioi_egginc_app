const {Firestore} = require("@google-cloud/firestore");
const fs = require("fs");

const firestore = new Firestore();

exports = module.exports = {};

function handleActiveContracts(querySnapshot) {
    if (querySnapshot.empty) {
        console.log('No data matching query')
        return
    }
    return Promise.all(querySnapshot.docs.map(docSnapshot => { // create an array of promises mapped by the returned promise of the given function
        let contract = docSnapshot.data(); // extrat data from document snapshot
        delete contract.latestTimeframe; // delete unwanted fields
        return docSnapshot.ref.collection('rewards').orderBy('goal', 'asc').get().then(querySnapshot => { // get sub-collection for each doc snapshot in the query
            contract.rewards = querySnapshot.docs.map(docSnapshot => docSnapshot.data()); // add an array of the sub-collection query to the main contract object
            return contract; // return the contract object to be mapped
        });
    }));
}

function writeCacheFile(path, contents) {
    fs.writeFile(path, contents, 'utf8', (err, written, string) => {
        if (err) {
            console.log(`Error writing file: ${err}`);
        }
        else {
            console.log(`File successfully written to ${path}`);
        }
    });
}

function now() {
    return Math.floor(new Date() / 1000);
}

// enum
rewardTypes = {
    0 : "DEFAULT",
    1 : "CASH",
    2 : "GOLDEN_EGGS",
    3 : "SOUL_EGGS",
    4 : "PROPHECY_EGGS",
    5 : "RESEARCH",
    6 : "PIGGY_BANK",
    7 : "PIGGY_MULTIPLY",
    8 : "PIGGY_LEVEL",
    9 : "BOOST",
    10 : "BOOST_TOKEN",
    100 : "UNKNOWN"
  };

exports.addcontract = async function(id, contract) {
    let rewards = contract.goalsList
    let tieredRewards = contract.goalSetsList
    function aliasGoals(goals) {
        return goals.map(reward => ({
            difficulty : reward.targetSoulEggs,
            goal : reward.targetAmount,
            quantity : reward.rewardAmount,
            subtype : reward.rewardSubType == 'subtype' ? null : reward.rewardSubType,
            type : rewardTypes[reward.rewardType],
        }))
    }
    if (tieredRewards.length == 2) {
        goals = {
            standard : aliasGoals(tieredRewards[1].goalsList),
            elite : aliasGoals(tieredRewards[0].goalsList),
        }
    }
    else {
        goals = aliasGoals(rewards)
    }
    let docRef = firestore.collection('egginc-contracts').doc(id); // Use contract ID as unique attribute for doc ID
    await docRef.set({
        boostTokenInterval: contract.minutesPerToken,
        coopAllow: contract.coopAllowed,// == 1 ? true : false,
        coopSize: contract.maxCoopSize ? contract.maxCoopSize : null,
        description: contract.description,
        duration: contract.lengthSeconds,
        egg: contract.egg,
        name: contract.id,
        serveUntil: contract.expirationTime + contract.lengthSeconds,
        title: contract.name,
        validUntil: contract.expirationTime,
        goals: goals,
    }, { merge : false }).then( () => {
        docRef.set({
            serveUntil : contract.expirationTime + contract.lengthSeconds
        }, { merge : true });
        // ADD REWARDS
        let rewardRef = docRef.collection('rewards');
        rewards.forEach((reward, index) => {
            rewardRef.doc(`${index}`).set( // Use reward's array index as doc ID
            {
                difficulty : reward.targetSoulEggs,
                goal : reward.targetAmount,
                quantity : reward.rewardAmount,
                subtype : reward.rewardSubType == 'subtype' ? null : reward.rewardSubType,
                type : rewardTypes[reward.rewardType],
            }, { merge : false })
        });
        // ADD TIMEFRAME
        var timeframeRef = docRef.collection('timeframes');
        timeframeRef.doc(`${contract.expirationTime}`).set({ // Use validUntil timestamp as unique attribute for doc ID
            start : contract.expirationTime - (21 * 24 * 60 * 60), // 21 days benfore end (3 weeks)
            end: contract.expirationTime
        }).then( () => {
            docRef.set({
                latestTimeframe : timeframeRef.doc(`${contract.expirationTime}`)
            }, {merge : true});
        });
        console.log(`Added document with name: ${docRef.id}`);
    })
}

exports.getAuthKeyData = function(authKey) {
    return firestore.collection('APIAuthKeys').doc(authKey).get().then(docRef => docRef.data());
}

exports.getAuthHostData = function(hostname) {
    return firestore.collection('APIAuthHostnames').doc(hostname).get().then(docRef => docRef.data());
}

exports.setAuthKey = function(authKey, currentUser, permissions) {
    return firestore.collection('APIAuthKeys').doc(authKey).set({
        user: currentUser,
        permissions: permissions
    }).then(docRef => docRef);
}

exports.checkFor = function(type, id) {
    paths = {
        'contract' : 'egginc-contracts'
    }
    return firestore.collection(paths[type]).doc(id).get().then(docRef => {
        return docRef.exists ? true : false;
    })
}

exports.getActiveContracts = async function() {
    console.log(`Getting active contracts with a "serveUntil" > ${now()}`);
    return await firestore.collection('egginc-contracts').where('serveUntil', '>', now()).orderBy('serveUntil', 'desc').get().then(querySnapshot => {
        return handleActiveContracts(querySnapshot).then(activeContracts => {
            return {
                timestamp : now(),
                activeContracts : activeContracts
            }
        });
    });
}

exports.logGetCoopRequest = async function(args) {
    args.time = now();
    return await firestore.collection('getCoopRequests').add(args);
}

exports.writeCacheFile = writeCacheFile;