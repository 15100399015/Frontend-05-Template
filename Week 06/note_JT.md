学习笔记

语言按语法分类
* 非形式语言 - 中文，英文
* 形式语言（乔姆斯基谱系）

乔姆斯基谱系：是计算机科学中刻画形式文法表达能力的一个分类谱系，是由诺姆·乔姆斯基于 1956 年提出的。它包括四个层次：
* 0- 型文法（无限制文法或短语结构文法）包括所有的文法。
* 1- 型文法（上下文相关文法）生成上下文相关语言。
* 2- 型文法（上下文无关文法）生成上下文无关语言。
* 3- 型文法（正规文法）生成正则语言。

层次间属于包含关系：  
0型包含1型，2型，3型；   
1型包含2型，3型；  
2型包含3型；

产生式（BNF，巴科斯诺尔范式）
* 用尖括号括起来的名称来表示语法结构名
* 语法结构分成基础结构和需要用其他语法结构定义的复合结构
    * 基础结构称终结符
    * 复合结构称非终结符
* 引号和中间的字符表示终结符
* 可以有括号
* *表示重复多次
* |表示或
* +表示至少一次

产生式： 在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句   
巴科斯诺尔范式：即巴科斯范式（英语：Backus Normal Form，缩写为 BNF）是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。它是由约翰·巴科斯（John Backus）和彼得·诺尔（Peter Naur）首先引入的用来描述计算机语言语法的符号集。     
终结符： 最终在代码中出现的字符（ https://zh.wikipedia.org/wiki/ 終結符與非終結符)

通过产生式理解乔姆斯基谱系
* 0型 无限制文法
    * ?::=?
* 1型 上下文相关文法
    * ?&lt;A>?::=?<B>?
* 2型 上下文无关文法
    * &lt;A>::=?
* 3型 正则文法
    * &lt;A>::=&lt;A>? 

JS总体上属于上下文无关文法，其中表达式部分大部分属于正则文法。   
特例：  
2 ** 1 ** 2，右结合，不属于正则文法   
```js
{
  get a { return 1 },
  get: 1
} // 属于上下文相关文法
```

现代语言的特例
* C++中，*可能表示乘号或者指针，具体是哪个，取决于星号前面的标识符是否被声明为类型
* VB中，<可能是小于号，也可能是XML直接量的开始，取决于当前位置是否可以接受XML直接量
* Python中，行首的tab符和空格会根据上一行的行首空白以一定规则被处理成虚拟终结符indent或者dedent
* JavaScript中，/可能是除号，也可能是正则表达式开头，处理方式类似于VB，字符串模板中也需要特殊处理}，还有自动插入分号规则

乔姆斯基谱系根据文法的复制程度的分类

语言的分类
* 形式语言---用途
    * 数据描述语言：JSON, HTML, XAML, SQL, CSS
    * 编程语言： C, C++, Java, C#, Python, Ruby, Perl, Lisp, T-SQL, Clojure, Haskell, JavaScript
* 形式语言---表达方式
    * 声明式语言：JSON, HTML, XAML, SQL, CSS，Lisp, Clojure, Haskell
    * 命令型语言：C, C++, Java, C#, Python, Ruby, Perl, JavaScript
* 形式语言---编程思想
    * 面向对象语言：Smalltalk, C++, C#, Java, Objective-C, Python
    * 面向过程语言：C, Fortran

编程语言的性质
* 图灵完备性
    * 命令式—图灵机
        * goto
        * if和while
    * 声明式---lambda演算
        * 递归

动态与静态
* 动态
    * 在用户的设备/在线服务器上
    * 产品实际运行时
    * Runtime
* 静态
    * 在程序员的设备上
    * 产品开发时
    * Compiletime

类型系统
* 动态类型系统与静态类型系统
* 强类型与弱类型
    * String + Number
    * String == Boolean
* 复合类型
    * 结构体
    * 函数签名
* 子类型
* 泛型
    * 逆变/协变


