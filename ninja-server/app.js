const express = require("express");
const app = express();
const { expressjwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const interfaceRouter = require("./routes/interfaces");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置 CORS 头部
app.use((req, res, next) => {
  const referral = req.headers["referer"] || "";
  const origin = referral.match(/^https?:\/\/[^/]+/);
  res.header("Access-Control-Allow-Origin", origin);
  res.header(
    "Access-Control-Allow-Headers",
    req.headers["access-control-request-headers"]
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Expose-Headers", "*");
  res.header("Access-Control-Max-Age", "0");


  next();

});

// openssl rand -base64 64
const jwtSecret =
  "z5RcXxgLAxqNcpkcnz1SRCdTUlePa650Mc+vL4G3xAgEQJSH6Phf3k+SdFoAvB/dNMKUHlLmmPqcte2tmd6EoA==";
const jwtCookieKey = "session-id";
const jwtMiddware = expressjwt({
  secret: jwtSecret,
  algorithms: ["HS256"],
  getToken: function getToken(req) {
    return req.cookies[jwtCookieKey];
  }
});

app.use("/interface", interfaceRouter);

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.get("/user", jwtMiddware, async function user(req, res) {
  // res.json(req.auth);
  res.json({ message: 'success', code: 0, data: { user: req.auth } });
});

app.post("/logout", function logout(req, res) {
  res.clearCookie(jwtCookieKey);
  res.json({ message: 'success', code: 0 });
})

app.post("/login", async function login(req, res) {
  const existUsers = [
    { Username: "admin", Password: "admin" },
    { Username: "user1", Password: "user1" },
  ];

  const found = existUsers.find(
    (it) =>
      it.Username === req.body.Username && it.Password === req.body.Password
  );

  if (found) {
    const token = jwt.sign({ Username: req.body.Username }, jwtSecret);
    res.cookie(jwtCookieKey, token, {
      maxAge: 30 * 24 * 60 * 60_000,
      httpOnly: true,
    });
    res.json({ message: 'success', code: 0, data: { token: token } });
  } else {
    res.sendStatus(401);
  }
});

// 添加错误处理中间件
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    // 如果是认证错误，可以返回特定的响应
    res.status(401).send("Unauthorized: No valid token provided");
  } else {
    // 其他类型的错误继续传递
    next(err);
  }
});

module.exports = app;
