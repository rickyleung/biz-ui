var Dialog = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .dialog').parent().addClass('active');

        var view = this;
        $.get('src/components/Dialog/dialog.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
			view.initBizUI();
			hljs.initHighlighting.called = false;
			hljs.initHighlighting();
        });
    },

	initBizUI: function() {
        $('button').bizButton({
            theme: 'blue-gray'
        });
        $('.d1').bizDialog({
            buttons: [
                {
                    text: 'OK',
                    onClick: function() {
                        this.close();
                    }
                },
                {
                    text: 'Cancel',
                    theme: 'gray',
                    onClick: function() {
                        this.close();
                    }
                }
            ]
        });
        $('.b1').click(function() {
            $('.d1').bizDialog('open');
        });
        $('.b2').click(function() {
            bizui.alert({
                title: 'Alert',
                content: 'Content',
                theme: 'red'
            });
        });
        $('.b3').click(function() {
            bizui.confirm({
                title: 'Confirm',
                content: 'Content',
                theme: 'green'
            });
        });
	},

    destroy: function() {
        $('button').bizButton('destroy');
        $('.d1').bizDialog('destroy');
        this.$el.empty();
    }
});
