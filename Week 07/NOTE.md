学习笔记

## 运算符与表达式

### 运算符

* Member
    * a.b
    * a[b]
    * foo`string`
    * super.b
    * super['b']
    * new.target
    * new Foo()

* New 比Member类运算符低
    * new Foo

Example:
new a()() ---> 先是new a()，然后是new运算后的结果再接上()
new new a() ---> 先是new a()，然后是new运算后的结果再接上new

### Reference (规范中的类型，语言中没这个类型)

分成两个部分，第一个部分是对象，第二个部分是一个key。记录了Member运算的前半部分和后半部分。

delete和assign这类基础设施就会用到Reference类型。

用来让delete知道删除是哪一个对象的哪一个属性，assign也类似。

### Expressions

* Call 优先级低于new，也低于Member运算
    * foo()
    * super()
    * foo()['b']
    * foo().b
    * foo()`abc`
如果在call expressions里有用到Member表达式，则都统一降级为call expressions级别

Example:
new a()['b'] ---> 先是new a()（Member），然后是new运算后的结果再接上['b']

总结来说，就是为了解决()跟谁先结合的问题，才有了Member、New、Call Expressions的优先级

* Left Handside & Right Handside

Example:
a.b = c 可以
a + b = c 不可，只有Left Handside才能放在等号左边

* Update（自增自减表达式，Right Handside）
    * a++
    * a--
    * -- a
    * ++ a

Example:
++ a ++
++ (a ++)

* Unary（单目运算符）
    * delete a.b
    * void foo()
    * typeof a
    * + a
    * - a
    * ~ a
    * ! a
    * await a

* Exponental（**，右结合）
    * **

Example:
3 ** 2 ** 3
3 ** (2 ** 3)

* Multiplicative
    * /
    * *
    * %

* Additive
    * +
    * -

* Shift
    * <<
    * >>
    * >>>

* Relationship
    * <
    * >
    * <=
    * >=
    * instanceof
    * in

* Equality
    * ==
    * !=
    * ===
    * !==

* Bitwise
    * &
    * ^
    * |

* Logic
    * && (短路原则)
    * || (短路原则)

* Conditional（三目运算符）
    * ? : (短路原则)


## 类型转换

### UnBoxing

* ToPremitive
* toString vs valueOf
* Symbol.toPremitive

Example:
var o = {
    toString() { return '2'},
    valueOf() { return 1 },
    [Symbol.toPrimitive]() { return 3 }
}

console.log('x' + o)
+一般先调valueOf，然后是toString。只要有[Symbol.toPrimitive]，就一定会是[Symbol.toPrimitive]

var x = {};x[o] = 1;
console.log(x + o)
o作为属性名的时候，优先调用toString方法。只要有[Symbol.toPrimitive]，就一定会是[Symbol.toPrimitive]

### Boxing

* Number ---> new Number(1)  值：1
* String ---> new String('a')  值：a
* Boolean ---> new Boolean(true)  值：true
* Symbol ---> new Object(Symbol('a'))  值：Symbol('a')


## 简单语句

* ExpressionStatement (核心，计算)
* EmptyStatement
* DebuggerStatement
* ThrowStatement (流程控制)
* ContinueStatement (流程控制)
* BreakStatement (流程控制)
* ReturnStatement (流程控制)


## 复合语句

* BlockStatement {语句列表。。}
* IfStatement
* SwitchStatement
* IterationStatement （循环语句集合）
* WithStatement
* LabelledStatement 与ContinueStatement和BreakStatement搭配使用
* TryStatement

## 声明

* FunctionDeclaration (函数声明)
* GeneratorDeclaration (函数声明)
* AsyncFunctionDeclaration (函数声明)
* AsyncGeneratorDeclaration (函数声明)
* VariableStatement (var)
* ClassDeclaration
* LexicalDeclaration (let、 const)

* function
* function *
* async function
* async function *
* var

以上5种声明都没有先后关系，永远当作第一行去声明。作用域的作用范围只认function body。

* class
* let
* const

以上3种声明在声明之前能不能用声明的变量，就是产生一个死区。


## 结构化 | 宏任务和微任务

### JS执行力度

* 宏任务（传给js引擎的任务）
* 微任务（es2020中，只有Promise产生微任务，js引擎内部的任务）
* 函数调用（Execution Context）
* 语句/声明（Completion Record）
* 表达式（Reference）
* 直接量/变量/this...

### 事件循环

获取代码 ---> 执行代码 ---> 等待 ---> 获取代码 ....

### 函数调用

函数调用会形成执行上下文栈（Execution Context Stack），而栈里面的单元是执行上下文（Execution Context）。而正在跑的栈叫做执行中执行上下文（Running Execution Context）。

【当前正在跑的语句就会在Running Execution Context中获取一切信息。而闭包，就在这个单元里。这也解释了我之前的疑问，a文件通过import引入b文件，在b文件里访问不到a文件的变量，我还以为

可以通过闭包访问，但是是不行的。只有在同一份js文件里或通过脚本引入不同文件的才可以。】其实【而闭包，就在这个单元里】不对，闭包在环境记录里面体现

#### Execution Context

* code evaluation state（用于async和Generator的，保存代码执行到哪的信息）
* Function
* Script Or Module（要么是脚本，要么是Module）
* Generator
* Realm
* LexicalEnvironment
    * this
    * new Target
    * super
    * 变量
* VariableEnvironment
    * var

#### Environment Record

* Declarative Environment Records
    * Function Environment Records
    * module Environment Records
* Global Environment Records
* Object Environment Records

#### Function-Closure

每一个函数都会生成一个闭包

Example
    var y = 2
    function foo () {console.log(y)}
    export foo

Function:foo
    Environment Record(定义时所在的):
            y:2
    Code:
            console.log(y)

