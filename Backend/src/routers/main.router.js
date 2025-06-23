const { Router } = require("express");
const todoRouter = require("./todo.router");

const mainRouter = Router();

mainRouter.use("/todos", todoRouter);

module.exports = mainRouter;
