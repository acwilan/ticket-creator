/**
 * @name Control
 * @description This is the base object used for every implementation of controls
 * @type Object
 * @extends Base
 * @requires Base
 * @requires ControlManager
 */
this.Control = Base.extend({
    
    allowDelete: false,
    
    /**
     * @name Control.constructor
     * @constructor
     * @param {String} type The type of the control
     * @param {String} name The name of the control
     * @param {Number} zIndex (optional) z-index property of the control
     */
    constructor: function(type, name, zIndex) {
        this._properties = {};
        this._children = [];
        this._changeListeners = [];

        this._zIndex = zIndex === undefined ? 0 : zIndex;
        this._domHandle = this._buildDom();
        this._isMounted = false;
        this._parentDomHandle = undefined;
        
        /*if (this._domHandle !== undefined) {
            this._domHandle.on('keydown', function(e) {
                console.dir(e);
                if (e.which === 46) { // hit delete key
                    //this
                }
            });
        }*/
        
        this._properties.type = type !== undefined ? type : 'Control';
        
        name = name ? name : ControlManager.getControlDefaultName(type);
        this.setName(name);
        ControlManager.addControl(type, name, this);
    },
            
    /**
     * @name Control._buildDom
     * @private
     * @description The method should be overridden by every implementation, and it returns the base dom object from which the control will be working
     * 
     * @returns {Object} A DOM object encapsulated by the jQuery object
     */
    _buildDom: function() {
        return undefined;
    },
            
    /**
     * @name Control.getDomHandle
     * @description Returns the DOM handle used by the control.
     * 
     * @returns {Object} The DOM object by which the control is bound
     */
    getDomHandle: function() {
        return this._domHandle;
    },
            
    /**
     * @name Control.getParentDomHandle
     * @description Get the parent DOM obj
     * 
     * @returns {Object} The DOM object for the parent container
     */
    getParentDomHandle: function() {
        return this._parentDomHandle;
    },
            
    /**
     * @name Control.mount
     * @description This method is used if the control is being mounted in a webpage or inside another control
     * 
     * @param {String|Object<Control>} selector This parameter can be either a String, in which case the control
     * will be mounted in that DOM objects specified as a jQuery selector, or it can be an instance of other 
     * controller, in which it will be mounted as a children
     * @returns {Control} An instance of the object for method chaining
     */
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
            
    /**
     * @name Control.addControl
     * @description Adds a children control to be mounted in this control
     * 
     * @param {Object<Control>} ctrl The control that will be mounted inside this
     * @returns {Object} An instance of the Control object for method chaining
     */
    addControl: function(ctrl) {
        if (ctrl !== undefined && ctrl instanceof Control) {
            ctrl.setZIndex(this._zIndex + this._children.length + 1);
            ctrl.mount(this);
            this._children.push(ctrl);
        }
        return this;
    },
            
    /**
     * @name Control.setProperty
     * @description Sets a given property to some value for the control
     * 
     * @param {String} name The name of the property to be set
     * @param {Any} value The value of the property
     * @returns {Object} An instance of the Control object for method chaining
     */
    setProperty: function(name, value) {
        if (this._properties[name] !== value) {
            this._properties[name] = value;
            
            for (var i = 0; i < this._changeListeners.length; i++) {
                this._changeListeners[i].onPropertyChange(this, name, value);
            }
        }
        return this;
    },
    
    /**
     * @name Control.hasProperty
     * @description Find out if a property is defined in a control
     * 
     * @param {String} name The name of the property
     * @returns {Boolean} True if the property is specified, false otherwise
     */
    hasProperty: function(name) {
        return this._properties.hasOwnProperty(name);
    },
            
    /**
     * @name Control.getProperty
     * @description Get the value of the property of the control
     * 
     * @param {String} name The name of the property to retrieve
     * @returns {Object} The value of the property
     */
    getProperty: function(name) {
        return this.hasProperty(name) ? this._properties[name] : undefined;
    },
    
    /**
     * @name Control.setName
     * @description Sets the name of the control
     * 
     * @param {String} name The name of the control
     * @returns {Object<Control>} An instance of the Control object for method chaining
     */
    setName: function(name) {
        this.setProperty('name',name);
        return this;
    },
    
    /**
     * @name Control.getName
     * @description Gets the name of the object
     * 
     * @returns {String} The name of the control
     */
    getName: function() {
        return this.getProperty('name');
    },
    
    /**
     * @name Control.getType
     * @description Gets the type of the object
     * 
     * @returns {String} The type of the object
     */
    getType: function() {
        return this.getProperty('type');
    },
    
    /**
     * @name Control.setZIndex
     * @description Sets the z-index CSS property of the control
     * 
     * @param {Number} val The value of the z-index
     * @returns {Object<Control>} An instance of the Control object for method chaining
     */
    setZIndex: function(val) {
        this._zIndex = val;
        if (this._domHandle !== undefined) {
            this._domHandle.css('z-index',val);
        }
        return this;
    },
    
    /**
     * @name Control.getZIndex
     * @description Returns the z-index property of the control
     * 
     * @returns {Number} The z-index value
     */
    getZIndex: function() {
        return this._zIndex;
    },
    
    /**
     * @name Control.isMounted
     * @description Find out if the control is mounted
     * 
     * @returns {Boolean} True if it's mounted, false otherwise
     */
    isMounted: function() {
        return this._isMounted;
    },
    
    /**
     * @name Control.getWidth
     * @description Gets the width property
     * 
     * @returns {Number|String} The width in milimeters, or 'auto' if it's not set
     */
    getWidth: function() {
        return this.getProperty('width').replace('mm','');
    },
    
    /**
     * @name Control.setWidth
     * @description Sets the width property
     * 
     * @param {Number|String} val The value for the width, in milimeters or set to 'auto' if none
     * @param {Boolean} updateCss If set to true or undefined, update the DOM CSS
     * @returns {Object<Control>} The Control object for method chaining
     */
    setWidth: function(val, updateCss) {
        this.setProperty('width', val);
        if (updateCss === undefined || updateCss) {
            if (Number.isNumber(val)) {
                this._domHandle.css('width',val+'mm');
            } else {
                this._domHandle.css('width',val);
            }
        }
        return this;
    },
    
    /**
     * @name Control.getHeight
     * @description Gets the height property
     * 
     * @returns {Number|String} The height in milimeters, or 'auto' if set to none
     */
    getHeight: function() {
        return this.getProperty('height').replace('mm','');
    },
    
    /**
     * @name Control.setHeight
     * @description Sets the height property
     * 
     * @param {Number|String} val The value for the height, set in milimeters, or 'auto' for the default
     * @param {Boolean} updateCss If set to true, update the DOM's CSS
     * @returns {Object<Control>} The Control object for method chaining
     */
    setHeight: function(val, updateCss) {
        this.setProperty('height', val);
        if (updateCss === undefined || updateCss) {
            if (Number.isNumber(val)) {
                this._domHandle.css('height',val+'mm');
            } else {
                this._domHandle.css('height',val);
            }
        }
        return this;
    },
    
    /**
     * @name Control.getTop
     * @description Gets the top property
     * 
     * @returns {Number} The top offset of the control related to its parent, in milimeters
     */
    getTop: function() {
        return this.getProperty('top').replace('mm','');
    },
    
    /**
     * @name Control.setTop
     * @description Sets the top property
     * 
     * @param {Number} val The top value for the object, related to its parent, in milimeters
     * @param {Boolean} updateCss Optional, set to true if update also the css property
     * @returns {Object<Control>} The Control object for method chaining
     */
    setTop: function(val, updateCss) {
        this.setProperty('top', val);
        if (updateCss === undefined || updateCss) {
            this._domHandle.css('top',val+'mm');
        }
        return this;
    },
    
    /**
     * @name Control.getLeft
     * @description Gets the left property
     * 
     * @returns {Number} The left value of the DOM object, related to its parent
     */
    getLeft: function() {
        return this.getProperty('left').replace('mm','');
    },
    
    /**
     * @name Control.setLeft
     * @description Sets the left property
     * 
     * @param {Number} val The left value, in milimeters
     * @param {Boolean} updateCss Optional, set to true if update also the css property
     * @returns {Object<Control>} The Control object for method chaining
     */
    setLeft: function(val, updateCss) {
        this.setProperty('left', val);
        if (updateCss === undefined || updateCss) {
            this._domHandle.css('left', val+'mm');
        }
        return this;
    },
    
    /**
     * @name Control.addOnPropertyChangeListener
     * @description Adds a listener object that its onPropertyChange method will be fired whenever a property in this control changes
     * 
     * @param {Object} listener The listener object
     */
    addOnPropertyChangeListener: function(listener) {
        if (listener.onPropertyChange !== undefined) {
            this._changeListeners.push(listener);
        }
        return this;
    },
    
    forEachProperty: function(fn) {
        for (var name in this._properties) {
            fn(name, this._properties[name]);
        }
    },
    
    removeHandle: function() {
        if (this._domHandle !== undefined) {
            this._domHandle.remove();
            this._domHandle = undefined;
        }
    },
    formatAsHtml: function(level) {
        var $maindiv = $('<div/>'),
            $div = $('<div/>').addClass('control-source').appendTo($maindiv),
            propStr = [], childStr = [], $obj = $('<div/>').css('margin-left','50px');
        level = level || 0;
        if (level > 0) {
            $div.css('margin-left', '50px');
        }
    
        $div.append($('<span/>').addClass('bracket').html('{'),$('<br/>').addClass('clearfix'),$obj);
        
        $.each(this._properties, function(prop, val) {
            propStr.push('<span class="prop">"'+prop+'"</span>: <span class="val">"'+val+'"</span>');
        });
        $obj.append(propStr.join(',<br class="clearfix"/>'));
        
        if (this._children.length > 0) {
            $obj.append(',<br class="clearfix"/><span class="prop">"children"</span>: <span class="bracket">[</span><br class="clearfix"/>');
            $.each(this._children, function(index, child) {
                if (child instanceof Control) {
                    childStr.push(child.formatAsHtml(level+1));
                }
            });
            $obj.append(childStr.join(',<br class="clearfix"/>')+'<br class="clearfix"/><span class="bracket">]</span>');
        }
        
        $div.append($('<br/>').addClass('clearfix'),$('<span/>').addClass('bracket').html('}'));
        
        return $maindiv.html();
    },
    importFromString: function(jsonStr) {
        var obj = $.parseJSON(jsonStr);
    }
});