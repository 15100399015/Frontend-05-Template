## 浏览器渲染步骤

URL --->(HTTP)---> HTML --->(parse)---> DOM --->(css computing)---> DOM with CSS --->(layout)---> DOM with position --->(render)---> Bitmap


## 有限状态机

* 每一个状态都是一个机器
    * 在一个机器中，我们可以做计算、存储、输出。。。
    * 所有的这些机器接受的输入都是一致的
    * 状态机的每一个机器本身没有状态，如果我们用函数标识的话，它应该是纯函数
* 每个机器知道下一个状态
    * 每个机器都有确定的下一个状态（Moore）
    * 每个机器都根据输入确定下一个状态（Mealy）


## HTTP请求

### ISO-OSI七层网络模型

* 应用 ---- HTTP
* 表示 ---- HTTP
* 会话 ---- HTTP
* 传输 ---- TCP
* 网络 ---- Internet（IP协议）
* 数据链路 ---- 4G/5G/wifi
* 物理层 ---- 4G/5G/wifi

### HTTP请求

* 设计一个HTTP请求的类
* Content Type是一个必要的字段，要有默认值
* body是kv结构
* 不同的Content Type会影响body格式

### 发送HTTP请求

* 设计支持已有的connection或者自己新建connection
* 收到数据传给parser
* 根据parser的状态resolve Promise

### Response Parser解析

* Response必须分段构造，所以我们要用一个ResponseParser来 “装配”
* ResponseParser分段处理ResponseText，我们用状态机来分析文本结构

### BodyParser总结

* Response的body可能根据Content-Type有不同的结构，因此我们会采用子Parser的结构来解决问题
* 以TrunkedBodyParser为例，我们同样用状态机来处理body的格式
