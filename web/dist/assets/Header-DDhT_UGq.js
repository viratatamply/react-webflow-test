import { r as reactExports, j as jsxRuntimeExports } from "./index.js";
const Header = () => {
  const [count, setCount] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    gap: "1rem",
    display: "flex",
    alignItems: "center"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "From Redwood" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
      setCount((c) => c + 1);
    }, children: [
      "Count : ",
      count
    ] })
  ] }) });
};
export {
  Header as default
};
