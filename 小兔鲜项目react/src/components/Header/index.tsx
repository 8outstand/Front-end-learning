import React from 'react';

const Header: React.FC = () => {
  const navList = ['首页', '生鲜', '美食', '餐厨', '电器', '居家', '洗护', '孕婴', '服装'];
  const navItems = navList.map((item) => (
    <li key={item}><a href="#">{item}</a></li>
  ));
  return (
    <>
      {/* 快捷导航部分 */}
      <div className="shortcut">
        <div className="w">
          <ul>
            <li><a href="#">请先登录</a></li>
            <li className="line"></li>
            <li><a href="#">免费注册</a></li>
            <li className="line"></li>
            <li><a href="#">我的订单</a></li>
            <li className="line"></li>
            <li><a href="#">会员中心</a></li>
            <li className="line"></li>
            <li><a href="#">帮助中心</a></li>
            <li className="line"></li>
            <li><a href="#">在线客服</a></li>
            <li className="line"></li>
            <li><a href="#"><i className="iconfont icon-mobile-phone"></i>手机版</a></li>
          </ul>
        </div>
      </div>
      
      {/* 头部导航 */}
      <header className="header w">
        <div className="logo">
          <h1>
            <a href="#" title="小兔鲜">小兔鲜</a>
          </h1>
        </div>
        <ul className="nav">
          {navItems}
        </ul>
        <div className="search">
          <i className="iconfont icon-search"></i>
          <input type="text" placeholder="搜索" />
        </div>
        <div className="car">
          <span className="num">0</span>
          <i className="iconfont icon-cart-full"></i>
        </div>
      </header>
    </>
  );
};

export default Header;