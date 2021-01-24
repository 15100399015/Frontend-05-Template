## 对象与组件

### 对象
1. Properties 属性
2. Methods    方法
3. inherit    继承

### 组件（基本上是对象的丰富化）

1. Properties 属性（从属关系）
2. Methods    方法
3. inherit    继承（实际开发中我没用过继承）
4. Attribute  特性（描述组件特征）
5. Config & State  组件的配置（一次性，只在第一次加载时使用） & 组件的内部状态
6. Event      事件，组件往外去传递数据的桥梁
7. LifeCycle  声明周期
8. Children   树形结构的必要条件

#### 用户（非程序员）

他会改变组件的state

#### 使用者（程序员）

通过attribute、properties、config影响组件
* attribute&properties（这两个其实就是语义上的区别，当我们用js写纯逻辑的组件时，两者都差不多的。当我们写跟HTML强相关的组件时，可以让使用者设置样式，那么两者就有区别。attribute描述样式相关，properties描述逻辑相关。不过两者合二为一也可以的。就是语义上区别。HTML区别了attribute和properties，这点要注意）
* config（初始化设置，只用一次）
* Event 组件通知使用者

## 动画实现方式

- **setInterval**

  ```js
  // 具体到浏览器实现时，浏览器不能保证准时执行代码，并且会有堆积回调的可能（上一个回调还没执行，就已经到时间执行下一个的回调了）
  setInterval(() => {}, 16);
  ```

- **setTimeout**

  ```js
  let tick = function () {
    // 容易出现内存泄漏，如果不清理setTimeout的话
    setTimeout(tick, 16);
  };
  ```

- **requestAnimationFrame (更安全的实现)**

  ```js
  let tick = function () {
    /*
     ** 回调函数执行次数通常是60帧，
     ** 但在大多数遵循W3C建议的浏览器中，
     ** 回调函数执行次数通常与浏览器屏幕刷新次数相匹配。
     */
    let handler = requestAnimationFrame(tick);
    cancelAnimationFrame(handler);
  };
  ```

  这周的内容其实就是前两周的内容结合在一起。其实轮播组件的内部的逻辑我是没太懂的。根据鼠标位置就算位置的那部分我还是懵的。但是我觉得轮播图的逻辑本身不是重点。

  组件化部分的重点应该是js新语法class、extend、winter设计组件的方式和组件的通信方式。这部分后面要反复的观看，重点学习。