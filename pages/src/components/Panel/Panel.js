var Panel = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .panel').parent().addClass('active');

        var view = this;
        $.get('src/components/Panel/panel.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
        });
    },

    destroy: function() {
        this.$el.empty();
    }
});
