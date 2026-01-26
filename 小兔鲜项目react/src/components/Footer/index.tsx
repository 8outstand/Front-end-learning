import React from 'react';

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: '购物指南',
      links: [
        { text: '购物流程', href: '#' },
        { text: '支付方式', href: '#' },
        { text: '售后规则', href: '#' }
      ]
    },
    {
      title: '配送方式',
      links: [
        { text: '配送运费', href: '#' },
        { text: '配送范围', href: '#' },
        { text: '配送时间', href: '#' }
      ]
    },
    {
      title: '关于我们',
      links: [
        { text: '平台规则', href: '#' },
        { text: '联系我们', href: '#' },
        { text: '问题反馈', href: '#' }
      ]
    },
    {
      title: '售后服务',
      links: [
        { text: '售后政策', href: '#' },
        { text: '退款说明', href: '#' },
        { text: '取消订单', href: '#' }
      ]
    }
  ];
  const reFooterLinks  = footerLinks.map((item) => ({
    ...item,
    links: item.links.map((link) => ({
      ...link,
      href: link.href.replace('#', '')
    }))
  }));
  return (
    <footer className="footer">
      <div className="w">
        <div className="slogan">
          <ul>
            <li>
              <h5></h5>
              <p>价格亲民</p>
            </li>
            <li>
              <h5 className="two"></h5>
              <p>物流快捷</p>
            </li>
            <li>
              <h5 className="three"></h5>
              <p>品质新鲜</p>
            </li>
            <li>
              <h5 className="four"></h5>
              <p>售后无忧</p>
            </li>
          </ul>
        </div>
        <div className="service">
          <div className="service-left">
            {reFooterLinks.map((item) => (
              <dl key={item.title}>
                <dt>{item.title}</dt>
                {item.links.map((link) => (
                  <dd key={link.text}><a href={link.href}>{link.text}</a></dd>
                ))}
              </dl>
            ))}
            <dl>
              <dt>服务热线</dt>
              <dd><a href="#">在线客服 <i className="iconfont icon-customer-service"></i></a></dd>
              <dd><a href="#">客服电话 400-0000-000</a></dd>
              <dd><a href="#">工作时间 周一至周日 8:00-18:00</a></dd>
            </dl>
          </div>
          <div className="service-right">
            <ul>
              <li>
                <img src="../../public/images/wechat.png" alt="微信公众号" />
                <p>微信公众号</p>
              </li>
              <li>
                <img src="../../public/images/app.png" alt="APP下载二维码" />
                <p>APP下载二维码</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>
            <a href="#">关于我们</a>  |
            <a href="#">帮助中心</a>  |  
            <a href="#">售后服务</a>  |  
            <a href="#">配送与验收</a>  |  
            <a href="#">商务合作</a>  |  
            <a href="#">搜索推荐</a>  |  
            <a href="#">友情链接</a>
          </p>
          <p>
            CopyRight © 小兔鲜
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;