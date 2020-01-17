const { src, dest, series, parallel } = require('gulp')
const { spawn } = require('child_process')
const image = require('gulp-image')
const zip = require('gulp-zip')
const runTime = new Date().toISOString().replace(/:/g, '_')

function miniImage() {
  return src('src/images/**/*')
    .pipe(image({
      pngquant: true,
      optipng: true,
      zopflipng: true,
      jpegRecompress: true,
      mozjpeg: true,
      guetzli: true,
      gifsicle: true,
      svgo: true,
      concurrent: 10,
      quiet: false
    }))
    .pipe(dest(`dist/${runTime}`))
}

function bzip() {
  return src('dist/**/*')
    .pipe(zip('dist.zip'))
    .pipe(dest('dist'))
}

function logDir() {
  spawn('git', ['status'], { stdio: 'inherit' })
  return spawn('ls', ['-a', '-l'], { cwd: './dist', stdio: 'inherit' })
}

exports.images = series(miniImage)
exports.zip = series(bzip)
exports.default = series(miniImage, bzip, logDir)
