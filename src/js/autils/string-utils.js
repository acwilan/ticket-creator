String.prototype.toCamelCase = function() {
    var parts = this.split('-'),
        rtr = "",
        part;
    for (var i = 0; i < parts.length; i++) {
        part = parts[i];
        rtr += (i === 0) ? part.toLowerCase() : part[0].toUpperCase()+part.slice(1).toLowerCase();
    }
    return rtr;
};

String.formatHtmlFromJson = function(obj) {
    var $div = $('<div/>').addClass('json-obj');
    $div.append($('<span/>').addClass('bracket').html('{'),$('<br/>').addClass('clearfix'));
    $.each(obj, function(prop, val) {
        
    });
    return $div.html();
};