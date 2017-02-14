require('jquery-placeholder');

/**
 * Textarea，支持 placeholder 属性
 * @constructor
 * @param {HTMLElement} textarea - 目标元素
 * @param {Object} options - 参数
 * @param {String} options.theme - 主题
 * @param {Boolean} options.disabled - 是否禁用
 */
function Textarea(textarea, options) {
    this.main = textarea;
    this.$main = $(this.main);
    this.$main.placeholder();

    var defaultOption = {
        theme: bizui.theme
    };
    this.options = $.extend(defaultOption, options || {});
    this.init(this.options);
}

var defaultClass = 'biz-textarea',
    disableClass = 'biz-textarea-disable',
    hoverClass = 'biz-textarea-hover',
    focusClass = 'biz-textarea-focus-',
    dataKey = 'bizTextarea';

Textarea.prototype = {
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

        this.$main.on('mouseover.bizTextarea', function(e) {
            $(this).addClass(hoverClass);
        }).on('mouseout.bizTextarea', function(e) {
            $(this).removeClass(hoverClass);
        }).on('focus.bizTextarea', function(e) {
            $(this).addClass(focusClass + options.theme);
        }).on('blur.bizTextarea', function(e) {
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
     * 获取文本长度（不计回车）
     * @return {Number} - 文本长度
     */
    length: function() {
        return this.main.value.replace(/\r?\n/g, '').length;
    },

    /**
     * 销毁
     */
    destroy: function() {
        this.$main.removeClass(defaultClass + ' ' + disableClass);
        this.$main.off('mouseover.bizTextarea')
            .off('mouseout.bizTextarea')
            .off('focus.bizTextarea')
            .off('blur.bizTextarea');
        this.$main.data(dataKey, null);
    }
};

function isTextarea(elem) {
    return elem.nodeType === 1 && elem.tagName.toLowerCase() === 'textarea';
}

$.extend($.fn, {
    bizTextarea: function(method, options) {
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
                if (isTextarea(this) && (method === undefined || jQuery.isPlainObject(method))) {
                    $(this).data(dataKey, new Textarea(this, method));
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

module.exports = Textarea;