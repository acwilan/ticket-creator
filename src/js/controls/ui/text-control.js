this.TextControl = Control.extend({
    constructor: function(name) {
        this.base('TextControl', name);
        this.setText('');
    },
    _buildDom: function() {
        var container = $('<div/>').css({
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'border': '1px dotted #555'
        }).append(
            $('<span/>')
        );
        var obj = this;
        container.draggable({
            containment: "parent",
            stop: function(e, ui) {
                obj.setTop(ui.position.top, false);
                obj.setLeft(ui.position.left, false);
            }
        });
        return container;
    },
    getText: function() {
        return this.getProperty('text');
    },
    setText: function(val) {
        this.setProperty('text', val);
        val = val === "" ? '['+this.getName()+']' : val;
        this._domHandle.children().text(val);
        return this;
    }
});