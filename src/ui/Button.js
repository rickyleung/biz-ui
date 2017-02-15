/**
 * Button
 * @constructor
 * @param {HTMLElement} button - 目标元素
 * @param {Object} options - 参数
 * @param {String} options.theme - 主题
 * @param {String} options.size - 尺寸（small|large）
 * @param {String} options.icon - 图标名称或 codepoint
 * @param {String} options.label - 文字
 * @param {Boolean} options.disabled - 是否禁用
 */
function Button(button, options) {
    this.main = button;
    this.$main = $(this.main);

    var defaultOption = {
        theme: bizui.theme,
        size: 'small'
    };
    this.options = $.extend(defaultOption, options || {});
    this.init(this.options);
}

var defaultClass = 'biz-button',
    largeClass = 'biz-button-large',
    disableClass = 'biz-button-disable',
    prefix = 'biz-button-',
    dataKey = 'bizButton';

Button.prototype = {
    /**
     * 初始化
     * @param {Object} options - 参数
     * @private
     */
    init: function(options) {
        this.originHTML = this.$main.html();

        this.$main.addClass(defaultClass + ' ' + (prefix + this.options.theme));

        if (options.size === 'large') {
            this.$main.addClass(largeClass);
        }

        if (options.icon) {
            var iconName = !document.documentMode ? options.icon : bizui.codepoints[options.icon];
            this.$main.prepend('<i class="biz-icon">' + iconName + '</i> ');
        }

        if (options.label) {
            this.$main.html(options.label);
        }

        if (options.disabled) {
            this.disable();
        }
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
        this.$main.removeClass([defaultClass, (prefix + this.options.theme), largeClass, disableClass].join(' '));
        this.$main.html(this.originHTML);
        this.originHTML = null;
        this.$main.data(dataKey, null);
    }
};

function isButton(elem) {
    return elem.nodeType === 1 && elem.tagName.toLowerCase() === 'button';
}

$.extend($.fn, {
    bizButton: function(method) {
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
                if (isButton(this) && (method === undefined || jQuery.isPlainObject(method))) {
                    $(this).data(dataKey, new Button(this, method));
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

module.exports = Button;