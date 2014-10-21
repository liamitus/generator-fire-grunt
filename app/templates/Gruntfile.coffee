"use strict"

module.exports = (grunt) ->
	
	config =
		src: "app"
		dest: "build"

	grunt.initConfig =
		config: config
		copy:
			dist:
				files: [
					expand: true
					cwd: "<%%= config.src %>"
					dest: "<%%= config.dest %>"
					src: [
						"*.{ico,png}"
						"{*/}*.html"
					]
				]

	grunt.loadNpmTasks "grunt-contrib-copy"
	
	grunt.registerTask "build", [
		"copy:dist"
	]

	grunt.registerTask "default", [
		"build"
	]