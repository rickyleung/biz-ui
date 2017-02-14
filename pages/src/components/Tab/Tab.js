var Tab = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .tab').parent().addClass('active');

        var view = this;
        $.get('src/components/Tab/tab.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
        });
    },

    destroy: function() {
        this.$el.empty();
    }
});
