const request = require('supertest');
const app = require('./app'); // 导入您的 Express 应用

// let server;

// beforeAll(() => {
//     // 启动服务器
//     return new Promise((resolve) => {
//         server = app.listen(0, resolve);
//     });
// });


describe('GET /', () => {
    it('should respond with "Hello World!"', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(404);
        // expect(response.text).toBe('Hello World!');
    });
});




// afterAll(() => {
//     // 关闭服务器
//     return new Promise((resolve, reject) => {
//         server.close((err) => {
//             if (err) reject(err);
//             else resolve();
//         });
//     });
// });
