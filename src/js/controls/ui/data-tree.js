this.DataTreeControl = Control.extend({
    constructor: function(name) {
        this.base('DataTree', name);
    },
    _buildDom: function() {
        return $('<div/>');
    },
    buildTree: function(nodes) {
        this._domHandle.children().remove();
        this._domHandle.append('<ul/>');
        for (var i = 0; i < nodes.length; i++) {
            this._domHandle.children('ul').append($('<li/>').html(nodes[i]));
        }
        this._domHandle.jstree({
            core: {
                
            },
            plugins: [ 'themes', 'html_data', 'ui' ]
        });
    }
});