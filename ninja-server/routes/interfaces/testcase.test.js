const {
    handleGenerateTestcase,
    handleRunTestcase
} = require('./testcase'); // 替换为您的模块路径

describe('Testcase Handlers', () => {
    // 测试生成测试用例
    it('should generate test cases', async () => {
        const id = '1231231'; //不存在的id
        const response = await handleGenerateTestcase(id);
        expect(response.code).not.toBe(0);

    });
});
