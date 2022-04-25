"use strict";
require("dotenv").config();
const mysqlPool = require("./app/database/mysql-pool");
const webServer = require("./app/webserver/index");

const httpListenigPort = process.env.PORT;

async function initApp() {
  try {
    await mysqlPool.connect();
    await webServer.listen(httpListenigPort);
    console.log("server running");
  } catch (e) {
    console.error("error stablishing connection");
    throw e;
  }
}

initApp();
