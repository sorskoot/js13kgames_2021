const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const glslify = require('./gulp/gulp-glslify');
const roadroller = require('./gulp/gulp-roadroller');
const gulpif = require('gulp-if');
const gulpCopy = require('gulp-copy');
const webp = require('gulp-webp');
const inlinesource = require('gulp-inline-source');
const htmlmin = require('gulp-htmlmin');

function isJavaScript(file) {
    // Check if file extension is '.js'
    return file.extname === '.js';
}

function isShader(file) {
    return file.extname === '.glsl';
}

function javascript(cb) {
    {
        return gulp.src(['./src/index.js','./src/classes/*.js', './src/shaders/*.glsl'])

            .pipe(sourcemaps.init())
            .pipe(gulpif(isJavaScript, terser({
                keep_fnames: true,
                mangle: false
              })))                                    
            .pipe(gulpif(isShader, glslify()))                                    
            .pipe(concat('main.js'))                       
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/'));
    }
}

function copyStatic(cb) {
    return gulp.src('./src/static/*.html')
        .pipe(gulpCopy('./dist', { prefix: 3 }));
}

function doWebp(cb){
    return gulp.src('./src/static/*.png')
        .pipe(webp({lossless:true}))
        .pipe(gulp.dest('./dist'));
}

gulp.task('watch', function () {
    return gulp.watch(['./src/index.js','./src/classes/*.js','./src/static/*.*', './src/shaders/*.glsl'],
        { ignoreInitial: false },
        gulp.series(copyStatic, doWebp, javascript));
});

function production() {
    return gulp.src(['./src/index.js','./src/classes/*.js', './src/shaders/*.glsl'])
        //   .pipe(sourcemaps.init())
        .pipe(gulpif(isJavaScript, terser({
            ecma:2020,
            compress:{
                unsafe:true,
                unsafe_Function:true,
                unsafe_arrows:true,
                unsafe_comps:true,
                unsafe_math:true,
                unsafe_methods:true,
                unsafe_proto:true,
                unsafe_regexp:true,
                unsafe_symbols:true,
                unsafe_undefined:true,
                drop_console:true,
                passes:10
            }
        })))
        .pipe(gulpif(isShader, glslify()))
        .pipe(concat('main.js'))   
        .pipe(roadroller())   
        .pipe(gulp.dest('./dist/'));
};

gulp.task('inlinesource', function () {
    return gulp.src('./dist/*.html')
        .pipe(htmlmin({collapseWhitespace:true}))
        .pipe(inlinesource({saveRemote:false}))
        .pipe(gulp.dest('./dist/'));
});

exports.default = gulp.series(copyStatic,doWebp, javascript);
exports.copy = copyStatic;
exports.prod =  gulp.series(copyStatic, doWebp, production);
