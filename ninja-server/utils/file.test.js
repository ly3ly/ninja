jest.mock('fs', () => ({
    access: jest.fn(),
    unlink: jest.fn(),
    writeFile: jest.fn(),
    constants: {
        F_OK: jest.fn(), // 模拟 fs.constants.F_OK
    },
}));

const fs = require('fs');
const { writeFile } = require('./file');

describe('File Operations - writeFile', () => {
    it('should successfully create a new file', async () => {
        // 模拟fs.access表示文件不存在
        fs.access.mockImplementation((path, mode, callback) => callback(new Error('File does not exist')));
        // 模拟fs.writeFile成功写入文件
        fs.writeFile.mockImplementation((path, data, callback) => callback(null));

        await expect(writeFile('test.txt', 'Hello World')).resolves.toBe('success create file');
    });

    // 其他测试用例...
});
