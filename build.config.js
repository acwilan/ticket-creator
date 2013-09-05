module.exports = {

    build_dir: 'build',
    compile_dir: 'bin',

    app_files: {
        js: ['src/**/*.js', '!src/**/*.spec.js'],
        html: ['src/*.html'],
        less: ['src/less/main.less']
    },
    
    vendor_files: {
        js: [
            'bower_components/jquery/jquery.js',
            'bower_components/jquery-ui/ui/jquery-ui.js',
            'bower_components/jquery-ui/ui/jquery.ui.core.js',
            'bower_components/jquery-ui/ui/jquery.ui.widget.js',
            'bower_components/jquery-ui/ui/jquery.ui.mouse.js',
            'bower_components/jquery-ui/ui/jquery.ui.effect-*.js',
            'bower_components/jquery-ui/ui/jquery.ui.position.js',
            'bower_components/jquery-ui/ui/jquery.ui.draggable.js',
            'bower_components/jquery-ui/ui/jquery.ui.droppable.js',
            'bower_components/jquery-ui/ui/jquery.ui.resizable.js',
            'bower_components/jquery-ui/ui/jquery.ui.selectable.js',
            'bower_components/jquery-ui/ui/i18n/jquery-ui-i18n.js',
            'bower_components/bootstrap/js/dropdown.js',
            'bower_components/bootstrap/js/transition.js',
            'bower_components/bootstrap/js/collapse.js',
            'bower_components/bootstrap/js/alert.js',
            'bower_components/bootstrap/js/button.js',
            'bower_components/bootstrap/js/modal.js',
            'bower_components/bootstrap/js/tooltip.js',
            'bower_components/bootstrap/js/tab.js',
            'bower_components/select2/select2.js',
            'bower_components/select2/select2_locale_en.js.template'
        ],
        css: [
            'bower_components/jquery-ui/themes/<%= pkg.theme %>/jquery-ui.css',
            'bower_components/jquery-ui/themes/<%= pkg.theme %>/jquery.ui.theme.css',
            'bower_components/select2/select2.css',
            'bower_components/select2-bootstrap-css/select2-bootstrap.css'
        ],
        less: [
            'bower_components/bootstrap/less/variables.less',
            'bower_components/bootstrap/less/mixins.less',
            'bower_components/bootstrap/less/reset.less',
            'bower_components/bootstrap/less/utilities.less',
            'bower_components/bootstrap/less/scaffolding.less',
            'bower_components/bootstrap/less/type.less',
            'bower_components/bootstrap/less/grid.less',
            'bower_components/bootstrap/less/navs.less',
            'bower_components/bootstrap/less/navbar.less',
            'bower_components/bootstrap/less/buttons.less',
            'bower_components/bootstrap/less/button-groups.less',
            'bower_components/bootstrap/less/dropdowns.less',
            'bower_components/bootstrap/less/breadcrumbs.less',
            'bower_components/bootstrap/less/alerts.less',
            'bower_components/bootstrap/less/close.less',
            'bower_components/bootstrap/less/forms.less',
            'bower_components/bootstrap/less/jumbotron.less',
            'bower_components/bootstrap/less/badges.less',
            'bower_components/bootstrap/less/labels.less',
            'bower_components/bootstrap/less/media.less',
            'bower_components/bootstrap/less/modals.less',
            'bower_components/bootstrap/less/pager.less',
            'bower_components/bootstrap/less/pagination.less',
            'bower_components/bootstrap/less/tables.less',
            'bower_components/bootstrap/less/tooltip.less',
            'bower_components/bootstrap/less/panels.less',
            'bower_components/bootstrap/less/thumbnails.less',
            'bower_components/bootstrap/less/responsive-utilities.less',
            'bower_components/bootstrap/less/glyphicons.less',
            'bower_components/bootstrap/less/list-group.less'
            
        ],
        fonts: [
            'bower_components/bootstrap/fonts/*.*'
        ],
        img: [
            'bower_components/jquery-ui/themes/<%= pkg.theme %>/images/*.*',
            'bower_components/select2/select2-spinner.gif',
            'bower_components/select2/select2.png',
            'bower_components/select2/select2x2.png'
        ]
    }
};
