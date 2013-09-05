$('[data-toggle=tooltip]').tooltip();
var myTicketCanvas = ControlManager.createControl('ticket-canvas').mount('#canvas'),
    myControlSelector = ControlManager.createControl('control-selector').mount('#control-selector'),
    myControlProperties = ControlManager.createControl('control-properties').mount('#control-properties');

$('.add-control').on('click', function(e) {
    var type = $(this).data('type');
    myTicketCanvas.addControl(ControlManager.createControl(type));
    e.preventDefault();
});