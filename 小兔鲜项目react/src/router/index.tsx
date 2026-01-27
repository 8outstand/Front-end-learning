import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';
import Loading from '../components/Loading';

/**
 * 路由配置
 */
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const ProductList = lazy(() => import('../pages/ProductList'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));

/**
 * 公共路由配置
 */
export const publicRoutes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/products',
    element: (
      <Suspense fallback={<Loading />}>
        <ProductList />
      </Suspense>
    )
  },
  {
    path: '/product/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <ProductDetail />
      </Suspense>
    )
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
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
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