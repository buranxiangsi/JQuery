# JQuery

使用
`parcel src/index.html`

链式风格
- 也叫jQuery风格
- window.jQuery 全局函数
- jQuery(选择器)用于获取对应的元素，返回一个对象(jQuery构造出来的对象=jQuery构造出来的对象=jQuery对象)
  
jQuery是不需要加new的构造函数，但不是常规意义上的构造函数

#### 查
```js
jQuery('#xxx')//返回值并不是元素，而是一个api对象
```
```js
jQuery('#xxx').find('.red')//查找#xxx里的.red元素
```
```js
jQuery('#xxx').end()//返回上一个元素
```
