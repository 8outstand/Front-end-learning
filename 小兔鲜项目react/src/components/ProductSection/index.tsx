import React from 'react';

/**
 * 商品数据接口
 */
interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
}

/**
 * 商品展示组件
 * 用于展示商品列表，包含标题区域和商品项
 * 
 * @param title - 模块标题
 * @param subtitle - 模块副标题
 * @param showMore - 是否显示"查看更多"链接
 * @param products - 商品数据数组
 * @returns React.ReactNode - 商品展示组件
 */
const ProductSection: React.FC<{
  title: string;
  subtitle: string;
  showMore?: boolean;
  products: Product[];
}> = ({ title, subtitle, showMore = false, products }) => {
  return (
    <div className="w good">
      <div className="box-hd">
        <h2>
          {title}
          <small>{subtitle}</small>
        </h2>
        {showMore && (
          <a href="#">
            查看更多<i className="iconfont icon-arrow-right-bold"></i>
          </a>
        )}
      </div>
      <div className="box-bd">
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <a href="#">
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