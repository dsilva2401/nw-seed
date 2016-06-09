// Imports
	var gulp = require('gulp-param')(require('gulp'), process.argv);
	var fs = require('fs-extra');
	var shell = require('shelljs');
	var open = require('open');

// Tasks

	// Serve app
	gulp.task('serve', function () {
		open('http://localhost:8080/src');
		shell.exec('node_modules/.bin/webpack-dev-server --progress --colors --watch --inline --open');
	});

	// Start nw app
	gulp.task('start', function () {
	    shell.exec('node_modules/.bin/nw . --remote-debugging-port=9222');
	});

	// Start nw app with debugger
	gulp.task('start:dev', function () {
	    console.log('Open in chrome browser:')
	    console.log('chrome-devtools://devtools/bundled/inspector.html?ws=localhost:9222/devtools/page/');
	    open('http://localhost:9222');
	    shell.exec('node_modules/.bin/nw . --remote-debugging-port=9222');
	})

	// Build
	var platforms = ['win32', 'win64', 'osx32', 'osx64', 'linux32', 'linux64'];
	platforms.forEach(function (platform) {
	    gulp.task('build:'+platform, function () {
	    	shell.exec('node_modules/.bin/webpack');
	        fs.removeSync('./build');
	        shell.exec('nwbuild -p '+platform+' -o "./build" .');
	    });
	});