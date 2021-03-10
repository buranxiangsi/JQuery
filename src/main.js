jQuery('.test')//不返回元素们，返回aip对象

    // 遍历所有刚才获取的元素，添加.red
    //链式操作
    .addClass('red')//this=api
    .addClass('blue')

obj.fn(p1)  //等价于下一个函数，函数里的this = obj
obj.fn.call(obj, p1)