// 入口文件：应用的启动点
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base.css'
import './styles/index.css'
import './styles/common.css'
import App from './App.tsx'

// 渲染应用到 root 元素
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
