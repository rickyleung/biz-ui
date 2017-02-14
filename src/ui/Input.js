require('jquery-placeholder');

/**
 * Input
 * @constructor
 * @param {HTMLElement} input - 目标元素
 * @param {Object} options - 参数
 * @param {String} options.theme - 主题
 * @param {Boolean} options.disabled - 是否禁用
 * @param {Function} options.onEnter - 按回车回调
 */
function Input(input, options) {
    this.main = input;
    this.$main = $(this.main);
    this.$main.placeholder();

    var defaultOption = {
        theme: bizui.theme
    };
    this.options = $.extend(defaultOption, options || {});
    this.init(this.options);
}

var defaultClass = 'biz-input',
    disableClass = 'biz-input-disable',
    hoverClass = 'biz-input-hover',
    focusClass = 'biz-input-focus-',
    dataKey = 'bizInput';

Input.prototype = {
    /**
     * 初始化
     * @param {Object} options - 参数
     * @private
     */
    init: function(options) {
        this.$main.addClass(defaultClass);

        if (options.disabled) {
            this.disable();
        }

        if (typeof options.onEnter === 'function') {
            var self = this;
            this.$main.on('keydown.bizInput', function(e) {
                if (e.keyCode === 13) {
                    options.onEnter.call(self, e);
                    return false; // IE10-会自动寻找第一个<button>标签并触发它的click事件
                }
            });
        }

        this.$main.on('mouseover.bizInput', function(e) {
            $(this).addClass(hoverClass);
        }).on('mouseout.bizInput', function(e) {
            $(this).removeClass(hoverClass);
        }).on('focus.bizInput', function(e) {
            $(this).addClass(focusClass + options.theme);
        }).on('blur.bizInput', function(e) {
            $(this).removeClass(focusClass + options.theme);
        });
    },

    /**
     * 激活
     */
    enable: function() {
        this.main.disabled = false;
        this.$main.removeClass(disableClass);
    },

    /**
     * 禁用
     */
    disable: function() {
        this.main.disabled = true;
        this.$main.addClass(disableClass);
    },

    /**
     * 销毁
     */
    destroy: function() {
        this.$main.removeClass(defaultClass + ' ' + disableClass);
        this.$main.off('keydown.bizInput')
            .off('mouseover.bizInput')
            .off('mouseout.bizInput')
            .off('focus.bizInput')
            .off('blur.bizInput');
        this.$main.data(dataKey, null);
    }
};

function isInput(elem) {
    return elem.nodeType === 1 && elem.tagName.toLowerCase() === 'input' && (!elem.getAttribute('type') || elem.getAttribute('type').toLowerCase() === 'text');
}

$.extend($.fn, {
    bizInput: function(method) {
        var internal_return;
        this.each(function() {
            var instance = $(this).data(dataKey);
            if (instance) {
                if (typeof method === 'string' && typeof instance[method] === 'function') {
                    internal_return = instance[method].apply(instance, Array.prototype.slice.call(arguments, 1));
                    if (internal_return !== undefined) {
                        return false; // break loop
                    }
                }
            } else {
                if (isInput(this) && (method === undefined || jQuery.isPlainObject(method))) {
                    $(this).data(dataKey, new Input(this, method));
                }
            }
        });

        if (internal_return !== undefined) {
            return internal_return;
        } else {
            return this;
        }
    }
});

module.exports = Input;