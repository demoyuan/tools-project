var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    tinypng_nokey = require('gulp-tinypng-nokey'),
    gulpSequence = require('gulp-sequence');


var path = './src/',
    dist = './dist/';

var config = {
    inputImgFile: path + 'images/',
    outputImgFile: dist + 'images/',
    outputMinImgFile: dist + 'images/min',
    outputTinypngFile: dist + 'images/tinypng',
    getImg: path + 'images/*',
    getOutputMinImg: dist + 'images/min/*.{png,jpg,jpeg,gif,ico}'
}

// version ^3.0.0
gulp.task('imagesMin', function () {
    return gulp.src(config.getImg)
        .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),  // 交错式gif
                imagemin.jpegtran({progressive: true}), // 渐进式jpg
                imagemin.optipng(),                     // 默认png优化级别5
                imagemin.svgo()                         // svg
            ], {verbose: false}
        ))
        .pipe(gulp.dest(config.outputMinImgFile))
});

gulp.task('tp', function() {
    return gulp.src(config.getOutputMinImg)
        .pipe(tinypng_nokey ())
        .pipe(gulp.dest(config.outputTinypngFile));
})


gulp.task('mini-img', function(cb){
    gulpSequence('imagesMin', 'tp')(cb);
});