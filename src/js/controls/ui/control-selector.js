this.ControlSelectorControl = Control.extend({
    constructor: function(name) {
        this.base('ControlSelector', name);
        ControlIndex.addListener(this);
        this._changeListeners = [];
    },
    _buildDom: function() {
        var sel = $('<select/>');
        for (var name in ControlIndex.controls) {
            if (name !== this.getName()) {
                var ctrl = ControlIndex.controls[name];
                $('<option/>').attr('value',name).text(ctrl.getType()+'.'+name).appendTo(sel);
            }
        }
        sel.on('change', this.onSelectionChange);
        //sel.select2();
        return sel;
    },
    onControlAdded: function(control) {
        if (control instanceof Control && control.getName() !== this.getName()) {
            $('<option/>').attr('value',control.getName()).text(control.getType()+'.'+control.getName())
                .appendTo(this._domHandle);
        }
    },
    onSelectionChange: function(e) {
        var name = $(e.target).val(),
            ctrl = ControlIndex.getByName(name);
        for (var i = 0; i < this._changeListeners.length; i++) {
            this._changeListeners[i].onControlSelected(ctrl);
        }
    },
    addOnChangeListener: function(listener) {
        if (listener.onControlSelected !== undefined) {
            this._changeListeners.push(listener);
        }
        return this;
    }
});