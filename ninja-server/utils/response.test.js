const {
    Response,
    SuccessResponse,
    ErrorResponse
} = require('./response');

describe('Response Utilities', () => {
    // 测试 Response 函数
    it('should create a response with given code, data and message', () => {
        const code = 200;
        const data = { item: 'test' };
        const msg = 'Success';
        const response = Response(code, data, msg);
        expect(response).toEqual({ code, data, msg });
    });

    // 测试 SuccessResponse 函数
    it('should create a success response with data and message', () => {
        const data = { item: 'test' };
        const msg = 'Success';
        const response = SuccessResponse(data, msg);
        expect(response).toEqual({ code: 0, data, msg });
    });

    // 测试 ErrorResponse 函数
    it('should create an error response with code, data and message', () => {
        const code = 400;
        const data = { error: 'Error occurred' };
        const msg = 'Failure';
        const response = ErrorResponse(code, data, msg);
        expect(response).toEqual({ code, data, msg });
    });
});
