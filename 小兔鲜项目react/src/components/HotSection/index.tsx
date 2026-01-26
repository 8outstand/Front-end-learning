import React from 'react';


interface RecommendItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

/**
 * @param title - 模块标题
 * @param subtitle - 模块副标题
 * @param recommends - 推荐数据数组
 * @returns React.ReactNode - 人气推荐组件
 */
const HotSection: React.FC<{
  title: string;
  subtitle: string;
  recommends: RecommendItem[];
}> = ({ title, subtitle, recommends }) => {
  return (
    <div className="w hot">
      <div className="box-hd">
        <h2>
          {title}
          <small>{subtitle}</small>
        </h2>
      </div>
      <div className="box-bd">
        <ul>
          {recommends.map((item) => (
            <li key={item.id}>
              <a href="#">
                <img src={item.image} alt={item.title} />
                <h3 className="title">{item.title}</h3>
                <p className="price">{item.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HotSection;