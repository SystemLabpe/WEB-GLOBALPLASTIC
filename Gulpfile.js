'use strict';

var gulp = require('gulp'),
connect = require('gulp-connect'),
jshint = require('gulp-jshint'),
stylish = require('jshint-stylish'),
inject = require('gulp-inject'),
wiredep = require('wiredep').stream,
gulpif = require('gulp-if'),
minifyCss = require('gulp-minify-css'),
useref = require('gulp-useref'),
uglify = require('gulp-uglify'),
historyApiFallback = require('connect-history-api-fallback');

// Servidor web de desarrollo
gulp.task('server', function() {
  connect.server({
    root: './app',
    hostname: '0.0.0.0',
    port: 8081,
    livereload: true,
    middleware: function(connect, opt) {
      return [ historyApiFallback ];
    }
  });
});

// Servidor web para probar el entorno de producción
gulp.task('server-dist', function() {
  connect.server({
    root: './dist',
    hostname: '0.0.0.0',
    port: 8080,
    livereload: true,
    middleware: function(connect, opt) {
    return [ historyApiFallback ];
    }
  });
});

// Preprocesa archivos Stylus a CSS y recarga los cambios
gulp.task('css', function() {
  gulp.src('./app/css/main.css')
  .pipe(connect.reload());
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
  gulp.src('./app/**/*.html')
  .pipe(connect.reload());
});

// Comprime los archivos CSS y JS enlazados en el index.html
// y los minifica.
gulp.task('compress', function() {
  gulp.src('./app/index.html')
  .pipe(useref.assets())
  .pipe(gulpif('*.js', uglify({mangle: false })))
  // .pipe(gulpif('*.css', minifyCss()))
  .pipe(gulp.dest('./dist'));
});

// Copia el contenido de los estáticos e index.html al directorio
// de producción sin tags de comentarios
gulp.task('copy', function() {
  gulp.src('./app/index.html')
  .pipe(useref())
  .pipe(gulp.dest('./dist'));
  gulp.src('./app/fonts/**')
  .pipe(gulp.dest('./dist/fonts'));
  gulp.src('./app/images/**')
  .pipe(gulp.dest('./dist/images'));
  gulp.src('./app/php/**')
  .pipe(gulp.dest('./dist/php'));
});

// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
  gulp.watch(['./app/**/*.html'], ['html']);
});

gulp.task('default', ['server', 'watch']);
gulp.task('build', ['compress']);
