import React, { useState } from 'react'
import './Todo.css' // Import the CSS file

const Todo = () => {
  const [todos, setTodos] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue])
      setInputValue('') // Clear the input field after adding a todo
    }
  }

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      <div className="todo-input-section">
        <input
          type="text"
          className="todo-input"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="todo-add-button" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <span>{todo}</span>
            <button
              className="todo-remove-button"
              onClick={() => removeTodo(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo
