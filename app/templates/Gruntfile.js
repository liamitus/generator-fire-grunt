"use strict";

	module.exports = function (grunt) {

		// Configurable paths
		var config = {
			src: "app",
			dest: "build"
		}

		grunt.initConfig({

			// Project settings
			config: config,

			clean: {
				dist: {
					files: [{
						dot: true,
						src: [
							'.tmp',
							'<%%= config.dest %>/*',
							'!<%%= config.dest %>/.git*'
						]
					}]
				},
				server: '.tmp'
			},

			connect: {
				options: {
					port: 9000,
					open: true,
					hostname: "localhost"
				},
				dist: {
					options: {
						base: "<%%= config.dest %>",
						livereload: false
					}
				}
			},

			copy: {
				dist: {
					files: [{
						expand: true,
						dot: true,
						cwd: "<%%= config.src %>",
						dest: "<%%= config.dest %>",
						src: [
							"*.{ico,png}",
							"*.html",
							"{*/}*.html"
						]
					}]
				}
			}

		});

		// Install plugins
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks("grunt-contrib-copy");
		grunt.loadNpmTasks('grunt-contrib-connect');

		grunt.registerTask("build", [
			"clean:dist",
			"copy:dist"
		]);

		grunt.registerTask("serve", "Start the server and preview your app", function (target) {
			grunt.task.run([
				"connect:dist:keepalive"
			]);
		});

		grunt.registerTask("default", [
			"build"
		]);

	};