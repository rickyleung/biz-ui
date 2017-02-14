var Dialog = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .dialog').parent().addClass('active');

        var view = this;
        $.get('src/components/Dialog/dialog.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
        });
    },

    destroy: function() {
        this.$el.empty();
    }
});
