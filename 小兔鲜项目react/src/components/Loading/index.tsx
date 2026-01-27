import React from 'react';

/**
 * 加载中组件
 * 
 * @returns React.ReactNode - 加载中组件
 */
const Loading: React.FC = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#666'
  }}>
    加载中...
  </div>
);

export default Loading;