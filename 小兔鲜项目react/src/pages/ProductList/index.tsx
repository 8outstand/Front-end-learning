import React from 'react';
import Layout from '../../components/Layout';

/**
 * 商品列表页组件
 * 
 * @returns React.ReactNode - 商品列表页
 */
const ProductList: React.FC = () => {
  return (
    <Layout>
      <div style={{
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1>商品列表页</h1>
        <p>商品列表将在此显示</p>
      </div>
    </Layout>
  );
};

export default ProductList;