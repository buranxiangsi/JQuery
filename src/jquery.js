window.jQuery = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)

    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray

    }
    //api可以操作elements
    return {
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
        each(fn) {
            for (let i = 0; i < elements.length; i++) {
                fn.call(null, elements[i], i)
            }
            return this
        },
        parent() {
            const array = []
            this.each((node) => {
                if (array.indexOf(node.parentNode) === -1) {
                    array.push(node.parentNode)
                }
            })
            return jQuery(array)
        },
        children() {
            const array = []
            this.each((node) => {
                array.push(...node.children)
                // 等价于 array.push(node.children[0], node.children[1], node.children[2])
            })
            return jQuery(array)
        },

        print() {
            console.log(elements)
        },

        addClass(className) {
            //闭包：函数访问外部的变量
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            return this
        },
        oldApi: selectorOrArray.oldApi,
        end() {
            return this.oldApi //this就是新api
        },

    }
}