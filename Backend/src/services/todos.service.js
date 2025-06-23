const todoModel = require("../models/todo.model");

const getTodosService = async () => {
  return await todoModel.find();
};

const getTodoService = async (id) => {
  return await todoModel.findById(id);
};

const createTodoService = async (data) => {
  const newTodo = await todoModel.create({
    title: data.title,
    completed: data.completed || false,
  });
  return newTodo;
};

const updateTodoService = async (id, data) => {
  return await todoModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteTodoService = async (id) => {
  await todoModel.findByIdAndDelete(id);
};

const deleteAllTodosService = async () => {
  await todoModel.deleteMany();
};

module.exports = {
  getTodosService,
  getTodoService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
  deleteAllTodosService,
};
