require('jstree');

/**
 * Tree
 * @class
 * @description 内部调用 jsTree，初始化选项、方法、事件及插件的使用请参见：https://www.jstree.com/api/ 和 https://www.jstree.com/plugins/
 */
function Tree() {}

$.extend($.jstree.defaults.core, {
    strings: {
        'Loading ...': '加载中 ...'
    }
});

$.extend($.fn, {
    bizTree: $.fn.jstree
});

module.exports = Tree;
