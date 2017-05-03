var gulp = require('gulp');
var embedTemplates = require('gulp-angular-embed-templates');
//var inlineNg2Styles = require('gulp-inline-ng2-styles');
var sass = require('node-sass');
var inlineNg2Styles = require('gulp-inline-ng2-template');
var flatten = require('gulp-flatten');

// gulp.task('copy', function () {
// 	gulp.src('src/**/*.scss')
// 		.pipe(flatten())
// 		.pipe(gulp.dest('./dist/styles'));
// });

function sassToCss(path, ext, file, callback) {
	var result = sass.renderSync({
		data: file,
		includePaths: ['/src']
	});
	callback(null,result.css.toString('utf8'));
}

gulp.task('js:build', function () {
    gulp.src('src/**/*.ts')
        //.pipe(embedTemplates({ sourceType: 'ts'}))
        .pipe(inlineNg2Styles({ base: '/src' , useRelativePaths: true, styleProcessor: sassToCss }))
        .pipe(gulp.dest('./dist'));
});