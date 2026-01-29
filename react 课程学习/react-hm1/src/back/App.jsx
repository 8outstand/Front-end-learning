// react中获取dom

import { useRef } from "react"

//1 useRef 生成 ref 对象，绑定到 dom 标签 上
//2 dom 可用时，ref。current 获取 dom
//渲染完毕后可以使用

function App() {
  const inputRef = useRef(null)
  const showDom = () => {
    console.log(inputRef.current);
    
  }
  return (
    <div>
      <input type="text" ref={inputRef}/>
      <button onClick={showDom}>获取 dom</button>
    </div>
  )
}

export default App
