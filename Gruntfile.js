// Gruntfile GonAl project
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt, {pattern: ['grunt-*','assemble']});

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
				files: ['sass/**/*', 'static/**/*', 'src/**/*'],
				tasks: ['dev']
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
			home: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {'build/live/index.html': 'build/live/*.html'}
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
					import: 2,
					csslintrc: '.csslintrc'
				},
				src: ['build/css/styles.css']
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
		},
		concat: {
			js: {
				src: [
					"bower_components/jquery/dist/jquery.js",
					"bower_components/jquery-form-validator/form-validator/jquery.form-validator.js",
					"build/js/analytics.js",
					"src/js/parse-1.3.1.js",
					"src/js/ga.js",
					"src/js/form.js"
				],
				dest: 'build/live/js/scripts.js'
			}
		},
		assemble: {
			options: {
				flatten: true,
				data: ['src/data/**/*.{json,yml}'],
				helpers: ['handlebars-helper-md'],
				partials: ['src/partials/**/*.hbs', 'src/content/*.md']
			},
			home: {
				src: ['src/home.hbs'],
				dest: 'build/live/index.html'
			}
		},
		curl: {
			analytics: {
				dest: 'build/js/analytics.js',
				src: 'http://www.google-analytics.com/analytics.js'
			}
		},
		uglify: {
            all: {
                files: {
                    "build/live/js/scripts.js": [ 
						"bower_components/jquery/dist/jquery.js",
						"bower_components/jquery-form-validator/form-validator/jquery.form-validator.js",
						"build/js/analytics.js",
						"src/js/parse-1.3.1.js",
						"src/js/ga.js",
						"src/js/form.js"
					]
                },
                options: {
                    preserveComments: false,
                    report: "min",
                    beautify: {
                        "ascii_only": true
                    },
                    compress: {
                        "hoist_funs": false,
                        loops: false,
                        unused: false
                    }
                }
            }
		},
		compress: {
			prod: {
				options: {
					mode: 'gzip'
				},
				expand: true,
				cwd: 'build/live/',
				src:['**/*'],
				dest: 'build/deploy/'
			}
		},
		aws: grunt.file.readJSON('aws-s3.json'),
		aws_s3: {
			options: {
				accessKeyId: '<%= aws.AWSAccessKeyId %>',
				secretAccessKey: '<%= aws.AWSSecretKey %>',
				region: 'eu-west-1',
				uploadConcurrency: 5,
				downloadConcurrency: 5
			},
			clean: {
				options: {
					bucket: 'gon.al'
				},
				files: [
					{dest: '/', action: 'delete'}
				]
			},
			prod: {
				options: {
					bucket: 'gon.al',
					params: {
						ContentEncoding: 'gzip'
					}
				},
				files: [
					{expand:true, cwd: 'build/deploy/', src: ['**'], dest:''}
				]
			}
		},
		cssmetrics: {
			dist: {
				src: ['build/live/css/styles.css']
			}
		}
	});

	grunt.registerTask('default',['dev', 'connect:server','watch']);
	grunt.registerTask('shared',['clean', 'compass', 'copy:fontawesome', 'copy:opensans', 'copy:statics', 'assemble', 'curl', 'uglify']);
	grunt.registerTask('dev',['clean', 'compass', 'copy:fontawesome', 'copy:opensans', 'copy:statics', 'assemble', 'curl', 'copy:styles_dev', 'concat:js']);
	grunt.registerTask('prod',['shared', 'cssmin', 'htmlmin']);
	grunt.registerTask('deploy', ['prod', 'compress', 'aws_s3:clean', 'aws_s3:prod']);
	grunt.registerTask('check',['prod', 'csslint', 'htmlhint', 'cssmetrics']);
}
