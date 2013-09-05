/**
 * @name ControlManager
 * @description This object is
 * @type Object
 */

var ControlManager = {
    controls: {},
    controlsByType: {},
    selected: undefined,
    addListeners: [],
    changeListeners: [],
    selectedListeners: [],
    
    /**
     * @static
     * @name ControlManager.addControl
     * @description Adds a control to the index
     * 
     * @param {String} type The control type
     * @param {String} name The control name
     * @param {Object<Control>} ctrl The control object
     * @returns {ControlManager} The ControlManager object for chaining
     */
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
            
    /**
     * @static
     * @name ControlManager.getControlDefaultName
     * @description This is a helper function for adding new controls, it gets the default name for a given type
     * 
     * @param {String} type The new controller's expected type
     * @returns {String} The new controller's suggested name
     */
    getControlDefaultName: function(type) {
        return type[0].toLowerCase()+type.slice(1)+(this.controlsByType[type] !== undefined ? this.controlsByType[type].length+1 : 1);
    },
    
    /**
     * @static
     * @name ControlManager.addControlAddedListener
     * @description Adds a listener to be fired whenever a new control is added
     * 
     * @param {Object} listener An object that contains the method onControlAdded that will be fired
     * @returns {ControlManager} The same ControlManager instance for method chaining
     */
    addControlAddedListener: function(listener) {
        if (listener.onControlAdded !== undefined) {
            this.addListeners.push(listener);
        }
        return this;
    },
    
    /**
     * @static
     * @name ControlManager.getByName
     * @description Searches the index for an instance of a control by providing its unique name
     * 
     * @param {String} name The name of the expected control
     * @returns {Object<Control>} The instance of the control or undefined if it's not found
     */
    getControlByName: function(name) {
        return this.controls[name];
    },
            
    /**
     * @static
     * @name ControlManager.onPropertyChange
     * @description This method is fired whenever a property inside an object in the index changes. What it does is to alert the other listeners for this change
     * 
     * @param {Object<Control>} control An instance of the control that fired the event
     * @param {String} name The name of the property that changed
     * @param {String} value The new value of the property
     */
    onPropertyChange: function(control, name, value) {
        for (var i = 0; i < this.changeListeners.length; i++) {
            this.changeListeners[i].onControlPropertyChange(control, name, value);
        }
    },
            
    /**
     * @static
     * @name ControlManager.addOnControlPropertyChangeListener
     * @description Adds a listener that contains a method named onControlPropertyChange that will be fired whenever a property in an object in the index is changed 
     * 
     * @param {Object} listener The object that will be listening for property changes
     * @returns {ControlManager} The same instance of ControlManager for method chaining
     */
    addOnControlPropertyChangeListener: function(listener) {
        if (listener.onControlPropertyChange !== undefined) {
            this.changeListeners.push(listener);
        }
        return this;
    },
            
    /**
     * @static
     * @name ControlManager.addOnControlSelectionChangeListener
     * @description Adds a listener that contains a method named onControlSelectionChange that will be fired whenever the currently selected object changes
     * 
     * @param {Object} listener The object that will be listning for selection changes
     * @returns {ControlManager} The same instance of ControlManager for method chaining
     */
    addOnControlSelectionChangeListener: function(listener) {
        if (listener.onControlSelectionChange !== undefined) {
            this.selectedListeners.push(listener);
        }
        return this;
    },
    
    /**
     * @static
     * @name ControlManager.createControl
     * @description Generates a new control from the specified parameters
     * 
     * @param {String} type The type of the control to be generated
     * @param {String} name The name of the new control
     * @returns {Object<Control>} The generated control object or undefined
     */
    createControl: function(type, name) {
        switch (type) {
            case 'text': return new TextControl(name);
            case 'ticket-canvas': return new TicketCanvasControl(name);
            case 'control-selector': return new ControlSelectorControl(name);
            case 'control-properties': return new ControlPropertiesControl(name);
        }
        return undefined;
    },
    
    setSelected: function(ctrl) {
        if ((ctrl instanceof Control || typeof ctrl === "String") && (this.selected === undefined || (ctrl instanceof Control && this.selected.getName() !== ctrl.getName()) || (typeof ctrl === "String" && this.selected.getName() !== ctrl))) {
            this.selected = ctrl;
            for (var i = 0; i < this.selectedListeners.length; i++) {
                this.selectedListeners[i].onControlSelectionChange(ctrl);
            }
        }
    }
};