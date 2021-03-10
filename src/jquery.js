window.jQuery = function (selector) {
    const elements = document.querySelectorAll(selector)
    //api可以操作elements
    const api = {
        //闭包：函数访问外部的变量
        addClass(className) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            return api
        }
    }
    return api
}