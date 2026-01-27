/**
 * 共享类型定义
 */

/**
 * 商品数据接口
 */
export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
}

/**
 * 分类数据接口
 */
export interface Category {
  title: string;
  subcategories: string[];
}

/**
 * 推荐数据接口
 */
export interface Recommend {
  id: number;
  image: string;
  title: string;
  description: string;
}