// default size: 165mm x 80mm
this.TicketCanvasControl = Control.extend({
    constructor: function(name) {
        this.base('TicketCanvas', name);
        this.setWidth(80);
        this.setHeight(165);
        
        if (this._domHandle !== undefined) {
            var instance = this;
            this._domHandle.on('click', function(e) {
                ControlManager.setSelected(instance);
                e.stopPropagation();
            });
        }
    },
    _buildDom: function() {
        return $('<div/>').css({
                'position':'relative',
                'z-index': 0,
                'border': '1px solid #000',
                'background': '#FFF',
                'margin': '0 auto'
            });
    }
});