var Page = Backbone.View.extend({
    el: '.main',

    render: function() {
        this.$('aside .page').parent().addClass('active');

        var view = this;
        $.get('src/components/Page/page.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
        });
    },

    destroy: function() {
        this.$el.empty();
    }
});
