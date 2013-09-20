this.DataTextControl = Control.extend({
    constructor: function(name) {
        this.base('DataText', name);
        
        this.setWidth('auto');
        this.setHeight('auto');
        this.setLeft(0);
        this.setTop(0);
        
        this.setDataField('none');
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
        
        if (container !== undefined) {
            container.draggable({
                containment: "parent",
                stop: function(e, ui) {
                    var x = ScreenUtils.getMilimetersFromPixels(ui.position.left),
                        y = ScreenUtils.getMilimetersFromPixels(ui.position.top);
                    ControlManager.setSelected(obj);
                    obj.setTop(y, false);
                    obj.setLeft(x, false);
                }
            })
            .on('dblclick', function(e) {
                e.preventDefault();
                obj.toggleOrientation();
            })
            .on('click', function(e) {
                ControlManager.setSelected(obj);
                e.stopPropagation();
            });
        }
        return container;
    },
    getDataField: function() {
        return this.getProperty('data-field');
    },
    setDataField: function(val) {
        this.setProperty('data-field', val);
        val = val === "" ? '{none}' : '{'+val+'}';
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
    },
    toggleOrientation: function() {
        if (this.getOrientation() === 'horizontal') {
            this.setOrientation('vertical');
        } else {
            this.setOrientation('horizontal');
        }
    }
});