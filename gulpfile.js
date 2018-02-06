const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const pug = require("gulp-pug");
const sass = require('gulp-sass');


gulp.task('pug', function buildHtml() {
    return gulp.src('./lib/components/*.pug')
        .pipe(pug({
          pretty: true
        }))
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function buildHtml() {
    return gulp.src('./lib/components/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});


gulp.task('serve', ['sass', 'pug'], function() {

    browserSync.init({
        server: "./public/"
    });
    gulp.watch("./lib/components/pug/*.pug", ['pug']);
    gulp.watch("./lib/components/sass/*.scss", ['sass']);
    gulp.watch("./lib/components/sass/styles.scss", ['sass']);
    gulp.watch("./public/**/*.html").on('change',reload);
    gulp.watch("./public/**/*.css").on('change',reload);
});

gulp.task('default', ['serve']);
