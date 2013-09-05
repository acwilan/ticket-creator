this.ControlPropertiesControl = Control.extend({
    constructor: function(name) {
        this.base('ControlProperties', name);
        this.selectedControl = undefined;
    },
    _buildDom: function() {
        return $('<form/>').addClass('form-horizontal');
    }
});