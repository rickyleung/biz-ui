require('../deps/jquery.simplePagination');

/**
 * Page
 * @class
 * @param {Object} options - 参数
 * @param {String} options.customClass - 自定义 CSS class
 * @param {String} options.nextText - 后一页标识，默认 biz-icon: chevron_right
 * @param {Number} options.pageNumber - 当前页码，默认1
 * @param {Number} options.pageSize - 每页条数，默认1
 * @param {String} options.prevText - 前一页标识，默认 biz-icon: chevron_left
 * @param {String} options.theme - 主题
 * @param {Number} options.totalNumber - 总条数，默认1
 */
function Page(options) {}

Page.prototype = {
    /**
     * 禁用
     */
    destroy: function() {},
    /**
     * 禁用
     */
    disable: function() {},
    /**
     * 激活
     */
    enable: function() {},
    /**
     * 获取页数
     * @return 页数
     */
    getPageCount: function() {},
    /**
     * 获取当前页码
     * @return 当前页码
     */
    getPageNumber: function() {},
    /**
     * 获取每页条数
     * @return 每页条数
     */
    getPageSize: function() {},
    /**
     * 向前翻一页
     * @fires Page#changePage
     */
    prevPage: function() {},
    /**
     * 向后翻一页
     * @fires Page#changePage
     */
    nextPage: function() {},
    /**
     * 设置当前页码
     * @param {Number} pageNumber - 当前页码
     * @fires Page#changePage
     */
    setPageNumber: function(pageNumber) {
        /**
         * 页码变更
         * @event Page#changePage
         * @param {Object} e - 事件对象
         * @param {Number} pageNumber - 当前页码
         */
    },
    /**
     * 设置每页条数，设置后会定位至第一页
     * @param {Number} pageSize - 每页条数
     * @fires Page#changePage
     */
    setPageSize: function(pageSize) {},
    /**
     * 设置总条数
     * @param {Number} totalNumber - 总条数
     * @param {Boolean} redraw - 重绘（定位至第一页），默认 false
     */
    setTotalNumber: function(totalNumber, redraw) {}
};

$.extend($.fn, {
    bizPage: $.fn.pagination
});

module.exports = Page;