require('./ui/Button');
require('./ui/Calendar');
require('./ui/Input');
require('./ui/Radio');
require('./ui/Textarea');
require('./ui/Textline');

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
    /**
     * Tooltip
     * @function
     * @param {Object} options - 参数
     * @param {String} options.action - 触发方式（focus|click|hover），默认 focus
     * @param {String} options.element - 目标对象选择器，默认 '.error'
     * @param {Boolean} options.preventDefault - 阻止默认事件，默认 false
     * @param {Boolean} options.removeAll - 移除所有绑定，默认 false
     * @param {Boolean} options.removeSpecific - 移除指定绑定，需同时指定 action 和 element，默认 false
     * @param {Boolean} options.theme - 主题，默认黑色
     */
    Tooltip: require('./ui/Tooltip')
};

window.bizui = bizui;

module.exports = bizui;