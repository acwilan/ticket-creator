this.ControlFactory = {
    createControl: function(type, name) {
        switch (type) {
            case 'text': return new TextControl(name);
            case 'ticket-canvas': return new TicketCanvasControl(name);
            case 'control-selector': return new ControlSelectorControl(name);
        }
        return undefined;
    }
};