this.Control = Base.extend({
    constructor: function(type, name, zIndex) {
        this._properties = {};
        this._children = [];
        this._changeListeners = [];

        this._zIndex = zIndex === undefined ? 0 : zIndex;
        this._domHandle = this._buildDom();
        this._isMounted = false;
        this._parentDomHandle = undefined;
        
        this._properties.type = type !== undefined ? type : 'Control';
        
        name = name ? name : ControlIndex.getControlDefaultName(type);
        this.setName(name);
        ControlIndex.addControl(type, name, this);
        
        this.setWidth('auto');
        this.setHeight('auto');
        this.setLeft(0);
        this.setTop(0);
    },
    _buildDom: function() {
        return undefined;
    },
    getDomHandle: function() {
        return this._domHandle;
    },
    getParentDomHandle: function() {
        return this._parentDomHandle;
    },
    mount: function(selector) {
        if (this._domHandle !== undefined) {
            if (typeof selector === "string") {
                this._parentDomHandle = $(selector);
            } else if (selector instanceof Control) {
                this._parentDomHandle = selector.getDomHandle();
            }
            if (this._parentDomHandle !== undefined) {
                this._domHandle.appendTo(this._parentDomHandle);
                this._isMounted = true;
            }
        }
        return this;
    },
    addControl: function(ctrl) {
        if (ctrl !== undefined && ctrl instanceof Control) {
            ctrl.setZIndex(this._zIndex + this._children.length + 1);
            ctrl.mount(this);
            this._children.push(ctrl);
        }
        return this;
    },
    setProperty: function(name, value) {
        if (this._properties[name] !== value) {
            this._properties[name] = value;
            
            for (var i = 0; i < this._changeListeners.length; i++) {
                this._changeListeners[i].onPropertyChange(this, name, value);
            }
        }
        return this;
    },
    hasProperty: function(name) {
        return this._properties.hasOwnProperty(name);
    },
    getProperty: function(name) {
        return this.hasProperty(name) ? this._properties[name] : undefined;
    },
    setName: function(name) {
        this.setProperty('name',name);
        return this;
    },
    getName: function() {
        return this.getProperty('name');
    },
    getType: function() {
        return this.getProperty('type');
    },
    setZIndex: function(val) {
        this._zIndex = val;
        if (this._domHandle !== undefined) {
            this._domHandle.css('z-index',val);
        }
        return this;
    },
    getZIndex: function() {
        return this._zIndex;
    },
    isMounted: function() {
        return this._isMounted;
    },
    getWidth: function() {
        return this.getProperty('width').replace('mm','');
    },
    setWidth: function(val) {
        this.setProperty('width', val);
        if (typeof val === "number") {
            this._domHandle.css('width',val+'mm');
        } else {
            this._domHandle.css('width',val);
        }
        return this;
    },
    getHeight: function() {
        return this.getProperty('height').replace('mm','');
    },
    setHeight: function(val) {
        this.setProperty('height', val);
        if (typeof val === "number") {
            this._domHandle.css('height',val+'mm');
        } else {
            this._domHandle.css('height',val);
        }
        return this;
    },
    getTop: function() {
        return this.getProperty('top').replace('mm','');
    },
    setTop: function(val, updateCss) {
        this.setProperty('top', val);
        if (updateCss === undefined || updateCss) {
            this._domHandle.css('top',val+'mm');
        }
        return this;
    },
    getLeft: function() {
        return this.getProperty('left').replace('mm','');
    },
    setLeft: function(val, updateCss) {
        this.setProperty('left', val);
        if (updateCss === undefined || updateCss) {
            this._domHandle.css('left', val+'mm');
        }
        return this;
    },
    addOnPropertyChangeListener: function(listener) {
        if (listener.onPropertyChange !== undefined) {
            this._changeListeners.push(listener);
        }
        return this;
    }
});