const { Router } = require("express");
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
} = require("../controllers/todos.controller");

const todoRouter = Router();

todoRouter.get("/", getTodos);

todoRouter.get("/:id", getTodo);

todoRouter.post("/", createTodo);

todoRouter.patch("/:id", updateTodo);

todoRouter.delete("/:id", deleteTodo);

todoRouter.delete("/", deleteAllTodos);

module.exports = todoRouter;
