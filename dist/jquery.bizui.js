(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        this.bizui = factory(jQuery);
    }
}(function (__external_jQuery) {
    var global = this, define;
    function _require(id) {
        var module = _require.cache[id];
        if (!module) {
            var exports = {};
            module = _require.cache[id] = {
                id: id,
                exports: exports
            };
            _require.modules[id].call(exports, module, exports);
        }
        return module.exports;
    }
    _require.cache = [];
    _require.modules = [
        function (module, exports) {
            (function (factory) {
                if (typeof define === 'function' && define.amd) {
                    define(['jquery'], factory);
                } else if (typeof module === 'object' && module.exports) {
                    factory(_require(1));
                } else {
                    factory(jQuery);
                }
            }(function ($) {
                var debugMode = false;
                var isOperaMini = Object.prototype.toString.call(window.operamini) === '[object OperaMini]';
                var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini && !debugMode;
                var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini && !debugMode;
                var valHooks = $.valHooks;
                var propHooks = $.propHooks;
                var hooks;
                var placeholder;
                var settings = {};
                if (isInputSupported && isTextareaSupported) {
                    placeholder = $.fn.placeholder = function () {
                        return this;
                    };
                    placeholder.input = true;
                    placeholder.textarea = true;
                } else {
                    placeholder = $.fn.placeholder = function (options) {
                        var defaults = { customClass: 'placeholder' };
                        settings = $.extend({}, defaults, options);
                        return this.filter((isInputSupported ? 'textarea' : ':input') + '[' + (debugMode ? 'placeholder-x' : 'placeholder') + ']').not('.' + settings.customClass).not(':radio, :checkbox, [type=hidden]').bind({
                            'focus.placeholder': clearPlaceholder,
                            'blur.placeholder': setPlaceholder
                        }).data('placeholder-enabled', true).trigger('blur.placeholder');
                    };
                    placeholder.input = isInputSupported;
                    placeholder.textarea = isTextareaSupported;
                    hooks = {
                        'get': function (element) {
                            var $element = $(element);
                            var $passwordInput = $element.data('placeholder-password');
                            if ($passwordInput) {
                                return $passwordInput[0].value;
                            }
                            return $element.data('placeholder-enabled') && $element.hasClass(settings.customClass) ? '' : element.value;
                        },
                        'set': function (element, value) {
                            var $element = $(element);
                            var $replacement;
                            var $passwordInput;
                            if (value !== '') {
                                $replacement = $element.data('placeholder-textinput');
                                $passwordInput = $element.data('placeholder-password');
                                if ($replacement) {
                                    clearPlaceholder.call($replacement[0], true, value) || (element.value = value);
                                    $replacement[0].value = value;
                                } else if ($passwordInput) {
                                    clearPlaceholder.call(element, true, value) || ($passwordInput[0].value = value);
                                    element.value = value;
                                }
                            }
                            if (!$element.data('placeholder-enabled')) {
                                element.value = value;
                                return $element;
                            }
                            if (value === '') {
                                element.value = value;
                                if (element != safeActiveElement()) {
                                    setPlaceholder.call(element);
                                }
                            } else {
                                if ($element.hasClass(settings.customClass)) {
                                    clearPlaceholder.call(element);
                                }
                                element.value = value;
                            }
                            return $element;
                        }
                    };
                    if (!isInputSupported) {
                        valHooks.input = hooks;
                        propHooks.value = hooks;
                    }
                    if (!isTextareaSupported) {
                        valHooks.textarea = hooks;
                        propHooks.value = hooks;
                    }
                    $(function () {
                        $(document).delegate('form', 'submit.placeholder', function () {
                            var $inputs = $('.' + settings.customClass, this).each(function () {
                                    clearPlaceholder.call(this, true, '');
                                });
                            setTimeout(function () {
                                $inputs.each(setPlaceholder);
                            }, 10);
                        });
                    });
                    $(window).bind('beforeunload.placeholder', function () {
                        var clearPlaceholders = true;
                        try {
                            if (document.activeElement.toString() === 'javascript:void(0)') {
                                clearPlaceholders = false;
                            }
                        } catch (exception) {
                        }
                        if (clearPlaceholders) {
                            $('.' + settings.customClass).each(function () {
                                this.value = '';
                            });
                        }
                    });
                }
                function args(elem) {
                    var newAttrs = {};
                    var rinlinejQuery = /^jQuery\d+$/;
                    $.each(elem.attributes, function (i, attr) {
                        if (attr.specified && !rinlinejQuery.test(attr.name)) {
                            newAttrs[attr.name] = attr.value;
                        }
                    });
                    return newAttrs;
                }
                function clearPlaceholder(event, value) {
                    var input = this;
                    var $input = $(this);
                    if (input.value === $input.attr(debugMode ? 'placeholder-x' : 'placeholder') && $input.hasClass(settings.customClass)) {
                        input.value = '';
                        $input.removeClass(settings.customClass);
                        if ($input.data('placeholder-password')) {
                            $input = $input.hide().nextAll('input[type="password"]:first').show().attr('id', $input.removeAttr('id').data('placeholder-id'));
                            if (event === true) {
                                $input[0].value = value;
                                return value;
                            }
                            $input.focus();
                        } else {
                            input == safeActiveElement() && input.select();
                        }
                    }
                }
                function setPlaceholder(event) {
                    var $replacement;
                    var input = this;
                    var $input = $(this);
                    var id = input.id;
                    if (event && event.type === 'blur' && $input.hasClass(settings.customClass)) {
                        return;
                    }
                    if (input.value === '') {
                        if (input.type === 'password') {
                            if (!$input.data('placeholder-textinput')) {
                                try {
                                    $replacement = $input.clone().prop({ 'type': 'text' });
                                } catch (e) {
                                    $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
                                }
                                $replacement.removeAttr('name').data({
                                    'placeholder-enabled': true,
                                    'placeholder-password': $input,
                                    'placeholder-id': id
                                }).bind('focus.placeholder', clearPlaceholder);
                                $input.data({
                                    'placeholder-textinput': $replacement,
                                    'placeholder-id': id
                                }).before($replacement);
                            }
                            input.value = '';
                            $input = $input.removeAttr('id').hide().prevAll('input[type="text"]:first').attr('id', $input.data('placeholder-id')).show();
                        } else {
                            var $passwordInput = $input.data('placeholder-password');
                            if ($passwordInput) {
                                $passwordInput[0].value = '';
                                $input.attr('id', $input.data('placeholder-id')).show().nextAll('input[type="password"]:last').hide().removeAttr('id');
                            }
                        }
                        $input.addClass(settings.customClass);
                        $input[0].value = $input.attr(debugMode ? 'placeholder-x' : 'placeholder');
                    } else {
                        $input.removeClass(settings.customClass);
                    }
                }
                function safeActiveElement() {
                    try {
                        return document.activeElement;
                    } catch (exception) {
                    }
                }
            }));
        },
        function (module, exports) {
            module.exports = __external_jQuery;
        },
        function (module, exports) {
            var bizui = {
                    theme: 'blue',
                    Button: _require(3),
                    Input: _require(4),
                    Textarea: _require(5)
                };
            window.bizui = bizui;
            module.exports = bizui;
        },
        function (module, exports) {
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
            var defaultClass = 'biz-button', largeClass = 'biz-button-large', disableClass = 'biz-button-disable', prefix = 'biz-button-', dataKey = 'bizButton';
            Button.prototype = {
                init: function (options) {
                    this.originHTML = this.$main.html();
                    this.$main.addClass(defaultClass + ' ' + (prefix + this.options.theme));
                    if (options.size === 'large') {
                        this.$main.addClass(largeClass);
                    }
                    if (options.icon) {
                        this.$main.prepend('<i class="biz-icon">' + options.icon + '</i> ');
                    }
                    if (options.label) {
                        this.$main.html(options.label);
                    }
                    if (options.disabled) {
                        this.disable();
                    }
                },
                enable: function () {
                    this.main.disabled = false;
                    this.$main.removeClass(disableClass);
                },
                disable: function () {
                    this.main.disabled = true;
                    this.$main.addClass(disableClass);
                },
                destroy: function () {
                    this.$main.removeClass([
                        defaultClass,
                        prefix + this.options.theme,
                        largeClass,
                        disableClass
                    ].join(' '));
                    this.$main.html(this.originHTML);
                    this.originHTML = null;
                    this.$main.data(dataKey, null);
                }
            };
            function isButton(elem) {
                return elem.nodeType === 1 && elem.tagName.toLowerCase() === 'button';
            }
            $.extend($.fn, {
                bizButton: function (method) {
                    var internal_return;
                    this.each(function () {
                        var instance = $(this).data(dataKey);
                        if (instance) {
                            if (typeof method === 'string' && typeof instance[method] === 'function') {
                                internal_return = instance[method].apply(instance, Array.prototype.slice.call(arguments, 1));
                                if (internal_return !== undefined) {
                                    return false;
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
        },
        function (module, exports) {
            _require(0);
            function Input(input, options) {
                this.main = input;
                this.$main = $(this.main);
                this.$main.placeholder();
                var defaultOption = { theme: bizui.theme };
                this.options = $.extend(defaultOption, options || {});
                this.init(this.options);
            }
            var defaultClass = 'biz-input', disableClass = 'biz-input-disable', hoverClass = 'biz-input-hover', focusClass = 'biz-input-focus-', dataKey = 'bizInput';
            Input.prototype = {
                init: function (options) {
                    this.$main.addClass(defaultClass);
                    if (options.disabled) {
                        this.disable();
                    }
                    if (typeof options.onEnter === 'function') {
                        var self = this;
                        this.$main.on('keydown.bizInput', function (e) {
                            if (e.keyCode === 13) {
                                options.onEnter.call(self, e);
                                return false;
                            }
                        });
                    }
                    this.$main.on('mouseover.bizInput', function (e) {
                        $(this).addClass(hoverClass);
                    }).on('mouseout.bizInput', function (e) {
                        $(this).removeClass(hoverClass);
                    }).on('focus.bizInput', function (e) {
                        $(this).addClass(focusClass + options.theme);
                    }).on('blur.bizInput', function (e) {
                        $(this).removeClass(focusClass + options.theme);
                    });
                },
                enable: function () {
                    this.main.disabled = false;
                    this.$main.removeClass(disableClass);
                },
                disable: function () {
                    this.main.disabled = true;
                    this.$main.addClass(disableClass);
                },
                destroy: function () {
                    this.$main.removeClass(defaultClass + ' ' + disableClass);
                    this.$main.off('keydown.bizInput').off('mouseover.bizInput').off('mouseout.bizInput').off('focus.bizInput').off('blur.bizInput');
                    this.$main.data(dataKey, null);
                }
            };
            function isInput(elem) {
                return elem.nodeType === 1 && elem.tagName.toLowerCase() === 'input' && (!elem.getAttribute('type') || elem.getAttribute('type').toLowerCase() === 'text');
            }
            $.extend($.fn, {
                bizInput: function (method) {
                    var internal_return;
                    this.each(function () {
                        var instance = $(this).data(dataKey);
                        if (instance) {
                            if (typeof method === 'string' && typeof instance[method] === 'function') {
                                internal_return = instance[method].apply(instance, Array.prototype.slice.call(arguments, 1));
                                if (internal_return !== undefined) {
                                    return false;
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
        },
        function (module, exports) {
            _require(0);
            function Textarea(textarea, options) {
                this.main = textarea;
                this.$main = $(this.main);
                this.$main.placeholder();
                var defaultOption = { theme: bizui.theme };
                this.options = $.extend(defaultOption, options || {});
                this.init(this.options);
            }
            var defaultClass = 'biz-textarea', disableClass = 'biz-textarea-disable', hoverClass = 'biz-textarea-hover', focusClass = 'biz-textarea-focus-', dataKey = 'bizTextarea';
            Textarea.prototype = {
                init: function (options) {
                    this.$main.addClass(defaultClass);
                    if (options.disabled) {
                        this.disable();
                    }
                    this.$main.on('mouseover.bizTextarea', function (e) {
                        $(this).addClass(hoverClass);
                    }).on('mouseout.bizTextarea', function (e) {
                        $(this).removeClass(hoverClass);
                    }).on('focus.bizTextarea', function (e) {
                        $(this).addClass(focusClass + options.theme);
                    }).on('blur.bizTextarea', function (e) {
                        $(this).removeClass(focusClass + options.theme);
                    });
                },
                enable: function () {
                    this.main.disabled = false;
                    this.$main.removeClass(disableClass);
                },
                disable: function () {
                    this.main.disabled = true;
                    this.$main.addClass(disableClass);
                },
                length: function () {
                    return this.$main.val().replace(/\r?\n/g, '').length;
                },
                destroy: function () {
                    this.$main.removeClass(defaultClass + ' ' + disableClass);
                    this.$main.off('mouseover.bizTextarea').off('mouseout.bizTextarea').off('focus.bizTextarea').off('blur.bizTextarea');
                    this.$main.data(dataKey, null);
                }
            };
            function isTextarea(elem) {
                return elem.nodeType === 1 && elem.tagName.toLowerCase() === 'textarea';
            }
            $.extend($.fn, {
                bizTextarea: function (method) {
                    var internal_return;
                    this.each(function () {
                        var instance = $(this).data(dataKey);
                        if (instance) {
                            if (typeof method === 'string' && typeof instance[method] === 'function') {
                                internal_return = instance[method].apply(instance, Array.prototype.slice.call(arguments, 1));
                                if (internal_return !== undefined) {
                                    return false;
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
        }
    ];
    return _require(2);
}));