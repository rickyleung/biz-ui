var Button = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .button').parent().addClass('active');

        var view = this;
        $.get('src/components/Button/button.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
			view.initBizUI();
			hljs.initHighlighting.called = false;
			hljs.initHighlighting();
        });
    },

	initBizUI: function() {
		$('.blue').bizButton({icon: 'done'});
		$('.light-blue').bizButton({theme: 'light-blue', icon: 'search'});
		$('.cyan').bizButton({theme: 'cyan'});
		$('.teal').bizButton({theme: 'teal'});
		$('.green').bizButton({theme: 'green'});
		$('.light-green').bizButton({theme: 'light-green'});
		$('.lime').bizButton({theme: 'lime'});
		$('.yellow').bizButton({theme: 'yellow'});
		$('.amber').bizButton({theme: 'amber'});
		$('.orange').bizButton({theme: 'orange'});
		$('.brown').bizButton({theme: 'brown'});
		$('.blue-gray').bizButton({theme: 'blue-gray'});
		$('.gray').bizButton({theme: 'gray'});
		$('.deep-orange').bizButton({theme: 'deep-orange', size: 'large', icon: 'get_app'});
		$('.red').bizButton({theme: 'red', size: 'large', icon: 'feedback'});
		$('.pink').bizButton({theme: 'pink', size: 'large'});
		$('.purple').bizButton({theme: 'purple', size: 'large'});
		$('.deep-purple').bizButton({theme: 'deep-purple', size: 'large'});
		$('.indigo').bizButton({theme: 'indigo', size: 'large'});
		$('.disabled').bizButton({disabled: true});
	},

    destroy: function() {
		$('button').bizButton('destroy');
        this.$el.empty();
    }
});
