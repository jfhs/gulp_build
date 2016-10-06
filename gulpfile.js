var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var ghtmlSrc = require('gulp-html-src');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var rev = require('gulp-rev');
var fingerprint = require('gulp-fingerprint');
var del = require('del');

var OUT_CSS_NAME = 'css/all.min.css';
var OUT_JS_NAME = 'js/all.min.js';

gulp.task('clean', function() {
    return del(['dist', 'temp']);
});

gulp.task('build-js', function() {
    return gulp.src('index.html')
        .pipe(ghtmlSrc())
        .pipe(concat(OUT_JS_NAME))
        .pipe(uglify())
        .pipe(gulp.dest('temp'));
});

gulp.task('build-css', function() {
    return gulp.src('index.html')
        .pipe(ghtmlSrc({presets: 'css'}))
        .pipe(concat(OUT_CSS_NAME))
        .pipe(cleanCss())
        .pipe(gulp.dest('temp'));
});

gulp.task('asset-rev', ['build-js', 'build-css'], function(cb) {
    return gulp.src(['temp/**/*.js', 'temp/**/*.css'])
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist'));
});

gulp.task('build-html', ['asset-rev'], function() {
    gulp.src('index.html')
        .pipe(htmlreplace({
            js: OUT_JS_NAME,
            css: OUT_CSS_NAME
        }))
        .pipe(fingerprint('dist/rev-manifest.json'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['clean', 'build-html']);