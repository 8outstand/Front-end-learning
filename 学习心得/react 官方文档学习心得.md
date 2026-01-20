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



