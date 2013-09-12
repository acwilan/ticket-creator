this.DataTreeControl = Control.extend({
    constructor: function(name) {
        this.base('DataTree', name);
    },
    _buildDom: function() {
        return $('<div/>');
    },
    buildTree: function(nodes) {
        this._domHandle.children('ul').remove();
        this._domHandle.append('<ul/>');
        for (var i = 0; i < nodes.length; i++) {
            this._domHandle.children('ul').append($('<li/>').html(nodes[i]));
        }
        this._domHandle.jstree({
            core: {
                
            },
            plugins: [ 'themes', 'html_data', 'ui', 'dnd' ],
            dnd: {
                drop_target: '#canvas>div',
                drop_finish: function(data) {
                    alert('drop!');
                }
            }
        });
    }
});