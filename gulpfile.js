//import { src, task, cache, dest } from 'gulp';
//import injectPartials from 'gulp-inject-partials';
const injectPartials = require("gulp-inject-partials");
const { src, dest, task, series, watch } = require("gulp");
const del = require("del");
const browserSync = require("browser-sync");
const reload = browserSync.reload;

const publishFolder = "public";
const publishcss = "public/css";
const publishwebfonts = "public/webfonts";
const publishviews = "public/views";
const publishimages = "public/images";
const publishjs = "public/js";

function index() {
  console.log("Injecting partials");
  return src("index.html")
    .pipe(
      injectPartials({
        removeTags: false,
      })
    )
    .pipe(dest(publishFolder));
}
task("index", index);

// copy any html/views files in source/ to public/
function copyViews() {
  console.log("copying views to: ", publishviews);
  return src([
    "src/views/*.html",
    "!src/views/elec-charging.html",
    "!src/views/contact.html",
    "!src/views/google-map.html",
  ]).pipe(dest(publishviews));
}
task("copyViews", copyViews);

function viewInjection() {
  console.log("Injecting view partials");
  return src([
    "src/views/elec-charging.html",
    "src/views/contact.html",
    "src/views/google-map.html",
  ])
    .pipe(
      injectPartials({
        removeTags: true,
      })
    )
    .pipe(dest(publishviews));
}
task("viewInjection", viewInjection);

// copy any css files in source/ to public/
function copyCss() {
  console.log("copying css to: ", publishcss);
  return src([
    "src/css/all.css",
    "src/css/normalize.css",
    "src/css/main.css",
  ]).pipe(dest(publishcss));
}
// copy any css files in source/ to public/
function copyWebfonts() {
  console.log("copying webfonts to: ", publishwebfonts);
  return src("src/webfonts/*.*").pipe(dest(publishwebfonts));
}
task("copyWebfonts", copyWebfonts);

// copy any js files in source/ to public/
function processJs() {
  console.log("processing js to: ", publishjs);
  return src("src/js/*.js").pipe(dest(publishjs));
}
task("processJs", processJs);

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
  console.log("copying images to: ", publishimages);
  return src([
    "src/images/purpleBanjo.jpg",
    "src/images/icon-128x128.png",
    "src/images/icon-192x192.png",
    "src/images/icon-256x256.png",
    "src/images/icon-384x384.png",
    "src/images/icon-512x512.png",
    "src/images/poop.png",
    "src/images/food.jpg",
    "src/images/solar.jpg",
    "src/images/weather.jpg",
  ]).pipe(dest(publishimages));
}
task("copyImages", copyImages);

function clean() {
  return del(["public"]);
}
task("clean", clean);

function copy() {
  return src([
    "manifest.json",
    "favicon.ico",
    "service-worker.js",
    "robots.txt",
    "humans.txt",
  ]).pipe(dest(publishFolder));
}
task("copy", copy);

function serve() {
  return browserSync.init({
    server: "public",
    open: false,
    port: 3003,
  });
}
task("serve", serve);

task(
  "buildAndServe",
  series(
    clean,
    index,
    viewInjection,
    copy,
    copyCss,
    processJs,
    copyViews,
    copyImages,
    copyWebfonts,
    serve
  )
);

watch(
  ["*.html", "src/**//*.css", "src/js/**//*.js"],
  { cwd: "src" },
  reload
); /*.css', 'src/js/**/ /*.js'], { cwd: 'src' }, reload);
//};

*/

/*
function watch() {
  gulp.watch('src/js/*.js', processJs);
}

gulp.task('watch', watch);
// watch files for changes and reload
function serve() {
  browserSync({
    server: {
      baseDir: 'public'
    },
    open: false,
    port: 3003
  });

//  watch(['*.html', 'src/**/
