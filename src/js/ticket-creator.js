$('[data-toggle=tooltip]').tooltip();
var myTicket = ControlFactory.createControl('ticket-canvas').mount('#canvas');

$('.add-control').on('click', function(e) {
    var type = $(this).data('type');
    myTicket.addControl(ControlFactory.createControl(type));
    e.preventDefault();
});

var controlSelect = ControlFactory.createControl('control-selector').mount('#control-selector');