import React from 'react';

function NewPage({ onGoBack }) {
  return (
    <div className="new-page">
      <h1>新页面</h1>
      <p>这是一个新创建的页面</p>
      <button onClick={onGoBack}>返回游戏</button>
    </div>
  );
}





export default NewPage;