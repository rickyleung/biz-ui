var Tooltip = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .tooltip').parent().addClass('active');

        var view = this;
        $.get('src/components/Tooltip/tooltip.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));view.$el.html(Mustache.render(tpl));
			view.initBizUI();
			hljs.initHighlighting.called = false;
			hljs.initHighlighting();
        });
    },

	initBizUI: function() {
        $('input').bizInput();
        $('button').bizButton();
        bizui.Tooltip({
            element: 'input',
            theme: 'orange'
        });
        bizui.Tooltip({
            element: 'button',
            action: 'hover'
        });
        bizui.Tooltip({
            element: '.protocol',
            preventDefault: true,
            action: 'click'
        });
	},

    destroy: function() {
        bizui.Tooltip({
            removeAll: true
        });
        this.$el.empty();
    }
});
