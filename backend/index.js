"use strict";
require("dotenv").config();
const mysqlPool = require("./app/database/mysql-pool");
const webServer = require("./app/webserver/index");

const httpListenigPort = process.env.PORT;

async function initApp() {
  try {
    // Conectar a nuestra base de datos
    // Para tener datos
    await mysqlPool.connect();
    // Establecer y escuchar a nuestro puerto de servidor (url de nuestras requests)
    // Para pedir los datos
    await webServer.listen(httpListenigPort);
    console.log("server running");
  } catch (e) {
    console.error("error stablishing connection");
    throw e;
  }
}

initApp();
