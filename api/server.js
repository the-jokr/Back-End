const express = require("express");
const server = express();
const serverConfig = require("./serverConfig.js");

serverConfig(server);
server.use("/api/auth");

module.exports = server;
