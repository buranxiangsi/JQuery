// const api1 = jQuery('.test')
// const api2 = api1.find('.child').addClass('red').addClass('blue').addClass('green')
// const oldApi = api2.end().addClass('yellow')
jQuery('.test')
    .find('.child')
    .addClass('red')
    .addClass('blue')
    .addClass('green')
    .end() //返回操作test
    .addClass('yellow')