* 图灵完备性：在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完全的。这个词源于引入图灵机概念的数学家艾伦·图灵。虽然图灵机会受到储存能力的物理限制，图灵完全性通常指“具有无限存储能力的通用物理机器或编程语言”。
* 图灵机（Turing machine）：又称确定型图灵机，是英国数学家艾伦·图灵于 1936 年提出的一种将人的计算行为抽象掉的数学逻辑机，其更抽象的意义为一种计算模型，可以看作等价于任何有限逻辑数学过程的终极强大逻辑机器。
* 静态和动态语言： https://www.cnblogs.com/raind/p/8551791.html
* 强类型： 无隐式转换
* 弱类型： 有隐式转换
* 协变与逆变： https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html


一般命令式编程语言
* Atom
    * Identifier
    * Literal
* Expression
    * Atom
    * Operator
    * Punctuator
* Statement
    * Expression
    * Keyword
    * Punctuator
* Structure
    * Function
    * Class
    * Process
    * Namespace
    * ...
* Program
    * Program
    * Module
    * Package
    * Library

  
语法 ----语义---> 运行时   
通过一定的语法表达一定的语义，最终改变了运行时的状态

Atom
* Grammar
    * Literal
    * Variable
    * Keywords
    * Whitespace
    * Line Terminator
* Runtime
    * Types
    * Execution Context

Types
* Number
* String
* Boolean
* Object
* Null
* Undefined
* Symbol
* BigInt

Number
* IEEE 754 Double Float
    * Sign 1
    * Exponent 11
    * Fraction 52  
Fraction * (2 ^ Exponent)
>The exponent field is an 11-bit unsigned integer from 0 to 2047, in biased form: an exponent value of 1023 represents the actual zero. Exponents range from −1022 to +1023 because exponents of −1023 (all 0s) and +1024 (all 1s) are reserved for special numbers.

