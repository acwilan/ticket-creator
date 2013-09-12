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