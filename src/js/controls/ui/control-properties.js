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
        this._domHandle.children().remove();
        if (ctrl === undefined) {
            return;
        }
        if (ctrl.getType() === 'Text' || ctrl.getType() === 'TicketCanvas' || ctrl.getType() === 'DataText') {
            var domObj = this._domHandle,
                obj = this;

            this.selectedControl = ctrl;

            ctrl.forEachProperty(function(name, val) {
                var type = ctrl.getType().toLowerCase(),
                    hidden = (obj.propertiesMeta[type] !== undefined && obj.propertiesMeta[type][name] !== undefined && obj.propertiesMeta[type][name].hidden) ||
                             (obj.propertiesMeta.all[name] !== undefined && obj.propertiesMeta.all[name].hidden),
                    disabled = (obj.propertiesMeta[type] !== undefined && obj.propertiesMeta[type][name] !== undefined && obj.propertiesMeta[type][name].disabled) ||
                             (obj.propertiesMeta.all[name] !== undefined && obj.propertiesMeta.all[name].disabled);
                if (!hidden) {
                    var id = ctrl.getName()+'-'+name,
                        input = $('<input/>').attr({
                                'id': id,
                                'type': 'text',
                                'value': val
                            }).addClass('form-control').on('change', function(e) {
                                if (ctrl[('set-'+name).toCamelCase()] !== undefined) {
                                    ctrl[('set-'+name).toCamelCase()]($(e.target).val());
                                } else {
                                    ctrl.setProperty(name, $(e.target).val());
                                }
                            });
                    if (disabled) {
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

            if (ctrl.allowDelete) {
                $('<div/>').addClass('btn-group pull-right').append(
                    $('<a/>').attr('href','#').addClass('btn btn-danger').text('Delete')
                ).on('click', this.deleteControl).appendTo(domObj);
            }
        }
    },
    onControlPropertyChange: function(ctrl, name, value) {
        var id = ctrl.getName()+'-'+name,
            input = this._domHandle.find('#'+id);
        if (input !== undefined) {
            input.val(value);
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
        },
        text: {
            orientation: {
                disabled: true
            }/*,
            width: {
                hidden: true
            },
            height: {
                hidden: true
            }*/
        },
        datatext: {
            orientation: {
                disabled: true
            }/*,
            width: {
                hidden: true
            },
            height: {
                hidden: true
            }*/
        }
    },
    deleteControl: function(e) {
        e.preventDefault();
        var ctrl = ControlManager.selected;
        ControlManager.deleteControl(ctrl.getType(), ctrl.getName());
    }
});