Exponent的基准值：100 0000 0000 （1后面10个0，表示的是1）  
![IEEE 754](https://github.com/jtandy123/Frontend-05-Template/blob/master/Week%2006/IEEE754.png)   

Number—Grammar
* DecimalLiteral
    * 0
    * 0.
    * .2
    * 1e3
* BinaryIntegerLiteral---只支持整数
    * 0b111
* OctalIntegerLiteral
    * 0o10
* HexIntegerLiteral
    * 0xFF


String---字符、码点和编码方式
* Character：字形、字体、字符，计算机里面使用code point表示character
* Code Point：例如97代表a，结合一定的类型信息，可以通过97和字体里面的信息把a找出来，画到屏幕上
* Encoding：code point如何存储的问题，一个字符几个字节，字节里是什么格式

字符集：
* ASCII：0-127，127个字符：26个大写字母、26个小写字母、数字0-9、制表符、特殊符号、控制字符
* Unicode：片区，一开始为0000~FFFF，后续扩展为更多的字节
* UCS：0000~FFFF，Unicode和另一个标准化组织合并的时候产生的
* GB
    * GB2312：与Unicode的字符集不一致，即同一个文字与Unicode的码点不一致
    * GBK(GB13000)
    * GB18030：最全的GB字符集
* ISO-8859系列：东欧，8859系列都与ASCII兼容，各自互不兼容；ISO里没有中文的版本
* BIG5系列：台湾
GB、8859、BIG5都属于一定的国家地区语言的特定的编码格式，它们互相之间是冲突的，码点占的都是重的，所以它们没有办法混合使用

String—Encoding：

ASCII不存在编码问题
GB同时规定了字符集和编码方式
Unicode联合了太多国家的字符，所以存在一些不同的编码方式

* UTF
    * UTF-8：默认用一个字节表示一个字符，与ASCII码兼容，一段ASCII编码的文字同时也一定是一个UTF-8编码的一段文字，反过来不成立。UTF8中的字节中有控制位。不表示实际的字符，只表示字节与字节的关系。
    * UTF-16：默认用两个字节表示一个字符。字节中也会存在控制位。

String — Grammar
* “abc"
* ‘abc'
* `abc` 

String — Grammar — Template  
任何语言的词法分析器不可能把变量或者表达式做成一个结构，所以这个是语法结构而不是词法结构

`ab${x}abc${y}abc`
*   `ab${
* }abc${
* }abc`

反引号产生4种不同的token：
* 开头
* 中间
* 结束
* 中间不插表达式的token

这4中token加上中间的表达式构成了string template语法结构   
对JavaScript引擎来说，${}括起来的是裸的JavaScript语法，括起来之外的部分才是字符串的本体

Null & Undefined
* null是关键字
* Undefined是一个全局变量，可以重新赋值，局部作用域内赋值生效，全局作用域赋值不生效
* void 0; - void是关键字，后面跟任何值都返回undefined

Symbol只有作为Object的属性名一种用途   


Object
* 任何一个对象都是唯一的，这与它本身的状态无关
* 即使状态完全一致的两个对象，也并不相等
* 用状态来描述对象
* 状态的改变即是行为
对象不是由状态决定的，状态是由对象决定的
一个对象包括3个部分：
* identifier
* state
* behavior

Object—Class
* 类是一种常见的描述对象的方式
* 归类和分类则是两个主要的流派
* 归类方法，多继承是非常自然的事情，如C++
* 采用分类思想的计算机语言，则是单继承结构。并且会有一个基类Object

JavaScript是一门多范式的面向对象的语言

Object—Prototype
* 原型是一种更接近人类原始认知的描述对象的方法
* 采用“相似”的方式去描述对象
* 任何对象仅仅需要描述它自己与原型的区别即可

狗咬人   
“咬”这个行为该如何使用对象抽象？
* 对象的行为不是说现实中的对象的行为，而是能够改变对象状态的行为：所以bite这个行为不应该放在Dog类中
* 人身上应该是改变人状态的行为，对人来说只要关心受到了什么样的伤害，不需要关心是狗咬的还是谁咬的
* 狗咬人是一个业务逻辑，当设计人的class的时候，只设计改变Human对象内部的状态的方法。至于damge的形式，可能是从bite的行为中生成出来，但是不可能直接传一只Dog给hurt方法
class Human {
  hurt(damage) {
  }
}
不应该受到语言描述的干扰，在设计对象的状态和行为时，总是遵循“行为改变状态”的原则。

Object in JavaScript   
在JavaScript运行时，原生对象的描述方式非常简单，只需要关心原型和属性两个部分。属性既可以用来描述状态，也可以用来描述行为。   
唯一标识性JS使用内存地址来表示。   
原型机制：对象自身找不到的属性，就去其原型对象上找，沿着原型依次向上找，直到原型对象为null（Nihilo）   

属性：K-V对  
key: Symbol和String   
value: Data和Accessor  

Symbol对象在内存中创建后，只能通过变量去引用它，没有办法构造两个一模一样的Symbol，该特性和对象有一点相似。这样Symbol就很好的实现了属性访问的权限控制。   

Data Property: [[value]], writable, enumerable, configurable   
Accessor Property: get, set, enumerable, configurable

JavaScript用属性来统一抽象对象状态和行为   
一般来说，数据属性用于描述状态，访问器属性则用于描述行为   
数据属性中如果存储函数，也可以用于描述行为   

原型机制保证了每个对象只需要描述自己和原型的区别即可   

Object API/Grammar
* 基本的对象机制，面向对象能力：{} .  [ ] Object.defineProperty
* 基于原型的描述对象的方法：Object.create, Object.setPrototypeOf, Object.getPrototypeOf
* 基于类的方式描述对象：new, class, extends
* 历史包袱，不伦不类：new, function, prototype

JavaScript的特殊对象：
Function Object
* 除了一般对象的属性和原型，函数对象还有一个行为[[call]]
* 一般用JavaScript中的function关键字、箭头运算符或者Function构造器创建的对象，会有[[call]]这个行为
* 用类似f()这样的语法把对象当做函数调用时，会访问到[[call]]这个行为。如果对应的对象没有[[call]]行为，则会报错

Special Object:   
Array - length   
Object.prototype - [[setPrototypeOf]]   

Host Object   
Object [[call]] [[construct]]    
window   
