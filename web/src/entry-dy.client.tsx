import { lazy, Suspense } from 'react'

import { createRoot } from 'react-dom/client'

/**
 * When `#redwood-app` isn't empty then it's very likely that you're using
 * prerendering. So React attaches event listeners to the existing markup
 * rather than replacing it.
 * https://react.dev/reference/react-dom/client/hydrateRoot
 */
const headers = document.querySelectorAll('[react=header]')

if (headers.length) {
  headers.forEach((header) => {
    header.replaceChildren()
    const headerRoot = createRoot(header)
    const Header = lazy(() => import('src/components/Header/Header'))
    headerRoot.render(
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <Header />
      </Suspense>
    )
  })
}
const todos = document.querySelectorAll('[react=todo]')

if (todos.length) {
  todos.forEach((todo) => {
    todo.replaceChildren()
    const todoRoot = createRoot(todo)
    const Todo = lazy(() => import('src/components/Todo/Todo'))
    todoRoot.render(
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <Todo />
      </Suspense>
    )
  })
}
