//1 父传子
//父组件传递数据 子组件标签上绑定数据
//子组件接受数据 prop 参数

import { Children } from "react"

function Son(props) {
  return(
    <div>
      <span>{props.name}</span>
      <span>{props.children}</span>
    </div>
  )
}



function App() {
  const name = "App"
  return (
    <div>
      <Son name = "123"></Son>
      <span>这是一个span</span>
    </div>
  )
  }
  

export default App
