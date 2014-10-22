# Pager

分页组件，可自定义一些参数，包括分页总数、当前页、页数前X页，后X页，当前页前X页，当前页后X页;

## 依赖

jQuery , 推荐版本选用1.7.2 - 1.11.1

## 用法

加载`jQuery.js`, `pager.js`

```
var myPager = VL.pager.ini();
```

`pager`初始化时会将页面中可取到`.cmPager`对象替换为分页代码片段，片段包裹层的类名是`cmPagerReady`。

## 可配置参数

参数需要挂在`.cmPager`对象上。

属性 | 值（默认值） | 说明
---- | ---- | ----
data-f1 | 0 | 可选，页数前X页
data-f2 | 2 | 可选，当前页前X页
data-f3 | 2 | 可选，当前页后X页
data-f4 | 0 | 可选，页数后X页
data-current | 无 | 必须，当前页数
data-total | 无 | 必须，分页总数
data-url | 空 | 可选，页面跳转URL
data-param | 'page' | 可选，URL中的参数名

```
1  2 ... 5  6  7  8  9 ... 12 13
\  /     \  /  |  \  /     \  /
 f1       f2  当前 f3       f4
```

## END