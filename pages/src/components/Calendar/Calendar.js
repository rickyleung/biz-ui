var Calendar = Backbone.View.extend({
    el: '.main',

    render: function() {
        $('aside .calendar').parent().addClass('active');

        var view = this;
        $.get('src/components/Calendar/calendar.html', function(tpl) {
            view.$el.html(Mustache.render(tpl));
        });
    },

    destroy: function() {
        this.$el.empty();
    }
});
