this.TextControl = Control.extend({
    constructor: function(name) {
        this.base('TextControl', name);
        
        this.setWidth('auto');
        this.setHeight('auto');
        this.setLeft(0);
        this.setTop(0);
        
        this.setText('');
        this.setFontSize(5);
    },
    _buildDom: function() {
        var container = $('<div/>').addClass('text-container').css({
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'border': '1px dotted #555'
        }).append(
            $('<span/>').addClass('text')
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
    },
    getFontSize: function() {
        return this.getProperty('font-size').replace('mm', '');
    },
    setFontSize: function(val) {
        this.setProperty('font-size', val);
        this._domHandle.children().css('font-size', val+'mm');
        return this;
    },
    getOrientation: function() {
        return this.getProperty('orientation');
    },
    setOrientation: function(val) {
        this.setProperty('orientation', val);
    }
});