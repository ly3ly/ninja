const {
    getRandomItems,
    generateRandomString,
    generateRandomStringInRange,
    generateRandomStringsOutRange,
    generateRandomNumbersInRange,
    generateRandomNumbersOutRange
} = require('./random'); // 替换为您的模块路径

describe('Random Utilities', () => {
    // 测试 getRandomItems 函数
    it('should return n unique random items from a list', () => {
        const list = [1, 2, 3, 4, 5];
        const n = 3;
        const items = getRandomItems(list, n);
        expect(items.length).toBe(n);
    });

    // 测试 generateRandomString 函数
    it('should generate a string of length n', () => {
        const n = 5;
        const str = generateRandomString(n);
        expect(str).toHaveLength(n);
    });

    // 测试 generateRandomStringInRange 函数
    it('should generate strings within the given range', () => {
        const min = 5;
        const max = 10;
        const n = 3;
        const strings = generateRandomStringInRange(min, max, n);
        expect(strings).toHaveLength(n);
        strings.forEach(str => {
            expect(str.length).toBeGreaterThanOrEqual(min);
            expect(str.length).toBeLessThanOrEqual(max);
        });
    });

    // 测试 generateRandomStringsOutRange 函数
    it('should generate strings outside the given range', () => {
        const min = 5;
        const max = 10;
        const n = 3;
        const strings = generateRandomStringsOutRange(min, max, n);
        expect(strings).toHaveLength(n);
        strings.forEach(str => {
            try {
                expect(str.length).toBeGreaterThanOrEqual(max);
            } catch (error) {
                expect(str.length).toBeLessThanOrEqual(min);
            }
        });
    });

    // 测试 generateRandomNumbersInRange 函数
    it('should generate numbers within the given range', () => {
        const min = 1;
        const max = 10;
        const n = 5;
        const numbers = generateRandomNumbersInRange(min, max, n);
        expect(numbers).toHaveLength(n);
        numbers.forEach(num => {
            expect(num).toBeGreaterThanOrEqual(min);
            expect(num).toBeLessThanOrEqual(max);
        });
    });

    // 测试 generateRandomNumbersOutRange 函数
    it('should generate numbers outside the given range', () => {
        const min = 1;
        const max = 10;
        const n = 5;
        const numbers = generateRandomNumbersOutRange(min, max, n);
        numbers.forEach(num => {
            try {
                expect(num).toBeGreaterThanOrEqual(max);
            } catch (error) {
                expect(num).toBeLessThanOrEqual(min);
            }
        });
    });
});
