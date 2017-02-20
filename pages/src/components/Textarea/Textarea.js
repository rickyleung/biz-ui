var Textarea = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .textarea').parent().addClass('active');

        var view = this;
        $.get('src/components/Textarea/textarea.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
      		view.initBizUI();
      		hljs.initHighlighting.called = false;
      		hljs.initHighlighting();
        });
    },

	initBizUI: function() {
        $('textarea').bizTextarea();
        $('.content2').bizTextarea('disable');
        $('button').bizButton({
            theme: 'blue-gray'
        }).click(function() {
            alert($('.content1').bizTextarea('length'));
        });
	},

    destroy: function() {
		$('textarea').bizTextarea('destroy');
		$('button').bizButton('destroy');
        this.$el.empty();
    }
});
