"use strict";
// Exportar todas las rutas (account, auth y notes)
const { accountRouter } = require("./account-router");
const { authRouter } = require("./auth-router");
const { notesRouter } = require("./notes-router");

module.exports = { accountRouter, authRouter, notesRouter };
