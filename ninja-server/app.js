const express = require('express');
const app = express();
const port = 3000;

const interfaceRouter = require('./routes/interfaces');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// 设置 CORS 头部
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源访问，您也可以指定特定的来源
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use('/interface', interfaceRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// })

module.exports = app;
