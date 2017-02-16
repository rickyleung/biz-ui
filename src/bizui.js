/**
 * @namespace
 */
var bizui = {
    /**
     * @property {String} theme - 主题，默认 'blue'
     */
    theme: 'blue',
    /**
     * @property {Object} codepoints - Iconfont codepoints
     */
    codepoints: require('./codepoints.js'),
    Button: require('./ui/Button'),
    Input: require('./ui/Input'),
    Textarea: require('./ui/Textarea'),
    Textline: require('./ui/Textline'),
    /**
     * Tooltip
     * @function
     * @param {Object} options - 参数
     * @param {String} options.action - 触发方式（focus|click|hover），默认 focus
     * @param {String} options.element - 目标对象选择器，默认 '.error'
     * @param {Boolean} options.theme - 主题，默认黑色
     * @param {Boolean} options.preventDefault - 阻止默认事件，默认 false
     * @param {Boolean} options.removeAll - 移除所有绑定，默认 false
     * @param {Boolean} options.removeSpecific - 移除指定绑定，需同时指定 action 和 element，默认 false
     */
    Tooltip: require('./ui/Tooltip')
};

window.bizui = bizui;

module.exports = bizui;