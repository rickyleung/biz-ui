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
            'use strict';
            var bind = function (t, e) {
                return function () {
                    return t.apply(e, arguments);
                };
            };
            !function (t) {
                return 'object' == typeof module && module.exports ? module.exports = t(_require(1)) : 'function' == typeof define && define.amd ? define(['jquery'], t) : t(jQuery);
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
            var bizui = {
                    theme: 'blue',
                    codepoints: _require(4),
                    Button: _require(5),
                    Input: _require(6),
                    Textarea: _require(7),
                    Textline: _require(8),
                    Tooltip: _require(9)
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
            _require(0);
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
            _require(0);
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
            _require(2);
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
        }
    ];
    return _require(3);
}));