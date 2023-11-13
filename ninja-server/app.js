const express = require("express");
const app = express();
const port = 3000;
const { expressjwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const interfaceRouter = require("./routes/interfaces");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 设置 CORS 头部
app.use((req, res, next) => {
  const referral = req.headers["referer"];
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
  },
});
app.use("/interface", jwtMiddware, interfaceRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/user", jwtMiddware, async function user(req, res) {
  res.json(req.auth);
});

app.post("/login", async function login(req, res) {
  const existUsers = [
    { Username: "a", Password: "a" },
    { Username: "b", Password: "b" },
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
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// })

module.exports = app;
