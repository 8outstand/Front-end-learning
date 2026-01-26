/**
 * 用户登录请求接口
 * 
 * @interface LoginRequest
 * @property {string} username - 用户名
 * @property {string} password - 密码（建议加密传输）
 * 
 * @interface LoginResponse
 * @property {number} code - 响应状态码（200表示成功）
 * @property {string} message - 响应消息
 * @property {UserData} data - 用户数据
 * 
 * @interface UserData
 * @property {number} id - 用户ID
 * @property {string} username - 用户名
 * @property {string} token - 认证令牌
 * @property {string} refreshToken - 刷新令牌
 * 
 * @interface ErrorResponse
 * @property {number} code - 错误码
 * @property {string} message - 错误信息
 * 
 * @example
 * // 成功登录示例
 * POST /api/auth/login
 * {
 *   "username": "admin",
 *   "password": "encrypted_password"
 * }
 * 
 * // 成功响应
 * {
 *   "code": 200,
 *   "message": "登录成功",
 *   "data": {
 *     "id": 1,
 *     "username": "admin",
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *     "refreshToken": "refresh_token_string"
 *   }
 * }
 * 
 * // 失败响应
 * {
 *   "code": 401,
 *   "message": "用户名或密码错误"
 * }
 */

import { post } from '../http';

/**
 * 登录请求接口
 */
interface LoginRequest {
  username: string;
  password: string;
}

/**
 * 登录响应接口
 * 实际响应格式：token在根级别，data为null
 */
interface LoginResponse {
  code: number;
  msg: string;
  data: null;
  token: string;
}

/**
 * 登录接口实现
 * 
 * @param {LoginRequest} credentials - 登录凭据
 * @param {string} credentials.username - 用户名
 * @param {string} credentials.password - 密码
 * @returns {Promise<LoginResponse>} 登录响应
 * 
 * @throws {Error} 网络错误或其他异常
 * 
 * @description
 * 此接口实现用户身份验证逻辑：
 * 1. 向后端发送登录请求
 * 2. 处理登录响应
 * 3. 返回用户信息和令牌
 * 
 * 接口地址：http://115.190.99.237:8900/dev-api/login
 * 请求方法：POST
 * 请求格式：JSON
 */
export const loginAPI = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await post<LoginResponse>('/login', credentials, {
      skipAuth: true
    }) as unknown as LoginResponse;

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('登录失败，请稍后重试');
  }
};