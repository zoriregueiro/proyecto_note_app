"use strict";

const { Router } = require("express");

const {
  checkAccountSession,
} = require("../controllers/account/check-account-controller");

const {
  createCategory,
} = require("../controllers/categories/add-category-controller");

const {
  getCategories,
} = require("../controllers/categories/get-categories-controller");

const {
  updateCategory,
} = require("../controllers/categories/update-categories-controller");

const { deleteCategory } = require("../controllers/categories/delete-category");

const categoriesRouter = Router();

categoriesRouter.post("/create", checkAccountSession, createCategory);
categoriesRouter.get("/", checkAccountSession, getCategories);
categoriesRouter.put("/update", checkAccountSession, updateCategory);
categoriesRouter.put(
  "/delete/:categoryId",
  checkAccountSession,
  deleteCategory
);

module.exports = {
  categoriesRouter,
};
