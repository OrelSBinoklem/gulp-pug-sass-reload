// gulp
var gulp = require('gulp');


// clean files - clean compiled files before new compilation
var clean = require('gulp-clean');


// show alerts in corner of screen
var notify = require('gulp-notify');


// run a series of gulp tasks in order
var runSequence =  require('run-sequence');


// server (localhost) and livereload
var browserSync = require('browser-sync');
var reload = browserSync.reload;


// pug (jade) compilation - html-preprocessor
var pug = require('gulp-pug');

// process only changed or new files
// var changed = require('gulp-changed');
// var newer = require('gulp-newer');

// cache files and their contents - process only different (changed) files
var cached = require('gulp-cached');
var filter = require('gulp-filter');
var pugInheritance = require('gulp-pug-inheritance');

// prettify html output
var prettify = require('gulp-html-prettify');


// sass/scss compilation
var sass = require('gulp-sass');
// sass/scss sourcemaps
var sourcemaps = require('gulp-sourcemaps');
// sass/scss global import - you can import all files in directory without writing names - @import "some-folder/**/*"
var sassGlob = require('gulp-sass-glob');


// images optimization - jpg, png, svg
var image = require('gulp-image');



// Paths
var paths = {
	dist: {
		html: './', // same directory
		js: 'js',
		css: 'styles',
		img: 'img',
		server: './' // same directory
	},
	src: {
		pug: ['pug/*.pug'],
		pugDir: 'pug',
		js: 'js/**/*.js',
		sass: 'sass/**/*.sass',
		img: ['img/**/*']
	},
	watch: {
		pug: 'pug/**/*.pug',
		js: 'js/**/*.js',
		sass: 'sass/**/*',
		img: 'img/**/*'
	},
	clean: {
		css: 'css',
		html: '*.html',
		templates: 'templates'
	}
};



// pug compilation
gulp.task('pug', function() {
	return gulp.src(paths.src.pug)

		/*.pipe(changed(paths.dist.html, {
		 	extension: '.html'
		}))*/
		.pipe(cached('pug'))
		.pipe(pugInheritance({
			basedir: paths.src.pugDir,
			extension: '.pug',
			skip:'node_modules'
		}))
		.pipe(filter(function (file) {
			return !/\/_/.test(file.path) && !/^_/.test(file.relative);
		}))
		.pipe(pug())
		.on('error', notify.onError(function (error) {
			return error.message;
		}))
		.pipe(prettify({
			indent_size: 1, // 1 tab
			indent_char: '	' // tab instead spaces
		}))
		.pipe(gulp.dest(paths.dist.html))
		.on('end', reload);
})

// sass compilation
gulp.task('sass', function () {
	return gulp.src(paths.src.sass)
		.pipe(sassGlob())
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'expanded'
		}))
		.on('error', notify.onError(function (error) {
			return error.message;
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.dist.css))    
		.pipe(reload({stream: true}));
});

// sass compilation production - without soursemaps, minified
gulp.task('sass-production', function () {
	return gulp.src(paths.src.sass)
		.pipe(sassGlob())
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}))
		.on('error', notify.onError(function (error) {
			return error.message;
		}))
		.pipe(gulp.dest(paths.dist.css))    
		.pipe(reload({stream: true}));
});

// images optimization
/*gulp.task('img', function () {
	return gulp.src(paths.src.img)
		// take only changed images
		.pipe(cached(paths.src.img))
		.pipe(image())
		.pipe(gulp.dest(paths.dist.img));
});*/

// clean
gulp.task('clean', function () {
	return gulp.src(
		[
			paths.clean.css,
			paths.clean.html,
			paths.clean.templates
		],
		{
			read: false
		}
	)
	.pipe(clean());
});

// server (browserSync) settings
var settings = {
	server: {
		baseDir: paths.dist.server
	},
	host: 'localhost',
	// port: 9000,
	notify: false // don't show message "Connected to BrowserSync"
};

// browserSync server (localhost)
gulp.task('server', function() {
	browserSync(settings);
});


// watch common files changes for default and production tasks - and re-compile, reload
gulp.task('watch-common', ['server'], function(){

	// watch pug
	gulp.watch(paths.watch.pug, function(event, cb) {
		gulp.start('pug');
	}, reload);

	// watch js
	gulp.watch(paths.watch.js).on('change', reload);

	// watch img
	//gulp.watch(paths.watch.img).on('change', reload);

});


// watch files changes and re-compile, reload
gulp.task('watch', ['server', 'watch-common'], function(){

	// watch sass
	gulp.watch(paths.watch.sass, function(event, cb) {
		gulp.start('sass');
	});

});


// watch files changes and re-compile, reload
gulp.task('watch-production', ['server', 'watch-common'], function() {

	// watch sass and do sass-production
	gulp.watch(paths.watch.sass, function(event, cb) {
		gulp.start('sass-production');
	});

});

// default task
gulp.task('default', ['sass', 'watch']);

// production
gulp.task('prod', function(cb) {
	
	// run functions in order - first clean (delete) files, then others
	runSequence(
		//'clean',
		[/*'img',*/ 'pug', 'sass-production'],
		'watch-production',
		cb
	);

});




