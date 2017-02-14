var Treetable = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .treetable').parent().addClass('active');

        var view = this;
        $.get('src/components/Treetable/treetable.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
        });
    },

    destroy: function() {
        this.$el.empty();
    }
});
