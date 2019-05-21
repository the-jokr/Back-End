const express = require("express");
const server = express();
const serverConfig = require("./serverConfig.js");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-cbtsao.auth0.com/.well-known/jwks.json"
  }),
  audience: "https://jokr/api/",
  issuer: "https://dev-cbtsao.auth0.com/",
  algorithms: ["RS256"]
});

//routes
const authRoute = require("./routes/usersRoute");
const jokesRoute = require("./routes/jokesRoute");
const walletRoute = require("./routes/walletRoute");

//middleware
const { errorHandler } = require("./middleware/errorHandler");
const { protected } = require("./middleware/auth");
serverConfig(server);

server.use("/api/auth", authRoute);
server.use("/api/jokes", jokesRoute);
server.use("/api/wallet", jwtCheck, walletRoute);

server.use(errorHandler);

module.exports = server;
