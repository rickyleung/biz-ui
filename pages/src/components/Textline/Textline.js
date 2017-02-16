var Textline = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .textline').parent().addClass('active');

        var view = this;
        $.get('src/components/Textline/textline.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
      		view.initBizUI();
      		hljs.initHighlighting.called = false;
      		hljs.initHighlighting();
        });
    },

	initBizUI: function() {
        $('.line1').bizTextline();
        $('.line1').bizTextline('val', 'a\nb\nc');
        $('.line2').bizTextline({
            theme: 'gray',
            width: 300,
            height: 150,
            maxLine: 3
        });
        $('.line2').bizTextline('valArray', ['d', 'e', 'f']);
	},

    destroy: function() {
        $('.textline').bizTextline('destroy');
        this.$el.empty();
    }
});
