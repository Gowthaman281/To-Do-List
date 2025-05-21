import React, { useEffect, useState } from "react";
import "./index.css";

const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { text: newTodo.trim(), completed: false }]);
    setNewTodo("");
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleToggle = (index) =>
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].text);
  };

  const handleEditSave = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, text: editValue.trim() } : todo
      )
    );
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="container max-w-xl bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Simple To-Do List
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Add a new To Do"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {todos
            .map((todo, index) => ({ ...todo, index })) 
            .map(({ text, completed, index }) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 p-4 rounded shadow-sm"
              >
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => handleToggle(index)}
                    className="h-5 w-5"
                  />
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none"
                    />
                  ) : (
                    <span
                      className={`text-lg ${
                        completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {text}
                    </span>
                  )}
                </div>

                <div className="flex gap-3 p-4">
                  {editIndex === index ? (
                    <button
                      onClick={() => handleEditSave(index)}
                      className="bg-green-500 px-4 py-1 border rounded text-white hover:text-green-800 hover:bg-white font-semibold transition duration-75"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-orange-500 text-white px-4 py-1 border rounded hover:text-orange-800  hover:bg-white font-semibold transition duration-100"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-4 py-1 border rounded hover:text-red-800  hover:bg-white font-semibold transition duration-100"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
