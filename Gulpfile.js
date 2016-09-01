var gulp = require('gulp'),
  rename = require('gulp-rename');

gulp.task('css', function () {
  var postcss = require('gulp-postcss');

    return gulp.src('example/layout.css')
      .pipe(postcss([require('postcss-salad')({
        browser: ['ie > 8', 'last 2 version'],
        features: {
          bem: false,
          inlineSvg: {
            path: 'src/svgs',
          },
        },
      })]))
      .pipe(rename('layout-build.css'))
      .pipe(gulp.dest('example'));
});

gulp.task('watch', function () {
  gulp.watch('example/layout.css', ['css']);
});

gulp.task('default', ['watch']);
