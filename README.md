BizUI - A jQuery plugin for business UI components
===============

[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-image]][npm-url]

[travis-image]: https://travis-ci.org/bizdevfe/biz-ui.svg
[travis-url]: https://travis-ci.org/bizdevfe/biz-ui
[npm-image]: http://img.shields.io/npm/v/biz-ui.svg
[npm-url]: https://npmjs.org/package/biz-ui

Browser support
--------
IE10+, Firefox, Chrome and Safari.

Dependence
--------
jQuery 1.9.1+

Usage
--------
Install the latest version of BizUI via npm or bower, adding it to your dependencies:

	npm install biz-ui --save
	bower install biz-ui --save

It's recommended to bundle BizUI into a vendor chunk in your project, webpack configration for example:

    entry: {
        // stuff
        vendor: ['jquery', 'biz-ui']
    }

If you're not using a build system, just include the css file and the js file together width jQuery in your page:

    <link rel="stylesheet" type="text/css" href="jquery.bizui.css">
    <script src="jquery.js"></script>
    <script src="jquery.bizui.js"></script>

Use it in any module or global environment as a common jQuery plugin:

    $('button').bizButton();

    $('button').bizButton('destroy');

Themes
--------
Provided 19 themes, setting by the `theme` field:

    $('button').bizButton({
	    theme: 'light-blue'
    });

or you can set `bizui.theme` all at once:

    bizui.theme = 'light-blue';

Iconfonts
--------
Supported iconfonts via [Google Material Design Icons](https://material.io/icons/), for example:

    <i class="biz-icon">3d_rotation</i>
    <i class="biz-icon">&amp;#xE84D;</i>

Build
--------
    $ npm install
    $ npm run build

Get documentations
--------
    $ npm run doc
