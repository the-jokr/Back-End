const express = require("express");
const server = express();
const serverConfig = require("./serverConfig.js");

serverConfig(server);

module.exports = server;
