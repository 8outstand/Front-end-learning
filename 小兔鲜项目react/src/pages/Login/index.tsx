import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginAPI } from '../../utils/api/auth';
import '../../styles/login.css';

/**
 * 登录表单数据接口
 */
interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

/**
 * 表单验证错误接口
 */
interface FormErrors {
  username?: string;
  password?: string;
}


const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 表单数据状态
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    rememberMe: false
  });

  // 表单验证错误状态
  const [errors, setErrors] = useState<FormErrors>({});

  // 密码显示状态
  const [showPassword, setShowPassword] = useState(false);

  // 登录加载状态
  const [isLoading, setIsLoading] = useState(false);

  // 登录错误信息
  const [loginError, setLoginError] = useState('');

  /**
   * 表单验证函数
   * 
   * @returns {boolean} 验证是否通过
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // 验证用户名
    if (!formData.username.trim()) {
      newErrors.username = '请输入用户名';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = '用户名至少3个字符';
      isValid = false;
    } else if (formData.username.length > 20) {
      newErrors.username = '用户名最多20个字符';
      isValid = false;
    }

    // 验证密码
    if (!formData.password) {
      newErrors.password = '请输入密码';
      isValid = false;
    } else if (formData.password.length < 3) {
      newErrors.password = '密码至少3个字符';
      isValid = false;
    } else if (formData.password.length > 20) {
      newErrors.password = '密码最多20个字符';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * 处理输入框变化
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - 输入事件
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // 清除对应字段的错误
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  /**
   * 处理登录提交
   * 
   * @param {React.FormEvent} e - 表单提交事件
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // 表单验证
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // 调用登录API
      const response = await loginAPI({
        username: formData.username,
        password: formData.password
      });

      if (response.code === 200) {
        // 登录成功
        // 处理实际响应格式：token在根级别，data为null
        const token = response.token;
        
        if (token) {
          // 存储令牌
          if (formData.rememberMe) {
            localStorage.setItem('token', token);
            localStorage.setItem('userInfo', JSON.stringify({
              username: formData.username
            }));
          } else {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userInfo', JSON.stringify({
              username: formData.username
            }));
          }

          // 获取登录前要访问的页面路径
          const from = (location.state as { from?: string })?.from || '/';

          // 跳转到目标页面
          navigate(from, { replace: true });
        } else {
          setLoginError('登录失败：未获取到令牌');
        }
      } else {
        // 登录失败
        setLoginError(response.msg || '登录失败');
      }
    } catch {
      // 网络错误
      setLoginError('网络错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 切换密码显示状态
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <h1>用户登录</h1>
          <p>欢迎回到小兔鲜</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* 用户名输入框 */}
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="请输入用户名"
              className={errors.username ? 'error' : ''}
              disabled={isLoading}
              autoComplete="username"
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          {/* 密码输入框 */}
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="请输入密码"
                className={errors.password ? 'error' : ''}
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                {showPassword ? '隐藏' : '显示'}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* 记住我和忘记密码 */}
          <div className="form-options">
            <label className="remember-me">
              {/* <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                disabled={isLoading}
              /> */}
              {/* <span>记住我</span> */}
            </label>
            <a href="#" className="forgot-password">
              忘记密码？
            </a>
          </div>

          {/* 登录按钮 */}
          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? '登录中...' : '登录'}
          </button>

          {/* 登录错误提示 */}
          {loginError && (
            <div className="login-error">
              <i className="iconfont icon-error"></i>
              {loginError}
            </div>
          )}
        </form>

        <div className="login-footer">
          <p>还没有账号？<a href="#">立即注册</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;