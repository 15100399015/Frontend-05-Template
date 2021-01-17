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