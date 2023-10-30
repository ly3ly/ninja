const generateRandomNumbersOutRange = (min, max, n) => {
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