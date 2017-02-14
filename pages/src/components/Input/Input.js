var Input = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .input').parent().addClass('active');

        var view = this;
        $.get('src/components/Input/input.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
        });
    },

    destroy: function() {
        this.$el.empty();
    }
});
