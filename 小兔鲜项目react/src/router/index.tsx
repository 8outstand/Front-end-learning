import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';

/**
 * 路由配置
 */
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));

/**
 * 公共路由配置
 */
export const publicRoutes = [
  {
    path: '/login',
    element: <Login />
  }
];

/**
 * 受保护路由配置（需要登录才能访问）
 */
export const protectedRoutes = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <Home />
      </AuthGuard>
    )
  }
];

/**
 * 创建路由器实例
 */
export const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);