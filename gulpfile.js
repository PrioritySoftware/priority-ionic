var gulp = require('gulp');
var sass = require('node-sass');
var inlineNg2Styles = require('gulp-inline-ng2-template');
var flatten = require('gulp-flatten');

function sassToCss(path, ext, file, callback) {
	var result = sass.renderSync({
		data: file,
		includePaths: ['/src']
	});
	callback(null,result.css.toString('utf8'));
}

gulp.task('js:build', function () {
    gulp.src('src/**/*.ts')
        .pipe(inlineNg2Styles({ base: '/src' , useRelativePaths: true, styleProcessor: sassToCss }))
        .pipe(gulp.dest('./dist'));
});