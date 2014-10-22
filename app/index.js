"use strict";

/*
	Fire Grunt

	Adds grunt to the project it is called within.

	Author:	Liam Howell <lhowell@mobiquityinc.com>
	Since:	10-22-2014
*/

// --------------------------------------------------------------------- Imports

var yeoman = require("yeoman-generator");
var chalk = require("chalk");
var fs = require("fs");

// -------------------------------------------------------------- Helper methods

var GruntGenBase = yeoman.generators.Base.extend({

	installGrunt: function () {
		var done = this.async();
		var options = { "save": true };
		this.npmInstall(["grunt"], options, done);
	},

	installGruntClean: function () {
		var done = this.async();
		var options = { "save": true };
		this.npmInstall(["grunt-contrib-clean"], options, done);
	},

	installGruntConnect: function () {
		var done = this.async();
		var options = { "save": true };
		this.npmInstall(["grunt-contrib-connect"], options, done);
	},

	installGruntCopy: function () {
		var done = this.async();
		var options = { "save": true };
		this.npmInstall(["grunt-contrib-copy"], options, done);
	},

	// Delete the file at a given path if it exists.
	deleteFileIfExists: function (path) {
		var ctx = this;
		fs.exists(path, function (exists) {
			if (exists) {
				ctx.log(chalk.yellow("Removing", path + "..."));
				fs.unlink(path);
				ctx.log(chalk.yellow(path, "deleted"));									
			}
		});
	}
});

// ----------------------------------------------------------------- Main action

module.exports = GruntGenBase.extend({

	constructor: function () {
		// Call the super constructor.
		yeoman.generators.Base.apply(this, arguments);

		this.option("clean", {
			desc: "Clean the project (useful for debugging the generator)",
			type: Boolean,
			defaults: false
		});
		this.clean = this.options.clean;

		this.option("exitAfterClean", {
			desc: "Don't exit after cleaning this file. This will typically be set by a calling component",
			type: Boolean,
			defaults: true
		});
		this.exitAfterClean = this.options.exitAfterClean;
	},

	initializing: {
		// Cleans the build by removing any added files.
		cleanBuild: function () {
			if (this.clean) {
				this.log(chalk.yellow("Cleaning grunt generator..."));

				var paths = [
					this.destinationRoot() + "/Gruntfile.js",
					this.destinationRoot() + "/Gruntfile.coffee"
				]
				var ctx = this;

				paths.forEach(function (path) {
					ctx.deleteFileIfExists(path);
				});
				
				if (this.exitAfterClean) {
					// Exit the generator
					process.exit(0);					
				}
			}
		}
	},

	writing: {
		gruntfile: function () {
			this.log(chalk.yellow("Adding Grunt file to project..."));
			this.template("Gruntfile.js");
		}
	},

	install: {
		installGruntAndPlugins: function () {
			this.log(chalk.yellow("Installing dependencies..."));
			this.installGrunt();
			this.installGruntClean();
			this.installGruntConnect();
			this.installGruntCopy();
		}		
	}
});