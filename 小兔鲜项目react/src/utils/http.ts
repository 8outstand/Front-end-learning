/**
 * HTTP请求工具函数
 */

/**
 * API基础URL
 */
const BASE_URL = 'http://115.190.99.237:8900/dev-api';

/**
 * HTTP请求配置接口
 */
interface RequestConfig extends RequestInit {
  params?: Record<string, string | number>;
  skipAuth?: boolean;
}

/**
 * HTTP响应接口
 */
interface HttpResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
}

/**
 * 构建带查询参数的URL
 * 
 * @param {string} url - 基础URL
 * @param {Object} params - 查询参数
 * @returns {string} 完整的URL
 */
const buildUrl = (url: string, params?: Record<string, string | number>): string => {
  if (!params) return url;
  
  const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  
  return queryString ? `${url}?${queryString}` : url;
};

/**
 * 获取请求头
 * 
 * @param {boolean} skipAuth - 是否跳过认证
 * @returns {Headers} 请求头
 */
const getHeaders = (skipAuth: boolean = false): Headers => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (!skipAuth) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
  }

  return headers;
};

/**
 * HTTP请求函数
 * 
 * @param {string} url - 请求URL
 * @param {RequestConfig} config - 请求配置
 * @returns {Promise<HttpResponse>} 响应数据
 */
const request = async <T = unknown>(
  url: string,
  config: RequestConfig = {}
): Promise<HttpResponse<T>> => {
  const { params, skipAuth = false, ...restConfig } = config;
  
  const fullUrl = buildUrl(`${BASE_URL}${url}`, params);
  const headers = getHeaders(skipAuth);

  try {
    const response = await fetch(fullUrl, {
      ...restConfig,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || '请求失败');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('网络错误，请稍后重试');
  }
};

/**
 * GET请求
 * 
 * @param {string} url - 请求URL
 * @param {RequestConfig} config - 请求配置
 * @returns {Promise<HttpResponse>} 响应数据
 */
export const get = <T = unknown>(
  url: string,
  config?: RequestConfig
): Promise<HttpResponse<T>> => {
  return request<T>(url, { ...config, method: 'GET' });
};

/**
 * POST请求
 * 
 * @param {string} url - 请求URL
 * @param {Object} data - 请求数据
 * @param {RequestConfig} config - 请求配置
 * @returns {Promise<HttpResponse>} 响应数据
 */
export const post = <T = unknown>(
  url: string,
  data?: unknown,
  config?: RequestConfig
): Promise<HttpResponse<T>> => {
  return request<T>(url, {
    ...config,
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * PUT请求
 * 
 * @param {string} url - 请求URL
 * @param {Object} data - 请求数据
 * @param {RequestConfig} config - 请求配置
 * @returns {Promise<HttpResponse>} 响应数据
 */
export const put = <T = unknown>(
  url: string,
  data?: unknown,
  config?: RequestConfig
): Promise<HttpResponse<T>> => {
  return request<T>(url, {
    ...config,
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * DELETE请求
 * 
 * @param {string} url - 请求URL
 * @param {RequestConfig} config - 请求配置
 * @returns {Promise<HttpResponse>} 响应数据
 */
export const del = <T = unknown>(
  url: string,
  config?: RequestConfig
): Promise<HttpResponse<T>> => {
  return request<T>(url, { ...config, method: 'DELETE' });
};

export default request;