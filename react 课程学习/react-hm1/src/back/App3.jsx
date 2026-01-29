//App -> A -> B

//1 create Context方法创建一个上下文对象

//2 在顶层组件 通过 provider组件提供数据

//3 在底层组件 通过 useContext钩子函数使用数据

import {  createContext, useContext } from "react"

const msgContext = createContext()

function A() {
  return(
    <>
    this is a component
    <B></B>
    </>
  )
}

function B() {
  const msg = useContext(msgContext)
  return(
    <>
    this is b component {msg}
    </>
  )
}



function App() {
  const name = "this is message"
  return (
    <msgContext.Provider value={name}>
      this is App
      <A></A>
    </msgContext.Provider>
  )
  }
  

export default App
