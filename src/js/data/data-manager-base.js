var DataManagerBase = Base.extend({
    _baseStr: undefined,
    _dataObj: undefined,
    constructor: function(str) {
        this._baseStr = str;
        this._parse(this._baseStr);
    },
    _parse: function(str) {
        return false;
    },
    getDataColumns: function() {
        return [];
    }
});