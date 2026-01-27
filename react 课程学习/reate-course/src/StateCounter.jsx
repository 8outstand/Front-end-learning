import { useState } from 'react'

export default function StateCounter() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  function handleClick() {
    setCount( count + 1)
    setCount( count + 5)
    setCount( count + 10)
  }
  function handleClick2() {
    setCount2((count) => count + 1)
    setCount2((count) => count + 5)
    setCount2((count) => count + 10)
  }
  return (
    <>
      <button onClick={handleClick}>
        count is {count}
        handleClick
      </button>
      <button onClick={handleClick2}>
        count2 is {count2}
        handleClick2
      </button>
    </>
  )
}