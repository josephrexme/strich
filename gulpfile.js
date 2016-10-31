const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const parallel = require('concurrent-transform');
const os = require('os');

const $ = gulpLoadPlugins();
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const stream = browserSync.stream;

const paths = {
  source: {
    scripts: [
      'vendor/assets/components/smooth-scroll/smooth-scroll.js',
      'src/js/**/*.js'
    ],
    styles: [
      'vendor/assets/components/aos/dist/aos.css',
      'src/scss/**/*.scss'
    ],
    images: [
      'src/images/**/*.*'
    ],
    templates: ['*.html']
  },
  target: {
    all:     'dist/**/*',
    scripts: 'dist/js',
    styles: 'dist/css',
    images: 'dist/images',
    sourcemaps: './maps',
  }
};

gulp.task('clean', () => del.sync([paths.target.all]) );

gulp.task('styles', () => {
  gulp.src(paths.source.styles)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
    .pipe($.concat('bundle.css'))
    .pipe($.autoprefixer({browsers: ['last 2 versions', '> 1%', 'Firefox ESR']}))
    .pipe($.cssnano())
    .pipe($.sourcemaps.write(paths.target.sourcemaps))
    .pipe(gulp.dest(paths.target.styles))
    .pipe(stream());
});

gulp.task('scripts', () => {
  gulp.src(paths.source.scripts)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe($.babel())
    .pipe($.uglify())
    .pipe($.sourcemaps.write(paths.target.sourcemaps))
    .pipe(gulp.dest(paths.target.scripts))
    .pipe(stream());
});

gulp.task('images', () => {
  gulp.src(paths.source.images)
    .pipe(gulp.dest(paths.target.images));
});

gulp.task('optimizedImages', () => {
  gulp.src(paths.source.images)
    // .pipe(parallel(
    //   $.imageResize({ width: 600 }),
    //   os.cpus().length
    // ))
    .pipe($.cache(
      $.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
        // Keep IDs in SVG
        svgoPlugins: [{cleanupIDs: false}]
      })
    ))
    .pipe(gulp.dest(paths.target.images));
});

gulp.task('serve', ['styles', 'scripts'], () => {
  browserSync.init({
    server: {
      baseDir: ".",
      routes: {
        '/styleguide': 'dist/styleguides.html'
      }
    }
  });

  gulp.watch(paths.source.styles, ['styles']);
  gulp.watch(paths.source.scripts, ['scripts']);
  gulp.watch(paths.source.templates).on('change', reload);
});

gulp.task('build', ['clean', 'scripts', 'styles', 'images'], () => {
  return gulp.src(paths.target.all).pipe($.size({
    title: 'build',
    pretty: true
  }))
});

gulp.task('default', ['scripts', 'styles', 'images', 'serve']);
