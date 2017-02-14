var Radio = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .radio').parent().addClass('active');

        var view = this;
        $.get('src/components/Radio/radio.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
        });
    },

    destroy: function() {
        this.$el.empty();
    }
});
