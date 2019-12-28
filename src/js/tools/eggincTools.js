export function contractNameFormat(value) {
    return value.replace(" ", "-").toLowerCase()
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