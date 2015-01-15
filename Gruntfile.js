module.exports = function(grunt) {

    var banner;

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        
        // =============
        // SETUP
        // =============

        pkg: grunt.file.readJSON('./package.json'),

        meta: banner = [
            "/**",
            " * <%= pkg.name %> - <%= pkg.description %>",
            " * @version v<%= pkg.version %>",
            " * @homepage <%= pkg.homepage %>",
            " * @author <%= pkg.author.name %> (<%= pkg.author.url %>)",
            " * @license <%= pkg.license %>",
            " */"
        ].join("\n"),
        
        src: {
            sass: {
                main:     'src/scss/main.scss',
                files:    'src/scss/**/*.scss'
            },
            js: {
                main:     'src/js/*.js',
                vendor: [ 'bower_components/jquery/dist/jquery.js',
                          'bower_components/snabbt.js/snabbt.js',
                          'bower_components/velocity/velocity.js',
                          'bower_components/velocity/velocity.ui.js'
                ]
            },
            css: {
                main:     'assets/css/style.css',
                vendor: []
            }
        },
        
        dist: {
            css: 'assets/css/style.css',
            js: 'assets/js/script.js'
        },
                     
        // =============
        // TASKS
        // =============
        
        sass: {
            main: {
                files: {
                    '<%=dist.css%>': '<%=src.sass.main%>'
                }
            }
        },
        
        concat: {
            options: {
                stripBanners: true
            },
            css: {
                src: ['<%=src.css.vendor%>', '<%=src.css.main%>'],
                dest: '<%=dist.css%>'
            },
            js: {
                src: ['<%=src.js.vendor%>', '<%=src.js.main%>'],
                dest: '<%=dist.js%>'
            }
        },
        
        autoprefixer: {
            main: {
                files: {
                    '<%=dist.css%>': '<%=src.css.main%>'
                }
            }
        },
        
        cssmin: {
            options: {
                banner: '<%=meta.banner%>',
                report: 'gzip'
            },
            main: {
                files: {
                    '<%=dist.css%>': '<%=dist.css%>'
                }
            }
        },
        
        uglify: {
            options: {
                compress: {},
                banner: '<%=meta.banner%>',
                report: 'gzip',
                preserveComments: false
            },
            main: {
                files: {
                    '<%=dist.js%>': '<%=dist.js%>'
                }
            }
        },
        
        clean: {
            cache: ['.sass-cache', 'assets/scss/.sass-cache'],
            npm: ['node_modules']
        },
        
        watch: {
            sass: {
                files: ['<%=src.sass.files%>'],
                tasks: ['css'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['<%=src.js.main%>'],
                tasks: ['js'],
                options: {
                    livereload: true
                }
            }
        }

    });

    grunt.registerTask('css', ['sass', 'concat:css', 'autoprefixer']);
    grunt.registerTask('css-minify', ['cssmin']);
    grunt.registerTask('min.css', ['sass', 'concat:css', 'autoprefixer', 'cssmin']);

    grunt.registerTask('js', ['concat:js']);
    grunt.registerTask('js-minify', ['uglify']);
    grunt.registerTask('min.js', ['concat:js', 'uglify']);

    grunt.registerTask('development', ['css', 'js', 'watch']);

    return grunt.registerTask('default', ['min.css', 'min.js']);
};
