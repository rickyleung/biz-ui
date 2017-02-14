var Tooltip = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .tooltip').parent().addClass('active');

        var view = this;
        $.get('src/components/Tooltip/tooltip.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
        });
    },

    destroy: function() {
        this.$el.empty();
    }
});
