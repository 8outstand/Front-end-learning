import React from 'react';
import Layout from '../../components/Layout';
import Category from '../../components/Category';
import Banner from '../../components/Banner';
import ProductSection from '../../components/ProductSection';
import HotSection from '../../components/HotSection';

const Home: React.FC = () => {
  // 新鲜好物商品数据
  const freshProducts = [
      {
        id: 1,
        image: '/uploads/goods1.png',
        title: 'KN95级莫兰迪色防护口罩',
        price: 79.00
      },
      {
        id: 2,
        image: '/uploads/goods2.png',
        title: '紫檀外独板三层普洱茶盒',
        price: 566.00
      },
      {
        id: 3,
        image: '/uploads/goods3.png',
        title: '法拉蒙高颜值记事本可定制',
        price: 58.00
      },
      {
        id: 4,
        image: '/uploads/goods4.png',
        title: '科技布布艺沙发',
        price: 3579.00
      }
    ];

  // 人气推荐数据
  const hotRecommends = [
    {
      id: 1,
      image: '/uploads/hot1.png',
      title: '特惠推荐',
      description: '我猜得到 你的需要'
    },
    {
      id: 2,
      image: '/uploads/hot2.png',
      title: '爆款推荐',
      description: '人气好物推荐'
    },
    {
      id: 3,
      image: '/uploads/hot3.png',
      title: '节日礼品一站买全',
      description: '编辑尽心整理推荐'
    },
    {
      id: 4,
      image: '/uploads/hot4.png',
      title: '鲜花园艺',
      description: '给生活增加仪式感'
    }
  ];

  return (
    <Layout>
      {/* 入口模块 */}
      <div className="entry">
        <div className="w">
          <Category />
          <Banner />
        </div>
      </div>
      
      {/* 新鲜好物模块 */}
      <ProductSection
        title="新鲜好物"
        subtitle="新鲜出炉 品质靠谱"
        showMore={true}
        products={freshProducts}
      />
      
      {/* 人气推荐模块 */}
      <HotSection
        title="人气推荐"
        subtitle="人气爆款 不容错过"
        recommends={hotRecommends}
      />
    </Layout>
  );
};

export default Home;