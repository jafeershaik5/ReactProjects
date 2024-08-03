import React, { useState } from "react";

function TodoItem({ todos, setTodos }) {
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);
  console.log("TodoList Rendered");
  const handleComplete = (id) => {
    const newTodos = todos.map((todo) => {
      return { ...todo };
    });
    newTodos.forEach((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
    });
    setTodos(newTodos);
  };
  const handleDelete = (id) => {
    const filteredTodo = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(filteredTodo);
  };
  const handleEdit = (id) => {
    setEditId(id);
    const todoItem = todos.find((todo) => todo.id === id);
    setEditText(todoItem.name);
  };
  const handleSaveEditTodo = (id) => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, name: editText };
      }
      return todo;
    });
    setTodos(newTodo);
    setEditId(null);
    setEditText("");
  };
  return (
    <>
      <div>
        {todos.map((todoItem) => {
          return (
            <div key={todoItem.id}>
              {todoItem.isCompleted ? (
                <span
                  style={{
                    marginRight: "2rem",
                    textDecoration: "line-through",
                  }}
                >
                  {todoItem.name}
                </span>
              ) : editId === todoItem.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSaveEditTodo(todoItem.id);
                      }
                    }}
                  />
                </>
              ) : (
                <span style={{ marginRight: "2rem" }}>{todoItem.name}</span>
              )}
              <span
                style={{ marginRight: "0.5rem" }}
                onClick={() => handleComplete(todoItem.id)}
              >
                {"✔️"}
              </span>
              <span
                style={{ marginRight: "0.5rem" }}
                onClick={() => handleDelete(todoItem.id)}
              >
                {"X"}
              </span>
              <span onClick={() => handleEdit(todoItem.id)}>{"📝"}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default React.memo(TodoItem);
// export default TodoItem;
