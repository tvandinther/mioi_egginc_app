import orders from "./orders.json"
import calculateFarmStats from "./farmStatTools"

export { calculateFarmStats }

export function contractNameFormat(value) {
    value = value.replace(" ", "-").toLowerCase()
    value = value.replace(/[^A-Za-z0-9\-]/, "")
    return value
}

export function getExpireETA(validUntil, string=false) {
    let currentEpoch = Date.now() / 1000;
    let expire = validUntil - currentEpoch; // in seconds
    if (string === true) {
        return convertEpoch(expire);
    }
    return expire;
}

export function convertEpoch(epochTime) {
    let d = Math.floor(epochTime / (3600*24));
    let h = Math.floor(epochTime % (3600*24) / 3600);
    let m = Math.floor(epochTime % 3600 / 60);
    let s = Math.floor(epochTime % 60);
    let stringValues = [d, h, m, s];
    // run through the array and format a suitable string
    let timeString = ''
    if (stringValues[0] > 0) {
        timeString += stringValues[0] + 'd ';
    }
    if (stringValues[1] > 0) {
        timeString += stringValues[1] + 'h ';
    }
    if (stringValues[2] > 0) {
        timeString += stringValues[2] + 'm ';
    }
    // if (stringValues[3] > 0) {
    //     timeString += stringValues[3] + 's ';
    // } 
    if (timeString == "") {
        return "0";
    }
    else {
        return timeString.slice(0, timeString.length - 1);
    }
}

export function timeConvert(time) { 
    //return 'Roughly ' + String(Math.floor(time/24/60) + " days, " + Math.floor(time/60%24) + ' hours and ' + Math.ceil(time%60) + ' minutes');
    var units = {
        year: 24*60*365,
        month: 24*60*30,
        week: 24*60*7,
        day: 24*60,
        hour: 60,
        minute: 1
    }
    var result = []
    time = time / 1000
    for(var name in units) {
      var p =  Math.floor(time / units[name]);
      if(p == 1) result.push(' ' + p + ' ' + name);
      if(p >= 2) result.push(' ' + p + ' ' + name + 's');
      time %= units[name]
    
    }
    return result;
}

export function magnitudeGet(str) {
    var key = String(str.match(/([A-z]{1,2})$/g));
    for(var i = 0; i < orders.length; i++) {
        if(orders[i].symbol === key) {
            return orders[i].magnitude;
        }
    }
    return 0;
}

export function convertName(n) { //converting the format of unreadable number into the game's name format
    if (isNaN(n)) {
        return 'Need More Info';
    }
    else if (levelOf(n) < 1){
        return Math.floor(n);
    }
    else if (levelOf(n) <= orders.length) {
        return Math.round((n / cutoffOf(n)) * 1000) / 1000 + ' ' + (orders[levelOf(n)-1].name);
    }
    else {
        return Math.round((n / cutoffOf(n)) * 1000) / 1000 + '[e' + ((levelOf(n) + 1) * 3) + ']';
    }
}

export function convertSymbol(n) { //converting the format of unreadable number into the game's symbol format
    if (n < 1000000) {
        return n.toLocaleString();
    }
    else if (levelOf(n) < 1){
        return Math.floor(n);
    }
    else if (levelOf(n) <= orders.length) {
        return Math.round((n / cutoffOf(n)) * 1000) / 1000 + (orders[levelOf(n)-1].symbol);
    }
    else {
        return Math.round((n / cutoffOf(n)) * 1000) / 1000 + 'e' + ((levelOf(n) + 1) * 3)
    }
}

export function round(n, precision) {
    return Math.round(n * Math.pow(10, precision)) / Math.pow(10, precision);
}

export function percentString(n, precision, limit=false) {
    let value = limit ? Math.min(Math.max(0, n), 1) : n
    return (value * 100).toFixed(precision) + '%';
}

function orderOf(n) {
    return Math.floor(Math.log(n) / Math.LN10 + 0.000000001) / 3;
}

function levelOf(n) {
    // Returns an integer representing its order of magnitude where 1 = million and 2 = billion etc.
    return Math.floor(orderOf(n) - 1);
}

function cutoffOf(n) {
    // Returns the floor of n's "illion". E.g. 28 million returns 1 million, 794 billion returns 1 billion
    return Math.pow(10, Math.floor(orderOf(n)) * 3);
}

export function getImageSrc(reward) {
    const imageRootSrc = "/images"
    let path = null
    let quantity = null
    switch (reward.type) {
        case "BOOST": {
            path = "b_icon_" + reward.subtype,
            quantity = `+${reward.quantity}`
            break
        }
        case "RESEARCH":
        case "PIGGY_LEVEL": {
            path = reward.subtype 
            quantity = `+${reward.quantity}`
            break
        }
        case "PIGGY_MULTIPLY": {
            path = reward.type
            quantity = `x${reward.quantity}`
            break
        }
        case "PIGGY_BANK":
        default: {
            path = reward.type
            quantity = convertSymbol(reward.quantity)
            break
        }
    }
    return {
        path: `${imageRootSrc}/${path}.png`,
        quantity: quantity,
    }
}