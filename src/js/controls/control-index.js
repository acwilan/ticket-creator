var ControlIndex = {
    controls: {},
    controlsByType: {},
    addListeners: [],
    addControl: function(type, name, ctrl) {
        if (ctrl instanceof Control && this.controls[name] === undefined) {
            this.controls[name] = ctrl;
            if (this.controlsByType[type] === undefined) {
                this.controlsByType[type] = [];
            }
            this.controlsByType[type].push(ctrl);
            
            for (var i = 0; i < this.addListeners.length; i++) {
                this.addListeners[i].onControlAdded(ctrl);
            }
        }
        return this;
    },
    getControlDefaultName: function(type) {
        return type[0].toLowerCase()+type.slice(1)+(this.controlsByType[type] !== undefined ? this.controlsByType[type].length+1 : 1);
    },
    getControl: function(name) {
        return this.controls[name];
    },
    addListener: function(listener) {
        if (listener.onControlAdded !== undefined) {
            this.addListeners.push(listener);
        }
        return this;
    },
    getByName: function(name) {
        return this.controls[name];
    }
};