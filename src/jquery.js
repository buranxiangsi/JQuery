const { get } = require("jquery")

window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
    let elements
    if (typeof selectorOrArrayOrTemplate === 'string') {
        if (selectorOrArrayOrTemplate[0] === '<') {
            elements = [createElement(selectorOrArrayOrTemplate)]

        } else {
            elements = document.querySelectorAll(selectorOrArrayOrTemplate)

        }


    } else if (selectorOrArrayOrTemplate instanceof Array) {
        elements = selectorOrArrayOrTemplate

    }

    function createElement(string) {
        const container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
    }


    //api可以操作elements
    const api = Object.create(jQuery.prototype)//创建一个对象，这个对象得__proto__为括号里的东西
    //const api = {__proto__: jQuery.prototype }

    Object.assign(api, {//把后面得属性复制给api
        elements: elements,
        oldApi: selectorOrArray.oldApi
    })//等价于下面两行代码
    // api.elements = elements 
    // api.oldApi = selectorOrArray.oldApi

    return api
}
//创建原型
jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    jQuery: true,
    get(index) {
        //不在同一作用域无法访问elements，使用api.elements=this.elements
        return this.elements[index]
    },
    appendTo(node) {
        if (node instanceof Element) {
            this.each(el => node.appendChild(el))
        } else if (node.jQuery === true) {
            this.each(el => node.get(0).appendChild(el))
        }
    },
    append(children) {
        if (children instanceof Element) {
            this.get(0).appendChild(children)
        } else if (children instanceof HTMLCollection) {
            for (let i = 0; i < children.length; i++) {
                this.get(0).appendChild(children[i])
            }
        } else if (children.jQuery === true) {
            children.each(node => this.get(0).appendChild(node))
        }
    },
    find(selector) {
        let array = []
        for (let i = 0; i < this.elements.length; i++) {
            const elements2 = Array.from(this.elements[i].querySelectorAll(selector))
            array = array.concat(this.elements2)
        }
        //const newApi = jQuery(array)
        array.oldApi = this  //this就是旧api
        return jQuery(array) //简化
    },
    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i)
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
        console.log(this.elements)
    },

    addClass(className) {
        //闭包：函数访问外部的变量
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.add(className)
        }
        return this
    },
    oldApi: selectorOrArray.oldApi,
    end() {
        return this.oldApi //this就是新api
    },

}