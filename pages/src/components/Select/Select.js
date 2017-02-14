var Select = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .select').parent().addClass('active');

        var view = this;
        $.get('src/components/Select/select.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
        });
    },

    destroy: function() {
        this.$el.empty();
    }
});
