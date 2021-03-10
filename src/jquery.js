window.jQuery = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)

    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray

    }
    //api可以操作elements
    return {
        oldApi: selectorOrArray.oldApi,
        find(selector) {
            let array = []
            for (let i = 0; i < elements.length; i++) {
                const elements2 = Array.from(elements[i].querySelectorAll(selector))
                array = array.concat(elements2)
            }
            //const newApi = jQuery(array)
            array.oldApi = this  //this就是旧api
            return jQuery(array) //简化
        },
        end() {
            return this.oldApi //this就是新api
        },
        addClass(className) {
            //闭包：函数访问外部的变量
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            return this
        },

    }
}