$('[data-toggle=tooltip]').tooltip();
var myTicketCanvas = ControlManager.createControl('ticket-canvas').mount('#canvas'),
    myControlProperties = ControlManager.createControl('control-properties').mount('#control-properties'),
    myControlSelector = ControlManager.createControl('control-selector').mount('#control-selector'),
    myDataTree = ControlManager.createControl('data-tree').mount('#data-tree'),
    myDataManager;

$('.add-control').on('click', function(e) {
    var type = $(this).data('type');
    myTicketCanvas.addControl(ControlManager.createControl(type));
    e.preventDefault();
});

$('#txt-data-input').on('focusin', function() {
    //if ($(this).val() === '') {
        var origHeight = $(this).data('orig-height');
        if (!origHeight) {
            $(this).data('orig-height', $(this).height());
        }
        $(this).animate({height: '300px'}, 500);
    //}
}).on('focusout', function() {
    //if ($(this).val() === '') {
        var origHeight = $(this).data('orig-height');
        $(this).animate({height: origHeight}, 500);
    //}
});

$('#btn-update-data-input').on('click', function() {
    var data = $('#txt-data-input').val();
    
    myDataManager = DataManagerFactory.getDataManager(data);
    if (myDataManager !== undefined) {
        var cols = myDataManager.getDataColumns();
        if (cols && myDataTree) {
            myDataTree.buildTree(cols);
        }
    }
});

$('#btn-update-data-input').trigger('click');