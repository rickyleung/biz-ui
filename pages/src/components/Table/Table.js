var Table = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .table').parent().addClass('active');

        var view = this;
        $.get('src/components/Table/table.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
        });
    },

    destroy: function() {
        this.$el.empty();
    }
});
