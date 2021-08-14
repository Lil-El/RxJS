/**
 * @description Dom相关操作方法
 * @author Mino
 * @date 2021/08/14 15:14
 */

/**
 *
 * @param {String} tagName 标签
 * @param {String | HTMLElement} innerHTML innerHTML
 * @param {Object} props 属性
 * @deprecated instead of `new Ele`
 * @example
 *  const div = createEle("div", "div")
 *  const body = createEle("div", div, {
 *      class: "body"
 *  })
 */
export function createEle(tagName, innerHTML, props) {
    const element = document.createElement(tagName);
    element.innerHTML = innerHTML;
    for (const attr in props) {
        element.setAttribute(attr, props[attr]);
    }
    return element;
}

export class Element {
    static $$type = "Mino-Element";
    props = {};
    static select(selector){
        const selected = document.querySelector(selector)
        return selected;
    }
    constructor(tagName, innerHTML, props) {
        this.props = props;
        this._element = document.createElement(tagName);
        this._element.innerHTML = innerHTML;
        for (const attr in props) {
            this._element.setAttribute(attr, props[attr]);
        }
        return this._element;
    }
}
