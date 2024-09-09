import { useState } from 'react'

const Header = () => {
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
        <p>From Redwood</p>
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

export default Header
