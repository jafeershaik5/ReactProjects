import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

function Todo() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  console.log("Todo Rendered");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };
  const addTodo = () => {
    const newTodos = todos.map((todo) => ({ ...todo }));
    newTodos.push({
      name: inputText,
      isCompleted: false,
      id: new Date().getTime(),
    });
    setTodos(newTodos);
    setInputText("");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <>
      <div>
        <input
          type="text"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => addTodo(inputText)}>Add Task</button>
      </div>

      <TodoItem todos={todos} setTodos={setTodos} />
    </>
  );
}

export default Todo;
