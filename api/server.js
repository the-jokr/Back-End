const express = require("express");
const server = express();
const serverConfig = require("./serverConfig.js");
const authRoute = require("./routes/usersRoute");
const jokesRoute = require("./routes/jokesRoute");
const walletRoute = require("./routes/walletRoute");
const { errorHandler } = require("./middleware/errorHandler");
const { protected } = require("./middleware/auth");
serverConfig(server);

server.use("/api/auth", authRoute);
server.use("/api/jokes", protected, jokesRoute);
server.use("/api/wallet", protected, walletRoute);

server.use(errorHandler);

module.exports = server;
