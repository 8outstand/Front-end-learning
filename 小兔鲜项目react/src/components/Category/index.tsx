import React from 'react';

/**
 * 分类导航组件
 * 用于显示商品分类列表
 * 
 * @returns React.ReactNode - 分类导航组件
 */
const Category: React.FC = () => {
  // 分类数据
  const categories = [
    {
      title: '生鲜',
      subcategories: ['水果', '蔬菜']
    },
    {
      title: '美食',
      subcategories: ['面点', '水果']
    },
    {
      title: '餐厨',
      subcategories: ['数码产品']
    },
    {
      title: '电器',
      subcategories: ['床品', '四件套', '被枕']
    },
    {
      title: '居家',
      subcategories: ['奶粉', '玩具', '辅食']
    },
    {
      title: '洗护',
      subcategories: ['洗发', '玩具', '美妆']
    },
    {
      title: '孕婴',
      subcategories: ['奶粉', '玩具']
    },
    {
      title: '服饰',
      subcategories: ['女装', '男装']
    },
    {
      title: '杂货',
      subcategories: ['户外', '图书']
    },
    {
      title: '品牌',
      subcategories: ['品牌制造']
    }
  ];

  return (
    <div className="category">
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <p>
              <a href="#">{category.title}</a>
              {category.subcategories.map((subcategory, subIndex) => (
                <a key={subIndex} href="#">{subcategory} </a>
              ))}
            </p>
            <i className="iconfont icon-arrow-right-bold"></i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;