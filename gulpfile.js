
//import { src, task, cache, dest } from 'gulp';
//import injectPartials from 'gulp-inject-partials';
const injectPartials = require('gulp-inject-partials');
const { src, dest, task, series } = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');
const reload = browserSync.reload;


//import del from 'del';

const publishFolder = 'public';
const publishcss = 'public/css';
const publishviews = 'public/views';
const publishimages = 'public/images';
const publishjs = 'public/js';

function index() {
  console.log('Injecting partials');
  return src('./index.html')
    .pipe(injectPartials())
    .pipe(dest(publishFolder));
};
task('index', index);


// copy any css files in source/ to public/
function copyCss() {
  console.log('copying css to: ', publishcss);
  return src([
    'src/css/all.css',
    'src/css/normalize.css',
    'src/css/index.css'
  ])
    .pipe(dest(publishcss));
}
task('copyCss', copyCss);


// copy any js files in source/ to public/
function copyJs() {
  console.log('copying js to: ', publishjs);
  return src('src/js/*.js')
    .pipe(dest(publishjs));
}
task('copyJs', copyJs);


// copy any html/views files in source/ to public/
function copyViews() {
  console.log('copying views to: ', publishviews);
  return src('src/views/*.html')
    .pipe(dest(publishviews));
}
task('copyViews', copyViews);

/*
// copy any images files in source/ to public/
function copyImages() {
  console.log('copying images to: ', publishimages);
  return src('src/images/*.+("jpg|png")')
    .pipe(dest(publishimages));
}
task('copyImages', copyImages);
images/purpleBanjo.jpg
*/


// copy any images files in source/ to public/
function copyImages() {
  console.log('copying images to: ', publishimages);
  return src([
    'src/images/purpleBanjo.jpg',
    'src/images/icon-192x192.png',
    'src/images/food.jpg',
    'src/images/solar.jpg',
    'src/images/weather.jpg'
  ])
    .pipe(dest(publishimages));
}
task('copyImages', copyImages);


function clean() {
  return del(['public']);
};
task('clean', clean);

function copy() {
  return src([
    'manifest.json',
    'favicon.ico',
    'service-worker.js',
    'robots.txt',
    'humans.txt'
  ])
    .pipe(dest(publishFolder));
}
task('copy', copy);

function serve() {
  return browserSync.init({
    server: 'public',
    open: false,
    port: 3003
  });
}
task('serve', serve);
task('buildAndServe', series(clean, index, copy, copyCss, copyJs, copyViews, copyImages, serve));

// watch files for changes and reload
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], { cwd: 'app' }, reload);
});