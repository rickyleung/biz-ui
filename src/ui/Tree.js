require('jstree');

/**
 * Tree
 * @class
 * @description 完全调用 jstree，选项、方法、事件请参见：https://www.jstree.com/api/
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
