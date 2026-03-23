import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
// 1. 导入你写的 router 配置文件（路径要和你的实际文件位置匹配！）
import router from './router' // 假设你的 router 配置在 src/router/index.js
// 2. 导入 Redux 的 Provider 和 store（Layout 用了 useDispatch，必须加！）
import { Provider } from 'react-redux'
import store from './store' // 假设你的 store 在 src/store/index.js

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 3. 先包裹 Redux Provider（给组件提供 dispatch 能力） */}
    <Provider store={store}>
      {/* 4. 给 RouterProvider 传入 router 实例（核心！解决 state 未定义） */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)