/**
 * 认证工具函数
 */

/**
 * 检查用户是否已登录
 * 
 * @returns {boolean} 是否已登录
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return !!token;
};

/**
 * 获取用户信息
 * 
 * @returns {Object | null} 用户信息
 */
export const getUserInfo = () => {
  const userInfoStr = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
  if (userInfoStr) {
    try {
      return JSON.parse(userInfoStr);
    } catch {
      return null;
    }
  }
  return null;
};

/**
 * 获取访问令牌
 * 
 * @returns {string | null} 访问令牌
 */
export const getToken = (): string | null => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

/**
 * 获取刷新令牌
 * 
 * @returns {string | null} 刷新令牌
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
};

/**
 * 清除认证信息
 */
export const clearAuth = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userInfo');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('userInfo');
};