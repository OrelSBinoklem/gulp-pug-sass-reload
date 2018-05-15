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

var a_pp = require('adaptive-pixel-perfect').create();


// pug (jade) compilation - html-preprocessor
var pug = require('gulp-pug');

// process only changed or new files
// var changed = require('gulp-changed');
// var newer = require('gulp-newer');

// cache files and their contents - process only different (changed) files
var cached = require('gulp-cached');
var filter = require('gulp-filter');

// sass/scss compilation
var sass = require('gulp-sass');
// sass/scss sourcemaps
var sourcemaps = require('gulp-sourcemaps');
// sass/scss global import - you can import all files in directory without writing names - @import "some-folder/**/*"
var sassGlob = require('gulp-sass-glob');
//vendor autoprefixer
var autoprefixer = require('gulp-autoprefixer');


// images optimization - jpg, png, svg
var image = require('gulp-image');



// Paths
var paths = {
	dist: {
		html: './', // same directory
		js: 'js',
		css: 'css',
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
		cssMap: 'css/**/*.map',
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
		.pipe(pug({
            pretty: '\t'
        }))
		.on('error', notify.onError(function (error) {
			return error.message;
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
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
		.on('error', notify.onError(function (error) {
			return error.message;
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.dist.css))    
		.pipe(reload({stream: true}));
});

//clean-sass-map

gulp.task('clean-sass-map', function () {
    return gulp.src(
        [
            paths.clean.cssMap,
        ],
        {
            read: false
        }
    )
        .pipe(clean());
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
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
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
var port = 3010;
var folderForDesignScreenshots = "design";
var portForBrowserSync = 3000;

var settings = {
    server: paths.dist.server,
    cors: true,
    middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    },
    socket: {
        domain: 'localhost:' + portForBrowserSync
    },
    scriptPath: function (path, port, options) {
        return "http://" + options.getIn(['socket', 'domain']) + path;
    }
};

// browserSync server (localhost)
gulp.task('server', function() {
	browserSync(settings);

    a_pp.start(port, folderForDesignScreenshots, portForBrowserSync);
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
		'clean-sass-map',
		[/*'img',*/ 'pug', 'sass-production'],
		//'watch-production',
		cb
	);

});




