var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    imageop = require('gulp-image-optimization'),
    minifyHTML = require('gulp-minify-html');

gulp.task('scripts', function(){
    gulp.src('src/js/*.js')
        .pipe(uglify())
        //.pipe(rename('perfmatters.min.js'))
        .pipe(gulp.dest('js/'));
});

gulp.task('styles', function(){
    gulp.src('src/css/**/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('minCSS'));
});

gulp.task('images', function(cb) {
    gulp.src(['src/img/**/*.png','src/img/**/*.jpg','src/img/**/*.gif','src/img/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('images/')).on('end', cb).on('error', cb);
});

gulp.task('imagesviews', function(cb) {
    gulp.src(['src/views/images/**/*.png','src/views/images/**/*.jpg','src/views/images/**/*.gif','src/views/images/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('views/images/')).on('end', cb).on('error', cb);
});

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src('src/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./'));
});


gulp.task('watch', function(){
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/css/**/*.css', ['styles']);
});

gulp.task('default', function() {
    gulp.start('scripts', 'styles', 'images', 'minify-html', 'imagesviews', 'watch');
});