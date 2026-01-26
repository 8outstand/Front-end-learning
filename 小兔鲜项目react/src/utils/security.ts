/**
 * 安全工具函数
 * 
 * 提供密码加密、CSRF防护等安全功能
 */

/**
 * 简单的Base64加密（仅用于演示，实际项目应使用更安全的加密算法）
 * 
 * @param {string} text - 需要加密的文本
 * @returns {string} 加密后的文本
 * 
 * @description
 * 此函数使用Base64编码对文本进行简单加密
 * 实际项目中应该使用：
 * - bcrypt（密码哈希）
 * - SHA-256（数据哈希）
 * - AES（数据加密）
 * 
 * @example
 * // 加密密码
 * const encrypted = encryptPassword('myPassword123');
 * console.log(encrypted); // 'bXlQYXNzd29yZDEyMw=='
 */
export const encryptPassword = (text: string): string => {
  // 实际项目中应该使用更安全的加密方法
  // 这里使用Base64编码作为演示
  try {
    return btoa(text);
  } catch {
    // 处理中文字符编码问题
    return btoa(encodeURIComponent(text));
  }
};

/**
 * CSRF Token生成器
 * 
 * @returns {string} CSRF Token
 * 
 * @description
 * 生成一个随机的CSRF Token，用于防止跨站请求伪造攻击
 * Token包含时间戳和随机字符串，确保唯一性和时效性
 * 
 * @example
 * // 生成CSRF Token
 * const csrfToken = generateCSRFToken();
 * console.log(csrfToken); // 'csrf_1706234567890_abc123xyz'
 */
export const generateCSRFToken = (): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  return `csrf_${timestamp}_${randomString}`;
};

/**
 * 验证CSRF Token
 * 
 * @param {string} token - 需要验证的CSRF Token
 * @param {number} maxAge - Token最大有效期（毫秒），默认1小时
 * @returns {boolean} Token是否有效
 * 
 * @description
 * 验证CSRF Token是否有效，检查：
 * 1. Token格式是否正确
 * 2. Token是否过期
 * 
 * @example
 * // 验证CSRF Token
 * const isValid = validateCSRFToken('csrf_1706234567890_abc123xyz');
 * console.log(isValid); // true 或 false
 */
export const validateCSRFToken = (token: string, maxAge: number = 60 * 60 * 1000): boolean => {
  try {
    // 检查Token格式
    if (!token.startsWith('csrf_')) {
      return false;
    }

    // 提取时间戳和随机字符串
    const parts = token.split('_');
    if (parts.length !== 3) {
      return false;
    }

    const timestamp = parseInt(parts[1]);
    
    // 检查Token是否过期
    const now = Date.now();
    return (now - timestamp) < maxAge;
  } catch {
    return false;
  }
};

/**
 * 生成随机盐值
 * 
 * @param {number} length - 盐值长度，默认16
 * @returns {string} 随机盐值
 * 
 * @description
 * 生成一个随机的盐值，用于增强密码加密的安全性
 * 
 * @example
 * // 生成盐值
 * const salt = generateSalt();
 * console.log(salt); // 'a1b2c3d4e5f6g7h8'
 */
export const generateSalt = (length: number = 16): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * 验证密码强度
 * 
 * @param {string} password - 需要验证的密码
 * @returns {Object} 密码强度信息
 * 
 * @description
 * 验证密码强度，返回强度等级和建议
 * 
 * @example
 * // 验证密码强度
 * const strength = validatePasswordStrength('MyP@ssw0rd123');
 * console.log(strength);
 * // {
 * //   score: 4,
 * //   level: '强',
 * //   suggestions: []
 * // }
 */
export const validatePasswordStrength = (password: string): {
  score: number;
  level: string;
  suggestions: string[];
} => {
  let score = 0;
  const suggestions: string[] = [];

  // 检查长度
  if (password.length >= 8) {
    score += 1;
  } else {
    suggestions.push('密码长度至少8位');
  }

  if (password.length >= 12) {
    score += 1;
  }

  // 检查复杂度
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  if (hasLowercase) score += 1;
  else suggestions.push('包含小写字母');

  if (hasUppercase) score += 1;
  else suggestions.push('包含大写字母');

  if (hasNumbers) score += 1;
  else suggestions.push('包含数字');

  if (hasSpecial) score += 1;
  else suggestions.push('包含特殊字符');

  // 确定强度等级
  let level = '弱';
  if (score >= 2) level = '中';
  if (score >= 3) level = '强';
  if (score >= 5) level = '非常强';

  return {
    score,
    level,
    suggestions
  };
};

/**
 * 防止XSS攻击
 * 
 * @param {string} input - 需要清理的输入
 * @returns {string} 清理后的安全字符串
 * 
 * @description
 * 清理用户输入，防止XSS攻击
 * 
 * @example
 * // 清理用户输入
 * const safeInput = sanitizeInput('<script>alert("XSS")</script>');
 * console.log(safeInput); // '&lt;script&gt;alert("XSS")&lt;/script&gt;'
 */
export const sanitizeInput = (input: string): string => {
  // 替换危险字符
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};