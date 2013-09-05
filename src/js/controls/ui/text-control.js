this.TextControl = Control.extend({
    constructor: function(name) {
        this.base('Text', name);
        
        this.setWidth('auto');
        this.setHeight('auto');
        this.setLeft(0);
        this.setTop(0);
        
        this.setText('');
        this.setFontSize(10);
        this.setOrientation('horizontal');
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
        return this.getProperty('font-size').replace('pt', '');
    },
    setFontSize: function(val) {
        this.setProperty('font-size', val);
        this._domHandle.children().css('font-size', val+'pt');
        return this;
    },
    getOrientation: function() {
        return this.getProperty('orientation');
    },
    setOrientation: function(val) {
        val = val.toLowerCase();
        if (val === 'horizontal' || val === 'vertical') {
            this.setProperty('orientation', val);
            this._domHandle.removeClass('text-orientation-vertical text-orientation-horizontal');
            this._domHandle.addClass('text-orientation-'+val);
        }
    }
});