var JsonDataManager = DataManagerBase.extend({
    constructor: function(str) {
        this.base(str);
    },
    _parse: function(str) {
        this._dataObj = $.parseJSON(str);
        console.dir(this._dataObj);
        return this._dataObj !== false;
    },
    getDataColumns: function() {
        var cols = [];
        if (this._dataObj && typeof this._dataObj === 'object') {
            for (var prop in this._dataObj) {
                if (/^\d+$/.test(prop)) { // it's an array
                    var obj = this._dataObj[prop];
                    for (var p in obj) {
                        cols.push(prop);
                    }
                    break;
                } else { // it's an object
                    cols.push(prop);
                }
            }
        }
        return cols;
    }
});