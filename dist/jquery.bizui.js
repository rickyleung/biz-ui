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
            !function (a, b) {
                'object' == typeof exports ? module.exports = b() : 'function' == typeof define && define.amd ? define([], b) : a.Draggable = b();
            }(this, function () {
                'use strict';
                function a(a, b) {
                    var c = this, d = k.bind(c.start, c), e = k.bind(c.drag, c), g = k.bind(c.stop, c);
                    if (!f(a))
                        throw new TypeError('Draggable expects argument 0 to be an Element');
                    b = k.assign({}, i, b), k.assign(c, {
                        element: a,
                        handle: b.handle && f(b.handle) ? b.handle : a,
                        handlers: {
                            start: {
                                mousedown: d,
                                touchstart: d
                            },
                            move: {
                                mousemove: e,
                                mouseup: g,
                                touchmove: e,
                                touchend: g
                            }
                        },
                        options: b
                    }), c.initialize();
                }
                function b(a) {
                    return parseInt(a, 10);
                }
                function c(a) {
                    return 'currentStyle' in a ? a.currentStyle : getComputedStyle(a);
                }
                function d(a) {
                    return a instanceof Array;
                }
                function e(a) {
                    return void 0 !== a && null !== a;
                }
                function f(a) {
                    return a instanceof Element || 'undefined' != typeof HTMLDocument && a instanceof HTMLDocument;
                }
                function g(a) {
                    return a instanceof Function;
                }
                function h() {
                }
                var i = {
                        grid: 0,
                        filterTarget: null,
                        limit: {
                            x: null,
                            y: null
                        },
                        threshold: 0,
                        setCursor: !1,
                        setPosition: !0,
                        smoothDrag: !0,
                        useGPU: !0,
                        onDrag: h,
                        onDragStart: h,
                        onDragEnd: h
                    }, j = {
                        transform: function () {
                            for (var a = ' -o- -ms- -moz- -webkit-'.split(' '), b = document.body.style, c = a.length; c--;) {
                                var d = a[c] + 'transform';
                                if (d in b)
                                    return d;
                            }
                        }()
                    }, k = {
                        assign: function () {
                            for (var a = arguments[0], b = arguments.length, c = 1; b > c; c++) {
                                var d = arguments[c];
                                for (var e in d)
                                    a[e] = d[e];
                            }
                            return a;
                        },
                        bind: function (a, b) {
                            return function () {
                                a.apply(b, arguments);
                            };
                        },
                        on: function (a, b, c) {
                            if (b && c)
                                k.addEvent(a, b, c);
                            else if (b)
                                for (var d in b)
                                    k.addEvent(a, d, b[d]);
                        },
                        off: function (a, b, c) {
                            if (b && c)
                                k.removeEvent(a, b, c);
                            else if (b)
                                for (var d in b)
                                    k.removeEvent(a, d, b[d]);
                        },
                        limit: function (a, b) {
                            return d(b) ? (b = [
                                +b[0],
                                +b[1]
                            ], a < b[0] ? a = b[0] : a > b[1] && (a = b[1])) : a = +b, a;
                        },
                        addEvent: 'attachEvent' in Element.prototype ? function (a, b, c) {
                            a.attachEvent('on' + b, c);
                        } : function (a, b, c) {
                            a.addEventListener(b, c, !1);
                        },
                        removeEvent: 'attachEvent' in Element.prototype ? function (a, b, c) {
                            a.detachEvent('on' + b, c);
                        } : function (a, b, c) {
                            a.removeEventListener(b, c);
                        }
                    };
                return k.assign(a.prototype, {
                    setOption: function (a, b) {
                        var c = this;
                        return c.options[a] = b, c.initialize(), c;
                    },
                    get: function () {
                        var a = this.dragEvent;
                        return {
                            x: a.x,
                            y: a.y
                        };
                    },
                    set: function (a, b) {
                        var c = this, d = c.dragEvent;
                        return d.original = {
                            x: d.x,
                            y: d.y
                        }, c.move(a, b), c;
                    },
                    dragEvent: {
                        started: !1,
                        x: 0,
                        y: 0
                    },
                    initialize: function () {
                        var a, b = this, d = b.element, e = (b.handle, d.style), f = c(d), g = b.options, h = j.transform, i = b._dimensions = {
                                height: d.offsetHeight,
                                left: d.offsetLeft,
                                top: d.offsetTop,
                                width: d.offsetWidth
                            };
                        g.useGPU && h && (a = f[h], 'none' === a && (a = ''), e[h] = a + ' translate3d(0,0,0)'), g.setPosition && (e.display = 'block', e.left = i.left + 'px', e.top = i.top + 'px', e.bottom = e.right = 'auto', e.margin = 0, e.position = 'absolute'), g.setCursor && (e.cursor = 'move'), b.setLimit(g.limit), k.assign(b.dragEvent, {
                            x: i.left,
                            y: i.top
                        }), k.on(b.handle, b.handlers.start);
                    },
                    start: function (a) {
                        var b = this, c = b.getCursor(a), d = b.element;
                        b.useTarget(a.target || a.srcElement) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1, b.dragEvent.oldZindex = d.style.zIndex, d.style.zIndex = 10000, b.setCursor(c), b.setPosition(), b.setZoom(), k.on(document, b.handlers.move));
                    },
                    drag: function (a) {
                        var b = this, c = b.dragEvent, d = b.element, e = b._cursor, f = b._dimensions, g = b.options, h = f.zoom, i = b.getCursor(a), j = g.threshold, k = (i.x - e.x) / h + f.left, l = (i.y - e.y) / h + f.top;
                        !c.started && j && Math.abs(e.x - i.x) < j && Math.abs(e.y - i.y) < j || (c.original || (c.original = {
                            x: k,
                            y: l
                        }), c.started || (g.onDragStart(d, k, l, a), c.started = !0), b.move(k, l) && g.onDrag(d, c.x, c.y, a));
                    },
                    move: function (a, b) {
                        var c = this, d = c.dragEvent, e = c.options, f = e.grid, g = c.element.style, h = c.limit(a, b, d.original.x, d.original.y);
                        return !e.smoothDrag && f && (h = c.round(h, f)), h.x !== d.x || h.y !== d.y ? (d.x = h.x, d.y = h.y, g.left = h.x + 'px', g.top = h.y + 'px', !0) : !1;
                    },
                    stop: function (a) {
                        var b, c = this, d = c.dragEvent, e = c.element, f = c.options, g = f.grid;
                        k.off(document, c.handlers.move), e.style.zIndex = d.oldZindex, f.smoothDrag && g && (b = c.round({
                            x: d.x,
                            y: d.y
                        }, g), c.move(b.x, b.y), k.assign(c.dragEvent, b)), c.dragEvent.started && f.onDragEnd(e, d.x, d.y, a), c.reset();
                    },
                    reset: function () {
                        this.dragEvent.started = !1;
                    },
                    round: function (a) {
                        var b = this.options.grid;
                        return {
                            x: b * Math.round(a.x / b),
                            y: b * Math.round(a.y / b)
                        };
                    },
                    getCursor: function (a) {
                        return {
                            x: (a.targetTouches ? a.targetTouches[0] : a).clientX,
                            y: (a.targetTouches ? a.targetTouches[0] : a).clientY
                        };
                    },
                    setCursor: function (a) {
                        this._cursor = a;
                    },
                    setLimit: function (a) {
                        var b = this, c = function (a, b) {
                                return {
                                    x: a,
                                    y: b
                                };
                            };
                        if (g(a))
                            b.limit = a;
                        else if (f(a)) {
                            var d = b._dimensions, h = a.scrollHeight - d.height, i = a.scrollWidth - d.width;
                            b.limit = function (a, b) {
                                return {
                                    x: k.limit(a, [
                                        0,
                                        i
                                    ]),
                                    y: k.limit(b, [
                                        0,
                                        h
                                    ])
                                };
                            };
                        } else if (a) {
                            var j = {
                                    x: e(a.x),
                                    y: e(a.y)
                                };
                            b.limit = j.x || j.y ? function (b, c) {
                                return {
                                    x: j.x ? k.limit(b, a.x) : b,
                                    y: j.y ? k.limit(c, a.y) : c
                                };
                            } : c;
                        } else
                            b.limit = c;
                    },
                    setPosition: function () {
                        var a = this, c = a.element, d = c.style;
                        k.assign(a._dimensions, {
                            left: b(d.left) || c.offsetLeft,
                            top: b(d.top) || c.offsetTop
                        });
                    },
                    setZoom: function () {
                        for (var a = this, b = a.element, d = 1; b = b.offsetParent;) {
                            var e = c(b).zoom;
                            if (e && 'normal' !== e) {
                                d = e;
                                break;
                            }
                        }
                        a._dimensions.zoom = d;
                    },
                    useTarget: function (a) {
                        var b = this.options.filterTarget;
                        return b instanceof Function ? b(a) : !0;
                    },
                    destroy: function () {
                        k.off(this.handle, this.handlers.start), k.off(document, this.handlers.move);
                    }
                }), a;
            });
        },
        function (module, exports) {
            !function (a) {
                a.fn.datepicker.dates['zh-CN'] = {
                    days: [
                        '\u661F\u671F\u65E5',
                        '\u661F\u671F\u4E00',
                        '\u661F\u671F\u4E8C',
                        '\u661F\u671F\u4E09',
                        '\u661F\u671F\u56DB',
                        '\u661F\u671F\u4E94',
                        '\u661F\u671F\u516D'
                    ],
                    daysShort: [
                        '\u5468\u65E5',
                        '\u5468\u4E00',
                        '\u5468\u4E8C',
                        '\u5468\u4E09',
                        '\u5468\u56DB',
                        '\u5468\u4E94',
                        '\u5468\u516D'
                    ],
                    daysMin: [
                        '\u65E5',
                        '\u4E00',
                        '\u4E8C',
                        '\u4E09',
                        '\u56DB',
                        '\u4E94',
                        '\u516D'
                    ],
                    months: [
                        '\u4E00\u6708',
                        '\u4E8C\u6708',
                        '\u4E09\u6708',
                        '\u56DB\u6708',
                        '\u4E94\u6708',
                        '\u516D\u6708',
                        '\u4E03\u6708',
                        '\u516B\u6708',
                        '\u4E5D\u6708',
                        '\u5341\u6708',
                        '\u5341\u4E00\u6708',
                        '\u5341\u4E8C\u6708'
                    ],
                    monthsShort: [
                        '1\u6708',
                        '2\u6708',
                        '3\u6708',
                        '4\u6708',
                        '5\u6708',
                        '6\u6708',
                        '7\u6708',
                        '8\u6708',
                        '9\u6708',
                        '10\u6708',
                        '11\u6708',
                        '12\u6708'
                    ],
                    today: '\u4ECA\u65E5',
                    clear: '\u6E05\u9664',
                    format: 'yyyy\u5E74mm\u6708dd\u65E5',
                    titleFormat: 'yyyy\u5E74mm\u6708',
                    weekStart: 1
                };
            }(jQuery);
        },
        function (module, exports) {
            (function (factory) {
                if (typeof define === 'function' && define.amd) {
                    define(['jquery'], factory);
                } else if (typeof module === 'object' && module.exports) {
                    factory(_require(3));
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
            'use strict';
            var bind = function (t, e) {
                return function () {
                    return t.apply(e, arguments);
                };
            };
            !function (t) {
                return 'object' == typeof module && module.exports ? module.exports = t(_require(3)) : 'function' == typeof define && define.amd ? define(['jquery'], t) : t(jQuery);
            }(function (t) {
                var e;
                return e = function () {
                    function e(e) {
                        this.render = bind(this.render, this), this.hideTooltip = bind(this.hideTooltip, this), this.showTooltip = bind(this.showTooltip, this), this.replaceCharacters = bind(this.replaceCharacters, this), this.log = bind(this.log, this), this.settings = t.extend({}, this.defaults, e), this.render();
                    }
                    return e.prototype.defaults = {
                        action: 'focus',
                        debug: !1,
                        element: '.error',
                        fadeSpeed: 200,
                        html5: !0,
                        preventDefault: !1,
                        removeAll: !1,
                        removeSpecific: !1,
                        tailLength: 14,
                        tooltipClass: ''
                    }, e.prototype.log = function (t) {
                        return this.settings.debug && 'undefined' != typeof console && null !== console ? console.info(t) : void 0;
                    }, e.prototype.replaceCharacters = function (t) {
                        var e, i, o, n, s, l, r;
                        o = [], l = [], i = [], s = [], e = t.split('');
                        for (n in e)
                            r = e[n], '^' === r && o.push(n), '*' === r && l.push(n), '~' === r && i.push(n), '`' === r && s.push(n), '|' === r && (e[n] = '<br />'), '{' === r && (e[n] = '<ul>'), '}' === r && (e[n] = '</ul>');
                        for (; o.length > 1;)
                            e[o[0]] = '<h1>', e[o[1]] = '</h1>', o.splice(0, 2);
                        for (; l.length > 1;)
                            e[l[0]] = '<strong>', e[l[1]] = '</strong>', l.splice(0, 2);
                        for (; i.length > 1;)
                            e[i[0]] = '<em>', e[i[1]] = '</em>', i.splice(0, 2);
                        for (; s.length;)
                            e[s[0]] = '<li>', s.splice(0, 1);
                        return e.join('');
                    }, e.prototype.showTooltip = function (e) {
                        var i, o, n, s, l, r, u, c, f, p, h;
                        if (e.attr('data-tooltip')) {
                            switch (this.hideTooltip(), s = this.replaceCharacters(e.attr('data-tooltip')), i = e.attr('data-tooltip-direction'), c = this.settings.html5 ? '<aside>' : '<div>', t(c).addClass('tooltip ' + this.settings.tooltipClass).html(s).appendTo('body'), n = e.outerWidth(), o = e.outerHeight(), p = t('.tooltip:last').outerWidth(), f = t('.tooltip:last').outerHeight(), r = e.offset(), h = r.top, l = 0, u = 0, i) {
                            case 'left':
                                u = r.left - p - this.settings.tailLength, h = h - f / 2 + o / 2, t('.tooltip:last').css({
                                    left: u,
                                    top: h
                                }).addClass('left').fadeIn(this.settings.fadeSpeed);
                                break;
                            case 'bottom':
                                h = r.top + o + this.settings.tailLength, l = r.left + n / 2 - p / 2, t('.tooltip:last').css({
                                    left: l,
                                    top: h
                                }).addClass('bottom').fadeIn(this.settings.fadeSpeed);
                                break;
                            case 'top':
                                h = r.top - f - this.settings.tailLength, l = r.left + n / 2 - p / 2, t('.tooltip:last').css({
                                    left: l,
                                    top: h
                                }).addClass('top').fadeIn(this.settings.fadeSpeed);
                                break;
                            default:
                                l = r.left + n + this.settings.tailLength, h = h - f / 2 + o / 2, t('.tooltip:last').css({
                                    left: l,
                                    top: h
                                }).fadeIn(this.settings.fadeSpeed);
                            }
                            if (this.settings.debug && (this.log('Tooltip Content: ' + s), n && this.log('Element Width: ' + n), o && this.log('Element Height: ' + o), h && this.log('Element Top Position: ' + h), l && this.log('Element Left Position: ' + l), u && this.log('Element Right Position: ' + u), p && this.log('Tooltip Width: ' + p), f))
                                return this.log('Tooltip Height: ' + f);
                        }
                    }, e.prototype.hideTooltip = function () {
                        return t('.tooltip').fadeOut(this.settings.fadeSpeed, function () {
                            return t(this).remove();
                        });
                    }, e.prototype.render = function () {
                        var e, i;
                        if (e = this, i = e.settings.element, e.settings.removeSpecific && !e.settings.removeAll && (e.settings.debug && e.log('unbinding tooltip'), e.settings.action && i))
                            switch (e.settings.action) {
                            case 'click':
                                t(document).off('click.tips.cd', i), t(document).off('blur.tips.bc', i);
                                break;
                            case 'hover':
                                t(document).off('click.tips.hc', i), t(document).off('mouseenter.tips.he', i), t(document).off('mouseout.tips.ho', i);
                                break;
                            default:
                                t(document).off('click.tips.fc', i), t(document).off('focus.tips.ff', i), t(document).off('blur.tips.fb', i), t(document).off('change.tips.fch', i);
                            }
                        if (e.settings.removeAll && (e.settings.debug && e.log('removing all tooltip binding'), t(document).off('click.tips'), t(document).off('blur.tips'), t(document).off('mouseenter.tips'), t(document).off('mouseout.tips'), t(document).off('change.tips')), !e.settings.removeAll && !e.settings.removeSpecific)
                            switch (e.settings.action) {
                            case 'click':
                                return t(document).on('click.tips.cc', i, function (i) {
                                    return e.settings.preventDefault && i.preventDefault(), t(this).is(':input') || t(this).attr('tabindex') || t(this).attr('tabindex', 0).focus(), e.showTooltip(t(this));
                                }), t(document).on('blur.tips.bc', i, function (i) {
                                    return t(this).is(':input') || t(this).attr('tabindex') || t(this).removeAttr('tabindex'), e.hideTooltip();
                                });
                            case 'hover':
                                return t(document).on('click.tips.hc', i, function (t) {
                                    return e.settings.preventDefault ? t.preventDefault() : void 0;
                                }), t(document).on('mouseenter.tips.he', i, function (i) {
                                    return e.showTooltip(t(this));
                                }), t(document).on('mouseout.tips.ho', i, function (t) {
                                    return e.hideTooltip();
                                });
                            default:
                                return t(document).on('click.tips.fc', i, function (t) {
                                    return e.settings.preventDefault ? t.preventDefault() : void 0;
                                }), t(document).on('focus.tips.ff', i, function (i) {
                                    return e.showTooltip(t(this));
                                }), t(document).on('blur.tips.fb', i, function (t) {
                                    return e.hideTooltip();
                                }), t(document).on('change.tips.fch', i, function (t) {
                                    return e.hideTooltip();
                                });
                            }
                    }, e;
                }(), t.extend({
                    tips: function (t, i) {
                        return this(function () {
                            var o;
                            return o = new e(t), 'function' == typeof i ? i.call(this) : void 0;
                        });
                    }
                });
            });
        },
        function (module, exports) {
            _require(10);
            _require(11);
            _require(12);
            var dialog = _require(13);
            _require(14);
            _require(15);
            _require(16);
            _require(17);
            _require(18);
            _require(19);
            _require(21);
            var bizui = {
                    theme: 'blue',
                    codepoints: _require(6),
                    alert: dialog.alert,
                    confirm: dialog.confirm,
                    Tooltip: _require(20)
                };
            window.bizui = bizui;
            module.exports = bizui;
        },
        function (module, exports) {
            module.exports = {
                '3d_rotation': '&#xe84d;',
                'ac_unit': '&#xeb3b;',
                'access_alarms': '&#xe191;',
                'access_time': '&#xe192;',
                'accessibility': '&#xe84e;',
                'accessible': '&#xe914;',
                'account_balance': '&#xe84f;',
                'account_balance_wallet': '&#xe850;',
                'account_box': '&#xe851;',
                'account_circle': '&#xe853;',
                'adb': '&#xe60e;',
                'add': '&#xe145;',
                'add_a_photo': '&#xe439;',
                'add_alarm': '&#xe193;',
                'add_alert': '&#xe003;',
                'add_box': '&#xe146;',
                'add_circle': '&#xe147;',
                'add_circle_outline': '&#xe148;',
                'add_location': '&#xe567;',
                'add_shopping_cart': '&#xe854;',
                'add_to_photos': '&#xe39d;',
                'add_to_queue': '&#xe05c;',
                'adjust': '&#xe39e;',
                'airline_seat_flat': '&#xe630;',
                'airline_seat_flat_angled': '&#xe631;',
                'airline_seat_individual_suite': '&#xe632;',
                'airline_seat_legroom_extra': '&#xe633;',
                'airline_seat_legroom_normal': '&#xe634;',
                'airline_seat_legroom_reduced': '&#xe635;',
                'airline_seat_recline_extra': '&#xe636;',
                'airline_seat_recline_normal': '&#xe637;',
                'airplanemode_active': '&#xe195;',
                'airplanemode_inactive': '&#xe194;',
                'airplay': '&#xe055;',
                'airport_shuttle': '&#xeb3c;',
                'alarm': '&#xe855;',
                'alarm_add': '&#xe856;',
                'alarm_off': '&#xe857;',
                'alarm_on': '&#xe858;',
                'album': '&#xe019;',
                'all_inclusive': '&#xeb3d;',
                'all_out': '&#xe90b;',
                'android': '&#xe859;',
                'announcement': '&#xe85a;',
                'apps': '&#xe5c3;',
                'archive': '&#xe149;',
                'arrow_back': '&#xe5c4;',
                'arrow_downward': '&#xe5db;',
                'arrow_drop_down': '&#xe5c5;',
                'arrow_drop_down_circle': '&#xe5c6;',
                'arrow_drop_up': '&#xe5c7;',
                'arrow_forward': '&#xe5c8;',
                'arrow_upward': '&#xe5d8;',
                'art_track': '&#xe060;',
                'aspect_ratio': '&#xe85b;',
                'assessment': '&#xe85c;',
                'assignment': '&#xe85d;',
                'assignment_ind': '&#xe85e;',
                'assignment_late': '&#xe85f;',
                'assignment_return': '&#xe860;',
                'assignment_returned': '&#xe861;',
                'assignment_turned_in': '&#xe862;',
                'assistant': '&#xe39f;',
                'assistant_photo': '&#xe3a0;',
                'attach_file': '&#xe226;',
                'attach_money': '&#xe227;',
                'attachment': '&#xe2bc;',
                'audiotrack': '&#xe3a1;',
                'autorenew': '&#xe863;',
                'av_timer': '&#xe01b;',
                'access_alarm': '&#xe190;',
                'backup': '&#xe864;',
                'battery_alert': '&#xe19c;',
                'battery_full': '&#xe1a4;',
                'battery_std': '&#xe1a5;',
                'battery_unknown': '&#xe1a6;',
                'beach_access': '&#xeb3e;',
                'beenhere': '&#xe52d;',
                'block': '&#xe14b;',
                'bluetooth': '&#xe1a7;',
                'bluetooth_audio': '&#xe60f;',
                'bluetooth_connected': '&#xe1a8;',
                'bluetooth_disabled': '&#xe1a9;',
                'bluetooth_searching': '&#xe1aa;',
                'blur_circular': '&#xe3a2;',
                'blur_linear': '&#xe3a3;',
                'blur_off': '&#xe3a4;',
                'blur_on': '&#xe3a5;',
                'book': '&#xe865;',
                'bookmark': '&#xe866;',
                'bookmark_border': '&#xe867;',
                'border_all': '&#xe228;',
                'border_bottom': '&#xe229;',
                'border_clear': '&#xe22a;',
                'border_color': '&#xe22b;',
                'border_horizontal': '&#xe22c;',
                'border_inner': '&#xe22d;',
                'border_left': '&#xe22e;',
                'border_outer': '&#xe22f;',
                'border_right': '&#xe230;',
                'border_style': '&#xe231;',
                'border_top': '&#xe232;',
                'border_vertical': '&#xe233;',
                'branding_watermark': '&#xe06b;',
                'brightness_1': '&#xe3a6;',
                'brightness_2': '&#xe3a7;',
                'brightness_3': '&#xe3a8;',
                'brightness_4': '&#xe3a9;',
                'brightness_5': '&#xe3aa;',
                'brightness_6': '&#xe3ab;',
                'brightness_7': '&#xe3ac;',
                'brightness_auto': '&#xe1ab;',
                'brightness_high': '&#xe1ac;',
                'brightness_low': '&#xe1ad;',
                'brightness_medium': '&#xe1ae;',
                'broken_image': '&#xe3ad;',
                'brush': '&#xe3ae;',
                'bubble_chart': '&#xe6dd;',
                'bug_report': '&#xe868;',
                'build': '&#xe869;',
                'burst_mode': '&#xe43c;',
                'business': '&#xe0af;',
                'business_center': '&#xeb3f;',
                'backspace': '&#xe14a;',
                'battery_charging_full': '&#xe1a3;',
                'cloud': '&#xe2bd;',
                'call': '&#xe0b0;',
                'call_made': '&#xe0b2;',
                'call_merge': '&#xe0b3;',
                'call_missed': '&#xe0b4;',
                'call_missed_outgoing': '&#xe0e4;',
                'call_received': '&#xe0b5;',
                'call_split': '&#xe0b6;',
                'call_to_action': '&#xe06c;',
                'camera': '&#xe3af;',
                'camera_alt': '&#xe3b0;',
                'camera_enhance': '&#xe8fc;',
                'camera_front': '&#xe3b1;',
                'camera_rear': '&#xe3b2;',
                'camera_roll': '&#xe3b3;',
                'cake': '&#xe7e9;',
                'card_giftcard': '&#xe8f6;',
                'card_membership': '&#xe8f7;',
                'card_travel': '&#xe8f8;',
                'casino': '&#xeb40;',
                'cast': '&#xe307;',
                'cast_connected': '&#xe308;',
                'center_focus_strong': '&#xe3b4;',
                'center_focus_weak': '&#xe3b5;',
                'change_history': '&#xe86b;',
                'chat': '&#xe0b7;',
                'chat_bubble': '&#xe0ca;',
                'chat_bubble_outline': '&#xe0cb;',
                'check': '&#xe5ca;',
                'check_box': '&#xe834;',
                'check_box_outline_blank': '&#xe835;',
                'check_circle': '&#xe86c;',
                'chevron_left': '&#xe5cb;',
                'chevron_right': '&#xe5cc;',
                'child_care': '&#xeb41;',
                'child_friendly': '&#xeb42;',
                'chrome_reader_mode': '&#xe86d;',
                'class': '&#xe86e;',
                'clear': '&#xe14c;',
                'clear_all': '&#xe0b8;',
                'close': '&#xe5cd;',
                'closed_caption': '&#xe01c;',
                'call_end': '&#xe0b1;',
                'cloud_circle': '&#xe2be;',
                'cloud_done': '&#xe2bf;',
                'cloud_download': '&#xe2c0;',
                'cloud_off': '&#xe2c1;',
                'cloud_queue': '&#xe2c2;',
                'cloud_upload': '&#xe2c3;',
                'code': '&#xe86f;',
                'collections': '&#xe3b6;',
                'collections_bookmark': '&#xe431;',
                'color_lens': '&#xe3b7;',
                'colorize': '&#xe3b8;',
                'comment': '&#xe0b9;',
                'compare': '&#xe3b9;',
                'compare_arrows': '&#xe915;',
                'computer': '&#xe30a;',
                'confirmation_number': '&#xe638;',
                'contact_mail': '&#xe0d0;',
                'contact_phone': '&#xe0cf;',
                'contacts': '&#xe0ba;',
                'content_copy': '&#xe14d;',
                'content_cut': '&#xe14e;',
                'content_paste': '&#xe14f;',
                'control_point': '&#xe3ba;',
                'control_point_duplicate': '&#xe3bb;',
                'copyright': '&#xe90c;',
                'create': '&#xe150;',
                'create_new_folder': '&#xe2cc;',
                'credit_card': '&#xe870;',
                'crop': '&#xe3be;',
                'crop_16_9': '&#xe3bc;',
                'crop_3_2': '&#xe3bd;',
                'crop_5_4': '&#xe3bf;',
                'crop_7_5': '&#xe3c0;',
                'crop_din': '&#xe3c1;',
                'crop_free': '&#xe3c2;',
                'crop_landscape': '&#xe3c3;',
                'crop_original': '&#xe3c4;',
                'crop_portrait': '&#xe3c5;',
                'crop_rotate': '&#xe437;',
                'crop_square': '&#xe3c6;',
                'cached': '&#xe86a;',
                'cancel': '&#xe5c9;',
                'data_usage': '&#xe1af;',
                'date_range': '&#xe916;',
                'dehaze': '&#xe3c7;',
                'delete': '&#xe872;',
                'delete_forever': '&#xe92b;',
                'delete_sweep': '&#xe16c;',
                'description': '&#xe873;',
                'desktop_mac': '&#xe30b;',
                'desktop_windows': '&#xe30c;',
                'details': '&#xe3c8;',
                'developer_board': '&#xe30d;',
                'developer_mode': '&#xe1b0;',
                'device_hub': '&#xe335;',
                'devices': '&#xe1b1;',
                'devices_other': '&#xe337;',
                'dialer_sip': '&#xe0bb;',
                'dialpad': '&#xe0bc;',
                'directions': '&#xe52e;',
                'directions_bike': '&#xe52f;',
                'directions_boat': '&#xe532;',
                'directions_bus': '&#xe530;',
                'directions_car': '&#xe531;',
                'directions_railway': '&#xe534;',
                'directions_run': '&#xe566;',
                'directions_subway': '&#xe533;',
                'directions_transit': '&#xe535;',
                'directions_walk': '&#xe536;',
                'disc_full': '&#xe610;',
                'dns': '&#xe875;',
                'do_not_disturb': '&#xe612;',
                'do_not_disturb_alt': '&#xe611;',
                'do_not_disturb_off': '&#xe643;',
                'do_not_disturb_on': '&#xe644;',
                'dock': '&#xe30e;',
                'domain': '&#xe7ee;',
                'done': '&#xe876;',
                'done_all': '&#xe877;',
                'donut_large': '&#xe917;',
                'donut_small': '&#xe918;',
                'drafts': '&#xe151;',
                'drag_handle': '&#xe25d;',
                'drive_eta': '&#xe613;',
                'dvr': '&#xe1b2;',
                'dashboard': '&#xe871;',
                'edit_location': '&#xe568;',
                'enhanced_encryption': '&#xe63f;',
                'email': '&#xe0be;',
                'edit': '&#xe3c9;',
                'equalizer': '&#xe01d;',
                'error': '&#xe000;',
                'error_outline': '&#xe001;',
                'euro_symbol': '&#xe926;',
                'ev_station': '&#xe56d;',
                'event': '&#xe878;',
                'event_available': '&#xe614;',
                'event_busy': '&#xe615;',
                'event_note': '&#xe616;',
                'event_seat': '&#xe903;',
                'exit_to_app': '&#xe879;',
                'expand_less': '&#xe5ce;',
                'expand_more': '&#xe5cf;',
                'explicit': '&#xe01e;',
                'explore': '&#xe87a;',
                'exposure': '&#xe3ca;',
                'exposure_neg_1': '&#xe3cb;',
                'exposure_neg_2': '&#xe3cc;',
                'exposure_plus_1': '&#xe3cd;',
                'exposure_plus_2': '&#xe3ce;',
                'exposure_zero': '&#xe3cf;',
                'extension': '&#xe87b;',
                'eject': '&#xe8fb;',
                'forward_30': '&#xe057;',
                'fast_forward': '&#xe01f;',
                'favorite': '&#xe87d;',
                'favorite_border': '&#xe87e;',
                'featured_play_list': '&#xe06d;',
                'featured_video': '&#xe06e;',
                'feedback': '&#xe87f;',
                'fiber_dvr': '&#xe05d;',
                'fiber_manual_record': '&#xe061;',
                'fiber_new': '&#xe05e;',
                'fiber_pin': '&#xe06a;',
                'fiber_smart_record': '&#xe062;',
                'file_download': '&#xe2c4;',
                'file_upload': '&#xe2c6;',
                'filter': '&#xe3d3;',
                'filter_1': '&#xe3d0;',
                'filter_2': '&#xe3d1;',
                'filter_3': '&#xe3d2;',
                'filter_4': '&#xe3d4;',
                'filter_5': '&#xe3d5;',
                'filter_6': '&#xe3d6;',
                'filter_7': '&#xe3d7;',
                'filter_8': '&#xe3d8;',
                'filter_9': '&#xe3d9;',
                'filter_9_plus': '&#xe3da;',
                'filter_b_and_w': '&#xe3db;',
                'filter_center_focus': '&#xe3dc;',
                'filter_drama': '&#xe3dd;',
                'filter_frames': '&#xe3de;',
                'filter_hdr': '&#xe3df;',
                'filter_list': '&#xe152;',
                'filter_none': '&#xe3e0;',
                'filter_tilt_shift': '&#xe3e2;',
                'filter_vintage': '&#xe3e3;',
                'find_in_page': '&#xe880;',
                'find_replace': '&#xe881;',
                'fingerprint': '&#xe90d;',
                'first_page': '&#xe5dc;',
                'fitness_center': '&#xeb43;',
                'flag': '&#xe153;',
                'flare': '&#xe3e4;',
                'flash_auto': '&#xe3e5;',
                'flash_off': '&#xe3e6;',
                'flash_on': '&#xe3e7;',
                'flight': '&#xe539;',
                'flight_land': '&#xe904;',
                'flight_takeoff': '&#xe905;',
                'flip': '&#xe3e8;',
                'flip_to_back': '&#xe882;',
                'flip_to_front': '&#xe883;',
                'folder': '&#xe2c7;',
                'folder_open': '&#xe2c8;',
                'folder_shared': '&#xe2c9;',
                'folder_special': '&#xe617;',
                'font_download': '&#xe167;',
                'format_align_center': '&#xe234;',
                'format_align_justify': '&#xe235;',
                'format_align_left': '&#xe236;',
                'format_align_right': '&#xe237;',
                'format_bold': '&#xe238;',
                'format_clear': '&#xe239;',
                'format_color_fill': '&#xe23a;',
                'format_color_reset': '&#xe23b;',
                'format_color_text': '&#xe23c;',
                'format_indent_decrease': '&#xe23d;',
                'format_indent_increase': '&#xe23e;',
                'format_italic': '&#xe23f;',
                'face': '&#xe87c;',
                'format_list_bulleted': '&#xe241;',
                'format_list_numbered': '&#xe242;',
                'format_paint': '&#xe243;',
                'format_quote': '&#xe244;',
                'format_shapes': '&#xe25e;',
                'format_size': '&#xe245;',
                'format_strikethrough': '&#xe246;',
                'format_textdirection_l_to_r': '&#xe247;',
                'format_textdirection_r_to_l': '&#xe248;',
                'format_underlined': '&#xe249;',
                'forum': '&#xe0bf;',
                'forward': '&#xe154;',
                'forward_10': '&#xe056;',
                'fast_rewind': '&#xe020;',
                'forward_5': '&#xe058;',
                'free_breakfast': '&#xeb44;',
                'fullscreen': '&#xe5d0;',
                'fullscreen_exit': '&#xe5d1;',
                'functions': '&#xe24a;',
                'format_line_spacing': '&#xe240;',
                'g_translate': '&#xe927;',
                'games': '&#xe021;',
                'gavel': '&#xe90e;',
                'gesture': '&#xe155;',
                'get_app': '&#xe884;',
                'gif': '&#xe908;',
                'golf_course': '&#xeb45;',
                'gps_fixed': '&#xe1b3;',
                'gps_not_fixed': '&#xe1b4;',
                'gps_off': '&#xe1b5;',
                'grade': '&#xe885;',
                'gradient': '&#xe3e9;',
                'grain': '&#xe3ea;',
                'graphic_eq': '&#xe1b8;',
                'grid_off': '&#xe3eb;',
                'grid_on': '&#xe3ec;',
                'group': '&#xe7ef;',
                'group_add': '&#xe7f0;',
                'group_work': '&#xe886;',
                'gamepad': '&#xe30f;',
                'hdr_off': '&#xe3ed;',
                'hotel': '&#xe53a;',
                'hdr_strong': '&#xe3f1;',
                'hdr_weak': '&#xe3f2;',
                'headset': '&#xe310;',
                'headset_mic': '&#xe311;',
                'healing': '&#xe3f3;',
                'hearing': '&#xe023;',
                'help': '&#xe887;',
                'help_outline': '&#xe8fd;',
                'high_quality': '&#xe024;',
                'highlight': '&#xe25f;',
                'highlight_off': '&#xe888;',
                'history': '&#xe889;',
                'home': '&#xe88a;',
                'hot_tub': '&#xeb46;',
                'hd': '&#xe052;',
                'hourglass_empty': '&#xe88b;',
                'hourglass_full': '&#xe88c;',
                'http': '&#xe902;',
                'https': '&#xe88d;',
                'hdr_on': '&#xe3ee;',
                'invert_colors': '&#xe891;',
                'image_aspect_ratio': '&#xe3f5;',
                'import_export': '&#xe0c3;',
                'important_devices': '&#xe912;',
                'inbox': '&#xe156;',
                'image': '&#xe3f4;',
                'info': '&#xe88e;',
                'info_outline': '&#xe88f;',
                'input': '&#xe890;',
                'insert_chart': '&#xe24b;',
                'insert_comment': '&#xe24c;',
                'insert_drive_file': '&#xe24d;',
                'insert_emoticon': '&#xe24e;',
                'insert_invitation': '&#xe24f;',
                'insert_link': '&#xe250;',
                'insert_photo': '&#xe251;',
                'import_contacts': '&#xe0e0;',
                'invert_colors_off': '&#xe0c4;',
                'iso': '&#xe3f6;',
                'indeterminate_check_box': '&#xe909;',
                'keyboard': '&#xe312;',
                'keyboard_arrow_left': '&#xe314;',
                'keyboard_arrow_right': '&#xe315;',
                'keyboard_arrow_up': '&#xe316;',
                'keyboard_backspace': '&#xe317;',
                'keyboard_arrow_down': '&#xe313;',
                'keyboard_hide': '&#xe31a;',
                'keyboard_return': '&#xe31b;',
                'keyboard_tab': '&#xe31c;',
                'keyboard_voice': '&#xe31d;',
                'kitchen': '&#xeb47;',
                'keyboard_capslock': '&#xe318;',
                'label': '&#xe892;',
                'label_outline': '&#xe893;',
                'landscape': '&#xe3f7;',
                'language': '&#xe894;',
                'laptop': '&#xe31e;',
                'laptop_chromebook': '&#xe31f;',
                'laptop_mac': '&#xe320;',
                'laptop_windows': '&#xe321;',
                'last_page': '&#xe5dd;',
                'launch': '&#xe895;',
                'layers': '&#xe53b;',
                'layers_clear': '&#xe53c;',
                'leak_add': '&#xe3f8;',
                'leak_remove': '&#xe3f9;',
                'lens': '&#xe3fa;',
                'library_add': '&#xe02e;',
                'library_books': '&#xe02f;',
                'library_music': '&#xe030;',
                'lightbulb_outline': '&#xe90f;',
                'line_style': '&#xe919;',
                'line_weight': '&#xe91a;',
                'linear_scale': '&#xe260;',
                'link': '&#xe157;',
                'linked_camera': '&#xe438;',
                'list': '&#xe896;',
                'live_help': '&#xe0c6;',
                'live_tv': '&#xe639;',
                'local_activity': '&#xe53f;',
                'local_airport': '&#xe53d;',
                'local_atm': '&#xe53e;',
                'local_bar': '&#xe540;',
                'local_cafe': '&#xe541;',
                'local_car_wash': '&#xe542;',
                'local_convenience_store': '&#xe543;',
                'local_dining': '&#xe556;',
                'local_drink': '&#xe544;',
                'local_florist': '&#xe545;',
                'local_gas_station': '&#xe546;',
                'local_grocery_store': '&#xe547;',
                'local_hospital': '&#xe548;',
                'local_hotel': '&#xe549;',
                'local_laundry_service': '&#xe54a;',
                'local_library': '&#xe54b;',
                'local_mall': '&#xe54c;',
                'local_movies': '&#xe54d;',
                'local_offer': '&#xe54e;',
                'local_parking': '&#xe54f;',
                'local_pharmacy': '&#xe550;',
                'local_phone': '&#xe551;',
                'local_pizza': '&#xe552;',
                'local_play': '&#xe553;',
                'local_post_office': '&#xe554;',
                'local_printshop': '&#xe555;',
                'local_see': '&#xe557;',
                'local_shipping': '&#xe558;',
                'local_taxi': '&#xe559;',
                'location_city': '&#xe7f1;',
                'location_disabled': '&#xe1b6;',
                'location_off': '&#xe0c7;',
                'location_on': '&#xe0c8;',
                'location_searching': '&#xe1b7;',
                'lock': '&#xe897;',
                'lock_open': '&#xe898;',
                'lock_outline': '&#xe899;',
                'looks': '&#xe3fc;',
                'looks_3': '&#xe3fb;',
                'looks_4': '&#xe3fd;',
                'looks_5': '&#xe3fe;',
                'looks_6': '&#xe3ff;',
                'looks_one': '&#xe400;',
                'looks_two': '&#xe401;',
                'loop': '&#xe028;',
                'loupe': '&#xe402;',
                'low_priority': '&#xe16d;',
                'loyalty': '&#xe89a;',
                'mail': '&#xe158;',
                'mail_outline': '&#xe0e1;',
                'markunread': '&#xe159;',
                'markunread_mailbox': '&#xe89b;',
                'memory': '&#xe322;',
                'menu': '&#xe5d2;',
                'merge_type': '&#xe252;',
                'message': '&#xe0c9;',
                'mic': '&#xe029;',
                'mic_none': '&#xe02a;',
                'mic_off': '&#xe02b;',
                'mms': '&#xe618;',
                'mode_comment': '&#xe253;',
                'mode_edit': '&#xe254;',
                'monetization_on': '&#xe263;',
                'money_off': '&#xe25c;',
                'monochrome_photos': '&#xe403;',
                'mood': '&#xe7f2;',
                'mood_bad': '&#xe7f3;',
                'more': '&#xe619;',
                'more_horiz': '&#xe5d3;',
                'more_vert': '&#xe5d4;',
                'motorcycle': '&#xe91b;',
                'mouse': '&#xe323;',
                'move_to_inbox': '&#xe168;',
                'movie': '&#xe02c;',
                'movie_creation': '&#xe404;',
                'movie_filter': '&#xe43a;',
                'multiline_chart': '&#xe6df;',
                'music_note': '&#xe405;',
                'music_video': '&#xe063;',
                'my_location': '&#xe55c;',
                'map': '&#xe55b;',
                'note': '&#xe06f;',
                'nature_people': '&#xe407;',
                'navigation': '&#xe55d;',
                'near_me': '&#xe569;',
                'network_cell': '&#xe1b9;',
                'network_check': '&#xe640;',
                'network_locked': '&#xe61a;',
                'network_wifi': '&#xe1ba;',
                'new_releases': '&#xe031;',
                'next_week': '&#xe16a;',
                'nfc': '&#xe1bb;',
                'no_encryption': '&#xe641;',
                'no_sim': '&#xe0cc;',
                'not_interested': '&#xe033;',
                'navigate_next': '&#xe409;',
                'note_add': '&#xe89c;',
                'notifications': '&#xe7f4;',
                'notifications_active': '&#xe7f7;',
                'notifications_none': '&#xe7f5;',
                'notifications_off': '&#xe7f6;',
                'notifications_paused': '&#xe7f8;',
                'nature': '&#xe406;',
                'navigate_before': '&#xe408;',
                'ondemand_video': '&#xe63a;',
                'opacity': '&#xe91c;',
                'open_in_browser': '&#xe89d;',
                'open_in_new': '&#xe89e;',
                'open_with': '&#xe89f;',
                'offline_pin': '&#xe90a;',
                'pageview': '&#xe8a0;',
                'palette': '&#xe40a;',
                'pan_tool': '&#xe925;',
                'panorama': '&#xe40b;',
                'panorama_fish_eye': '&#xe40c;',
                'panorama_horizontal': '&#xe40d;',
                'panorama_vertical': '&#xe40e;',
                'panorama_wide_angle': '&#xe40f;',
                'party_mode': '&#xe7fa;',
                'pause': '&#xe034;',
                'pause_circle_filled': '&#xe035;',
                'pause_circle_outline': '&#xe036;',
                'payment': '&#xe8a1;',
                'people': '&#xe7fb;',
                'people_outline': '&#xe7fc;',
                'perm_camera_mic': '&#xe8a2;',
                'perm_contact_calendar': '&#xe8a3;',
                'perm_data_setting': '&#xe8a4;',
                'perm_device_information': '&#xe8a5;',
                'perm_identity': '&#xe8a6;',
                'perm_media': '&#xe8a7;',
                'perm_phone_msg': '&#xe8a8;',
                'perm_scan_wifi': '&#xe8a9;',
                'person': '&#xe7fd;',
                'person_add': '&#xe7fe;',
                'person_outline': '&#xe7ff;',
                'person_pin': '&#xe55a;',
                'person_pin_circle': '&#xe56a;',
                'personal_video': '&#xe63b;',
                'pets': '&#xe91d;',
                'phone': '&#xe0cd;',
                'phone_android': '&#xe324;',
                'phone_bluetooth_speaker': '&#xe61b;',
                'phone_forwarded': '&#xe61c;',
                'phone_in_talk': '&#xe61d;',
                'phone_iphone': '&#xe325;',
                'phone_locked': '&#xe61e;',
                'phone_missed': '&#xe61f;',
                'phone_paused': '&#xe620;',
                'phonelink': '&#xe326;',
                'phonelink_erase': '&#xe0db;',
                'phonelink_lock': '&#xe0dc;',
                'phonelink_off': '&#xe327;',
                'phonelink_ring': '&#xe0dd;',
                'phonelink_setup': '&#xe0de;',
                'photo': '&#xe410;',
                'photo_album': '&#xe411;',
                'photo_camera': '&#xe412;',
                'photo_filter': '&#xe43b;',
                'photo_library': '&#xe413;',
                'pages': '&#xe7f9;',
                'photo_size_select_large': '&#xe433;',
                'photo_size_select_small': '&#xe434;',
                'picture_as_pdf': '&#xe415;',
                'picture_in_picture': '&#xe8aa;',
                'picture_in_picture_alt': '&#xe911;',
                'pie_chart': '&#xe6c4;',
                'pie_chart_outlined': '&#xe6c5;',
                'pin_drop': '&#xe55e;',
                'place': '&#xe55f;',
                'play_arrow': '&#xe037;',
                'play_circle_filled': '&#xe038;',
                'play_circle_outline': '&#xe039;',
                'play_for_work': '&#xe906;',
                'playlist_add': '&#xe03b;',
                'playlist_add_check': '&#xe065;',
                'playlist_play': '&#xe05f;',
                'plus_one': '&#xe800;',
                'poll': '&#xe801;',
                'polymer': '&#xe8ab;',
                'pool': '&#xeb48;',
                'portable_wifi_off': '&#xe0ce;',
                'portrait': '&#xe416;',
                'power': '&#xe63c;',
                'power_input': '&#xe336;',
                'power_settings_new': '&#xe8ac;',
                'pregnant_woman': '&#xe91e;',
                'present_to_all': '&#xe0df;',
                'print': '&#xe8ad;',
                'priority_high': '&#xe645;',
                'public': '&#xe80b;',
                'publish': '&#xe255;',
                'photo_size_select_actual': '&#xe432;',
                'query_builder': '&#xe8ae;',
                'queue': '&#xe03c;',
                'queue_music': '&#xe03d;',
                'queue_play_next': '&#xe066;',
                'question_answer': '&#xe8af;',
                'replay_5': '&#xe05b;',
                'radio_button_checked': '&#xe837;',
                'rate_review': '&#xe560;',
                'receipt': '&#xe8b0;',
                'recent_actors': '&#xe03f;',
                'record_voice_over': '&#xe91f;',
                'redeem': '&#xe8b1;',
                'redo': '&#xe15a;',
                'refresh': '&#xe5d5;',
                'remove': '&#xe15b;',
                'remove_circle': '&#xe15c;',
                'remove_circle_outline': '&#xe15d;',
                'remove_from_queue': '&#xe067;',
                'remove_red_eye': '&#xe417;',
                'remove_shopping_cart': '&#xe928;',
                'reorder': '&#xe8fe;',
                'repeat': '&#xe040;',
                'repeat_one': '&#xe041;',
                'radio': '&#xe03e;',
                'replay_10': '&#xe059;',
                'replay_30': '&#xe05a;',
                'radio_button_unchecked': '&#xe836;',
                'reply': '&#xe15e;',
                'reply_all': '&#xe15f;',
                'report': '&#xe160;',
                'report_problem': '&#xe8b2;',
                'restaurant': '&#xe56c;',
                'restaurant_menu': '&#xe561;',
                'restore': '&#xe8b3;',
                'restore_page': '&#xe929;',
                'ring_volume': '&#xe0d1;',
                'room': '&#xe8b4;',
                'room_service': '&#xeb49;',
                'rotate_90_degrees_ccw': '&#xe418;',
                'rotate_left': '&#xe419;',
                'rotate_right': '&#xe41a;',
                'rounded_corner': '&#xe920;',
                'router': '&#xe328;',
                'rowing': '&#xe921;',
                'rss_feed': '&#xe0e5;',
                'rv_hookup': '&#xe642;',
                'replay': '&#xe042;',
                'satellite': '&#xe562;',
                'save': '&#xe161;',
                'scanner': '&#xe329;',
                'schedule': '&#xe8b5;',
                'school': '&#xe80c;',
                'screen_lock_landscape': '&#xe1be;',
                'screen_lock_portrait': '&#xe1bf;',
                'screen_lock_rotation': '&#xe1c0;',
                'screen_rotation': '&#xe1c1;',
                'screen_share': '&#xe0e2;',
                'sd_card': '&#xe623;',
                'sd_storage': '&#xe1c2;',
                'search': '&#xe8b6;',
                'security': '&#xe32a;',
                'select_all': '&#xe162;',
                'send': '&#xe163;',
                'sentiment_dissatisfied': '&#xe811;',
                'sentiment_neutral': '&#xe812;',
                'sentiment_satisfied': '&#xe813;',
                'sentiment_very_dissatisfied': '&#xe814;',
                'sentiment_very_satisfied': '&#xe815;',
                'settings': '&#xe8b8;',
                'settings_applications': '&#xe8b9;',
                'settings_backup_restore': '&#xe8ba;',
                'settings_bluetooth': '&#xe8bb;',
                'settings_brightness': '&#xe8bd;',
                'settings_cell': '&#xe8bc;',
                'settings_ethernet': '&#xe8be;',
                'settings_input_antenna': '&#xe8bf;',
                'settings_input_component': '&#xe8c0;',
                'settings_input_composite': '&#xe8c1;',
                'settings_input_hdmi': '&#xe8c2;',
                'settings_input_svideo': '&#xe8c3;',
                'settings_overscan': '&#xe8c4;',
                'settings_phone': '&#xe8c5;',
                'settings_power': '&#xe8c6;',
                'settings_remote': '&#xe8c7;',
                'settings_system_daydream': '&#xe1c3;',
                'settings_voice': '&#xe8c8;',
                'share': '&#xe80d;',
                'shop': '&#xe8c9;',
                'shop_two': '&#xe8ca;',
                'shopping_basket': '&#xe8cb;',
                'shopping_cart': '&#xe8cc;',
                'short_text': '&#xe261;',
                'show_chart': '&#xe6e1;',
                'shuffle': '&#xe043;',
                'signal_cellular_4_bar': '&#xe1c8;',
                'signal_cellular_connected_no_internet_4_bar': '&#xe1cd;',
                'signal_cellular_no_sim': '&#xe1ce;',
                'signal_cellular_null': '&#xe1cf;',
                'signal_cellular_off': '&#xe1d0;',
                'signal_wifi_4_bar': '&#xe1d8;',
                'signal_wifi_4_bar_lock': '&#xe1d9;',
                'signal_wifi_off': '&#xe1da;',
                'sim_card': '&#xe32b;',
                'sim_card_alert': '&#xe624;',
                'skip_next': '&#xe044;',
                'skip_previous': '&#xe045;',
                'slideshow': '&#xe41b;',
                'slow_motion_video': '&#xe068;',
                'smartphone': '&#xe32c;',
                'smoke_free': '&#xeb4a;',
                'smoking_rooms': '&#xeb4b;',
                'sms': '&#xe625;',
                'sms_failed': '&#xe626;',
                'snooze': '&#xe046;',
                'sort': '&#xe164;',
                'sort_by_alpha': '&#xe053;',
                'spa': '&#xeb4c;',
                'space_bar': '&#xe256;',
                'speaker': '&#xe32d;',
                'speaker_group': '&#xe32e;',
                'speaker_notes': '&#xe8cd;',
                'speaker_notes_off': '&#xe92a;',
                'speaker_phone': '&#xe0d2;',
                'spellcheck': '&#xe8ce;',
                'star': '&#xe838;',
                'star_border': '&#xe83a;',
                'star_half': '&#xe839;',
                'stars': '&#xe8d0;',
                'stay_current_landscape': '&#xe0d3;',
                'stay_current_portrait': '&#xe0d4;',
                'stay_primary_landscape': '&#xe0d5;',
                'stay_primary_portrait': '&#xe0d6;',
                'stop': '&#xe047;',
                'stop_screen_share': '&#xe0e3;',
                'storage': '&#xe1db;',
                'store': '&#xe8d1;',
                'store_mall_directory': '&#xe563;',
                'straighten': '&#xe41c;',
                'streetview': '&#xe56e;',
                'strikethrough_s': '&#xe257;',
                'style': '&#xe41d;',
                'subdirectory_arrow_left': '&#xe5d9;',
                'subdirectory_arrow_right': '&#xe5da;',
                'subject': '&#xe8d2;',
                'subscriptions': '&#xe064;',
                'subtitles': '&#xe048;',
                'subway': '&#xe56f;',
                'supervisor_account': '&#xe8d3;',
                'surround_sound': '&#xe049;',
                'swap_calls': '&#xe0d7;',
                'swap_horiz': '&#xe8d4;',
                'swap_vert': '&#xe8d5;',
                'swap_vertical_circle': '&#xe8d6;',
                'switch_camera': '&#xe41e;',
                'switch_video': '&#xe41f;',
                'sync': '&#xe627;',
                'sync_disabled': '&#xe628;',
                'sync_problem': '&#xe629;',
                'system_update': '&#xe62a;',
                'system_update_alt': '&#xe8d7;',
                'toll': '&#xe8e0;',
                'tab': '&#xe8d8;',
                'tablet_android': '&#xe330;',
                'tablet_mac': '&#xe331;',
                'tag_faces': '&#xe420;',
                'tap_and_play': '&#xe62b;',
                'terrain': '&#xe564;',
                'text_fields': '&#xe262;',
                'text_format': '&#xe165;',
                'textsms': '&#xe0d8;',
                'texture': '&#xe421;',
                'theaters': '&#xe8da;',
                'thumb_down': '&#xe8db;',
                'thumb_up': '&#xe8dc;',
                'thumbs_up_down': '&#xe8dd;',
                'time_to_leave': '&#xe62c;',
                'timelapse': '&#xe422;',
                'timeline': '&#xe922;',
                'timer': '&#xe425;',
                'timer_10': '&#xe423;',
                'timer_3': '&#xe424;',
                'timer_off': '&#xe426;',
                'title': '&#xe264;',
                'toc': '&#xe8de;',
                'today': '&#xe8df;',
                'tablet': '&#xe32f;',
                'tonality': '&#xe427;',
                'touch_app': '&#xe913;',
                'toys': '&#xe332;',
                'track_changes': '&#xe8e1;',
                'traffic': '&#xe565;',
                'train': '&#xe570;',
                'tram': '&#xe571;',
                'transfer_within_a_station': '&#xe572;',
                'transform': '&#xe428;',
                'translate': '&#xe8e2;',
                'trending_down': '&#xe8e3;',
                'trending_flat': '&#xe8e4;',
                'trending_up': '&#xe8e5;',
                'tune': '&#xe429;',
                'turned_in': '&#xe8e6;',
                'turned_in_not': '&#xe8e7;',
                'tv': '&#xe333;',
                'tab_unselected': '&#xe8d9;',
                'unarchive': '&#xe169;',
                'undo': '&#xe166;',
                'unfold_less': '&#xe5d6;',
                'unfold_more': '&#xe5d7;',
                'update': '&#xe923;',
                'usb': '&#xe1e0;',
                'verified_user': '&#xe8e8;',
                'vertical_align_bottom': '&#xe258;',
                'vertical_align_center': '&#xe259;',
                'vertical_align_top': '&#xe25a;',
                'vibration': '&#xe62d;',
                'video_call': '&#xe070;',
                'video_label': '&#xe071;',
                'video_library': '&#xe04a;',
                'videocam': '&#xe04b;',
                'videocam_off': '&#xe04c;',
                'videogame_asset': '&#xe338;',
                'view_agenda': '&#xe8e9;',
                'view_array': '&#xe8ea;',
                'view_carousel': '&#xe8eb;',
                'view_column': '&#xe8ec;',
                'view_comfy': '&#xe42a;',
                'view_compact': '&#xe42b;',
                'view_day': '&#xe8ed;',
                'view_headline': '&#xe8ee;',
                'view_list': '&#xe8ef;',
                'view_module': '&#xe8f0;',
                'view_quilt': '&#xe8f1;',
                'view_stream': '&#xe8f2;',
                'view_week': '&#xe8f3;',
                'vignette': '&#xe435;',
                'visibility': '&#xe8f4;',
                'visibility_off': '&#xe8f5;',
                'voice_chat': '&#xe62e;',
                'voicemail': '&#xe0d9;',
                'volume_down': '&#xe04d;',
                'volume_mute': '&#xe04e;',
                'volume_off': '&#xe04f;',
                'volume_up': '&#xe050;',
                'vpn_key': '&#xe0da;',
                'vpn_lock': '&#xe62f;',
                'weekend': '&#xe16b;',
                'wallpaper': '&#xe1bc;',
                'watch': '&#xe334;',
                'watch_later': '&#xe924;',
                'wb_auto': '&#xe42c;',
                'wb_cloudy': '&#xe42d;',
                'wb_incandescent': '&#xe42e;',
                'wb_iridescent': '&#xe436;',
                'wb_sunny': '&#xe430;',
                'wc': '&#xe63d;',
                'web': '&#xe051;',
                'web_asset': '&#xe069;',
                'warning': '&#xe002;',
                'whatshot': '&#xe80e;',
                'widgets': '&#xe1bd;',
                'wifi': '&#xe63e;',
                'wifi_lock': '&#xe1e1;',
                'wifi_tethering': '&#xe1e2;',
                'work': '&#xe8f9;',
                'wrap_text': '&#xe25b;',
                'youtube_searched_for': '&#xe8fa;',
                'zoom_in': '&#xe8ff;',
                'zoom_out': '&#xe900;',
                'zoom_out_map': '&#xe56b;'
            };
        },
        function (module, exports) {
            (function (factory) {
                if (typeof define === 'function' && define.amd) {
                    define(['jquery'], factory);
                } else if (typeof exports === 'object') {
                    factory(_require(3));
                } else {
                    factory(jQuery);
                }
            }(function ($, undefined) {
                function UTCDate() {
                    return new Date(Date.UTC.apply(Date, arguments));
                }
                function UTCToday() {
                    var today = new Date();
                    return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
                }
                function isUTCEquals(date1, date2) {
                    return date1.getUTCFullYear() === date2.getUTCFullYear() && date1.getUTCMonth() === date2.getUTCMonth() && date1.getUTCDate() === date2.getUTCDate();
                }
                function alias(method) {
                    return function () {
                        return this[method].apply(this, arguments);
                    };
                }
                function isValidDate(d) {
                    return d && !isNaN(d.getTime());
                }
                var DateArray = function () {
                        var extras = {
                                get: function (i) {
                                    return this.slice(i)[0];
                                },
                                contains: function (d) {
                                    var val = d && d.valueOf();
                                    for (var i = 0, l = this.length; i < l; i++)
                                        if (this[i].valueOf() === val)
                                            return i;
                                    return -1;
                                },
                                remove: function (i) {
                                    this.splice(i, 1);
                                },
                                replace: function (new_array) {
                                    if (!new_array)
                                        return;
                                    if (!$.isArray(new_array))
                                        new_array = [new_array];
                                    this.clear();
                                    this.push.apply(this, new_array);
                                },
                                clear: function () {
                                    this.length = 0;
                                },
                                copy: function () {
                                    var a = new DateArray();
                                    a.replace(this);
                                    return a;
                                }
                            };
                        return function () {
                            var a = [];
                            a.push.apply(a, arguments);
                            $.extend(a, extras);
                            return a;
                        };
                    }();
                var Datepicker = function (element, options) {
                    $(element).data('datepicker', this);
                    this._process_options(options);
                    this.dates = new DateArray();
                    this.viewDate = this.o.defaultViewDate;
                    this.focusDate = null;
                    this.element = $(element);
                    this.isInput = this.element.is('input');
                    this.inputField = this.isInput ? this.element : this.element.find('input');
                    this.component = this.element.hasClass('date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
                    this.hasInput = this.component && this.inputField.length;
                    if (this.component && this.component.length === 0)
                        this.component = false;
                    this.isInline = !this.component && this.element.is('div');
                    this.picker = $(DPGlobal.template);
                    this.picker.addClass('biz-calendar-' + (options.theme || bizui.theme));
                    if (this._check_template(this.o.templates.leftArrow)) {
                        this.picker.find('.prev').html(this.o.templates.leftArrow);
                    }
                    if (this._check_template(this.o.templates.rightArrow)) {
                        this.picker.find('.next').html(this.o.templates.rightArrow);
                    }
                    this._buildEvents();
                    this._attachEvents();
                    if (this.isInline) {
                        this.picker.addClass('datepicker-inline').appendTo(this.element);
                    } else {
                        this.picker.addClass('datepicker-dropdown dropdown-menu');
                    }
                    if (this.o.rtl) {
                        this.picker.addClass('datepicker-rtl');
                    }
                    this.viewMode = this.o.startView;
                    if (this.o.calendarWeeks)
                        this.picker.find('thead .datepicker-title, tfoot .today, tfoot .clear').attr('colspan', function (i, val) {
                            return parseInt(val) + 1;
                        });
                    this._allow_update = false;
                    this.setStartDate(this._o.startDate);
                    this.setEndDate(this._o.endDate);
                    this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);
                    this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted);
                    this.setDatesDisabled(this.o.datesDisabled);
                    this.fillDow();
                    this.fillMonths();
                    this._allow_update = true;
                    this.update();
                    this.showMode();
                    if (this.isInline) {
                        this.show();
                    }
                };
                Datepicker.prototype = {
                    constructor: Datepicker,
                    _resolveViewName: function (view, default_value) {
                        if (view === 0 || view === 'days' || view === 'month') {
                            return 0;
                        }
                        if (view === 1 || view === 'months' || view === 'year') {
                            return 1;
                        }
                        if (view === 2 || view === 'years' || view === 'decade') {
                            return 2;
                        }
                        if (view === 3 || view === 'decades' || view === 'century') {
                            return 3;
                        }
                        if (view === 4 || view === 'centuries' || view === 'millennium') {
                            return 4;
                        }
                        return default_value === undefined ? false : default_value;
                    },
                    _check_template: function (tmp) {
                        try {
                            if (tmp === undefined || tmp === '') {
                                return false;
                            }
                            if ((tmp.match(/[<>]/g) || []).length <= 0) {
                                return true;
                            }
                            var jDom = $(tmp);
                            return jDom.length > 0;
                        } catch (ex) {
                            return false;
                        }
                    },
                    _process_options: function (opts) {
                        this._o = $.extend({}, this._o, opts);
                        var o = this.o = $.extend({}, this._o);
                        var lang = o.language;
                        if (!dates[lang]) {
                            lang = lang.split('-')[0];
                            if (!dates[lang])
                                lang = defaults.language;
                        }
                        o.language = lang;
                        o.startView = this._resolveViewName(o.startView, 0);
                        o.minViewMode = this._resolveViewName(o.minViewMode, 0);
                        o.maxViewMode = this._resolveViewName(o.maxViewMode, 4);
                        o.startView = Math.min(o.startView, o.maxViewMode);
                        o.startView = Math.max(o.startView, o.minViewMode);
                        if (o.multidate !== true) {
                            o.multidate = Number(o.multidate) || false;
                            if (o.multidate !== false)
                                o.multidate = Math.max(0, o.multidate);
                        }
                        o.multidateSeparator = String(o.multidateSeparator);
                        o.weekStart %= 7;
                        o.weekEnd = (o.weekStart + 6) % 7;
                        var format = DPGlobal.parseFormat(o.format);
                        if (o.startDate !== -Infinity) {
                            if (!!o.startDate) {
                                if (o.startDate instanceof Date)
                                    o.startDate = this._local_to_utc(this._zero_time(o.startDate));
                                else
                                    o.startDate = DPGlobal.parseDate(o.startDate, format, o.language, o.assumeNearbyYear);
                            } else {
                                o.startDate = -Infinity;
                            }
                        }
                        if (o.endDate !== Infinity) {
                            if (!!o.endDate) {
                                if (o.endDate instanceof Date)
                                    o.endDate = this._local_to_utc(this._zero_time(o.endDate));
                                else
                                    o.endDate = DPGlobal.parseDate(o.endDate, format, o.language, o.assumeNearbyYear);
                            } else {
                                o.endDate = Infinity;
                            }
                        }
                        o.daysOfWeekDisabled = o.daysOfWeekDisabled || [];
                        if (!$.isArray(o.daysOfWeekDisabled))
                            o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
                        o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function (d) {
                            return parseInt(d, 10);
                        });
                        o.daysOfWeekHighlighted = o.daysOfWeekHighlighted || [];
                        if (!$.isArray(o.daysOfWeekHighlighted))
                            o.daysOfWeekHighlighted = o.daysOfWeekHighlighted.split(/[,\s]*/);
                        o.daysOfWeekHighlighted = $.map(o.daysOfWeekHighlighted, function (d) {
                            return parseInt(d, 10);
                        });
                        o.datesDisabled = o.datesDisabled || [];
                        if (!$.isArray(o.datesDisabled)) {
                            o.datesDisabled = [o.datesDisabled];
                        }
                        o.datesDisabled = $.map(o.datesDisabled, function (d) {
                            return DPGlobal.parseDate(d, format, o.language, o.assumeNearbyYear);
                        });
                        var plc = String(o.orientation).toLowerCase().split(/\s+/g), _plc = o.orientation.toLowerCase();
                        plc = $.grep(plc, function (word) {
                            return /^auto|left|right|top|bottom$/.test(word);
                        });
                        o.orientation = {
                            x: 'auto',
                            y: 'auto'
                        };
                        if (!_plc || _plc === 'auto');
                        else if (plc.length === 1) {
                            switch (plc[0]) {
                            case 'top':
                            case 'bottom':
                                o.orientation.y = plc[0];
                                break;
                            case 'left':
                            case 'right':
                                o.orientation.x = plc[0];
                                break;
                            }
                        } else {
                            _plc = $.grep(plc, function (word) {
                                return /^left|right$/.test(word);
                            });
                            o.orientation.x = _plc[0] || 'auto';
                            _plc = $.grep(plc, function (word) {
                                return /^top|bottom$/.test(word);
                            });
                            o.orientation.y = _plc[0] || 'auto';
                        }
                        if (o.defaultViewDate) {
                            var year = o.defaultViewDate.year || new Date().getFullYear();
                            var month = o.defaultViewDate.month || 0;
                            var day = o.defaultViewDate.day || 1;
                            o.defaultViewDate = UTCDate(year, month, day);
                        } else {
                            o.defaultViewDate = UTCToday();
                        }
                    },
                    _events: [],
                    _secondaryEvents: [],
                    _applyEvents: function (evs) {
                        for (var i = 0, el, ch, ev; i < evs.length; i++) {
                            el = evs[i][0];
                            if (evs[i].length === 2) {
                                ch = undefined;
                                ev = evs[i][1];
                            } else if (evs[i].length === 3) {
                                ch = evs[i][1];
                                ev = evs[i][2];
                            }
                            el.on(ev, ch);
                        }
                    },
                    _unapplyEvents: function (evs) {
                        for (var i = 0, el, ev, ch; i < evs.length; i++) {
                            el = evs[i][0];
                            if (evs[i].length === 2) {
                                ch = undefined;
                                ev = evs[i][1];
                            } else if (evs[i].length === 3) {
                                ch = evs[i][1];
                                ev = evs[i][2];
                            }
                            el.off(ev, ch);
                        }
                    },
                    _buildEvents: function () {
                        var events = {
                                keyup: $.proxy(function (e) {
                                    if ($.inArray(e.keyCode, [
                                            27,
                                            37,
                                            39,
                                            38,
                                            40,
                                            32,
                                            13,
                                            9
                                        ]) === -1)
                                        this.update();
                                }, this),
                                keydown: $.proxy(this.keydown, this),
                                paste: $.proxy(this.paste, this)
                            };
                        if (this.o.showOnFocus === true) {
                            events.focus = $.proxy(this.show, this);
                        }
                        if (this.isInput) {
                            this._events = [[
                                    this.element,
                                    events
                                ]];
                        } else if (this.component && this.hasInput) {
                            this._events = [
                                [
                                    this.inputField,
                                    events
                                ],
                                [
                                    this.component,
                                    { click: $.proxy(this.show, this) }
                                ]
                            ];
                        } else {
                            this._events = [[
                                    this.element,
                                    {
                                        click: $.proxy(this.show, this),
                                        keydown: $.proxy(this.keydown, this)
                                    }
                                ]];
                        }
                        this._events.push([
                            this.element,
                            '*',
                            {
                                blur: $.proxy(function (e) {
                                    this._focused_from = e.target;
                                }, this)
                            }
                        ], [
                            this.element,
                            {
                                blur: $.proxy(function (e) {
                                    this._focused_from = e.target;
                                }, this)
                            }
                        ]);
                        if (this.o.immediateUpdates) {
                            this._events.push([
                                this.element,
                                {
                                    'changeYear changeMonth': $.proxy(function (e) {
                                        this.update(e.date);
                                    }, this)
                                }
                            ]);
                        }
                        this._secondaryEvents = [
                            [
                                this.picker,
                                { click: $.proxy(this.click, this) }
                            ],
                            [
                                $(window),
                                { resize: $.proxy(this.place, this) }
                            ],
                            [
                                $(document),
                                {
                                    mousedown: $.proxy(function (e) {
                                        if (!(this.element.is(e.target) || this.element.find(e.target).length || this.picker.is(e.target) || this.picker.find(e.target).length || this.isInline)) {
                                            this.hide();
                                        }
                                    }, this)
                                }
                            ]
                        ];
                    },
                    _attachEvents: function () {
                        this._detachEvents();
                        this._applyEvents(this._events);
                    },
                    _detachEvents: function () {
                        this._unapplyEvents(this._events);
                    },
                    _attachSecondaryEvents: function () {
                        this._detachSecondaryEvents();
                        this._applyEvents(this._secondaryEvents);
                    },
                    _detachSecondaryEvents: function () {
                        this._unapplyEvents(this._secondaryEvents);
                    },
                    _trigger: function (event, altdate) {
                        var date = altdate || this.dates.get(-1), local_date = this._utc_to_local(date);
                        this.element.trigger({
                            type: event,
                            date: local_date,
                            dates: $.map(this.dates, this._utc_to_local),
                            format: $.proxy(function (ix, format) {
                                if (arguments.length === 0) {
                                    ix = this.dates.length - 1;
                                    format = this.o.format;
                                } else if (typeof ix === 'string') {
                                    format = ix;
                                    ix = this.dates.length - 1;
                                }
                                format = format || this.o.format;
                                var date = this.dates.get(ix);
                                return DPGlobal.formatDate(date, format, this.o.language);
                            }, this)
                        });
                    },
                    show: function () {
                        if (this.inputField.prop('disabled') || this.inputField.prop('readonly') && this.o.enableOnReadonly === false)
                            return;
                        if (!this.isInline)
                            this.picker.appendTo(this.o.container);
                        this.place();
                        this.picker.show();
                        this._attachSecondaryEvents();
                        this._trigger('show');
                        if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && this.o.disableTouchKeyboard) {
                            $(this.element).blur();
                        }
                        return this;
                    },
                    hide: function () {
                        if (this.isInline || !this.picker.is(':visible'))
                            return this;
                        this.focusDate = null;
                        this.picker.hide().detach();
                        this._detachSecondaryEvents();
                        this.viewMode = this.o.startView;
                        this.showMode();
                        if (this.o.forceParse && this.inputField.val())
                            this.setValue();
                        this._trigger('hide');
                        return this;
                    },
                    destroy: function () {
                        this.hide();
                        this._detachEvents();
                        this._detachSecondaryEvents();
                        this.picker.remove();
                        delete this.element.data().datepicker;
                        if (!this.isInput) {
                            delete this.element.data().date;
                        }
                        return this;
                    },
                    paste: function (evt) {
                        var dateString;
                        if (evt.originalEvent.clipboardData && evt.originalEvent.clipboardData.types && $.inArray('text/plain', evt.originalEvent.clipboardData.types) !== -1) {
                            dateString = evt.originalEvent.clipboardData.getData('text/plain');
                        } else if (window.clipboardData) {
                            dateString = window.clipboardData.getData('Text');
                        } else {
                            return;
                        }
                        this.setDate(dateString);
                        this.update();
                        evt.preventDefault();
                    },
                    _utc_to_local: function (utc) {
                        return utc && new Date(utc.getTime() + utc.getTimezoneOffset() * 60000);
                    },
                    _local_to_utc: function (local) {
                        return local && new Date(local.getTime() - local.getTimezoneOffset() * 60000);
                    },
                    _zero_time: function (local) {
                        return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
                    },
                    _zero_utc_time: function (utc) {
                        return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
                    },
                    getDates: function () {
                        return $.map(this.dates, this._utc_to_local);
                    },
                    getUTCDates: function () {
                        return $.map(this.dates, function (d) {
                            return new Date(d);
                        });
                    },
                    getDate: function () {
                        return this._utc_to_local(this.getUTCDate());
                    },
                    getUTCDate: function () {
                        var selected_date = this.dates.get(-1);
                        if (typeof selected_date !== 'undefined') {
                            return new Date(selected_date);
                        } else {
                            return null;
                        }
                    },
                    clearDates: function () {
                        if (this.inputField) {
                            this.inputField.val('');
                        }
                        this.update();
                        this._trigger('changeDate');
                        if (this.o.autoclose) {
                            this.hide();
                        }
                    },
                    setDates: function () {
                        var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
                        this.update.apply(this, args);
                        this._trigger('changeDate');
                        this.setValue();
                        return this;
                    },
                    setUTCDates: function () {
                        var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
                        this.update.apply(this, $.map(args, this._utc_to_local));
                        this._trigger('changeDate');
                        this.setValue();
                        return this;
                    },
                    setDate: alias('setDates'),
                    setUTCDate: alias('setUTCDates'),
                    remove: alias('destroy'),
                    setValue: function () {
                        var formatted = this.getFormattedDate();
                        this.inputField.val(formatted);
                        return this;
                    },
                    getFormattedDate: function (format) {
                        if (format === undefined)
                            format = this.o.format;
                        var lang = this.o.language;
                        return $.map(this.dates, function (d) {
                            return DPGlobal.formatDate(d, format, lang);
                        }).join(this.o.multidateSeparator);
                    },
                    getStartDate: function () {
                        return this.o.startDate;
                    },
                    setStartDate: function (startDate) {
                        this._process_options({ startDate: startDate });
                        this.update();
                        this.updateNavArrows();
                        return this;
                    },
                    getEndDate: function () {
                        return this.o.endDate;
                    },
                    setEndDate: function (endDate) {
                        this._process_options({ endDate: endDate });
                        this.update();
                        this.updateNavArrows();
                        return this;
                    },
                    setDaysOfWeekDisabled: function (daysOfWeekDisabled) {
                        this._process_options({ daysOfWeekDisabled: daysOfWeekDisabled });
                        this.update();
                        this.updateNavArrows();
                        return this;
                    },
                    setDaysOfWeekHighlighted: function (daysOfWeekHighlighted) {
                        this._process_options({ daysOfWeekHighlighted: daysOfWeekHighlighted });
                        this.update();
                        return this;
                    },
                    setDatesDisabled: function (datesDisabled) {
                        this._process_options({ datesDisabled: datesDisabled });
                        this.update();
                        this.updateNavArrows();
                    },
                    place: function () {
                        if (this.isInline)
                            return this;
                        var calendarWidth = this.picker.outerWidth(), calendarHeight = this.picker.outerHeight(), visualPadding = 10, container = $(this.o.container), windowWidth = container.width(), scrollTop = this.o.container === 'body' ? $(document).scrollTop() : container.scrollTop(), appendOffset = container.offset();
                        var parentsZindex = [];
                        this.element.parents().each(function () {
                            var itemZIndex = $(this).css('z-index');
                            if (itemZIndex !== 'auto' && itemZIndex !== 0)
                                parentsZindex.push(parseInt(itemZIndex));
                        });
                        var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset;
                        var offset = this.component ? this.component.parent().offset() : this.element.offset();
                        var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
                        var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
                        var left = offset.left - appendOffset.left, top = offset.top - appendOffset.top;
                        if (this.o.container !== 'body') {
                            top += scrollTop;
                        }
                        this.picker.removeClass('datepicker-orient-top datepicker-orient-bottom ' + 'datepicker-orient-right datepicker-orient-left');
                        if (this.o.orientation.x !== 'auto') {
                            this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
                            if (this.o.orientation.x === 'right')
                                left -= calendarWidth - width;
                        } else {
                            if (offset.left < 0) {
                                this.picker.addClass('datepicker-orient-left');
                                left -= offset.left - visualPadding;
                            } else if (left + calendarWidth > windowWidth) {
                                this.picker.addClass('datepicker-orient-right');
                                left += width - calendarWidth;
                            } else {
                                this.picker.addClass('datepicker-orient-left');
                            }
                        }
                        var yorient = this.o.orientation.y, top_overflow;
                        if (yorient === 'auto') {
                            top_overflow = -scrollTop + top - calendarHeight;
                            yorient = top_overflow < 0 ? 'bottom' : 'top';
                        }
                        this.picker.addClass('datepicker-orient-' + yorient);
                        if (yorient === 'top')
                            top -= calendarHeight + parseInt(this.picker.css('padding-top'));
                        else
                            top += height;
                        if (this.o.rtl) {
                            var right = windowWidth - (left + width);
                            this.picker.css({
                                top: top,
                                right: right,
                                zIndex: zIndex
                            });
                        } else {
                            this.picker.css({
                                top: top,
                                left: left,
                                zIndex: zIndex
                            });
                        }
                        return this;
                    },
                    _allow_update: true,
                    update: function () {
                        if (!this._allow_update)
                            return this;
                        var oldDates = this.dates.copy(), dates = [], fromArgs = false;
                        if (arguments.length) {
                            $.each(arguments, $.proxy(function (i, date) {
                                if (date instanceof Date)
                                    date = this._local_to_utc(date);
                                dates.push(date);
                            }, this));
                            fromArgs = true;
                        } else {
                            dates = this.isInput ? this.element.val() : this.element.data('date') || this.inputField.val();
                            if (dates && this.o.multidate)
                                dates = dates.split(this.o.multidateSeparator);
                            else
                                dates = [dates];
                            delete this.element.data().date;
                        }
                        dates = $.map(dates, $.proxy(function (date) {
                            return DPGlobal.parseDate(date, this.o.format, this.o.language, this.o.assumeNearbyYear);
                        }, this));
                        dates = $.grep(dates, $.proxy(function (date) {
                            return !this.dateWithinRange(date) || !date;
                        }, this), true);
                        this.dates.replace(dates);
                        if (this.dates.length)
                            this.viewDate = new Date(this.dates.get(-1));
                        else if (this.viewDate < this.o.startDate)
                            this.viewDate = new Date(this.o.startDate);
                        else if (this.viewDate > this.o.endDate)
                            this.viewDate = new Date(this.o.endDate);
                        else
                            this.viewDate = this.o.defaultViewDate;
                        if (fromArgs) {
                            this.setValue();
                        } else if (dates.length) {
                            if (String(oldDates) !== String(this.dates))
                                this._trigger('changeDate');
                        }
                        if (!this.dates.length && oldDates.length)
                            this._trigger('clearDate');
                        this.fill();
                        this.element.change();
                        return this;
                    },
                    fillDow: function () {
                        var dowCnt = this.o.weekStart, html = '<tr>';
                        if (this.o.calendarWeeks) {
                            this.picker.find('.datepicker-days .datepicker-switch').attr('colspan', function (i, val) {
                                return parseInt(val) + 1;
                            });
                            html += '<th class="cw">&#160;</th>';
                        }
                        while (dowCnt < this.o.weekStart + 7) {
                            html += '<th class="dow';
                            if ($.inArray(dowCnt, this.o.daysOfWeekDisabled) > -1)
                                html += ' disabled';
                            html += '">' + dates[this.o.language].daysMin[dowCnt++ % 7] + '</th>';
                        }
                        html += '</tr>';
                        this.picker.find('.datepicker-days thead').append(html);
                    },
                    fillMonths: function () {
                        var localDate = this._utc_to_local(this.viewDate);
                        var html = '', i = 0;
                        while (i < 12) {
                            var focused = localDate && localDate.getMonth() === i ? ' focused' : '';
                            html += '<span class="month' + focused + '">' + dates[this.o.language].monthsShort[i++] + '</span>';
                        }
                        this.picker.find('.datepicker-months td').html(html);
                    },
                    setRange: function (range) {
                        if (!range || !range.length)
                            delete this.range;
                        else
                            this.range = $.map(range, function (d) {
                                return d.valueOf();
                            });
                        this.fill();
                    },
                    getClassNames: function (date) {
                        var cls = [], year = this.viewDate.getUTCFullYear(), month = this.viewDate.getUTCMonth(), today = new Date();
                        if (date.getUTCFullYear() < year || date.getUTCFullYear() === year && date.getUTCMonth() < month) {
                            cls.push('old');
                        } else if (date.getUTCFullYear() > year || date.getUTCFullYear() === year && date.getUTCMonth() > month) {
                            cls.push('new');
                        }
                        if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
                            cls.push('focused');
                        if (this.o.todayHighlight && date.getUTCFullYear() === today.getFullYear() && date.getUTCMonth() === today.getMonth() && date.getUTCDate() === today.getDate()) {
                            cls.push('today');
                        }
                        if (this.dates.contains(date) !== -1)
                            cls.push('active');
                        if (!this.dateWithinRange(date)) {
                            cls.push('disabled');
                        }
                        if (this.dateIsDisabled(date)) {
                            cls.push('disabled', 'disabled-date');
                        }
                        if ($.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1) {
                            cls.push('highlighted');
                        }
                        if (this.range) {
                            if (date > this.range[0] && date < this.range[this.range.length - 1]) {
                                cls.push('range');
                            }
                            if ($.inArray(date.valueOf(), this.range) !== -1) {
                                cls.push('selected');
                            }
                            if (date.valueOf() === this.range[0]) {
                                cls.push('range-start');
                            }
                            if (date.valueOf() === this.range[this.range.length - 1]) {
                                cls.push('range-end');
                            }
                        }
                        return cls;
                    },
                    _fill_yearsView: function (selector, cssClass, factor, step, currentYear, startYear, endYear, callback) {
                        var html, view, year, steps, startStep, endStep, thisYear, i, classes, tooltip, before;
                        html = '';
                        view = this.picker.find(selector);
                        year = parseInt(currentYear / factor, 10) * factor;
                        startStep = parseInt(startYear / step, 10) * step;
                        endStep = parseInt(endYear / step, 10) * step;
                        steps = $.map(this.dates, function (d) {
                            return parseInt(d.getUTCFullYear() / step, 10) * step;
                        });
                        view.find('.datepicker-switch').text(year + '-' + (year + step * 9));
                        thisYear = year - step;
                        for (i = -1; i < 11; i += 1) {
                            classes = [cssClass];
                            tooltip = null;
                            if (i === -1) {
                                classes.push('old');
                            } else if (i === 10) {
                                classes.push('new');
                            }
                            if ($.inArray(thisYear, steps) !== -1) {
                                classes.push('active');
                            }
                            if (thisYear < startStep || thisYear > endStep) {
                                classes.push('disabled');
                            }
                            if (thisYear === this.viewDate.getFullYear()) {
                                classes.push('focused');
                            }
                            if (callback !== $.noop) {
                                before = callback(new Date(thisYear, 0, 1));
                                if (before === undefined) {
                                    before = {};
                                } else if (typeof before === 'boolean') {
                                    before = { enabled: before };
                                } else if (typeof before === 'string') {
                                    before = { classes: before };
                                }
                                if (before.enabled === false) {
                                    classes.push('disabled');
                                }
                                if (before.classes) {
                                    classes = classes.concat(before.classes.split(/\s+/));
                                }
                                if (before.tooltip) {
                                    tooltip = before.tooltip;
                                }
                            }
                            html += '<span class="' + classes.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + thisYear + '</span>';
                            thisYear += step;
                        }
                        view.find('td').html(html);
                    },
                    fill: function () {
                        var d = new Date(this.viewDate), year = d.getUTCFullYear(), month = d.getUTCMonth(), startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity, startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity, endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity, endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity, todaytxt = dates[this.o.language].today || dates['en'].today || '', cleartxt = dates[this.o.language].clear || dates['en'].clear || '', titleFormat = dates[this.o.language].titleFormat || dates['en'].titleFormat, tooltip, before;
                        if (isNaN(year) || isNaN(month))
                            return;
                        this.picker.find('.datepicker-days .datepicker-switch').text(DPGlobal.formatDate(d, titleFormat, this.o.language));
                        this.picker.find('tfoot .today').text(todaytxt).toggle(this.o.todayBtn !== false);
                        this.picker.find('tfoot .clear').text(cleartxt).toggle(this.o.clearBtn !== false);
                        this.picker.find('thead .datepicker-title').text(this.o.title).toggle(this.o.title !== '');
                        this.updateNavArrows();
                        this.fillMonths();
                        var prevMonth = UTCDate(year, month - 1, 28), day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
                        prevMonth.setUTCDate(day);
                        prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7) % 7);
                        var nextMonth = new Date(prevMonth);
                        if (prevMonth.getUTCFullYear() < 100) {
                            nextMonth.setUTCFullYear(prevMonth.getUTCFullYear());
                        }
                        nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
                        nextMonth = nextMonth.valueOf();
                        var html = [];
                        var clsName;
                        while (prevMonth.valueOf() < nextMonth) {
                            if (prevMonth.getUTCDay() === this.o.weekStart) {
                                html.push('<tr>');
                                if (this.o.calendarWeeks) {
                                    var ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 86400000), th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 86400000), yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay()) % 7 * 86400000), calWeek = (th - yth) / 86400000 / 7 + 1;
                                    html.push('<td class="cw">' + calWeek + '</td>');
                                }
                            }
                            clsName = this.getClassNames(prevMonth);
                            clsName.push('day');
                            if (this.o.beforeShowDay !== $.noop) {
                                before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
                                if (before === undefined)
                                    before = {};
                                else if (typeof before === 'boolean')
                                    before = { enabled: before };
                                else if (typeof before === 'string')
                                    before = { classes: before };
                                if (before.enabled === false)
                                    clsName.push('disabled');
                                if (before.classes)
                                    clsName = clsName.concat(before.classes.split(/\s+/));
                                if (before.tooltip)
                                    tooltip = before.tooltip;
                            }
                            if ($.isFunction($.uniqueSort)) {
                                clsName = $.uniqueSort(clsName);
                            } else {
                                clsName = $.unique(clsName);
                            }
                            html.push('<td class="' + clsName.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + prevMonth.getUTCDate() + '</td>');
                            tooltip = null;
                            if (prevMonth.getUTCDay() === this.o.weekEnd) {
                                html.push('</tr>');
                            }
                            prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
                        }
                        this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
                        var monthsTitle = dates[this.o.language].monthsTitle || dates['en'].monthsTitle || 'Months';
                        var months = this.picker.find('.datepicker-months').find('.datepicker-switch').text(this.o.maxViewMode < 2 ? monthsTitle : year).end().find('span').removeClass('active');
                        $.each(this.dates, function (i, d) {
                            if (d.getUTCFullYear() === year)
                                months.eq(d.getUTCMonth()).addClass('active');
                        });
                        if (year < startYear || year > endYear) {
                            months.addClass('disabled');
                        }
                        if (year === startYear) {
                            months.slice(0, startMonth).addClass('disabled');
                        }
                        if (year === endYear) {
                            months.slice(endMonth + 1).addClass('disabled');
                        }
                        if (this.o.beforeShowMonth !== $.noop) {
                            var that = this;
                            $.each(months, function (i, month) {
                                var moDate = new Date(year, i, 1);
                                var before = that.o.beforeShowMonth(moDate);
                                if (before === undefined)
                                    before = {};
                                else if (typeof before === 'boolean')
                                    before = { enabled: before };
                                else if (typeof before === 'string')
                                    before = { classes: before };
                                if (before.enabled === false && !$(month).hasClass('disabled'))
                                    $(month).addClass('disabled');
                                if (before.classes)
                                    $(month).addClass(before.classes);
                                if (before.tooltip)
                                    $(month).prop('title', before.tooltip);
                            });
                        }
                        this._fill_yearsView('.datepicker-years', 'year', 10, 1, year, startYear, endYear, this.o.beforeShowYear);
                        this._fill_yearsView('.datepicker-decades', 'decade', 100, 10, year, startYear, endYear, this.o.beforeShowDecade);
                        this._fill_yearsView('.datepicker-centuries', 'century', 1000, 100, year, startYear, endYear, this.o.beforeShowCentury);
                    },
                    updateNavArrows: function () {
                        if (!this._allow_update)
                            return;
                        var d = new Date(this.viewDate), year = d.getUTCFullYear(), month = d.getUTCMonth();
                        switch (this.viewMode) {
                        case 0:
                            if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()) {
                                this.picker.find('.prev').css({ visibility: 'hidden' });
                            } else {
                                this.picker.find('.prev').css({ visibility: 'visible' });
                            }
                            if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()) {
                                this.picker.find('.next').css({ visibility: 'hidden' });
                            } else {
                                this.picker.find('.next').css({ visibility: 'visible' });
                            }
                            break;
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2) {
                                this.picker.find('.prev').css({ visibility: 'hidden' });
                            } else {
                                this.picker.find('.prev').css({ visibility: 'visible' });
                            }
                            if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2) {
                                this.picker.find('.next').css({ visibility: 'hidden' });
                            } else {
                                this.picker.find('.next').css({ visibility: 'visible' });
                            }
                            break;
                        }
                    },
                    click: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var target, dir, day, year, month, monthChanged, yearChanged;
                        target = $(e.target);
                        if (target.hasClass('datepicker-switch')) {
                            this.showMode(1);
                        }
                        var navArrow = target.closest('.prev, .next');
                        if (navArrow.length > 0) {
                            dir = DPGlobal.modes[this.viewMode].navStep * (navArrow.hasClass('prev') ? -1 : 1);
                            if (this.viewMode === 0) {
                                this.viewDate = this.moveMonth(this.viewDate, dir);
                                this._trigger('changeMonth', this.viewDate);
                            } else {
                                this.viewDate = this.moveYear(this.viewDate, dir);
                                if (this.viewMode === 1) {
                                    this._trigger('changeYear', this.viewDate);
                                }
                            }
                            this.fill();
                        }
                        if (target.hasClass('today') && !target.hasClass('day')) {
                            this.showMode(-2);
                            this._setDate(UTCToday(), this.o.todayBtn === 'linked' ? null : 'view');
                        }
                        if (target.hasClass('clear')) {
                            this.clearDates();
                        }
                        if (!target.hasClass('disabled')) {
                            if (target.hasClass('day')) {
                                day = parseInt(target.text(), 10) || 1;
                                year = this.viewDate.getUTCFullYear();
                                month = this.viewDate.getUTCMonth();
                                if (target.hasClass('old')) {
                                    if (month === 0) {
                                        month = 11;
                                        year = year - 1;
                                        monthChanged = true;
                                        yearChanged = true;
                                    } else {
                                        month = month - 1;
                                        monthChanged = true;
                                    }
                                }
                                if (target.hasClass('new')) {
                                    if (month === 11) {
                                        month = 0;
                                        year = year + 1;
                                        monthChanged = true;
                                        yearChanged = true;
                                    } else {
                                        month = month + 1;
                                        monthChanged = true;
                                    }
                                }
                                this._setDate(UTCDate(year, month, day));
                                if (yearChanged) {
                                    this._trigger('changeYear', this.viewDate);
                                }
                                if (monthChanged) {
                                    this._trigger('changeMonth', this.viewDate);
                                }
                            }
                            if (target.hasClass('month')) {
                                this.viewDate.setUTCDate(1);
                                day = 1;
                                month = target.parent().find('span').index(target);
                                year = this.viewDate.getUTCFullYear();
                                this.viewDate.setUTCMonth(month);
                                this._trigger('changeMonth', this.viewDate);
                                if (this.o.minViewMode === 1) {
                                    this._setDate(UTCDate(year, month, day));
                                    this.showMode();
                                } else {
                                    this.showMode(-1);
                                }
                                this.fill();
                            }
                            if (target.hasClass('year') || target.hasClass('decade') || target.hasClass('century')) {
                                this.viewDate.setUTCDate(1);
                                day = 1;
                                month = 0;
                                year = parseInt(target.text(), 10) || 0;
                                this.viewDate.setUTCFullYear(year);
                                if (target.hasClass('year')) {
                                    this._trigger('changeYear', this.viewDate);
                                    if (this.o.minViewMode === 2) {
                                        this._setDate(UTCDate(year, month, day));
                                    }
                                }
                                if (target.hasClass('decade')) {
                                    this._trigger('changeDecade', this.viewDate);
                                    if (this.o.minViewMode === 3) {
                                        this._setDate(UTCDate(year, month, day));
                                    }
                                }
                                if (target.hasClass('century')) {
                                    this._trigger('changeCentury', this.viewDate);
                                    if (this.o.minViewMode === 4) {
                                        this._setDate(UTCDate(year, month, day));
                                    }
                                }
                                this.showMode(-1);
                                this.fill();
                            }
                        }
                        if (this.picker.is(':visible') && this._focused_from) {
                            $(this._focused_from).focus();
                        }
                        delete this._focused_from;
                    },
                    _toggle_multidate: function (date) {
                        var ix = this.dates.contains(date);
                        if (!date) {
                            this.dates.clear();
                        }
                        if (ix !== -1) {
                            if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive) {
                                this.dates.remove(ix);
                            }
                        } else if (this.o.multidate === false) {
                            this.dates.clear();
                            this.dates.push(date);
                        } else {
                            this.dates.push(date);
                        }
                        if (typeof this.o.multidate === 'number')
                            while (this.dates.length > this.o.multidate)
                                this.dates.remove(0);
                    },
                    _setDate: function (date, which) {
                        if (!which || which === 'date')
                            this._toggle_multidate(date && new Date(date));
                        if (!which || which === 'view')
                            this.viewDate = date && new Date(date);
                        this.fill();
                        this.setValue();
                        if (!which || which !== 'view') {
                            this._trigger('changeDate');
                        }
                        if (this.inputField) {
                            this.inputField.change();
                        }
                        if (this.o.autoclose && (!which || which === 'date')) {
                            this.hide();
                        }
                    },
                    moveDay: function (date, dir) {
                        var newDate = new Date(date);
                        newDate.setUTCDate(date.getUTCDate() + dir);
                        return newDate;
                    },
                    moveWeek: function (date, dir) {
                        return this.moveDay(date, dir * 7);
                    },
                    moveMonth: function (date, dir) {
                        if (!isValidDate(date))
                            return this.o.defaultViewDate;
                        if (!dir)
                            return date;
                        var new_date = new Date(date.valueOf()), day = new_date.getUTCDate(), month = new_date.getUTCMonth(), mag = Math.abs(dir), new_month, test;
                        dir = dir > 0 ? 1 : -1;
                        if (mag === 1) {
                            test = dir === -1 ? function () {
                                return new_date.getUTCMonth() === month;
                            } : function () {
                                return new_date.getUTCMonth() !== new_month;
                            };
                            new_month = month + dir;
                            new_date.setUTCMonth(new_month);
                            if (new_month < 0 || new_month > 11)
                                new_month = (new_month + 12) % 12;
                        } else {
                            for (var i = 0; i < mag; i++)
                                new_date = this.moveMonth(new_date, dir);
                            new_month = new_date.getUTCMonth();
                            new_date.setUTCDate(day);
                            test = function () {
                                return new_month !== new_date.getUTCMonth();
                            };
                        }
                        while (test()) {
                            new_date.setUTCDate(--day);
                            new_date.setUTCMonth(new_month);
                        }
                        return new_date;
                    },
                    moveYear: function (date, dir) {
                        return this.moveMonth(date, dir * 12);
                    },
                    moveAvailableDate: function (date, dir, fn) {
                        do {
                            date = this[fn](date, dir);
                            if (!this.dateWithinRange(date))
                                return false;
                            fn = 'moveDay';
                        } while (this.dateIsDisabled(date));
                        return date;
                    },
                    weekOfDateIsDisabled: function (date) {
                        return $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1;
                    },
                    dateIsDisabled: function (date) {
                        return this.weekOfDateIsDisabled(date) || $.grep(this.o.datesDisabled, function (d) {
                            return isUTCEquals(date, d);
                        }).length > 0;
                    },
                    dateWithinRange: function (date) {
                        return date >= this.o.startDate && date <= this.o.endDate;
                    },
                    keydown: function (e) {
                        if (!this.picker.is(':visible')) {
                            if (e.keyCode === 40 || e.keyCode === 27) {
                                this.show();
                                e.stopPropagation();
                            }
                            return;
                        }
                        var dateChanged = false, dir, newViewDate, focusDate = this.focusDate || this.viewDate;
                        switch (e.keyCode) {
                        case 27:
                            if (this.focusDate) {
                                this.focusDate = null;
                                this.viewDate = this.dates.get(-1) || this.viewDate;
                                this.fill();
                            } else
                                this.hide();
                            e.preventDefault();
                            e.stopPropagation();
                            break;
                        case 37:
                        case 38:
                        case 39:
                        case 40:
                            if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7)
                                break;
                            dir = e.keyCode === 37 || e.keyCode === 38 ? -1 : 1;
                            if (this.viewMode === 0) {
                                if (e.ctrlKey) {
                                    newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
                                    if (newViewDate)
                                        this._trigger('changeYear', this.viewDate);
                                } else if (e.shiftKey) {
                                    newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
                                    if (newViewDate)
                                        this._trigger('changeMonth', this.viewDate);
                                } else if (e.keyCode === 37 || e.keyCode === 39) {
                                    newViewDate = this.moveAvailableDate(focusDate, dir, 'moveDay');
                                } else if (!this.weekOfDateIsDisabled(focusDate)) {
                                    newViewDate = this.moveAvailableDate(focusDate, dir, 'moveWeek');
                                }
                            } else if (this.viewMode === 1) {
                                if (e.keyCode === 38 || e.keyCode === 40) {
                                    dir = dir * 4;
                                }
                                newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
                            } else if (this.viewMode === 2) {
                                if (e.keyCode === 38 || e.keyCode === 40) {
                                    dir = dir * 4;
                                }
                                newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
                            }
                            if (newViewDate) {
                                this.focusDate = this.viewDate = newViewDate;
                                this.setValue();
                                this.fill();
                                e.preventDefault();
                            }
                            break;
                        case 13:
                            if (!this.o.forceParse)
                                break;
                            focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
                            if (this.o.keyboardNavigation) {
                                this._toggle_multidate(focusDate);
                                dateChanged = true;
                            }
                            this.focusDate = null;
                            this.viewDate = this.dates.get(-1) || this.viewDate;
                            this.setValue();
                            this.fill();
                            if (this.picker.is(':visible')) {
                                e.preventDefault();
                                e.stopPropagation();
                                if (this.o.autoclose)
                                    this.hide();
                            }
                            break;
                        case 9:
                            this.focusDate = null;
                            this.viewDate = this.dates.get(-1) || this.viewDate;
                            this.fill();
                            this.hide();
                            break;
                        }
                        if (dateChanged) {
                            if (this.dates.length)
                                this._trigger('changeDate');
                            else
                                this._trigger('clearDate');
                            if (this.inputField) {
                                this.inputField.change();
                            }
                        }
                    },
                    showMode: function (dir) {
                        if (dir) {
                            this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + dir));
                        }
                        this.picker.children('div').hide().filter('.datepicker-' + DPGlobal.modes[this.viewMode].clsName).show();
                        this.updateNavArrows();
                    }
                };
                var DateRangePicker = function (element, options) {
                    $(element).data('datepicker', this);
                    this.element = $(element);
                    this.inputs = $.map(options.inputs, function (i) {
                        return i.jquery ? i[0] : i;
                    });
                    delete options.inputs;
                    datepickerPlugin.call($(this.inputs), options).on('changeDate', $.proxy(this.dateUpdated, this));
                    this.pickers = $.map(this.inputs, function (i) {
                        return $(i).data('datepicker');
                    });
                    this.updateDates();
                };
                DateRangePicker.prototype = {
                    updateDates: function () {
                        this.dates = $.map(this.pickers, function (i) {
                            return i.getUTCDate();
                        });
                        this.updateRanges();
                    },
                    updateRanges: function () {
                        var range = $.map(this.dates, function (d) {
                                return d.valueOf();
                            });
                        $.each(this.pickers, function (i, p) {
                            p.setRange(range);
                        });
                    },
                    dateUpdated: function (e) {
                        if (this.updating)
                            return;
                        this.updating = true;
                        var dp = $(e.target).data('datepicker');
                        if (typeof dp === 'undefined') {
                            return;
                        }
                        var new_date = dp.getUTCDate(), i = $.inArray(e.target, this.inputs), j = i - 1, k = i + 1, l = this.inputs.length;
                        if (i === -1)
                            return;
                        $.each(this.pickers, function (i, p) {
                            if (!p.getUTCDate())
                                p.setUTCDate(new_date);
                        });
                        if (new_date < this.dates[j]) {
                            while (j >= 0 && new_date < this.dates[j]) {
                                this.pickers[j--].setUTCDate(new_date);
                            }
                        } else if (new_date > this.dates[k]) {
                            while (k < l && new_date > this.dates[k]) {
                                this.pickers[k++].setUTCDate(new_date);
                            }
                        }
                        this.updateDates();
                        delete this.updating;
                    },
                    remove: function () {
                        $.map(this.pickers, function (p) {
                            p.remove();
                        });
                        delete this.element.data().datepicker;
                    }
                };
                function opts_from_el(el, prefix) {
                    var data = $(el).data(), out = {}, inkey, replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
                    prefix = new RegExp('^' + prefix.toLowerCase());
                    function re_lower(_, a) {
                        return a.toLowerCase();
                    }
                    for (var key in data)
                        if (prefix.test(key)) {
                            inkey = key.replace(replace, re_lower);
                            out[inkey] = data[key];
                        }
                    return out;
                }
                function opts_from_locale(lang) {
                    var out = {};
                    if (!dates[lang]) {
                        lang = lang.split('-')[0];
                        if (!dates[lang])
                            return;
                    }
                    var d = dates[lang];
                    $.each(locale_opts, function (i, k) {
                        if (k in d)
                            out[k] = d[k];
                    });
                    return out;
                }
                var old = $.fn.datepicker;
                var datepickerPlugin = function (option) {
                    var args = Array.apply(null, arguments);
                    args.shift();
                    var internal_return;
                    this.each(function () {
                        var $this = $(this), data = $this.data('datepicker'), options = typeof option === 'object' && option;
                        if (!data) {
                            var elopts = opts_from_el(this, 'date'), xopts = $.extend({}, defaults, elopts, options), locopts = opts_from_locale(xopts.language), opts = $.extend({}, defaults, locopts, elopts, options);
                            if ($this.hasClass('input-daterange') || opts.inputs) {
                                $.extend(opts, { inputs: opts.inputs || $this.find('input').toArray() });
                                data = new DateRangePicker(this, opts);
                            } else {
                                data = new Datepicker(this, opts);
                            }
                            $this.data('datepicker', data);
                        }
                        if (typeof option === 'string' && typeof data[option] === 'function') {
                            internal_return = data[option].apply(data, args);
                        }
                    });
                    if (internal_return === undefined || internal_return instanceof Datepicker || internal_return instanceof DateRangePicker)
                        return this;
                    if (this.length > 1)
                        throw new Error('Using only allowed for the collection of a single element (' + option + ' function)');
                    else
                        return internal_return;
                };
                $.fn.datepicker = datepickerPlugin;
                var defaults = $.fn.datepicker.defaults = {
                        assumeNearbyYear: false,
                        autoclose: false,
                        beforeShowDay: $.noop,
                        beforeShowMonth: $.noop,
                        beforeShowYear: $.noop,
                        beforeShowDecade: $.noop,
                        beforeShowCentury: $.noop,
                        calendarWeeks: false,
                        clearBtn: false,
                        toggleActive: false,
                        daysOfWeekDisabled: [],
                        daysOfWeekHighlighted: [],
                        datesDisabled: [],
                        endDate: Infinity,
                        forceParse: true,
                        format: 'mm/dd/yyyy',
                        keyboardNavigation: true,
                        language: 'en',
                        minViewMode: 0,
                        maxViewMode: 4,
                        multidate: false,
                        multidateSeparator: ',',
                        orientation: 'auto',
                        rtl: false,
                        startDate: -Infinity,
                        startView: 0,
                        todayBtn: false,
                        todayHighlight: false,
                        weekStart: 0,
                        disableTouchKeyboard: false,
                        enableOnReadonly: true,
                        showOnFocus: true,
                        zIndexOffset: 10,
                        container: 'body',
                        immediateUpdates: false,
                        title: '',
                        templates: {
                            leftArrow: '&laquo;',
                            rightArrow: '&raquo;'
                        }
                    };
                var locale_opts = $.fn.datepicker.locale_opts = [
                        'format',
                        'rtl',
                        'weekStart'
                    ];
                $.fn.datepicker.Constructor = Datepicker;
                var dates = $.fn.datepicker.dates = {
                        en: {
                            days: [
                                'Sunday',
                                'Monday',
                                'Tuesday',
                                'Wednesday',
                                'Thursday',
                                'Friday',
                                'Saturday'
                            ],
                            daysShort: [
                                'Sun',
                                'Mon',
                                'Tue',
                                'Wed',
                                'Thu',
                                'Fri',
                                'Sat'
                            ],
                            daysMin: [
                                'Su',
                                'Mo',
                                'Tu',
                                'We',
                                'Th',
                                'Fr',
                                'Sa'
                            ],
                            months: [
                                'January',
                                'February',
                                'March',
                                'April',
                                'May',
                                'June',
                                'July',
                                'August',
                                'September',
                                'October',
                                'November',
                                'December'
                            ],
                            monthsShort: [
                                'Jan',
                                'Feb',
                                'Mar',
                                'Apr',
                                'May',
                                'Jun',
                                'Jul',
                                'Aug',
                                'Sep',
                                'Oct',
                                'Nov',
                                'Dec'
                            ],
                            today: 'Today',
                            clear: 'Clear',
                            titleFormat: 'MM yyyy'
                        }
                    };
                var DPGlobal = {
                        modes: [
                            {
                                clsName: 'days',
                                navFnc: 'Month',
                                navStep: 1
                            },
                            {
                                clsName: 'months',
                                navFnc: 'FullYear',
                                navStep: 1
                            },
                            {
                                clsName: 'years',
                                navFnc: 'FullYear',
                                navStep: 10
                            },
                            {
                                clsName: 'decades',
                                navFnc: 'FullDecade',
                                navStep: 100
                            },
                            {
                                clsName: 'centuries',
                                navFnc: 'FullCentury',
                                navStep: 1000
                            }
                        ],
                        isLeapYear: function (year) {
                            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
                        },
                        getDaysInMonth: function (year, month) {
                            return [
                                31,
                                DPGlobal.isLeapYear(year) ? 29 : 28,
                                31,
                                30,
                                31,
                                30,
                                31,
                                31,
                                30,
                                31,
                                30,
                                31
                            ][month];
                        },
                        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
                        nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
                        parseFormat: function (format) {
                            if (typeof format.toValue === 'function' && typeof format.toDisplay === 'function')
                                return format;
                            var separators = format.replace(this.validParts, '\0').split('\0'), parts = format.match(this.validParts);
                            if (!separators || !separators.length || !parts || parts.length === 0) {
                                throw new Error('Invalid date format.');
                            }
                            return {
                                separators: separators,
                                parts: parts
                            };
                        },
                        parseDate: function (date, format, language, assumeNearby) {
                            if (!date)
                                return undefined;
                            if (date instanceof Date)
                                return date;
                            if (typeof format === 'string')
                                format = DPGlobal.parseFormat(format);
                            if (format.toValue)
                                return format.toValue(date, format, language);
                            var part_re = /([\-+]\d+)([dmwy])/, parts = date.match(/([\-+]\d+)([dmwy])/g), fn_map = {
                                    d: 'moveDay',
                                    m: 'moveMonth',
                                    w: 'moveWeek',
                                    y: 'moveYear'
                                }, dateAliases = {
                                    yesterday: '-1d',
                                    today: '+0d',
                                    tomorrow: '+1d'
                                }, part, dir, i, fn;
                            if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
                                date = new Date();
                                for (i = 0; i < parts.length; i++) {
                                    part = part_re.exec(parts[i]);
                                    dir = parseInt(part[1]);
                                    fn = fn_map[part[2]];
                                    date = Datepicker.prototype[fn](date, dir);
                                }
                                return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                            }
                            if (typeof dateAliases[date] !== 'undefined') {
                                date = dateAliases[date];
                                parts = date.match(/([\-+]\d+)([dmwy])/g);
                                if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
                                    date = new Date();
                                    for (i = 0; i < parts.length; i++) {
                                        part = part_re.exec(parts[i]);
                                        dir = parseInt(part[1]);
                                        fn = fn_map[part[2]];
                                        date = Datepicker.prototype[fn](date, dir);
                                    }
                                    return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                                }
                            }
                            parts = date && date.match(this.nonpunctuation) || [];
                            date = new Date();
                            function applyNearbyYear(year, threshold) {
                                if (threshold === true)
                                    threshold = 10;
                                if (year < 100) {
                                    year += 2000;
                                    if (year > new Date().getFullYear() + threshold) {
                                        year -= 100;
                                    }
                                }
                                return year;
                            }
                            var parsed = {}, setters_order = [
                                    'yyyy',
                                    'yy',
                                    'M',
                                    'MM',
                                    'm',
                                    'mm',
                                    'd',
                                    'dd'
                                ], setters_map = {
                                    yyyy: function (d, v) {
                                        return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
                                    },
                                    yy: function (d, v) {
                                        return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
                                    },
                                    m: function (d, v) {
                                        if (isNaN(d))
                                            return d;
                                        v -= 1;
                                        while (v < 0)
                                            v += 12;
                                        v %= 12;
                                        d.setUTCMonth(v);
                                        while (d.getUTCMonth() !== v)
                                            d.setUTCDate(d.getUTCDate() - 1);
                                        return d;
                                    },
                                    d: function (d, v) {
                                        return d.setUTCDate(v);
                                    }
                                }, val, filtered;
                            setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
                            setters_map['dd'] = setters_map['d'];
                            date = UTCToday();
                            var fparts = format.parts.slice();
                            if (parts.length !== fparts.length) {
                                fparts = $(fparts).filter(function (i, p) {
                                    return $.inArray(p, setters_order) !== -1;
                                }).toArray();
                            }
                            function match_part() {
                                var m = this.slice(0, parts[i].length), p = parts[i].slice(0, m.length);
                                return m.toLowerCase() === p.toLowerCase();
                            }
                            if (parts.length === fparts.length) {
                                var cnt;
                                for (i = 0, cnt = fparts.length; i < cnt; i++) {
                                    val = parseInt(parts[i], 10);
                                    part = fparts[i];
                                    if (isNaN(val)) {
                                        switch (part) {
                                        case 'MM':
                                            filtered = $(dates[language].months).filter(match_part);
                                            val = $.inArray(filtered[0], dates[language].months) + 1;
                                            break;
                                        case 'M':
                                            filtered = $(dates[language].monthsShort).filter(match_part);
                                            val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                                            break;
                                        }
                                    }
                                    parsed[part] = val;
                                }
                                var _date, s;
                                for (i = 0; i < setters_order.length; i++) {
                                    s = setters_order[i];
                                    if (s in parsed && !isNaN(parsed[s])) {
                                        _date = new Date(date);
                                        setters_map[s](_date, parsed[s]);
                                        if (!isNaN(_date))
                                            date = _date;
                                    }
                                }
                            }
                            return date;
                        },
                        formatDate: function (date, format, language) {
                            if (!date)
                                return '';
                            if (typeof format === 'string')
                                format = DPGlobal.parseFormat(format);
                            if (format.toDisplay)
                                return format.toDisplay(date, format, language);
                            var val = {
                                    d: date.getUTCDate(),
                                    D: dates[language].daysShort[date.getUTCDay()],
                                    DD: dates[language].days[date.getUTCDay()],
                                    m: date.getUTCMonth() + 1,
                                    M: dates[language].monthsShort[date.getUTCMonth()],
                                    MM: dates[language].months[date.getUTCMonth()],
                                    yy: date.getUTCFullYear().toString().substring(2),
                                    yyyy: date.getUTCFullYear()
                                };
                            val.dd = (val.d < 10 ? '0' : '') + val.d;
                            val.mm = (val.m < 10 ? '0' : '') + val.m;
                            date = [];
                            var seps = $.extend([], format.separators);
                            for (var i = 0, cnt = format.parts.length; i <= cnt; i++) {
                                if (seps.length)
                                    date.push(seps.shift());
                                date.push(val[format.parts[i]]);
                            }
                            return date.join('');
                        },
                        headTemplate: '<thead>' + '<tr>' + '<th colspan="7" class="datepicker-title"></th>' + '</tr>' + '<tr>' + '<th class="prev">&laquo;</th>' + '<th colspan="5" class="datepicker-switch"></th>' + '<th class="next">&raquo;</th>' + '</tr>' + '</thead>',
                        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
                        footTemplate: '<tfoot>' + '<tr>' + '<th colspan="7" class="today"></th>' + '</tr>' + '<tr>' + '<th colspan="7" class="clear"></th>' + '</tr>' + '</tfoot>'
                    };
                DPGlobal.template = '<div class="datepicker">' + '<div class="datepicker-days">' + '<table class="table-condensed">' + DPGlobal.headTemplate + '<tbody></tbody>' + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="datepicker-months">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="datepicker-years">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="datepicker-decades">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="datepicker-centuries">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '</div>';
                $.fn.datepicker.DPGlobal = DPGlobal;
                $.fn.datepicker.noConflict = function () {
                    $.fn.datepicker = old;
                    return this;
                };
                $.fn.datepicker.version = '1.6.4';
                $(document).on('focus.datepicker.data-api click.datepicker.data-api', '[data-provide="datepicker"]', function (e) {
                    var $this = $(this);
                    if ($this.data('datepicker'))
                        return;
                    e.preventDefault();
                    datepickerPlugin.call($this, 'show');
                });
                $(function () {
                    datepickerPlugin.call($('[data-provide="datepicker-inline"]'));
                });
            }));
        },
        function (module, exports) {
            (function (factory) {
                if (typeof define === 'function' && define.amd) {
                    define(['jquery'], factory);
                } else if (typeof exports === 'object') {
                    factory(_require(3));
                } else {
                    factory(jQuery);
                }
            }(function ($, undefined) {
                var methods = {
                        init: function (options) {
                            var o = $.extend({
                                    cssStyle: (options.theme || bizui.theme) + (options.customClass ? ' ' + options.customClass : ''),
                                    currentPage: options.pageNumber || 0,
                                    items: options.totalNumber || 1,
                                    itemsOnPage: options.pageSize || 1,
                                    prevText: '<i class="biz-icon">&#xe5cb;</i>',
                                    nextText: '<i class="biz-icon">&#xe5cc;</i>',
                                    edges: 2,
                                    displayedPages: 5,
                                    pages: 0,
                                    ellipsePageSet: false,
                                    ellipseText: '&hellip;',
                                    labelMap: [],
                                    listStyle: '',
                                    invertPageOrder: false,
                                    nextAtFront: false,
                                    selectOnClick: true,
                                    useStartEdge: true,
                                    useEndEdge: true,
                                    onInit: function () {
                                    }
                                }, options || {});
                            var self = this;
                            o.pages = o.pages ? o.pages : Math.ceil(o.items / o.itemsOnPage) ? Math.ceil(o.items / o.itemsOnPage) : 1;
                            if (o.currentPage)
                                o.currentPage = o.currentPage - 1;
                            else
                                o.currentPage = !o.invertPageOrder ? 0 : o.pages - 1;
                            o.halfDisplayed = o.displayedPages / 2;
                            this.each(function () {
                                self.addClass('biz-page biz-page-' + o.cssStyle).data('pagination', o);
                                methods._draw.call(self);
                            });
                            o.onInit();
                            return this;
                        },
                        setPageNumber: function (page) {
                            methods._selectPage.call(this, page - 1);
                            return this;
                        },
                        prevPage: function () {
                            var o = this.data('pagination');
                            if (!o.invertPageOrder) {
                                if (o.currentPage > 0) {
                                    methods._selectPage.call(this, o.currentPage - 1);
                                }
                            } else {
                                if (o.currentPage < o.pages - 1) {
                                    methods._selectPage.call(this, o.currentPage + 1);
                                }
                            }
                            return this;
                        },
                        nextPage: function () {
                            var o = this.data('pagination');
                            if (!o.invertPageOrder) {
                                if (o.currentPage < o.pages - 1) {
                                    methods._selectPage.call(this, o.currentPage + 1);
                                }
                            } else {
                                if (o.currentPage > 0) {
                                    methods._selectPage.call(this, o.currentPage - 1);
                                }
                            }
                            return this;
                        },
                        getPageCount: function () {
                            return this.data('pagination').pages;
                        },
                        setPagesCount: function (count) {
                            this.data('pagination').pages = count;
                        },
                        getPageNumber: function () {
                            return this.data('pagination').currentPage + 1;
                        },
                        destroy: function () {
                            this.empty();
                            return this;
                        },
                        drawPage: function (page) {
                            var o = this.data('pagination');
                            o.currentPage = page - 1;
                            this.data('pagination', o);
                            methods._draw.call(this);
                            return this;
                        },
                        redraw: function () {
                            methods._draw.call(this);
                            return this;
                        },
                        disable: function () {
                            var o = this.data('pagination');
                            o.disabled = true;
                            this.data('pagination', o);
                            methods._draw.call(this);
                            return this;
                        },
                        enable: function () {
                            var o = this.data('pagination');
                            o.disabled = false;
                            this.data('pagination', o);
                            methods._draw.call(this);
                            return this;
                        },
                        setTotalNumber: function (newItems, redraw) {
                            var o = this.data('pagination');
                            o.items = newItems;
                            o.pages = methods._getPages(o);
                            this.data('pagination', o);
                            methods._draw.call(this);
                            if (redraw !== undefined && !!redraw) {
                                methods.drawPage.call(this, 1);
                            }
                        },
                        setPageSize: function (itemsOnPage) {
                            var o = this.data('pagination');
                            o.itemsOnPage = itemsOnPage;
                            o.pages = methods._getPages(o);
                            this.data('pagination', o);
                            methods._selectPage.call(this, 0);
                            return this;
                        },
                        getPageSize: function () {
                            return this.data('pagination').itemsOnPage;
                        },
                        _draw: function () {
                            var o = this.data('pagination'), interval = methods._getInterval(o), i, tagName;
                            methods.destroy.call(this);
                            tagName = typeof this.prop === 'function' ? this.prop('tagName') : this.attr('tagName');
                            var $panel = tagName === 'UL' ? this : $('<ul' + (o.listStyle ? ' class="' + o.listStyle + '"' : '') + '></ul>').appendTo(this);
                            if (o.prevText) {
                                methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage - 1 : o.currentPage + 1, {
                                    text: o.prevText,
                                    classes: 'prev'
                                });
                            }
                            if (o.nextText && o.nextAtFront) {
                                methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage + 1 : o.currentPage - 1, {
                                    text: o.nextText,
                                    classes: 'next'
                                });
                            }
                            if (!o.invertPageOrder) {
                                if (interval.start > 0 && o.edges > 0) {
                                    if (o.useStartEdge) {
                                        var end = Math.min(o.edges, interval.start);
                                        for (i = 0; i < end; i++) {
                                            methods._appendItem.call(this, i);
                                        }
                                    }
                                    if (o.edges < interval.start && interval.start - o.edges != 1) {
                                        $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
                                    } else if (interval.start - o.edges == 1) {
                                        methods._appendItem.call(this, o.edges);
                                    }
                                }
                            } else {
                                if (interval.end < o.pages && o.edges > 0) {
                                    if (o.useStartEdge) {
                                        var begin = Math.max(o.pages - o.edges, interval.end);
                                        for (i = o.pages - 1; i >= begin; i--) {
                                            methods._appendItem.call(this, i);
                                        }
                                    }
                                    if (o.pages - o.edges > interval.end && o.pages - o.edges - interval.end != 1) {
                                        $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
                                    } else if (o.pages - o.edges - interval.end == 1) {
                                        methods._appendItem.call(this, interval.end);
                                    }
                                }
                            }
                            if (!o.invertPageOrder) {
                                for (i = interval.start; i < interval.end; i++) {
                                    methods._appendItem.call(this, i);
                                }
                            } else {
                                for (i = interval.end - 1; i >= interval.start; i--) {
                                    methods._appendItem.call(this, i);
                                }
                            }
                            if (!o.invertPageOrder) {
                                if (interval.end < o.pages && o.edges > 0) {
                                    if (o.pages - o.edges > interval.end && o.pages - o.edges - interval.end != 1) {
                                        $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
                                    } else if (o.pages - o.edges - interval.end == 1) {
                                        methods._appendItem.call(this, interval.end);
                                    }
                                    if (o.useEndEdge) {
                                        var begin = Math.max(o.pages - o.edges, interval.end);
                                        for (i = begin; i < o.pages; i++) {
                                            methods._appendItem.call(this, i);
                                        }
                                    }
                                }
                            } else {
                                if (interval.start > 0 && o.edges > 0) {
                                    if (o.edges < interval.start && interval.start - o.edges != 1) {
                                        $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
                                    } else if (interval.start - o.edges == 1) {
                                        methods._appendItem.call(this, o.edges);
                                    }
                                    if (o.useEndEdge) {
                                        var end = Math.min(o.edges, interval.start);
                                        for (i = end - 1; i >= 0; i--) {
                                            methods._appendItem.call(this, i);
                                        }
                                    }
                                }
                            }
                            if (o.nextText && !o.nextAtFront) {
                                methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage + 1 : o.currentPage - 1, {
                                    text: o.nextText,
                                    classes: 'next'
                                });
                            }
                            if (o.ellipsePageSet && !o.disabled) {
                                methods._ellipseClick.call(this, $panel);
                            }
                        },
                        _getPages: function (o) {
                            var pages = Math.ceil(o.items / o.itemsOnPage);
                            return pages || 1;
                        },
                        _getInterval: function (o) {
                            return {
                                start: Math.ceil(o.currentPage > o.halfDisplayed ? Math.max(Math.min(o.currentPage - o.halfDisplayed, o.pages - o.displayedPages), 0) : 0),
                                end: Math.ceil(o.currentPage > o.halfDisplayed ? Math.min(o.currentPage + o.halfDisplayed, o.pages) : Math.min(o.displayedPages, o.pages))
                            };
                        },
                        _appendItem: function (pageIndex, opts) {
                            var self = this, options, $link, o = self.data('pagination'), $linkWrapper = $('<li></li>'), $ul = self.find('ul');
                            pageIndex = pageIndex < 0 ? 0 : pageIndex < o.pages ? pageIndex : o.pages - 1;
                            options = {
                                text: pageIndex + 1,
                                classes: ''
                            };
                            if (o.labelMap.length && o.labelMap[pageIndex]) {
                                options.text = o.labelMap[pageIndex];
                            }
                            options = $.extend(options, opts || {});
                            if (pageIndex == o.currentPage || o.disabled) {
                                if (o.disabled || options.classes === 'prev' || options.classes === 'next') {
                                    $linkWrapper.addClass('disabled');
                                } else {
                                    $linkWrapper.addClass('active');
                                }
                                $link = $('<span class="current">' + options.text + '</span>');
                            } else {
                                $link = $('<a href="javascript:void(0);" class="page-link">' + options.text + '</a>');
                                $link.click(function (event) {
                                    return methods._selectPage.call(self, pageIndex, event);
                                });
                            }
                            if (options.classes) {
                                $link.addClass(options.classes);
                            }
                            $linkWrapper.append($link);
                            if ($ul.length) {
                                $ul.append($linkWrapper);
                            } else {
                                self.append($linkWrapper);
                            }
                        },
                        _selectPage: function (pageIndex, event) {
                            var o = this.data('pagination');
                            o.currentPage = pageIndex;
                            if (o.selectOnClick) {
                                methods._draw.call(this);
                            }
                            return $(this).trigger('changePage', pageIndex + 1);
                        },
                        _ellipseClick: function ($panel) {
                            var self = this, o = this.data('pagination'), $ellip = $panel.find('.ellipse');
                            $ellip.addClass('clickable').parent().removeClass('disabled');
                            $ellip.click(function (event) {
                                if (!o.disable) {
                                    var $this = $(this), val = (parseInt($this.parent().prev().text(), 10) || 0) + 1;
                                    $this.html('<input type="number" min="1" max="' + o.pages + '" step="1" value="' + val + '">').find('input').focus().click(function (event) {
                                        event.stopPropagation();
                                    }).keyup(function (event) {
                                        var val = $(this).val();
                                        if (event.which === 13 && val !== '') {
                                            if (val > 0 && val <= o.pages)
                                                methods._selectPage.call(self, val - 1);
                                        } else if (event.which === 27) {
                                            $ellip.empty().html(o.ellipseText);
                                        }
                                    }).bind('blur', function (event) {
                                        var val = $(this).val();
                                        if (val !== '') {
                                            methods._selectPage.call(self, val - 1);
                                        }
                                        $ellip.empty().html(o.ellipseText);
                                        return false;
                                    });
                                }
                                return false;
                            });
                        }
                    };
                $.fn.pagination = function (method) {
                    if (methods[method] && method.charAt(0) != '_') {
                        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
                    } else if (typeof method === 'object' || !method) {
                        return methods.init.apply(this, arguments);
                    } else {
                        $.error('Method ' + method + ' does not exist on jQuery.pagination');
                    }
                };
            }));
        },
        function (module, exports) {
            (function (factory) {
                if (typeof define === 'function' && define.amd) {
                    define(['jquery'], factory);
                } else if (typeof exports === 'object') {
                    factory(_require(3));
                } else {
                    factory(jQuery);
                }
            }(function ($, undefined) {
                var Node, Tree, methods;
                Node = function () {
                    function Node(row, tree, settings) {
                        var parentId;
                        this.row = row;
                        this.tree = tree;
                        this.settings = settings;
                        this.id = this.row.data(this.settings.nodeIdAttr);
                        parentId = this.row.data(this.settings.parentIdAttr);
                        if (parentId != null && parentId !== '') {
                            this.parentId = parentId;
                        }
                        this.treeCell = $(this.row.children(this.settings.columnElType)[this.settings.column]);
                        this.expander = $(this.settings.expanderTemplate);
                        this.indenter = $(this.settings.indenterTemplate);
                        this.children = [];
                        this.initialized = false;
                        this.treeCell.prepend(this.indenter);
                    }
                    Node.prototype.addChild = function (child) {
                        return this.children.push(child);
                    };
                    Node.prototype.ancestors = function () {
                        var ancestors, node;
                        node = this;
                        ancestors = [];
                        while (node = node.parentNode()) {
                            ancestors.push(node);
                        }
                        return ancestors;
                    };
                    Node.prototype.collapse = function () {
                        if (this.collapsed()) {
                            return this;
                        }
                        this.row.removeClass('expanded').addClass('collapsed');
                        this._hideChildren();
                        this.expander.attr('title', this.settings.stringExpand);
                        if (this.initialized && this.settings.onNodeCollapse != null) {
                            this.settings.onNodeCollapse.apply(this);
                        }
                        return this;
                    };
                    Node.prototype.collapsed = function () {
                        return this.row.hasClass('collapsed');
                    };
                    Node.prototype.expand = function () {
                        if (this.expanded()) {
                            return this;
                        }
                        this.row.removeClass('collapsed').addClass('expanded');
                        if (this.initialized && this.settings.onNodeExpand != null) {
                            this.settings.onNodeExpand.apply(this);
                        }
                        if ($(this.row).is(':visible')) {
                            this._showChildren();
                        }
                        this.expander.attr('title', this.settings.stringCollapse);
                        return this;
                    };
                    Node.prototype.expanded = function () {
                        return this.row.hasClass('expanded');
                    };
                    Node.prototype.hide = function () {
                        this._hideChildren();
                        this.row.hide();
                        return this;
                    };
                    Node.prototype.isBranchNode = function () {
                        if (this.children.length > 0 || this.row.data(this.settings.branchAttr) === true) {
                            return true;
                        } else {
                            return false;
                        }
                    };
                    Node.prototype.updateBranchLeafClass = function () {
                        this.row.removeClass('branch');
                        this.row.removeClass('leaf');
                        this.row.addClass(this.isBranchNode() ? 'branch' : 'leaf');
                    };
                    Node.prototype.level = function () {
                        return this.ancestors().length;
                    };
                    Node.prototype.parentNode = function () {
                        if (this.parentId != null) {
                            return this.tree[this.parentId];
                        } else {
                            return null;
                        }
                    };
                    Node.prototype.removeChild = function (child) {
                        var i = $.inArray(child, this.children);
                        return this.children.splice(i, 1);
                    };
                    Node.prototype.render = function () {
                        var handler, settings = this.settings, target;
                        if (settings.expandable === true && this.isBranchNode()) {
                            handler = function (e) {
                                $(this).parents('table').treetable('node', $(this).parents('tr').data(settings.nodeIdAttr)).toggle();
                                return e.preventDefault();
                            };
                            this.indenter.html(this.expander);
                            target = settings.clickableNodeNames === true ? this.treeCell : this.expander;
                            target.off('click.treetable').on('click.treetable', handler);
                            target.off('keydown.treetable').on('keydown.treetable', function (e) {
                                if (e.keyCode == 13) {
                                    handler.apply(this, [e]);
                                }
                            });
                        }
                        this.indenter[0].style.paddingLeft = '' + this.level() * settings.indent + 'px';
                        return this;
                    };
                    Node.prototype.reveal = function () {
                        if (this.parentId != null) {
                            this.parentNode().reveal();
                        }
                        return this.expand();
                    };
                    Node.prototype.setParent = function (node) {
                        if (this.parentId != null) {
                            this.tree[this.parentId].removeChild(this);
                        }
                        this.parentId = node.id;
                        this.row.data(this.settings.parentIdAttr, node.id);
                        return node.addChild(this);
                    };
                    Node.prototype.show = function () {
                        if (!this.initialized) {
                            this._initialize();
                        }
                        this.row.show();
                        if (this.expanded()) {
                            this._showChildren();
                        }
                        return this;
                    };
                    Node.prototype.toggle = function () {
                        if (this.expanded()) {
                            this.collapse();
                        } else {
                            this.expand();
                        }
                        return this;
                    };
                    Node.prototype._hideChildren = function () {
                        var child, _i, _len, _ref, _results;
                        _ref = this.children;
                        _results = [];
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            child = _ref[_i];
                            _results.push(child.hide());
                        }
                        return _results;
                    };
                    Node.prototype._initialize = function () {
                        var settings = this.settings;
                        this.render();
                        if (settings.expandable === true && settings.initialState === 'collapsed') {
                            this.collapse();
                        } else {
                            this.expand();
                        }
                        if (settings.onNodeInitialized != null) {
                            settings.onNodeInitialized.apply(this);
                        }
                        return this.initialized = true;
                    };
                    Node.prototype._showChildren = function () {
                        var child, _i, _len, _ref, _results;
                        _ref = this.children;
                        _results = [];
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            child = _ref[_i];
                            _results.push(child.show());
                        }
                        return _results;
                    };
                    return Node;
                }();
                Tree = function () {
                    function Tree(table, settings) {
                        this.table = table;
                        this.settings = settings;
                        this.tree = {};
                        this.nodes = [];
                        this.roots = [];
                    }
                    Tree.prototype.collapseAll = function () {
                        var node, _i, _len, _ref, _results;
                        _ref = this.nodes;
                        _results = [];
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            node = _ref[_i];
                            _results.push(node.collapse());
                        }
                        return _results;
                    };
                    Tree.prototype.expandAll = function () {
                        var node, _i, _len, _ref, _results;
                        _ref = this.nodes;
                        _results = [];
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            node = _ref[_i];
                            _results.push(node.expand());
                        }
                        return _results;
                    };
                    Tree.prototype.findLastNode = function (node) {
                        if (node.children.length > 0) {
                            return this.findLastNode(node.children[node.children.length - 1]);
                        } else {
                            return node;
                        }
                    };
                    Tree.prototype.loadRows = function (rows) {
                        var node, row, i;
                        if (rows != null) {
                            for (i = 0; i < rows.length; i++) {
                                row = $(rows[i]);
                                if (row.data(this.settings.nodeIdAttr) != null) {
                                    node = new Node(row, this.tree, this.settings);
                                    this.nodes.push(node);
                                    this.tree[node.id] = node;
                                    if (node.parentId != null && this.tree[node.parentId]) {
                                        this.tree[node.parentId].addChild(node);
                                    } else {
                                        this.roots.push(node);
                                    }
                                }
                            }
                        }
                        for (i = 0; i < this.nodes.length; i++) {
                            node = this.nodes[i].updateBranchLeafClass();
                        }
                        return this;
                    };
                    Tree.prototype.move = function (node, destination) {
                        var nodeParent = node.parentNode();
                        if (node !== destination && destination.id !== node.parentId && $.inArray(node, destination.ancestors()) === -1) {
                            node.setParent(destination);
                            this._moveRows(node, destination);
                            if (node.parentNode().children.length === 1) {
                                node.parentNode().render();
                            }
                        }
                        if (nodeParent) {
                            nodeParent.updateBranchLeafClass();
                        }
                        if (node.parentNode()) {
                            node.parentNode().updateBranchLeafClass();
                        }
                        node.updateBranchLeafClass();
                        return this;
                    };
                    Tree.prototype.removeNode = function (node) {
                        this.unloadBranch(node);
                        node.row.remove();
                        if (node.parentId != null) {
                            node.parentNode().removeChild(node);
                        }
                        delete this.tree[node.id];
                        this.nodes.splice($.inArray(node, this.nodes), 1);
                        return this;
                    };
                    Tree.prototype.render = function () {
                        var root, _i, _len, _ref;
                        _ref = this.roots;
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            root = _ref[_i];
                            root.show();
                        }
                        return this;
                    };
                    Tree.prototype.sortBranch = function (node, sortFun) {
                        node.children.sort(sortFun);
                        this._sortChildRows(node);
                        return this;
                    };
                    Tree.prototype.unloadBranch = function (node) {
                        var children = node.children.slice(0), i;
                        for (i = 0; i < children.length; i++) {
                            this.removeNode(children[i]);
                        }
                        node.children = [];
                        node.updateBranchLeafClass();
                        return this;
                    };
                    Tree.prototype._moveRows = function (node, destination) {
                        var children = node.children, i;
                        node.row.insertAfter(destination.row);
                        node.render();
                        for (i = children.length - 1; i >= 0; i--) {
                            this._moveRows(children[i], node);
                        }
                    };
                    Tree.prototype._sortChildRows = function (parentNode) {
                        return this._moveRows(parentNode, parentNode);
                    };
                    return Tree;
                }();
                methods = {
                    init: function (options, force) {
                        var settings;
                        settings = $.extend({
                            branchAttr: 'ttBranch',
                            clickableNodeNames: false,
                            column: 0,
                            columnElType: 'td',
                            customClass: '',
                            expandable: true,
                            expanderTemplate: '<a href=\'javascript:void(0)\'>&nbsp;</a>',
                            indent: 19,
                            indenterTemplate: '<span class=\'indenter\'></span>',
                            initialState: 'collapsed',
                            nodeIdAttr: 'ttId',
                            parentIdAttr: 'ttParentId',
                            stringExpand: '',
                            stringCollapse: '',
                            onInitialized: null,
                            onNodeCollapse: null,
                            onNodeExpand: null,
                            onNodeInitialized: null
                        }, options);
                        return this.each(function () {
                            var el = $(this), tree;
                            if (force || el.data('treetable') === undefined) {
                                tree = new Tree(this, settings);
                                tree.loadRows(this.rows).render();
                                el.addClass('treetable ' + settings.customClass).data('treetable', tree);
                                if (settings.onInitialized != null) {
                                    settings.onInitialized.apply(tree);
                                }
                            }
                            return el;
                        });
                    },
                    destroy: function () {
                        return this.each(function () {
                            $(this).find('span.indenter a').off();
                            $(this).find('span.indenter').remove();
                            return $(this).removeData('treetable').removeClass('treetable');
                        });
                    },
                    collapseAll: function () {
                        this.data('treetable').collapseAll();
                        return this;
                    },
                    collapseNode: function (id) {
                        var node = this.data('treetable').tree[id];
                        if (node) {
                            node.collapse();
                        } else {
                            throw new Error('Unknown node \'' + id + '\'');
                        }
                        return this;
                    },
                    expandAll: function () {
                        this.data('treetable').expandAll();
                        return this;
                    },
                    expandNode: function (id) {
                        var node = this.data('treetable').tree[id];
                        if (node) {
                            if (!node.initialized) {
                                node._initialize();
                            }
                            node.expand();
                        } else {
                            throw new Error('Unknown node \'' + id + '\'');
                        }
                        return this;
                    },
                    loadBranch: function (node, rows) {
                        var settings = this.data('treetable').settings, tree = this.data('treetable').tree;
                        rows = $(rows);
                        if (node == null) {
                            this.append(rows);
                        } else {
                            var lastNode = this.data('treetable').findLastNode(node);
                            rows.insertAfter(lastNode.row);
                        }
                        this.data('treetable').loadRows(rows);
                        rows.filter('tr').each(function () {
                            tree[$(this).data(settings.nodeIdAttr)].show();
                        });
                        if (node != null) {
                            node.render().expand();
                        }
                        return this;
                    },
                    move: function (nodeId, destinationId) {
                        var destination, node;
                        node = this.data('treetable').tree[nodeId];
                        destination = this.data('treetable').tree[destinationId];
                        this.data('treetable').move(node, destination);
                        return this;
                    },
                    node: function (id) {
                        return this.data('treetable').tree[id];
                    },
                    removeNode: function (id) {
                        var node = this.data('treetable').tree[id];
                        if (node) {
                            this.data('treetable').removeNode(node);
                        } else {
                            throw new Error('Unknown node \'' + id + '\'');
                        }
                        return this;
                    },
                    reveal: function (id) {
                        var node = this.data('treetable').tree[id];
                        if (node) {
                            node.reveal();
                        } else {
                            throw new Error('Unknown node \'' + id + '\'');
                        }
                        return this;
                    },
                    sortBranch: function (node, columnOrFunction) {
                        var settings = this.data('treetable').settings, prepValue, sortFun;
                        columnOrFunction = columnOrFunction || settings.column;
                        sortFun = columnOrFunction;
                        if ($.isNumeric(columnOrFunction)) {
                            sortFun = function (a, b) {
                                var extractValue, valA, valB;
                                extractValue = function (node) {
                                    var val = node.row.find('td:eq(' + columnOrFunction + ')').text();
                                    return $.trim(val).toUpperCase();
                                };
                                valA = extractValue(a);
                                valB = extractValue(b);
                                if (valA < valB)
                                    return -1;
                                if (valA > valB)
                                    return 1;
                                return 0;
                            };
                        }
                        this.data('treetable').sortBranch(node, sortFun);
                        return this;
                    },
                    unloadBranch: function (node) {
                        this.data('treetable').unloadBranch(node);
                        return this;
                    }
                };
                $.fn.treetable = function (method) {
                    if (methods[method]) {
                        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
                    } else if (typeof method === 'object' || !method) {
                        return methods.init.apply(this, arguments);
                    } else {
                        return $.error('Method ' + method + ' does not exist on jQuery.treetable');
                    }
                };
                this.TreeTable || (this.TreeTable = {});
                this.TreeTable.Node = Node;
                this.TreeTable.Tree = Tree;
            }));
        },
        function (module, exports) {
            function Button(button, options) {
                this.main = button;
                this.$main = $(this.main);
                var defaultOption = {
                        theme: bizui.theme,
                        customClass: '',
                        size: 'small'
                    };
                this.options = $.extend(defaultOption, options || {});
                this.init(this.options);
            }
            var defaultClass = 'biz-button', largeClass = 'biz-button-large', disableClass = 'biz-button-disable', prefix = 'biz-button-', dataKey = 'bizButton';
            Button.prototype = {
                init: function (options) {
                    this.originHTML = this.$main.html();
                    this.$main.addClass([
                        defaultClass,
                        options.customClass,
                        prefix + options.theme
                    ].join(' '));
                    if (options.size === 'large') {
                        this.$main.addClass(largeClass);
                    }
                    if (options.text) {
                        this.$main.html(options.text);
                    }
                    if (options.icon) {
                        var iconName = !document.documentMode ? options.icon : bizui.codepoints[options.icon];
                        this.$main.prepend('<i class="biz-icon">' + iconName + '</i> ');
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
                        this.options.customClass,
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
                    var internal_return, args = arguments;
                    this.each(function () {
                        var instance = $(this).data(dataKey);
                        if (instance) {
                            if (typeof method === 'string' && typeof instance[method] === 'function') {
                                internal_return = instance[method].apply(instance, Array.prototype.slice.call(args, 1));
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
            _require(7);
            _require(1);
            function Calendar(calendar, options) {
            }
            Calendar.prototype = {
                destroy: function () {
                },
                show: function () {
                },
                hide: function () {
                },
                setDate: function (date) {
                },
                getDate: function () {
                },
                setStartDate: function (date) {
                },
                setEndDate: function (date) {
                },
                setDatesDisabled: function (dates) {
                },
                setDaysOfWeekDisabled: function (days) {
                },
                setDaysOfWeekHighlighted: function (days) {
                }
            };
            $.extend($.fn.datepicker.defaults, {
                autoclose: true,
                language: 'zh-CN'
            });
            $.extend($.fn.datepicker.dates['zh-CN'], { format: 'yyyy-mm-dd' });
            $.extend($.fn, { bizCalendar: $.fn.datepicker });
            module.exports = Calendar;
        },
        function (module, exports) {
            function Checkbox(checkbox, options) {
                this.main = checkbox;
                this.$main = $(this.main);
                this.$group = $('input[name="' + this.$main.attr('name') + '"]');
                var defaultOption = { theme: bizui.theme };
                this.options = $.extend(defaultOption, options || {});
                this.init(this.options);
            }
            var defaultClass = 'biz-label', unchecked = 'biz-checkbox-unchecked', uncheckedHover = 'biz-checkbox-unchecked-hover', checked = 'biz-checkbox-checked', checkedHover = 'biz-checkbox-checked-hover', uncheckedDisabled = 'biz-checkbox-unchecked-disabled', checkedDisabled = 'biz-checkbox-checked-disabled', dataKey = 'bizCheckbox', checkCodepoint = '&#xe834;', uncheckCodepoint = '&#xe835;';
            Checkbox.prototype = {
                init: function (options) {
                    var title = this.$main.attr('title'), id = this.$main.attr('id') || '';
                    this.$main.after('<label for="' + id + '"><i class="biz-icon"></i>' + title + '</label>').hide();
                    this.$label = this.$main.next();
                    this.defaultClass = defaultClass + ' biz-label-' + options.theme;
                    this.$label.addClass(this.defaultClass);
                    this.$icon = this.$label.children('i');
                    if (this.main.checked) {
                        this.$label.addClass(this.main.disabled ? checkedDisabled : checked);
                        this.$icon.html(checkCodepoint);
                    } else {
                        this.$label.addClass(this.main.disabled ? uncheckedDisabled : unchecked);
                        this.$icon.html(uncheckCodepoint);
                    }
                    var self = this;
                    this.$label.on('mouseover.bizCheckbox', function (e) {
                        if (!self.main.disabled) {
                            $(this).addClass(self.main.checked ? checkedHover : uncheckedHover);
                        }
                    }).on('mouseout.bizCheckbox', function (e) {
                        if (!self.main.disabled) {
                            $(this).removeClass(self.main.checked ? checkedHover : uncheckedHover);
                        }
                    }).on('click.bizCheckbox', function (e) {
                        if (!self.main.disabled) {
                            if (self.main.checked) {
                                $(this).attr('class', [
                                    self.defaultClass,
                                    unchecked,
                                    uncheckedHover
                                ].join(' '));
                                self.$icon.html(uncheckCodepoint);
                            } else {
                                $(this).attr('class', [
                                    self.defaultClass,
                                    checked,
                                    checkedHover
                                ].join(' '));
                                self.$icon.html(checkCodepoint);
                            }
                            if (id === '') {
                                self.main.checked = !self.main.checked;
                            }
                        }
                    });
                },
                check: function () {
                    this.main.checked = true;
                    this.$label.attr('class', this.defaultClass + ' ' + (this.main.disabled ? checkedDisabled : checked));
                    this.$icon.html(checkCodepoint);
                },
                uncheck: function () {
                    this.main.checked = false;
                    this.$label.attr('class', this.defaultClass + ' ' + (this.main.disabled ? uncheckedDisabled : unchecked));
                    this.$icon.html(uncheckCodepoint);
                },
                enable: function () {
                    this.main.disabled = false;
                    this.$label.attr('class', this.defaultClass + ' ' + (this.main.checked ? checked : unchecked));
                },
                disable: function () {
                    this.main.disabled = true;
                    this.$label.attr('class', this.defaultClass + ' ' + (this.main.checked ? checkedDisabled : uncheckedDisabled));
                },
                val: function () {
                    var value = [];
                    this.$group.each(function (index, element) {
                        if (element.checked) {
                            value.push($(element).val());
                        }
                    });
                    return value.join(',');
                },
                destroy: function () {
                    this.$main.show();
                    this.$label.off('mouseover.bizCheckbox').off('mouseout.bizCheckbox').off('click.bizCheckbox').remove();
                    this.$main.data(dataKey, null);
                }
            };
            function isCheckbox(elem) {
                return elem.nodeType === 1 && elem.tagName.toLowerCase() === 'input' && elem.getAttribute('type').toLowerCase() === 'checkbox';
            }
            $.extend($.fn, {
                bizCheckbox: function (method) {
                    var internal_return, args = arguments;
                    this.each(function () {
                        var instance = $(this).data(dataKey);
                        if (instance) {
                            if (typeof method === 'string' && typeof instance[method] === 'function') {
                                internal_return = instance[method].apply(instance, Array.prototype.slice.call(args, 1));
                                if (internal_return !== undefined) {
                                    return false;
                                }
                            }
                        } else {
                            if (isCheckbox(this) && (method === undefined || jQuery.isPlainObject(method))) {
                                $(this).data(dataKey, new Checkbox(this, method));
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
            module.exports = Checkbox;
        },
        function (module, exports) {
            var Draggable = _require(0);
            function Dialog(dialog, options) {
                this.main = dialog;
                this.$main = $(this.main);
                var defaultOption = {
                        customClass: '',
                        position: 'fixed',
                        draggable: false,
                        theme: bizui.theme,
                        title: '',
                        buttons: [],
                        destroyOnClose: false
                    };
                this.options = $.extend(defaultOption, options || {});
                this.init(this.options);
            }
            var defaultClass = 'biz-dialog', prefix = 'biz-dialog-', dataKey = 'bizDialog', minWidth = 480, minHeight = 150, currentIndex = 1000;
            Dialog.prototype = {
                init: function (options) {
                    this.$container = $('<div style="display:none;"></div>');
                    this.$mask = $('<div class="biz-mask" style="display:none;"></div>');
                    this.$container.appendTo('body').after(this.$mask);
                    var self = this;
                    this.$container.addClass([
                        defaultClass,
                        options.customClass,
                        prefix + options.theme
                    ].join(' ')).html([
                        '<div class="biz-dialog-title">',
                        '<span>',
                        this.$main.attr('data-title') || options.title,
                        '</span>',
                        '<i class="biz-dialog-close biz-icon">&#xe5cd;</i></div>',
                        '<div class="biz-dialog-content"></div>',
                        '<div class="biz-dialog-bottom"></div>'
                    ].join('')).on('click.bizDialog', '.biz-dialog-close', function () {
                        self.close();
                    });
                    this.$container.find('.biz-dialog-content').append(this.$main.show());
                    this.updateButtons(options.buttons);
                    var containerWidth = typeof options.width !== 'undefined' ? Math.max(parseInt(options.width, 10), minWidth) : minWidth, containerHeight;
                    if (typeof options.height !== 'undefined') {
                        containerHeight = Math.max(parseInt(options.height, 10), minHeight);
                    } else {
                        this.$container.show();
                        containerHeight = Math.max(this.$container.height(), minHeight);
                        this.$container.hide();
                    }
                    this.$container.css({
                        width: containerWidth,
                        height: containerHeight,
                        position: options.position,
                        marginLeft: -Math.floor(containerWidth / 2),
                        marginTop: -Math.floor(Math.min(containerHeight, $(window).height()) / 2)
                    });
                    if (options.draggable) {
                        this.draggable = new Draggable(this.$container[0], {
                            handle: this.$container.find('.biz-dialog-title').addClass('biz-draggble')[0],
                            setPosition: options.position === 'absolute',
                            limit: {
                                x: [
                                    0,
                                    $('body').width() - containerWidth
                                ],
                                y: [
                                    0,
                                    $('body').height() - containerHeight
                                ]
                            }
                        });
                        this.$container.css({
                            margin: 0,
                            display: 'none',
                            left: Math.floor(($(window).width() - containerWidth) / 2),
                            top: containerHeight < $(window).height() ? Math.floor(($(window).height() - containerHeight) / 2) : 0
                        });
                    }
                },
                open: function () {
                    var index = this.options.zIndex || ++currentIndex;
                    this.$mask.css({ zIndex: index - 1 }).show();
                    this.$container.css({ zIndex: index }).show();
                },
                close: function () {
                    var result = true;
                    if (typeof this.options.onBeforeClose == 'function') {
                        result = this.options.onBeforeClose();
                        if (result === false) {
                            return;
                        }
                    }
                    this.$container.hide();
                    this.$mask.hide();
                    if (typeof this.options.zIndex == 'undefined') {
                        currentIndex--;
                    }
                    if (this.options.destroyOnClose) {
                        this.destroy();
                    }
                },
                updateButtons: function (buttonOption) {
                    buttonOption = buttonOption || [];
                    var bottom = this.$container.find('.biz-dialog-bottom'), self = this;
                    bottom.find('button').bizButton('destroy').off().remove();
                    $.each(buttonOption, function (index, buttonOption) {
                        var button = $('<button></button>').appendTo(bottom).bizButton(buttonOption);
                        if (buttonOption.onClick) {
                            button.click(function (e) {
                                buttonOption.onClick.call(self, e);
                            });
                        }
                    });
                },
                title: function (title) {
                    var titleElement = this.$container.find('.biz-dialog-title span');
                    if (undefined === title) {
                        return titleElement.html();
                    }
                    titleElement.html(title);
                },
                destroy: function () {
                    if (this.options.draggable) {
                        this.draggable.destroy();
                    }
                    this.$container.off('click.bizDialog');
                    this.$container.find('.biz-dialog-bottom button').bizButton('destroy').off();
                    this.$mask.remove();
                    this.$container.remove();
                    this.$main.data(dataKey, null);
                }
            };
            var alert = function (options) {
                if (!jQuery.isPlainObject(options)) {
                    options = { content: options.toString() };
                }
                var defaultOption = {
                        content: '',
                        okText: '\u786E\u5B9A'
                    };
                options = $.extend(defaultOption, options || {});
                var alert = $('<div style="display:none;" class="biz-alert"><i class="biz-icon">&#xe001;</i><div>' + options.content + '</div></div>');
                alert.appendTo('body').bizDialog({
                    destroyOnClose: true,
                    title: options.title,
                    theme: options.theme,
                    buttons: [{
                            text: options.okText,
                            theme: options.theme,
                            onClick: function () {
                                this.close();
                            }
                        }]
                });
                alert.bizDialog('open');
            };
            var confirm = function (options) {
                var defaultOption = {
                        content: '',
                        okText: '\u786E\u5B9A',
                        cancelText: '\u53D6\u6D88'
                    };
                options = $.extend(defaultOption, options || {});
                var confirm = $('<div style="display:none;" class="biz-confirm"><i class="biz-icon">&#xe8fd;</i><div>' + options.content + '</div></div>');
                confirm.appendTo('body').bizDialog({
                    destroyOnClose: true,
                    title: options.title,
                    theme: options.theme,
                    buttons: [
                        {
                            text: options.okText,
                            theme: options.theme,
                            onClick: function () {
                                var result = true;
                                if (typeof options.onOK == 'function') {
                                    result = options.onOK();
                                    if (result === false) {
                                        return;
                                    }
                                }
                                this.close();
                            }
                        },
                        {
                            text: options.cancelText,
                            theme: 'gray',
                            onClick: function () {
                                this.close();
                            }
                        }
                    ]
                });
                confirm.bizDialog('open');
            };
            $.extend($.fn, {
                bizDialog: function (method) {
                    var internal_return, args = arguments;
                    this.each(function () {
                        var instance = $(this).data(dataKey);
                        if (instance) {
                            if (typeof method === 'string' && typeof instance[method] === 'function') {
                                internal_return = instance[method].apply(instance, Array.prototype.slice.call(args, 1));
                                if (internal_return !== undefined) {
                                    return false;
                                }
                            }
                        } else {
                            if (method === undefined || jQuery.isPlainObject(method)) {
                                $(this).data(dataKey, new Dialog(this, method));
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
            module.exports = {
                alert: alert,
                confirm: confirm
            };
        },
        function (module, exports) {
            _require(2);
            function Input(input, options) {
                this.main = input;
                this.$main = $(this.main);
                var defaultOption = {
                        theme: bizui.theme,
                        customClass: ''
                    };
                this.options = $.extend(defaultOption, options || {});
                this.init(this.options);
            }
            var defaultClass = 'biz-input', disableClass = 'biz-input-disable', hoverClass = 'biz-input-hover', focusClass = 'biz-input-focus-', dataKey = 'bizInput';
            Input.prototype = {
                init: function (options) {
                    this.$main.addClass(defaultClass + ' ' + options.customClass);
                    this.$main.placeholder();
                    if (options.disabled) {
                        this.disable();
                    }
                    this.$main.on('mouseover.bizInput', function (e) {
                        $(this).addClass(hoverClass);
                    }).on('mouseout.bizInput', function (e) {
                        $(this).removeClass(hoverClass);
                    }).on('focus.bizInput', function (e) {
                        $(this).addClass(focusClass + options.theme);
                    }).on('blur.bizInput', function (e) {
                        $(this).removeClass(focusClass + options.theme);
                    }).on('keydown.bizInput', function (e) {
                        if (e.keyCode === 13) {
                            $(this).trigger('enter', $(this).val());
                            return false;
                        }
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
                    this.$main.removeClass([
                        defaultClass,
                        this.options.customClass,
                        disableClass
                    ].join(' '));
                    this.$main.off('keydown.bizInput').off('mouseover.bizInput').off('mouseout.bizInput').off('focus.bizInput').off('blur.bizInput');
                    this.$main.data(dataKey, null);
                }
            };
            function isInput(elem) {
                var type = elem.getAttribute('type');
                return elem.nodeType === 1 && elem.tagName.toLowerCase() === 'input' && (!type || type.toLowerCase() === 'text' || type.toLowerCase() === 'password');
            }
            $.extend($.fn, {
                bizInput: function (method) {
                    var internal_return, args = arguments;
                    this.each(function () {
                        var instance = $(this).data(dataKey);
                        if (instance) {
                            if (typeof method === 'string' && typeof instance[method] === 'function') {
                                internal_return = instance[method].apply(instance, Array.prototype.slice.call(args, 1));
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
            _require(8);
            function Page(options) {
            }
            Page.prototype = {
                destroy: function () {
                },
                disable: function () {
                },
                enable: function () {
                },
                getPageCount: function () {
                },
                getPageNumber: function () {
                },
                getPageSize: function () {
                },
                prevPage: function () {
                },
                nextPage: function () {
                },
                setPageNumber: function (pageNumber) {
                },
                setPageSize: function (pageSize) {
                },
                setTotalNumber: function (totalNumber, redraw) {
                }
            };
            $.extend($.fn, { bizPage: $.fn.pagination });
            module.exports = Page;
        },
        function (module, exports) {
            function Radio(radio, options) {
                this.main = radio;
                this.$main = $(this.main);
                this.$group = $('input[name="' + this.$main.attr('name') + '"]');
                var defaultOption = { theme: bizui.theme };
                this.options = $.extend(defaultOption, options || {});
                this.init(this.options);
            }
            var defaultClass = 'biz-label', unchecked = 'biz-radio-unchecked', uncheckedHover = 'biz-radio-unchecked-hover', checked = 'biz-radio-checked', checkedHover = 'biz-radio-checked-hover', uncheckedDisabled = 'biz-radio-unchecked-disabled', checkedDisabled = 'biz-radio-checked-disabled', dataKey = 'bizRadio', checkCodepoint = '&#xe837;', uncheckCodepoint = '&#xe836;';
            Radio.prototype = {
                init: function (options) {
                    var title = this.$main.attr('title'), id = this.$main.attr('id') || '';
                    this.$main.after('<label for="' + id + '"><i class="biz-icon"></i>' + title + '</label>').hide();
                    this.$label = this.$main.next();
                    this.defaultClass = defaultClass + ' biz-label-' + options.theme;
                    this.$label.addClass(this.defaultClass);
                    this.$icon = this.$label.children('i');
                    if (this.main.checked) {
                        this.$label.addClass(this.main.disabled ? checkedDisabled : checked);
                        this.$icon.html(checkCodepoint);
                    } else {
                        this.$label.addClass(this.main.disabled ? uncheckedDisabled : unchecked);
                        this.$icon.html(uncheckCodepoint);
                    }
                    var self = this;
                    this.$label.on('mouseover.bizRadio', function (e) {
                        if (!self.main.disabled) {
                            $(this).addClass(self.main.checked ? checkedHover : uncheckedHover);
                        }
                    }).on('mouseout.bizRadio', function (e) {
                        if (!self.main.disabled) {
                            $(this).removeClass(self.main.checked ? checkedHover : uncheckedHover);
                        }
                    }).on('click.bizRadio', function (e) {
                        if (!self.main.disabled) {
                            self.$group.bizRadio('uncheck');
                            $(this).attr('class', [
                                self.defaultClass,
                                checked,
                                checkedHover
                            ].join(' '));
                            self.$icon.html(checkCodepoint);
                            if (id === '') {
                                self.main.checked = true;
                            }
                        }
                    });
                },
                check: function () {
                    this.$group.bizRadio('uncheck');
                    this.main.checked = true;
                    this.$label.attr('class', this.defaultClass + ' ' + (this.main.disabled ? checkedDisabled : checked));
                    this.$icon.html(checkCodepoint);
                },
                uncheck: function () {
                    this.main.checked = false;
                    this.$label.attr('class', this.defaultClass + ' ' + (this.main.disabled ? uncheckedDisabled : unchecked));
                    this.$icon.html(uncheckCodepoint);
                },
                enable: function () {
                    this.main.disabled = false;
                    this.$label.attr('class', this.defaultClass + ' ' + (this.main.checked ? checked : unchecked));
                },
                disable: function () {
                    this.main.disabled = true;
                    this.$label.attr('class', this.defaultClass + ' ' + (this.main.checked ? checkedDisabled : uncheckedDisabled));
                },
                val: function () {
                    var value = '';
                    this.$group.each(function (index, element) {
                        if (element.checked) {
                            value = $(element).val();
                            return false;
                        }
                    });
                    return value;
                },
                destroy: function () {
                    this.$main.show();
                    this.$label.off('mouseover.bizRadio').off('mouseout.bizRadio').off('click.bizRadio').remove();
                    this.$main.data(dataKey, null);
                }
            };
            function isRadio(elem) {
                return elem.nodeType === 1 && elem.tagName.toLowerCase() === 'input' && elem.getAttribute('type').toLowerCase() === 'radio';
            }
            $.extend($.fn, {
                bizRadio: function (method) {
                    var internal_return, args = arguments;
                    this.each(function () {
                        var instance = $(this).data(dataKey);
                        if (instance) {
                            if (typeof method === 'string' && typeof instance[method] === 'function') {
                                internal_return = instance[method].apply(instance, Array.prototype.slice.call(args, 1));
                                if (internal_return !== undefined) {
                                    return false;
                                }
                            }
                        } else {
                            if (isRadio(this) && (method === undefined || jQuery.isPlainObject(method))) {
                                $(this).data(dataKey, new Radio(this, method));
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
            module.exports = Radio;
        },
        function (module, exports) {
            function Tab(tab, options) {
                this.main = tab;
                this.$main = $(this.main);
                var defaultOption = {
                        action: 'click',
                        customClass: '',
                        selectedIndex: 0,
                        theme: bizui.theme
                    };
                this.options = $.extend(defaultOption, options || {});
                this.init(this.options);
            }
            var defaultClass = 'biz-tab', prefix = 'biz-tab-', dataKey = 'bizTab';
            Tab.prototype = {
                init: function (options) {
                    this.$main.addClass([
                        defaultClass,
                        options.customClass,
                        prefix + options.theme
                    ].join(' '));
                    this.$tabs = this.$main.children('ul').children('li');
                    this.$contents = this.$main.children('div').children('div').hide();
                    var self = this;
                    if (options.action === 'hover') {
                        options.action = 'mouseover';
                    }
                    this.$tabs.on(options.action + '.bizTab', function (e) {
                        if (!$(this).hasClass('active')) {
                            var index;
                            self.$tabs.each(function (i, tab) {
                                if (tab === e.target) {
                                    index = i;
                                    return false;
                                }
                            });
                            self.index(index);
                        }
                    });
                    this.index(options.selectedIndex, false);
                },
                index: function (selectedIndex, fire) {
                    var curTab, curContent;
                    if (typeof selectedIndex != 'undefined') {
                        this.$tabs.removeClass('active');
                        this.$contents.hide();
                        this.options.selectedIndex = selectedIndex;
                        curTab = $(this.$tabs[selectedIndex]).addClass('active');
                        curContent = $(this.$contents[selectedIndex]).show();
                        if (fire === undefined || !!fire) {
                            curTab.trigger('changeTab', {
                                index: selectedIndex,
                                title: curTab.text(),
                                content: curContent.html()
                            });
                        }
                    } else {
                        var curIndex = this.options.selectedIndex;
                        curTab = $(this.$tabs[curIndex]);
                        curContent = $(this.$contents[curIndex]);
                        return {
                            index: curIndex,
                            title: curTab.text(),
                            content: curContent.html()
                        };
                    }
                },
                destroy: function () {
                    this.$main.removeClass([
                        defaultClass,
                        this.options.customClass,
                        prefix + this.options.theme
                    ].join(' '));
                    this.$tabs.off(this.options.action + '.bizTab');
                    this.$main.data(dataKey, null);
                }
            };
            function isTab(elem) {
                return elem.nodeType === 1 && elem.tagName.toLowerCase() === 'div';
            }
            $.extend($.fn, {
                bizTab: function (method) {
                    var internal_return, args = arguments;
                    this.each(function () {
                        var instance = $(this).data(dataKey);
                        if (instance) {
                            if (typeof method === 'string' && typeof instance[method] === 'function') {
                                internal_return = instance[method].apply(instance, Array.prototype.slice.call(args, 1));
                                if (internal_return !== undefined) {
                                    return false;
                                }
                            }
                        } else {
                            if (isTab(this) && (method === undefined || jQuery.isPlainObject(method))) {
                                $(this).data(dataKey, new Tab(this, method));
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
            module.exports = Tab;
        },
        function (module, exports) {
            _require(2);
            function Textarea(textarea, options) {
                this.main = textarea;
                this.$main = $(this.main);
                var defaultOption = {
                        theme: bizui.theme,
                        customClass: ''
                    };
                this.options = $.extend(defaultOption, options || {});
                this.init(this.options);
            }
            var defaultClass = 'biz-textarea', disableClass = 'biz-textarea-disable', hoverClass = 'biz-textarea-hover', focusClass = 'biz-textarea-focus-', dataKey = 'bizTextarea';
            Textarea.prototype = {
                init: function (options) {
                    this.$main.addClass(defaultClass + ' ' + options.customClass);
                    this.$main.placeholder();
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
                    this.$main.removeClass([
                        defaultClass,
                        this.options.customClass,
                        disableClass
                    ].join(' '));
                    this.$main.off('mouseover.bizTextarea').off('mouseout.bizTextarea').off('focus.bizTextarea').off('blur.bizTextarea');
                    this.$main.data(dataKey, null);
                }
            };
            function isTextarea(elem) {
                return elem.nodeType === 1 && elem.tagName.toLowerCase() === 'textarea';
            }
            $.extend($.fn, {
                bizTextarea: function (method) {
                    var internal_return, args = arguments;
                    this.each(function () {
                        var instance = $(this).data(dataKey);
                        if (instance) {
                            if (typeof method === 'string' && typeof instance[method] === 'function') {
                                internal_return = instance[method].apply(instance, Array.prototype.slice.call(args, 1));
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
        },
        function (module, exports) {
            function Textline(textline, options) {
                this.main = textline;
                this.$main = $(this.main);
                var defaultOption = {
                        theme: bizui.theme,
                        customClass: ''
                    };
                this.options = $.extend(defaultOption, options || {});
                this.init(this.options);
            }
            var defaultClass = 'biz-textline', disableClass = 'biz-textline-disable', hoverClass = 'biz-textline-hover', focusClass = 'biz-textline-focus-', prefix = 'biz-textline-', dataKey = 'bizTextline';
            Textline.prototype = {
                init: function (options) {
                    this.$main.addClass([
                        defaultClass,
                        options.customClass,
                        prefix + options.theme
                    ].join(' ')).html('<div><pre></pre></div><textarea></textarea>');
                    var w = options.width || this.$main.width(), h = options.height || this.$main.height();
                    w = Math.max(w, 200);
                    h = Math.max(h, 52);
                    this.$main.css({
                        width: w,
                        height: h
                    });
                    this.$line = this.$main.children('div').css({ height: h - 10 });
                    this.$lineNumber = this.$main.find('pre');
                    this.$textarea = this.$main.children('textarea').css({
                        width: w - 36,
                        height: h - 12
                    });
                    if (options.disabled) {
                        this.disable();
                    }
                    var self = this;
                    this.$textarea.on('mouseover.bizTextline', function (e) {
                        $(this).addClass(hoverClass);
                    }).on('mouseout.bizTextline', function (e) {
                        $(this).removeClass(hoverClass);
                    }).on('focus.bizTextline', function (e) {
                        $(this).addClass(focusClass + options.theme);
                    }).on('blur.bizTextline', function (e) {
                        $(this).removeClass(focusClass + options.theme);
                    }).on('keyup.bizTextline.render', function (e) {
                        self.renderLineNumber(e.target.scrollTop);
                    }).on('scroll.bizTextline', function (e) {
                        self.scrollLineNumber(e.target.scrollTop);
                    });
                    if (parseInt(options.maxLine, 10) >= 1) {
                        this.$textarea.on('keyup.bizTextline.maxLine', function (e) {
                            if (e.keyCode === 13) {
                                var valArray = self.valArray(), length = valArray.length;
                                if (length > options.maxLine) {
                                    valArray.splice(options.maxLine, length - options.maxLine);
                                    self.valArray(valArray);
                                }
                            }
                        });
                    }
                    this.renderLineNumber(0);
                    if (typeof options.val === 'string') {
                        this.val(options.val);
                    }
                    if (jQuery.isArray(options.valArray)) {
                        this.valArray(options.valArray);
                    }
                },
                enable: function () {
                    this.$textarea[0].disabled = false;
                    this.$textarea.removeClass(disableClass);
                },
                disable: function () {
                    this.$textarea[0].disabled = true;
                    this.$textarea.addClass(disableClass);
                },
                length: function () {
                    return this.$textarea.val().replace(/\r?\n/g, '').length;
                },
                val: function (value) {
                    if (undefined === value) {
                        return this.$textarea.val();
                    }
                    if (parseInt(this.options.maxLine, 10) >= 1) {
                        var valArray = value.split('\n'), length = valArray.length;
                        if (length > this.options.maxLine) {
                            valArray.splice(this.options.maxLine, length - this.options.maxLine);
                            value = valArray.join('\n');
                        }
                    }
                    this.$textarea.val(value);
                    this.renderLineNumber(0);
                },
                valArray: function (value) {
                    if (undefined === value) {
                        return this.val().split('\n');
                    }
                    if (parseInt(this.options.maxLine, 10) >= 1) {
                        var length = value.length;
                        if (length > this.options.maxLine) {
                            value.splice(this.options.maxLine, length - this.options.maxLine);
                        }
                    }
                    this.$textarea.val(value.join('\n'));
                    this.renderLineNumber(0);
                },
                destroy: function () {
                    this.$textarea.off('mouseover.bizTextline').off('mouseout.bizTextline').off('focus.bizTextline').off('blur.bizTextline').off('keyup.bizTextline').off('scroll.bizTextline');
                    this.$main.removeClass([
                        defaultClass,
                        this.options.customClass,
                        prefix + this.options.theme
                    ].join(' ')).empty();
                    this.$main.data(dataKey, null);
                },
                renderLineNumber: function (scrollTop) {
                    var lineCount = this.$textarea.val().split('\n').length, numbers = '1';
                    for (var i = 2; i <= lineCount; i++) {
                        numbers += '\n' + i;
                    }
                    this.$lineNumber.html(numbers);
                    this.scrollLineNumber(scrollTop);
                },
                scrollLineNumber: function (scrollTop) {
                    this.$lineNumber.css({ top: 5 - scrollTop });
                }
            };
            function isTextline(elem) {
                return elem.nodeType === 1 && elem.tagName.toLowerCase() === 'div';
            }
            $.extend($.fn, {
                bizTextline: function (method) {
                    var internal_return, args = arguments;
                    this.each(function () {
                        var instance = $(this).data(dataKey);
                        if (instance) {
                            if (typeof method === 'string' && typeof instance[method] === 'function') {
                                internal_return = instance[method].apply(instance, Array.prototype.slice.call(args, 1));
                                if (internal_return !== undefined) {
                                    return false;
                                }
                            }
                        } else {
                            if (isTextline(this) && (method === undefined || jQuery.isPlainObject(method))) {
                                $(this).data(dataKey, new Textline(this, method));
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
            module.exports = Textline;
        },
        function (module, exports) {
            _require(4);
            function Tooltip(options) {
                if (options.theme) {
                    options.tooltipClass = 'biz-tooltip-' + options.theme;
                }
                if (options.removeAll) {
                    $(document).off('focus.tips', '**');
                }
                $.tips(options);
            }
            module.exports = Tooltip;
        },
        function (module, exports) {
            _require(9);
            function TreeTable(options) {
            }
            TreeTable.prototype = {
                destroy: function () {
                },
                collapseAll: function () {
                },
                collapseNode: function (id) {
                },
                expandAll: function () {
                },
                expandNode: function (nodeId) {
                },
                loadBranch: function (parentId, rows) {
                },
                move: function (nodeId, newParentId) {
                },
                node: function (nodeId) {
                },
                reveal: function (nodeId) {
                },
                removeNode: function (nodeId) {
                },
                unloadBranch: function (parentNode) {
                },
                sortBranch: function (parentNode, sortFunction) {
                }
            };
            $.extend($.fn, { bizTreeTable: $.fn.treetable });
            module.exports = TreeTable;
        }
    ];
    return _require(5);
}));