import React from 'react';

/**
 * 轮播图组件
 * 用于展示首页轮播图，支持多张图片切换
 * 
 * @returns React.ReactNode - 轮播图组件
 */
const Banner: React.FC = () => {
  // 轮播图数据
  const banners = [
    {
      id: 1,
      image: '/uploads/banner1.png',
      alt: '轮播图1'
    },
    // {
    //   id: 2,
    //   image: '/uploads/banner2.png',
    //   alt: '轮播图2'
    // },
    // {
    //   id: 3,
    //   image: '/uploads/banner3.png',
    //   alt: '轮播图3'
    // }
  ];

  return (
    <div className="banner">
      <ul>
        {banners.map((banner) => (
          <li key={banner.id}>
            <a href="#">
              <img src={banner.image} alt={banner.alt} />
            </a>
          </li>
        ))}
      </ul>
      <ul className="circle">
        {banners.map((_, index) => (
          <li key={index}>
            <a href="#"></a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Banner;