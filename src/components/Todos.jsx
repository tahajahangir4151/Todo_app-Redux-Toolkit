import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, updateTodo } from "../features/todoSlice/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(null);
  const [editInput, setEditInput] = useState("");

  const handleEdit = (id, text) => {
    setIsEditing(id);
    setEditInput(text);
  };

  const saveEdit = (id) => {
    if (editInput.trim() === "") return;
    dispatch(updateTodo({ id, text: editInput }));
    setIsEditing(null);
    setEditInput("");
  };

  return (
    <div className="mt-6 mx-auto max-w-xl">
      <h2 className="text-3xl font-bold text-gray-100 text-center">
       Todos
      </h2>
      <ul className="list-none mt-6">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded-lg shadow-md"
          >
            {isEditing === todo.id ? (
              <input
                className="text-gray-900 w-2/3 px-2 py-1 rounded border border-gray-600"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
              />
            ) : (
              <div className="text-white text-lg">{todo.text}</div>
            )}
            <div className="flex space-x-3">
              {isEditing === todo.id ? (
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="text-white bg-green-500 px-4 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo.id, todo.text)}
                  className="text-white bg-blue-500 px-4 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 px-4 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
