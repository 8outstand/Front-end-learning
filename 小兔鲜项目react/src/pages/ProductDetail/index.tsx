import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import type { Product } from '../../types';
import '../../styles/product-detail.css';

/**
 * 商品详情页组件
 * 
 * @returns React.ReactNode - 商品详情页
 */
const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟获取商品详情
    const fetchProductDetail = async () => {
      try {
        
        // 模拟商品数据
        const mockProduct: Product = {
          id: Number(id),
          image: `/uploads/goods${(Number(id) % 4) + 1}.png`,
          title: `商品 ${id}`,
          price: 99.99
        };
        
        setProduct(mockProduct);
      } catch (error) {
        console.error('获取商品详情失败:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="loading-state">
          <p>加载中...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="error-state">
          <h1>商品不存在</h1>
          <p>抱歉，找不到您请求的商品</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="product-detail">
        <h1>商品详情</h1>
        <div className="product-detail-content">
          <div className="product-image-container">
            <img 
              src={product.image} 
              alt={product.title}
              className="product-image"
            />
          </div>
          <div className="product-info">
            <h2>{product.title}</h2>
            <p className="product-price">
              ¥{product.price.toFixed(2)}
            </p>
            <div className="product-actions">
              <button className="add-to-cart-btn">
                加入购物车
              </button>
              <button className="buy-now-btn">
                立即购买
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;