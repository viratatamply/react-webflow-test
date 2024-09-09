import { r as reactExports, j as jsxRuntimeExports } from "./index.js";
const Todo = () => {
  const [todos, setTodos] = reactExports.useState([]);
  const [inputValue, setInputValue] = reactExports.useState("");
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };
  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "todo-container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "todo-title", children: "Todo List" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "todo-input-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", className: "todo-input", placeholder: "Add a new task...", value: inputValue, onChange: (e) => setInputValue(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "todo-add-button", onClick: addTodo, children: "Add" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "todo-list", children: todos.map((todo, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "todo-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: todo }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "todo-remove-button", onClick: () => removeTodo(index), children: "Remove" })
    ] }, index)) })
  ] });
};
export {
  Todo as default
};
