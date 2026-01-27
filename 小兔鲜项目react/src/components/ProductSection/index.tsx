import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';

/**
 * 商品展示组件属性接口
 */
export interface ProductSectionProps {
  /**
   * 模块标题
   */
  title: string;
  
  /**
   * 模块副标题
   */
  subtitle: string;
  
  /**
   * 是否显示"查看更多"链接
   * @default false
   */
  showMore?: boolean;
  
  /**
   * 商品数据数组
   */
  products: Product[];
  
  /**
   * 点击商品时的回调函数
   * @param product 被点击的商品数据
   */
  onProductClick?: (product: Product) => void;
}

/**
 * 商品展示组件
 * 用于展示商品列表，包含标题区域和商品项
 * 
 * @param {ProductSectionProps} props - 组件属性
 * @returns React.ReactNode - 商品展示组件
 */
const ProductSection: React.FC<ProductSectionProps> = ({ 
  title, 
  subtitle, 
  showMore = false, 
  products, 
  onProductClick 
}) => {
  const navigate = useNavigate();

  /**
   * 处理商品点击
   * @param product 被点击的商品
   */
  const handleProductClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      // 默认跳转到商品详情页
      navigate(`/product/${product.id}`);
    }
  };

  /**
   * 处理查看更多点击
   */
  const handleShowMoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/products');
  };

  return (
    <div className="w good">
      <div className="box-hd">
        <h2>
          {title}
          <small>{subtitle}</small>
        </h2>
        {showMore && (
          <a href="#" onClick={handleShowMoreClick}>
            查看更多<i className="iconfont icon-arrow-right-bold"></i>
          </a>
        )}
      </div>
      <div className="box-bd">
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <a 
                href="#" 
                onClick={() => handleProductClick(product)}
                style={{ cursor: 'pointer' }}
              >
                <img src={product.image} alt={product.title} />
                <h3 className="title">{product.title}</h3>
                <p className="price">
                  <small>¥</small>{product.price.toFixed(2)}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductSection;