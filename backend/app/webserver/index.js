"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { accountRouter } = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/account", accountRouter);

let server = null;

async function listen(port) {
  try {
    if (server) {
      return server;
    }
    server = await app.listen(port);
    return server;
  } catch (e) {
    console.error("can't listen", e);
    throw e;
  }
}

module.exports = {
  listen,
};
