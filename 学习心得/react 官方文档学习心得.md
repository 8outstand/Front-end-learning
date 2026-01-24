# 你的第一个组件
组件 是 React 的核心概念之一。它们是构建用户界面（UI）的基础，是开始 React 之旅的最佳起点！

规范：

抛去基础而言，再开发过程中，组件可以渲染组件，但是<font style="color:#DF2A3F;">不要</font>在组件中定义组件，这会导致 bug 的产生

```jsx
export default function Gallery() {
  // 🔴 永远不要在组件中定义组件
  function Profile() {
    // ...
  }
  // ...
}
```

上段的代码会导致非常慢，而且会有 bug，现在需要在<font style="color:#DF2A3F;">顶层</font>定义每个组件

当子组件需要父组件的数据时，就要<font style="color:#DF2A3F;">通过props的形式进行传递</font>，而不是嵌套定义



# 组件的导入导出
组件的神奇之处在于它们的可重用性：你可以创建一个由其他组件构成的组件。但当你嵌套了越来越多的组件时，则需要将它们拆分成不同的文件。这样可以使得查找文件更加容易，并且能在更多地方复用这些组件。



为了让组件更加模块化，并且可以在其他文件中复用，下面可以根据 3 个步骤进行拆分

1. 创建 一个新的 JS 文件来存放该组件。
2. 导出 该文件中的函数组件（可以使用 默认导出 或 具名导出）
3. 在需要使用该组件的文件中 导入（可以根据相应的导出方式使用 <font style="color:#DF2A3F;">默认导入</font> 或 <font style="color:#DF2A3F;">具名导入</font>）。



## 在同一文件里导入或导出多个组件
### 具名导出导入
#### 导出
```jsx
export function Profile() {
  // ...
}
```

#### 导入：
`import { Profile } from './Gallery.js';`

最后就可以像默认导入一样去渲染<Profile />

```javascript
export default function App() {
  return <Profile />;
}
```



#### 默认导出导入
默认导出的时候，import 后的名称可以是任何的命名，但是在实际开发中不建议这么写



# 使用 JSX 书写标签语言
## JSX 规则
jsx 语法比 html 更加的严格，在返回的时候只能有一个根元素，如果返回多个将会报错。如果想返回多个元素，请用一个父标签把它们包裹起来。

包起来可以用<div></div>. or. <></>

这个空标签被称作 Fragment。React Fragment 允许你将子元素分组，而不会在 HTML 结构中添加额外节点。



## 标签必须闭合
JSX 要求标签必须正确闭合。像 <img> 这样的自闭合标签必须书写成 <img />，而像 <li>oranges 这样只有开始标签的元素必须带有闭合标签，需要改为 <li>oranges</li>。



## 使用驼峰式命名法给大部分属性命名！
JSX 最终会被转化为 JavaScript，而 JSX 中的属性也会变成 JavaScript 对象中的键值对。在你自己的组件中，经常会遇到需要用变量的方式读取这些属性的时候。但 JavaScript 对变量的命名有限制。例如，变量名称不能包含 - 符号或者像 class 这样的保留字。

而我们就可以用驼峰命名法来表示



## 使用引号字符串传递
在传递书写的时候，可以使用引号传递字符串

```javascript
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}
```

如果想动态的传递字符串，那么可以现在上面定义，然后用{}传递进来

```javascript
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```

**在 JSX 中，只能在以下两种场景中使用大括号：**

用作 JSX 标签内的文本：`<h1>{name}'s To Do List</h1>` 是有效的，但是 `<{tag}>Gregorio Y. Zara's To Do List</{tag}> `无效。

用作紧跟在 = 符号后的 属性：`src={avatar}` 会读取 avatar 变量，但是 `src="{avatar}"` 只会传一个字符串 {avatar}。

## 使用 “双大括号”：JSX 中的 CSS 和 对象 
除了字符串、数字和其它 JavaScript 表达式，你甚至可以在 JSX 中传递对象。对象也用大括号表示，例如` { name: "Hedy Lamarr", inventions: 5 }`。因此，为了能在 JSX 中传递，你必须用另一对额外的大括号包裹对象：`person={{ name: "Hedy Lamarr", inventions: 5 }}`。

```javascript
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

```javascript
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};


