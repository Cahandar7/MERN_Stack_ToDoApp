import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash, FaPlus } from "react-icons/fa";
import confirm_boom from "../src/assets/audios/confirm_boom.mp3";
import delete_gta from "../src/assets/audios/delete_gta.mp3";
import success_retti from "../src/assets/audios/success_retti.mp3";
import success_wp from "../src/assets/audios/success_wp.mp3";
import success_wow_anime from "../src/assets/audios/success_wow_anime.mp3";
import success_yeahbooii from "../src/assets/audios/success_yeahbooii.mp3";

const API_URL = "http://localhost:3000/api/todos";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const createTodo = async () => {
    if (!newTodo.trim()) return;

    const completeMessageAudio = new Audio(success_wow_anime);
    completeMessageAudio.volume = 0.3;
    await completeMessageAudio.play();

    try {
      const response = await axios.post(API_URL, {
        title: newTodo.trim(),
        completed: false,
      });

      setTodos((prev) => [...prev, response.data]);
      setNewTodo("");
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, {
        completed: !currentStatus,
      });

      const updatedTodo = response.data;

      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );

      if (updatedTodo.completed) {
        const sounds = [success_retti, success_wp, success_yeahbooii];

        const randomSound = sounds[Math.floor(Math.random() * sounds.length)];

        const completeMessageAudio = new Audio(randomSound);
        completeMessageAudio.volume = 0.3;
        await completeMessageAudio.play();

        Swal.fire({
          title: "Completed!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          showConfirmButton: true,
          willClose: () => {
            completeMessageAudio.pause();
            completeMessageAudio.currentTime = 0;
          },
        });
      }
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    const confirmMessageAudio = new Audio(confirm_boom);
    confirmMessageAudio.volume = 0.3;
    await confirmMessageAudio.play();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This todo will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setTodos((prev) => prev.filter((todo) => todo._id !== id));

        const deleteMessageAudio = new Audio(delete_gta);
        deleteMessageAudio.volume = 0.3;
        await deleteMessageAudio.play();

        Swal.fire({
          title: "Todo has been deleted!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          timer: 4500,
          showConfirmButton: true,
        });
      } catch (error) {
        console.error("Error deleting todo:", error);
        Swal.fire("Error", "Failed to delete todo", "error");
      }
    }
  };

  const deleteAllTodos = async () => {
    if (todos.length > 0) {
      const confirmMessageAudio = new Audio(confirm_boom);
      confirmMessageAudio.volume = 0.3;
      await confirmMessageAudio.play();

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "All todos will be deleted permanently!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete them all!",
      });

      if (result.isConfirmed) {
        try {
          await axios.delete(API_URL);
          setTodos([]);

          const deleteMessageAudio = new Audio(delete_gta);
          deleteMessageAudio.volume = 0.3;
          await deleteMessageAudio.play();

          Swal.fire({
            title: "Todos have been deleted!",
            icon: "success",
            confirmButtonColor: "#3085d6",
            timer: 4500,
            showConfirmButton: true,
          });
        } catch (error) {
          console.error("Error deleting todos:", error);
          Swal.fire("Error", "Failed to delete todos", "error");
        }
      }
    } else {
      const confirmMessageAudio = new Audio(confirm_boom);
      confirmMessageAudio.volume = 0.3;
      await confirmMessageAudio.play();

      Swal.fire({
        title: "Nothing to delete!",
        icon: "info",
        timer: 2500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📝 My To-Do List</h1>

      <div className="btns-div">
        <button onClick={() => deleteAllTodos()} className="clear-btn">
          <FaTrash /> Clear
        </button>
        <button onClick={() => setModalOpen(true)} className="add-btn">
          <FaPlus /> Add Todo
        </button>
      </div>

      <div className="todo-list">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div key={todo._id} className="todo-item">
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => updateTodo(todo._id, todo.completed)}
                />
                <span className={todo.completed ? "completed" : ""}>
                  {todo.title}
                </span>
              </label>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="delete-btn"
              >
                <FaTrash style={{ color: "red" }} />
              </button>
            </div>
          ))
        ) : (
          <div className="no-todos-animation">
            <p>No left!</p>
            <div className="box-man">
              <div className="eye left">
                <div className="pupil"></div>
              </div>
              <div className="eye right">
                <div className="pupil"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Todo</h2>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="todo-input"
              placeholder="Enter task..."
            />
            <div className="modal-actions">
              <button
                onClick={() => setModalOpen(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button onClick={createTodo} className="add-todo-btn">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
