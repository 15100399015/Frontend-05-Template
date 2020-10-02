https://tc39.es/ecma262/2020/#sec-evaluatecall

ecma2020的最新规范中，在12.3.6【函数调用】可以看到，有说明在函数调用时，this的行为。

原文：The abstract operation EvaluateCall takes as arguments a value func, a value ref, a Parse Node arguments, and a Boolean argument tailPosition. It performs the following steps:

我的理解：js引擎在运行函数时，会把func（js函数本身）、ref、参数、tailPosition传到抽象操作EvaluateCall（应该是运行js函数的方法）。并执行以下步骤。

1.If Type(ref) is Reference, then
    a.If IsPropertyReference(ref) is true, then
        i.Let thisValue be GetThisValue(ref).
    b.Else,
        i.Assert: the base of ref is an Environment Record.
        ii.Let refEnv be GetBase(ref).
        iii.Let thisValue be refEnv.WithBaseObject().
2.Else,
    a.Let thisValue be undefined.
...

后面其实还有很多步骤，但都是与this无关的。就只有第一步和第二步说的thisValue是我们想要的this。

想要看懂第一步和第二步，首先要知道什么是Reference类型。

我们看到2020版的6.2.4章节。用了三段话解释了何为Reference：

The Reference type is used to explain the behaviour of such operators as delete, typeof, the assignment operators, the super keyword and other language features. For example, the left-hand operand of an assignment is expected to produce a reference.

A Reference is a resolved name or property binding. A Reference consists of three components, the base value component, the referenced name component, and the Boolean-valued strict reference flag. The base value component is either undefined, an Object, a Boolean, a String, a Symbol, a Number, a BigInt, or an Environment Record. A base value component of undefined indicates that the Reference could not be resolved to a binding. The referenced name component is a String or Symbol value.

A Super Reference is a Reference that is used to represent a name binding that was expressed using the super keyword. A Super Reference has an additional thisValue component, and its base value component will never be an Environment Record.

这三段话都不好翻译。我就只说我理解的【Reference类型用于解释诸如删除，typeof，赋值运算符，super关键字和其他语言功能之类的运算符的行为。这是js引擎内部使用的】在这里我们只需要他的规则就好。

第二段话是说Reference的组成，分别是：

* base value
* referenced name
* strict reference

其中，base value 就是属性所在的对象或者就是 EnvironmentRecord，它的值只可能是 undefined, an Object, a Boolean, a String, a Number, or an environment record 其中的一种。

referenced name 就是属性的名称。可以是String或者是Symbol值

strict没说。。估计是跟严格模式相关？只知道他是Bool值，是个flag。

回到函数调用的第一步，1.If Type(ref) is Reference ... else Let thisValue be undefined.

如果传进来的ref是Reference，则。。。，不是的话this就为undefined。

Reference我们知道了，是js内部使用的一个类型。那Type(ref)是什么鬼，其中ref又是什么，它是哪来的？那我们就要回过头看12.3.6.1 Runtime Semantics: Evaluation（自己的理解：函数的解析）。里面有说ref怎么来。

我们还是只看跟this有关的，其他步骤都跳过。

1.  Let expr be CoveredCallExpression of CoverCallExpressionAndAsyncArrowHead.
2.  Let memberExpr be the MemberExpression of expr.
3.  Let arguments be the Arguments of expr.
4. Let ref be the result of evaluating memberExpr.

先看第一步，CoverCallExpressionAndAsyncArrowHead是什么鬼。他的定义就是

Return the CallMemberExpression that is covered by CoverCallExpressionAndAsyncArrowHead.

他其实就相当于CallMemberExpression，CallMemberExpression是什么呢？

他就是带参数的MemberExpression（属性访问表达式）。我举个例子就懂了

【thing.func(args)】就是CallMemberExpression。（MemberExpression就是thing.func）

那第一步的意思就是说，拿到CallMemberExpression。即expr

第二步的意思是，从中找到MemberExpression

第三步就是从expr抽取参数arguments（这一步跟this无关）

第四步是计算 MemberExpression 的结果赋值给 ref。

好，现在ref就是这么来的。说是计算 MemberExpression，其实MemberExpression就是ref了。因为MemberExpression要怎么计算嘛。

回到12.3.6.2（函数的执行），Type(ref)中的Type就是【the notation “Type(x)” is used as shorthand for “the type of x” where “type” refers to the ECMAScript language and specification types defined in this clause】

就是说Type(ref)是【ref的类型】的缩写。。

好，完整翻译过来就是，ref的类型如果是Reference。。

我们举个具体的例子代进去。例如thing.func(args)，那么它的ref就是thing.func。代进去就是问【thing.func是不是Reference呢】？进而这个例子就是在问thing.func这种属性访问表达式返回的是啥？是不是Reference？

那好，我们看属性访问表达式返回什么咯。

我懒得贴图了。https://tc39.es/ecma262/2020/#sec-property-accessors，网址在这。我可以说下该表达式返回了一个 Reference 类型。

然后我们看a这一步骤，If IsPropertyReference(ref) is true

IsPropertyReference方法是什么呢？

IsPropertyReference对应的描述：【If either the base value component of V is an Object or HasPrimitiveBase(V) is true, return true; otherwise return false.】

HasPrimitiveBase 对应的描述：【If Type(V's base value component) is Boolean, String, Symbol, BigInt, or Number, return true; otherwise return false.】

IsPropertyReference(ref)翻译过来就是：如果ref的base value是Object、Boolean, String, Symbol, BigInt, or Number，则返回true，否则返回false。

那我们看下thing.func的Reference

{
    baseValue：thing
    name: 'func',
    strict: false
}

那thing肯定是对象啦，接下来我们看i步骤，Let thisValue be GetThisValue(ref).

GetThisValue 对应的描述：【If IsSuperReference(V) is true, then Return the value of the thisValue component of the reference V. Return GetBase(V).】

IsSuperReference对应的描述：【If V has a thisValue component, return true; otherwise return false.】

GetBase对应的描述：【Return the base value component of V.】

那例子代进去的话，因为thing.func的Reference没有thisValue，所以走GetBase。

那我们现在就可以知道thisValue就为GetBase后的结果，即thing.func的Reference的baseValue，thing.

好，我们看另一个分支，b步骤里的ii和iii。

ii.Let refEnv be GetBase(ref).
这个上面讲过了

iii.Let thisValue be refEnv.WithBaseObject().

WithBaseObject这个方法我看了，始终返回undefined，所以进了b步骤thisValue始终是undefined了。