export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'的待办事项</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>优化视屏电话</li>
        <li>准备航空学课程</li>
        <li>研究乙醇燃料引擎</li>
      </ul>
    </div>
  );
}
```

# 条件渲染
通常组件会通过不同的情况显示不同的内容，一般就是`if``&&`和`？：`运算符选择合适的内容

## 选择性的包含JSX
```javascript
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;
```

以上出现重复的代码，可以使用**三木运算符**来规避重复

```javascript
return (
  <li className="item">
    {isPacked ? name + ' ✅' : name}
  </li>
);
```

同时也可以灵活使用`&&`运算符

```javascript
return (
  <li className="item">
    {name} {isPacked && '✅'}
  </li>
);
```

下一个 是更加灵活的一个思维方式

```javascript
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✅";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}
```

在开头不难看出：我们可以先对变量进行声明，然后后续通过 if 来判断这个方式不仅仅适用于文本，任意的 JSX 均适用。

# 渲染列表
渲染列表主要用到的是 map 和 fliter，这两个在 js 中很熟悉了，然后就是需要有一个需要注意的地方

因为箭头函数会隐式地返回位于 `=> `之后的表达式，所以你可以省略 return 语句。

```javascript
const listItems = chemists.map(person =>
  <li>...</li> // 隐式地返回！
);
```

不过，如果你的 `=> `后面跟了一对花括号` { `，那你必须使用 return 来指定返回值！

```javascript
const listItems = chemists.map(person => { // 花括号
  return <li>...</li>;
});
```

箭头函数 `=> { `后面的部分被称为 “<font style="color:#DF2A3F;">块函数体</font>”，块函数体支持多行代码的写法，但要用 return 语句才能指定返回值。假如你忘了写 return，那这个函数什么都不会返回！



**在 map 中，需要指定 key 值**

这些 key 会告诉 React，每个组件对应着数组里的哪一项，所以 React 可以把它们匹配起来。这在数组项进行移动（例如排序）、插入或删除等操作时非常重要。一个合适的 key 可以帮助 React 推断发生了什么，从而得以正确地更新 DOM 树。



# 响应事件
## 添加事件处理函数
如需添加一个事件处理函数，需要先定义一个函数，然后 将其作为 prop 传入 合适的 JSX 标签。例如，这里有一个没绑定任何事件的按钮：

```plain
export default function Button() {
  return (
    <button>
      未绑定任何事件
    </button>
  );
}
```

下面是添加了提示的

```javascript
export default function Button() {
  function handleClick() {
    alert('你点击了我！');
  }

  return (
    <button onClick={handleClick}>
      点我
    </button>
  );
}
```

下面是内联样式处理函数

```javascript
<button onClick={function handleClick() {
  alert('你点击了我！');
}}></button>

//但是也可以改成箭头函数
<button onClick={() => {
  alert('你点击了我！');
}}>
```

handleClick() 中最后的 () 会在 渲染 过程中 立即 触发函数，即使没有任何点击。这是因为位于 <font style="color:#DF2A3F;">JSX {} </font>之间的 JavaScript 会立即执行。

## 事件传播
事件处理函数还将捕获任何来自子组件的事件。通常，我们会说事件会沿着树向上“冒泡”或“传播”：它从事件发生的地方开始，然后沿着树向上传播。

```javascript
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('你点击了 toolbar ！');
    }}>
      <button onClick={() => alert('正在播放！')}>
        播放电影
      </button>
      <button onClick={() => alert('正在上传！')}>
        上传图片
      </button>
    </div>
  );
}
```

如果你点击任一按钮，它自身的 onClick 将首先执行，然后父级 <div> 的 onClick 会接着执行。因此会出现两条消息。如果你点击 toolbar 本身，将只有父级 <div> 的 onClick 会执行。



## 阻止传播
事件处理函数接收一个 事件对象 作为唯一的参数。按照惯例，它通常被称为 e ，代表 “event”（事件）。你可以使用此对象来读取有关事件的信息。

这个事件对象还允许你阻止传播。如果你想阻止一个事件到达父组件，你需要像下面 Button 组件那样调用 e.stopPropagation() ：

```javascript
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('你点击了 toolbar ！');
    }}>
      <Button onClick={() => alert('正在播放！')}>
        播放电影
      </Button>
      <Button onClick={() => alert('正在上传！')}>
        上传图片
      </Button>
    </div>
  );
}
```

1. React 调用了传递给 <button> 的 onClick 处理函数。
2. 定义在 Button 中的处理函数执行了如下操作：

调用 e.stopPropagation()，阻止事件进一步冒泡。

调用 onClick 函数，它是从 Toolbar 组件传递过来的 prop。

3. 在 Toolbar 组件中定义的函数，显示按钮对应的 alert。
4. 由于传播被阻止，父级 <div> 的 onClick 处理函数不会执行。

## 阻止默认行为
某些浏览器事件具有与事件相关联的默认行为。例如，点击 表单内部的按钮会触发表单提交事件，默认情况下将重新加载整个页面：

可以调用事件对象中的 `e.preventDefault()` 来阻止这种情况发生：

```javascript
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('提交表单！');
    }}>
      <input />
      <button>发送</button>
    </form>
  );
}
```

混淆点：

**不要混淆** `e.stopPropagation()` 和 `e.preventDefault()`。它们都很有用，但二者并不相关：

`e.stopPropagation()` 阻止触发绑定在外层标签上的事件处理函数。

`e.preventDefault()` 阻止少数事件的默认浏览器行



# state：组件的记忆
组件通常需要根据交互更改屏幕上显示的内容。输入表单应该更新输入字段，单击轮播图上的“下一个”应该更改显示的图片，单击“购买”应该将商品放入购物车。组件需要“记住”某些东西：当前输入值、当前图片、购物车。在 React 中，这种组件特有的记忆被称为 state。

## 添加一个 state 变量 
要添加 state 变量，先从文件顶部的 React 中导入 useState：

```plain
import { useState } from 'react';
```

使用方法：

`这里的 [ 和 ] 语法称为数组解构，它允许你从数组中读取值。 useState 返回的数组总是正好有两项。`

`handleClick()`

```javascript
function handleClick() {
  setIndex(index + 1);
}
```

## 第一个 Hook
在 React 中，useState 以及任何其他以“use”开头的函数都被称为 Hook。

Hook 是特殊的函数，只在 React 渲染时有效。它们能让你 “hook” 到不同的 React 特性中去。

State 只是这些特性中的一个，之后还会遇到其他 Hook。



练习2 待做



# state 快照
在usestate中，每次调用它将会出现一个快照，但是这个快照也只是等当前页面完成当前时间的时候，才会刷新，比如这样



```javascript
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

