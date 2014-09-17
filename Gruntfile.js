module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			all: ['build', '.sass-cache']
		},
		compass: {
			dist: {
				options: {
					sassDir: 'sass',
					cssDir: 'build/css',
					specify: 'sass/styles.scss'
				}
			}
		},
		watch: {
			livereload: {
				options: {
					livereload: true
				},
				files: ['**/*.{scss,sass}', 'static/*'],
				tasks: ['prod']
			}
		},
		copy: {
			fontawesome: {
				expand: true,
				flatten: true,
				src: ['bower_components/fontawesome/fonts/*'],
				dest: 'build/live/fonts/'
			},
			opensans: {
				expand: true,
				flatten: false,
				cwd: 'bower_components/open-sans-fontface/fonts',
				src: ['**'],
				dest: 'build/live/fonts/'
			},
			statics: {
				expand: true,
				flatten: false,
				cwd: 'static',
				src: ['**'],
				dest: 'build/live/'
			},
			styles_dev: {
				src: 'build/css/styles.css',
				dest: 'build/live/css/styles.css'
			}
		},
		htmlmin: {
			html: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {'build/live/index.html': 'static/*.html'}
			}
		},
		cssmin: {
			css: {
				files: {'build/live/css/styles.css': 'build/css/styles.css'}
			}
		},
		csslint: {
			css: {
				options: {
					import: 2
				},
				src: ['build/live/css/styles.css']
			}
		},
		htmlhint: {
			html: {
				options: {
					'tag-pair': true
				},
				src: ['build/live/*.html']
			}
		},
		connect: {
			server: {
				options: {
					hostname: '*',
					base: 'build/live',
					livereload: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-htmlhint');

	grunt.registerTask('default',['prod', 'connect:server','watch']);
	grunt.registerTask('shared',['clean', 'compass', 'copy:fontawesome', 'copy:opensans', 'copy:statics']);
	grunt.registerTask('dev',['shared', 'copy:styles_dev']);
	grunt.registerTask('prod',['shared', 'cssmin', 'htmlmin']);
	grunt.registerTask('check',['prod', 'csslint', 'htmlhint']);
}
