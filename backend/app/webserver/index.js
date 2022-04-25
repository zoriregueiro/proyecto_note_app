"use strict";
const express = require("express");

const app = express();

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
