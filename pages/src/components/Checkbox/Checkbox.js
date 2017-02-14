var Checkbox = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .checkbox').parent().addClass('active');

        var view = this;
        $.get('src/components/Checkbox/checkbox.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
        });
    },

    destroy: function() {
        this.$el.empty();
    }
});
