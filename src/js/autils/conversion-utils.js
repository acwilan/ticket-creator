var ScreenUtils = {
    _ppm: undefined,
    getPixelsPerMilimeter: function() {
        if (this._ppm === undefined) {
            var $tmpdiv = $('<div/>').css({
                'width': '1mm',
                'height': '1mm',
                'display': 'hidden'
            });
            $tmpdiv.appendTo('body');
            this._ppm = $tmpdiv.width();
            $tmpdiv.remove();
        }
        return this._ppm;
    },
    getMilimetersFromPixels: function(pxls) {
        return parseFloat(pxls) / parseFloat(this.getPixelsPerMilimeter());
    }
};