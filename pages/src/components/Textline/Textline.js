var Textline = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .textline').parent().addClass('active');

        var view = this;
        $.get('src/components/Textline/textline.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
        });
    },

    destroy: function() {
        this.$el.empty();
    }
});
