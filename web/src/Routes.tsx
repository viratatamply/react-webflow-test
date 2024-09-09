// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { useState } from 'react'

const Routes = () => {
  const [count, setCount] = useState(0)
  return (
    <>
      <div
        style={{
          gap: '1rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p>From React</p>
        <button
          onClick={() => {
            setCount((c) => c + 1)
          }}
        >
          Count : {count}
        </button>
      </div>
    </>
  )
}

export default Routes
