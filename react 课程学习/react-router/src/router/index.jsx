import { Login } from '../page/Login'

import { Article } from '../page/Article'

import { createBrowserRouter } from 'react-router-dom'
import Layout from '../page/Layout'
import Board from '../page/Board'
import About from '../page/About'
import Notfound from '../page/NotFound'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                // 设置为默认二级路由
                index: true,
                element: <Board />
            },
            {
                path: 'about',
                element: <About />
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/article',
        element: <Article></Article>
    },
    {
        path: '*',
        element: <Notfound></Notfound>
    }
])

export default router