module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-recess');

    var userConfig = require('./build.config.js');
    
    var taskConfig = {
        
        pkg: grunt.file.readJSON("package.json"),
                
        meta: {
            banner:
                    '/**\n' +
                    ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    ' * <%= pkg.homepage %>\n' +
                    ' *\n' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                    ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
                    ' */\n'
        },
        clean: [
            '<%= build_dir %>',
            '<%= compile_dir %>'
        ],
        copy: {
            build_appjs: {
                files: [
                    {
                        src: ['<%= app_files.js %>'],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendor_js: {
                files: [
                    {
                        src: ['<%= vendor_files.js %>'],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendor_css: {
                files: [
                    {
                        src: ['<%= vendor_files.css %>'],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendor_fonts: {
                files: [
                    {
                        src: ['<%= vendor_files.fonts %>'],
                        dest: '<%= build_dir %>',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendor_assets_jqui: {
                files: [
                    {
                        src: [
                            'bower_components/jquery-ui/themes/<%= pkg.theme %>/images/*.*'
                        ],
                        dest: '<%= build_dir %>/assets/css/images',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendor_assets_sel2: {
                files: [
                    {
                        src: [
                            'bower_components/select2/select2-spinner.gif',
                            'bower_components/select2/select2.png',
                            'bower_components/select2/select2x2.png'
                        ],
                        dest: '<%= build_dir %>/assets/css',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendor_assets_zclip: {
                files: [
                    {
                        src: [
                            'bower_components/zeroclipboard/ZeroClipboard.swf'
                        ],
                        dest: '<%= build_dir %>/assets/swf',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            compile_vendor_assets_jqui: {
                files: [
                    {
                        src: ['*.png','*.gif','*.jpg'],
                        dest: '<%= compile_dir %>/assets/css/images',
                        cwd: '<%= build_dir %>/assets/css/images/bower_components/jquery-ui/themes/<%= pkg.theme %>/images',
                        expand: true
                    }
                ]
            },
            compile_vendor_assets_sel2: {
                files: [
                    {
                        src: ['*.png','*.gif','*.jpg'],
                        dest: '<%= compile_dir %>/assets/css',
                        cwd: '<%= build_dir %>/assets/css/bower_components/select2',
                        expand: true
                    }
                ]
            },
            compile_vendor_assets_zclip: {
                files: [
                    {
                        src: ['*.swf'],
                        dest: '<%= compile_dir %>/assets/swf',
                        cwd: '<%= build_dir %>/assets/swf/bower_components/zeroclipboard',
                        expand: true
                    }
                ]
            },
            compile_vendor_fonts: {
                files: [
                    {
                        src: ['fonts/*.*'],
                        dest: '<%= compile_dir %>/assets',
                        cwd: '<%= build_dir %>/bower_components/bootstrap',
                        expand: true
                    }
                ]
            }
        },
        concat: {
            compile_js: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                    'module.prefix',
                    '<%= build_dir %>/src/**/*.js',
                    'module.suffix'
                ],
                dest: '<%= compile_dir %>/assets/js/<%= pkg.name %>.js'
            },
            compile_vendor_js: {
                src: [
                    '<%= vendor_files.js %>'
                ],
                dest: '<%= compile_dir %>/assets/js/libs.js'
            },
            compile_vendor_css: {
                src: [
                    '<%= vendor_files.css %>',
                    '<%= build_dir %>/assets/css/libs.css'
                ],
                dest: '<%= compile_dir %>/assets/css/libs.css'
            },
            build_vendor_less: {
                src: [
                    '<%= vendor_files.less %>'
                ],
                dest: '<%= build_dir %>/bower_components/less/libs.less'
            }    
        },
        uglify: {
            compile: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    '<%= compile_dir %>/assets/js/libs.min.js': '<%= concat.compile_vendor_js.dest %>',
                    '<%= compile_dir %>/assets/js/<%= pkg.name %>.min.js': '<%= concat.compile_js.dest %>' 
                }
            }
        },
        recess: {
            build: {
                src: ['<%= app_files.less %>'],
                dest: '<%= build_dir %>/assets/css/<%= pkg.name %>.css',
                options: {
                    compile: true,
                    compress: false,
                    noUnderscores: false,
                    noIDs: false,
                    zeroUnits: false
                }
            },
            build_vendor: {
                src: ['<%= concat.build_vendor_less.dest %>'],
                dest: '<%= build_dir %>/assets/css/libs.css',
                options: {
                    compile: true,
                    compress: false,
                    noUnderscores: false,
                    noIDs: false,
                    zeroUnits: false
                }
            },
            compile: {
                src: ['<%= recess.build.dest %>'],
                dest: '<%= compile_dir %>/assets/css/<%= pkg.name %>.min.css',
                options: {
                    compile: true,
                    compress: true,
                    noUnderscores: false,
                    noIDs: false,
                    zeroUnits: false
                }
            },
            compile_vendor: {
                src: ['<%= recess.build_vendor.dest %>'],
                dest: '<%= compile_dir %>/assets/css/libs.min.css',
                options: {
                    compile: true,
                    compress: true,
                    noUnderscores: false,
                    noIDs: false,
                    zeroUnits: false
                }
            }
        },
        jshint: {
            src: [
                '<%= app_files.js %>'
            ],
            test: [
                //'<%= app_files.jsunit %>'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            },
            globals: {}
        },
        index: {
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= vendor_files.css %>',
                    '<%= recess.build.dest %>',
                    '<%= recess.build_vendor.dest %>'
                ]
            },
            compile: {
                dir: '<%= compile_dir %>',
                src: [
                    '<%= concat.compile_vendor_js.dest %>',
                    '<%= concat.compile_js.dest %>',
                    //'<%= compile_dir %>/assets/js/libs.min.js',
                    //'<%= compile_dir %>/assets/js/<%= pkg.name %>.min.js',
                    '<%= recess.compile.dest %>',
                    '<%= compile_dir %>/assets/css/libs.css'// '<%= recess.compile_vendor.dest %>'
                ]
            }
        }
    };
    
    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));
    grunt.registerTask('default', ['build', 'compile']);
    
    grunt.registerTask('build', [
        'clean', 'jshint', 'concat:build_vendor_less', 'recess:build', 'recess:build_vendor',
        'copy:build_appjs', 'copy:build_vendor_js', 'copy:build_vendor_css', 'copy:build_vendor_assets_jqui', 
        'copy:build_vendor_assets_sel2', 'copy:build_vendor_assets_zclip',
        'copy:build_vendor_fonts', 'index:build'
    ]);
    
    grunt.registerTask('compile', [
        'recess:compile', 'recess:compile_vendor', 'copy:compile_vendor_assets_jqui', 'copy:compile_vendor_assets_sel2', 
        'copy:compile_vendor_assets_zclip', 'copy:compile_vendor_fonts',
        'concat:compile_js', 'concat:compile_vendor_js', 'concat:compile_vendor_css', 
        //'uglify', 
        'index:compile'
    ]);
    
    function filterForJS(files) {
        return files.filter(function(file) {
            return file.match(/\.js$/);
        });
    }
    
    function filterForCSS(files) {
        return files.filter(function(file) {
            return file.match(/\.css$/);
        });
    }
    
    grunt.registerMultiTask('index', 'Process index.html template', function() {
        var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');
        var jsFiles = filterForJS(this.filesSrc).map(function(file) {
            return file.replace(dirRE, '');
        });
        var cssFiles = filterForCSS(this.filesSrc).map(function(file) {
            return file.replace(dirRE, '');
        });

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
            process: function(contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });
    
};