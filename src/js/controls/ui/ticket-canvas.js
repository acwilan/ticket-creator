// default size: 165mm x 80mm
this.TicketCanvasControl = Control.extend({
    constructor: function(name) {
        this.base('TicketCanvas', name);
        this.setWidth(80);
        this.setHeight(165);
        this.setBackground('none');
        
        if (this._domHandle !== undefined) {
            var instance = this;
            this._domHandle.on('click', function(e) {
                ControlManager.setSelected(instance);
                e.stopPropagation();
            });
            this._domHandle.css({
                'background-position': 'left top',
                'background-repeat': 'no-repeat'
            });
        }
    },
    _buildDom: function() {
        var instance = this;
        return $('<div/>').css({
                'position':'relative',
                'z-index': 0,
                'border': '1px solid #000',
                'background': '#FFF',
                'margin': '0 auto'
            }).addClass('jstree-drop').droppable({
                drop: function(e, ui) {
                    if (ui.helper.length > 0) {
                        var field = $(ui.helper[0]).attr('href') !== undefined ? $(ui.helper[0]).attr('href').substr(1) : undefined,
                            type = $(ui.helper[0]).attr('data-type'),
                            ctrl = ControlManager.createControl(type),
                            x = ScreenUtils.getMilimetersFromPixels($(ui.helper).offset().left - $(e.target).offset().left),
                            y = ScreenUtils.getMilimetersFromPixels($(ui.helper).offset().top - $(e.target).offset().top);
                        if (ctrl !== undefined) {
                            if (field !== undefined && field.length > 0) {
                                ctrl.setDataField(field);
                            }
                            ctrl.setTop(y);
                            ctrl.setLeft(x);
                            instance.addControl(ctrl);
                            ControlManager.setSelected(ctrl);
                        }
                    }
                }
            });
    },
    getBackground: function() {
        return this.getProperty('background');
    },
    setBackground: function(val) {
        this._domHandle.css({
            'background-image': "url('"+val+"')"
        });
        this.setProperty('background',val);
    }
});