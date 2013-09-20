this.ControlSelectorControl = Control.extend({
    constructor: function(name) {
        this.base('ControlSelector', name);
        ControlManager.addControlAddedListener(this);
        ControlManager.addOnControlPropertyChangeListener(this);
        ControlManager.addOnControlSelectionChangeListener(this);
        ControlManager.addOnControlDeletedListener(this);
        
        this.setWidth('100%');
    },
    _buildDom: function() {
        var sel = $('<select/>');
        for (var name in ControlManager.controls) {
            if (name !== this.getName()) {
                var ctrl = ControlManager.controls[name];
                if (ctrl.getType() === 'Text' || ctrl.getType() === 'TicketCanvas' || ctrl.getType() === 'DataText') {
                    $('<option/>').attr('value',name).text(ctrl.getType()+'.'+name).appendTo(sel);
                    if (ControlManager.selected === undefined) {
                        ControlManager.setSelected(ctrl);
                    }
                }
            }
        }
        sel.on('change', this.onSelectionChange);
        //sel.select2();
        return sel;
    },
    onControlAdded: function(control) {
        if (control instanceof Control && control.getName() !== this.getName() && (control.getType() === 'Text' || control.getType() === 'TicketCanvas' || control.getType() === 'DataText')) {
            $('<option/>').attr('value',control.getName()).text(control.getType()+'.'+control.getName())
                .appendTo(this._domHandle);
        }
    },
    onSelectionChange: function(e) {
        if (this.externalSelectionChange === undefined || !this.externalSelectionChange) {
            var name = $(e.target).val(),
                ctrl = ControlManager.getControlByName(name);
            if (ctrl !== undefined) {
                ControlManager.setSelected(ctrl);
            }
        } else {
            this.externalSelectionChange = false;
        }
    },
    onControlPropertyChange: function(ctrl, name, value) {
        if (name === 'name') {
            var opt = this._domHandle.find('option[value='+ctrl.getName()+']');
            if (opt !== undefined) {
                opt.attr('value', value);
                opt.text(ctrl.getType()+'.'+value);
            }
        }
    },
    onControlSelectionChange: function(ctrl) {
        if (ctrl.getType() === 'Text' || ctrl.getType() === 'TicketCanvas' || ctrl.getType() === 'DataText') {
            this.externalSelectionChange = true;
            this._domHandle.val(ctrl.getName());
        }
    },
    onControlDeleted: function(type, name) {
        this._domHandle.find('option[value='+name+']').remove();
    }
});