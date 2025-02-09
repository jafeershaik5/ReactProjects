import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  editTodo,
  fetchTodos,
  toggleComplete,
} from "../features/todos/todoSlice";
import { FaRegEdit } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

function Todo() {
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const { todos, status, error } = useSelector((state) => state.todo);
  console.log(todos);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [dispatch, status]);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const handleEdit = (id, task) => {
    if (id && task) {
      setEditId(id);
      setIsEdit(true);
      setTask(task);
    }
  };

  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteTodo(id));
    }
  };
  const addTask = () => {
    if (task) {
      dispatch(addTodo(task));
    }
    setTask("");
  };
  const updateTask = () => {
    if (task) {
      dispatch(editTodo({ id: editId, todo: task }));
    }
    setTask("");
  };
  const handleComplete = (id) => {
    if (id) {
      dispatch(toggleComplete(id));
    }
  };

  return (
    <>
      <div className="flex justify-center gap-4 mb-8">
        <input
          type="text"
          className="border border-black rounded p-2 shadow-2xl"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter Todo"
        />
        <button
          className="border border-black rounded px-4 py-2 bg-lime-300 shadow-2xl"
          onClick={isEdit ? updateTask : addTask}
        >
          {isEdit ? "update Task" : "Add Task"}
        </button>
      </div>
      <div>
        {todos &&
          todos.map((todo) => (
            <div key={todo.id} className="flex items-center gap-2 m-2">
              <h3
                className={`font-mono text-xs tracking-tight ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.todo}
              </h3>
              <span
                className="cursor-pointer text-red-500"
                onClick={() => handleDelete(todo.id)}
              >
                <MdDelete />
              </span>
              <span
                className="cursor-pointer text-red-500"
                onClick={() => handleComplete(todo.id)}
              >
                {todo.completed ? (
                  <RxCross2 className="font-bold" />
                ) : (
                  <TiTick />
                )}
              </span>

              <span
                className="cursor-pointer text-blue-500"
                onClick={() => handleEdit(todo.id, todo.todo)}
              >
                <FaRegEdit />
              </span>
            </div>
          ))}
      </div>
    </>
  );
}

export default Todo;
