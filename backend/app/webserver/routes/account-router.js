"use strict";
// Crear rutas para todos los controllers relacionados con la cuenta
const { Router } = require("express");
const {
  createAccount,
} = require("../controllers/account/addaccount-controller");

const accountRouter = Router();

accountRouter.post("/", createAccount);

module.exports = { accountRouter };
