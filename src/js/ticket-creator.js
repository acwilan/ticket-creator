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
}).draggable({
    helper: 'clone',
    zIndex: 100
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

var modalMode, clipBoard;
$('#project-window').on('show.bs.modal', function(e) {
    if (modalMode === 0) {
        clipBoard = new ZeroClipboard('');
        $('#project-label').html('Project Output');
        $('#project-action').html('Copy to Clipboard').on('click', function(e) {
            
        });
        $('#project-body').html('').append(
            $('<pre/>').html(myTicketCanvas.formatAsHtml())
        ).css('max-height', parseInt($(window).height() * 0.5,10)+'px');
    } else {
        $('#project-label').html('Import Project');
        $('#project-action').html('Import');
        $('#project-body').html('').append(
            $('<textarea/>')
        ).css('max-height', parseInt($(window).height() * 0.5,10)+'px');        
    }
});

$('#menu-export').on('click', function(e) {
    e.preventDefault();
    modalMode = 0;
    $('#project-window').modal('show');
});

$('#menu-import').on('click', function(e) {
    e.preventDefault();
    modalMode = 1;
    $('#project-window').modal('show');
});

$('#btn-update-data-input').trigger('click');

ZeroClipboard.setDefaults( { moviePath: 'assets/swf/ZeroClipboard.swf' } );