可以看到，如果调用了三次`setNumber(number + 1);`，但是最后的结果也只是加了 1，因为只有它每次渲染是去修改上面的值，也就是说

`setNumber(number + 1)：number` 是 0 所以` setNumber(0 + 1)`。

React 准备在下一次渲染时将 number 更改为 1。

`setNumber(number + 1)：number` 是0 所以 `setNumber(0 + 1)`。

React 准备在下一次渲染时将 number 更改为 1。

`setNumber(number + 1)`：number 是0 所以 setNumber(0 + 1)。

React 准备在下一次渲染时将 number 更改为 1。

尽管你调用了三次 `setNumber(number + 1)`，但在 这次渲染的 事件处理函数中 number 会一直是 0，所以你会三次将 state 设置成 1。这就是为什么在你的事件处理函数执行完以后，React 重新渲染的组件中的 number 等于 1 而不是 3。



```javascript
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        alert(number);
      }}>+5</button>
    </>
  )
}
```

这个案例可以表示出，虽然先点击了+5，但是对话框弹出来的是 0，只有关闭了对话框才会+5，即使是加了定时器后，过了 3 秒后，也可以看见显示出来的是 0，因为它是存在快照的。

到提示框运行时，React 中存储的 state 可能已经发生了更改，但它是使用用户与之交互时状态的快照进行调度的！

一个 state 变量的值永远不会在一次渲染的内部发生变化， 即使其事件处理函数的代码是异步的。在 那次渲染的 onClick 内部，number 的值即使在调用 `setNumber(number + 5)` 之后也还是 0。它的值在 React 通过调用你的组件<font style="color:#DF2A3F;">“获取 UI 的快照”时就被“固定”</font>了。

React 会使 state 的值始终“固定”在一次渲染的各个事件处理函数内部。你无需担心代码运行时 state 是否发生了变化。

React 会等到事件处理函数中的 所有 代码都运行完毕再处理你的 state 更新。 这就是重新渲染只会发生在所有这些 setNumber() 调用 之后 的原因。



如果想实现点一次就增加3次的方法，可以参考下面的代码

```javascript
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```

在这里，`n => n + 1 被称为 更新函数`。当你将它传递给一个 state 设置函数时：

React 会将此函数加入队列，以便在事件处理函数中的所有其他代码运行后进行处理。

在下一次渲染期间，React 会遍历队列并给你更新之后的最终 state。



# 更新 state 中的数组
## 更新数组内部的对象
在更新的时候，即使对数组进行拷贝，但是在修改新数组的时候，那么旧的数据也会跟着改变，因为`...arr` 这样的是浅拷贝，本质是在操作同一个堆里的内容，

