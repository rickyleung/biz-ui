var Tree = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .tree').parent().addClass('active');

        var view = this;
        $.get('src/components/Tree/tree.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
        });
    },

    destroy: function() {
        this.$el.empty();
    }
});
