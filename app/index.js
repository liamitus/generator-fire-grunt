"use strict";

// --------------------------------------------------------------------- Imports

var yeoman = require("yeoman-generator");
var chalk = require("chalk");
var fs = require("fs");

// -------------------------------------------------------------- Helper methods

var GruntGenBase = yeoman.generators.Base.extend({

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

				var path = this.destinationRoot() + "/Gruntfile.coffee";
				var ctx = this;

				this.deleteFileIfExists(path);
				
				if (this.exitAfterClean) {
					// Exit the generator
					process.exit(0);					
				}
			}
		}
	},

	gruntfile: function () {
		this.log(chalk.yellow("Adding Grunt file to project..."));
		this.template("Gruntfile.coffee", "Gruntfile.coffee");
	}
});