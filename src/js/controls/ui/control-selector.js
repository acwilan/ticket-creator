this.ControlSelectorControl = Control.extend({
    constructor: function(name) {
        this.base('ControlSelector', name);
        ControlManager.addControlAddedListener(this);
        ControlManager.addOnControlPropertyChangeListener(this);
        
        this.setWidth('100%');
    },
    _buildDom: function() {
        var sel = $('<select/>');
        for (var name in ControlManager.controls) {
            if (name !== this.getName()) {
                var ctrl = ControlManager.controls[name];
                $('<option/>').attr('value',name).text(ctrl.getType()+'.'+name).appendTo(sel);
                if (ControlManager.selected === undefined) {
                    ControlManager.selected = ctrl;
                }
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
            ctrl = ControlManager.getByName(name);
        ControlManager.selected = ctrl;
    },
    onControlPropertyChange: function(ctrl, name, value) {
        if (name === 'name') {
            var opt = this._domHandle.find('option[value='+ctrl.getName()+']');
            if (opt !== undefined) {
                opt.attr('value', value);
                opt.text(ctrl.getType()+'.'+value);
            }
        }
    }
});