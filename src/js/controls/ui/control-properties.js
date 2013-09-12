this.ControlPropertiesControl = Control.extend({
    constructor: function(name) {
        this.base('ControlProperties', name);
        this.selectedControl = undefined;
        ControlManager.addOnControlSelectionChangeListener(this);
        ControlManager.addOnControlPropertyChangeListener(this);
    },
    _buildDom: function() {
        return $('<form/>').addClass('form-horizontal col-md-11').attr('role','form');
    },
    onControlSelectionChange: function(ctrl) {
        var domObj = this._domHandle,
            obj = this;
        
        this.selectedControl = ctrl;
        this._domHandle.children().remove();
        
        ctrl.forEachProperty(function(name, val) {
            if (obj.propertiesMeta[name] === undefined || !obj.propertiesMeta[name].hidden) {
                var id = ctrl.getName()+'-'+name,
                    input = $('<input/>').attr({
                            'id': id,
                            'type': 'text',
                            'value': val
                        }).addClass('form-control').on('change', function(e) {
                            if (ctrl[('set-'+name).toCamelCase()] !== undefined) {
                                ctrl[('set-'+name).toCamelCase()]($(e.target).val());
                            }
                        });
                if (obj.propertiesMeta[name] !== undefined && obj.propertiesMeta[name].disabled) {
                    input.attr('disabled', 'disabled');
                }
                $('<div/>').addClass('form-group').append(
                    $('<label/>')/*.addClass('col-md-4 control-label')*/.attr('for',id).text(name),
                    //$('<div/>').addClass('col-md-8').append(
                        input
                    //)
                ).appendTo(domObj);
            }
        });
        
        /*$('<div/>').addClass('btn-group').append(
            $('<button/>').addClass('btn btn-primary').text('Save')
        ).appendTo(domObj);*/
    },
    onControlPropertyChange: function(ctrl, name, value) {
        if (this.selectedControl !== undefined && this.selectedControl.getName() === name) {
            var id = ctrl.getName()+'-'+name,
                input = this._domHandle.find('#'+id);
            if (input !== undefined) {
                input.val(value);
            }
        }
    },
    propertiesMeta: {
        all: {
            type: {
                hidden: true
            },
            name: {
                disabled: true
            }
        }
    }
});