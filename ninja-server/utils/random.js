
const getRandomItems = (list, n) => {
    const randomItems = [];
    n = n < 0 ? 0 : n

    while (randomItems.length < n) {
        const randomIndex = Math.floor(Math.random() * list.length);
        const randomItem = list[randomIndex];

        if (!randomItems.includes(randomItem)) {
            randomItems.push(randomItem);
        }
    }

    return randomItems;
}


//generate n random strings of length between min and max
const generateRandomStringInRange = (min, max, n) => {
    const strings = [];
    const numbers = generateRandomNumbersInRange(min, max, n);
    for (let i = 0; i < numbers.length; i++) {
        let str = generateRandomString(numbers[i])
        // console.log(`str-length: ${str.length} - ${str}`);
        strings.push(str);
    }
    return strings;
}

//generate n random strings of length greater than max and less than min
const generateRandomStringsOutRange = (min, max, n) => {
    const strings = [];
    const numbers = generateRandomNumbersOutRange(min, max, n);
    for (let i = 0; i < numbers.length; i++) {
        strings.push(generateRandomString(numbers[i]));
    }
    return strings;
}

//generate string of length n
const generateRandomString = (n) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let j = 0; j < n; j++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
}


// generate n random numbers between min and max
const generateRandomNumbersInRange = (min, max, n) => {
    const numbers = [];
    for (let i = 0; i < n; i++) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.push(randomNumber);
    }
    return numbers;
}

// generate n random numbers greater than max and less than min
const generateRandomNumbersOutRange = (min, max, n) => {
    min = min < 0 ? 0 : min;
    const numbers = [];
    for (let i = 0; i < n / 2; i++) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1));
        numbers.push(min - randomNumber, randomNumber + max);
    }
    if (n % 2 === 1) {
        numbers.shift();
    }
    return numbers;
}

module.exports = {
    getRandomItems,
    generateRandomString,
    generateRandomStringInRange,
    generateRandomStringsOutRange,
    generateRandomNumbersInRange,
    generateRandomNumbersOutRange
}