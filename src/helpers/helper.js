const validateEmail = mail => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));

const capitalizeFirstLetter = string => (string.charAt(0).toUpperCase() + string.slice(1));

// https://medium.com/swlh/how-to-round-to-a-certain-number-of-decimal-places-in-javascript-ed74c471c1b8
const roundAccurately = (number, decimalPlaces) => {
    if (number < 0) {
        number *= -1;
        number = Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces);
        return number *= -1;
    } else {
        return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces);
    };
};

const validateCodeUnique = (code, listOfObjects) => { 
    let unique = true;
    listOfObjects.forEach(e => code===e.code ? unique = false : '')

    return unique;
}

const validateIsNumber = input => isNaN(input) ? false : true

const truncate = (str, n) => {
    return (str.length > n) ? str.slice(0, n-1) + '&hellip;' : str;
};

const truncateWord = ( str, n, useWordBoundary ) => {
    if (str.length <= n) { return str; }
    const subString = str.slice(0, n-1); // the original check
    return (useWordBoundary 
      ? subString.slice(0, subString.lastIndexOf(" ")) 
      : subString) + "&hellip;";
};

const compareObj = (originalObj, newObj) => {

    const keys = Object.keys(originalObj);
    let output = {};

    keys.forEach( e=> {
        if (originalObj[e] !== newObj[e]) {
            output[e] = newObj[e]
        }
    })

    return output;
};

export {
    validateEmail,
    capitalizeFirstLetter,
    roundAccurately,
    validateCodeUnique,
    validateIsNumber,
    truncate,
    truncateWord,
    compareObj
}