const express = require("express");
const server = express();
const serverConfig = require("./serverConfig.js");
const authRoute = require("./routes/usersRoute");
const jokesRoute = require("./routes/jokesRoute");
const { errorHandler } = require("./middleware/errorHandler");
serverConfig(server);

server.use("/api/auth", authRoute);
server.use("/api/jokes", jokesRoute);
server.use(errorHandler);

module.exports = server;
