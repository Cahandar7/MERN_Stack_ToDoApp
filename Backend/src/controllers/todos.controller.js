const {
  getTodosService,
  getTodoService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
  deleteAllTodosService,
} = require("../services/todos.service");

const getTodos = async (req, res) => {
  const todos = await getTodosService();
  res.json(todos);
};

const getTodo = async (req, res) => {
  const todo = await getTodoService(req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
};

const createTodo = async (req, res) => {
  const { title, completed } = req.body;
  try {
    const newTodo = await createTodoService({ title, completed });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: "Failed to create todo", details: error });
  }
};

const updateTodo = async (req, res) => {
  const { title, completed } = req.body;

  try {
    const updated = await updateTodoService(req.params.id, {
      title,
      completed,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Failed to update todo", details: error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    await deleteTodoService(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete todo", details: error });
  }
};

const deleteAllTodos = async (req, res) => {
  try {
    await deleteAllTodosService();
    res.json({ message: "All todos deleted" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete all", details: error });
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
};
