this.DataTreeControl = Control.extend({
    constructor: function(name) {
        this.base('DataTree', name);
    },
    _buildDom: function() {
        return $('<div/>').addClass('list-group');
    },
    buildTree: function(nodes) {
        var noclickFn = function(e){e.preventDefault();};
        this._domHandle.children('a').remove();
        //this._domHandle.append('<ul/>');
        for (var i = 0; i < nodes.length; i++) {
            /*this._domHandle.children('ul').append(
                $('<li/>').attr('id','node-'+nodes[i]).append(
                    $('<a/>').attr('href','#').html(nodes[i])
                )
            );*/
            this._domHandle.append(
                $('<a/>').attr('href','#'+nodes[i]).addClass('list-group-item').data('field', nodes[i]).on('click', noclickFn).append(
                    $('<i/>').addClass('glyphicon glyphicon-star'),
                    ' '+nodes[i]
                ).attr('data-type','data-text').draggable({
                    //revert: true,
                    //revertDuration: 0,
                    helper: 'clone',
                    zIndex: 100
                })
            );
        }
        /*this._domHandle.jstree({
            "core": {
                "themes": {
                    name: false
                }
            },
            "plugins": [ "html_data", "dnd", "themes", "ui" ],
            "dnd": {
                "drop_finish": function() {
                    //console.dir(data);
                    alert('drop!');
                },
                "drop_check": function(data) {
                    console.dir(data);
                    return true;
                },
                "drag_check": function(data) {
                    console.dir(data);
                    return { after : false, before : false, inside : true };
                }
            }
        });*/
    }
});