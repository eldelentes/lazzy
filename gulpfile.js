var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var pump = require('pump');
var watch = require('gulp-watch');

gulp.task('default', ['watch']);

gulp.task('dist', function (cb) {
	pump([
		gulp.src('src/lazzy.js'),
			uglify(),
			rename('lazzy.min.js'),
			gulp.dest('dist')
		],
		cb
	);
});

gulp.task('build', ['dist']);

gulp.task('watch', function () {
    gulp.watch('src/lazzy.js', ['dist']);
});