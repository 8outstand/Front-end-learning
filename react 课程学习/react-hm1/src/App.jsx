import { useEffect, useState } from "react";


function App(){

  const [count, setCount] = useState(0)

  // useEffect(() => {
  //   console.log('副作用函数执行了');
    
  // })

  //只有初始化的时候执行一次
  // useEffect(() => {
  //   console.log('副作用函数执行了');
    
  // },[])

  //绑定count ，只有count变化的时候才会执行 + 初始化执行
  useEffect(() => {
    console.log('副作用函数执行了');
    
  },[count])


  return(
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </>
  )
}

export default App;