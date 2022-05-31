"use strict";

const { Router } = require("express");
const {
  createAccount,
} = require("../controllers/account/addaccount-controller");

const accountRouter = Router();

accountRouter.post("/", createAccount);

module.exports = { accountRouter };
