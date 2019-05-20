const express = require("express");
const server = express();
const serverConfig = require("./serverConfig.js");
const authRoute = require("./routes/usersRoute");
const { errorHandler } = require("./middleware/auth");
serverConfig(server);

server.use("/api/auth", authRoute);
server.use(errorHandler);

module.exports = server;
