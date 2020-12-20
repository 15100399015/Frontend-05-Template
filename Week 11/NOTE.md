学习笔记

# css规则结构

css
* at-rule
    * @charset
    * @import
    * @media
    * @page
    * @counter-style
    * @keyframes
    * @fontface
    * @support
    * @namespace
* rule
    * Selector
        * selector_group
        * simple_selector
            * type
            * 星号
            * .
            * #
            * []
            * :
            * ::
            * :not()
        * selector
            * 大于号
            * 空格
            * +
            * ~
    * declaration
        * key
            * variables
            * properties
        * value
            * calc
            * number
            * length
            * ....


## css选择器
### 简单选择器
* 星号
* div
* .cls
* #id
* [attr=value]
* :hover
* ::before

### 复合选择器
* <简单选择器><简单选择器><简单选择器>（与关系）
* 星号和div必须写在最前面

### 复杂选择器
* <复合选择器>空格<简单选择器>
* <复合选择器>大于号<复合选择器>
* <复合选择器>波浪号<复合选择器>
* <复合选择器>加号<复合选择器>
* <复合选择器>||<复合选择器>