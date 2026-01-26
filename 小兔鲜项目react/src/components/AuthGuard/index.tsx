import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

/**
 * 路由守卫组件属性
 */
interface AuthGuardProps {
  children: ReactNode;
}

/**
 * 路由守卫组件
 * 
 * 功能：
 * - 检查用户登录状态
 * - 未登录用户访问受保护页面时重定向到登录页
 * - 记录用户访问路径，登录后自动跳转回原页面
 * 
 * @param {AuthGuardProps} props - 组件属性
 * @returns {ReactNode} 子组件或重定向
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 检查用户是否已登录
    if (!isAuthenticated()) {
      // 未登录，重定向到登录页，并记录当前路径
      navigate('/login', {
        state: { from: location.pathname }
      });
    }
  }, [navigate, location]);

  // 如果已登录，渲染子组件
  if (isAuthenticated()) {
    return <>{children}</>;
  }

  // 未登录时返回null（等待重定向）
  return null;
};

export default AuthGuard;