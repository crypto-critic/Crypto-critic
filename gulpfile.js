require('babel-polyfill')
const gulp = require("gulp");
const nodemon = require('gulp-nodemon');
const spawn = require('child_process').spawn;
const run = require('gulp-run');
const webpack = require('webpack');
const gutil    = require('gulp-util');
const notifier = require('node-notifier');

// const babel = require('gulp-babel');
// const babelConfig = require('./babel.config.js');
// const Cache = require('gulp-file-cache')

// const cache = new Cache();


let devconfig = require('./config/webpack.config.dev.js');
let statsLog = {
    colors: true,
    reasons: true
};
const startServer = () => {
    nodemon({
        script: './dist/server.js',
        ext: 'js',
        "ignore": [
            ".idea/",
            ".git/",
            "gulpfile.js",
            "client/",
            "dist/assets",
            "node_modules/"
        ],
        env: {'NODE_ENV': 'development'}
    });
};

// gulp.task('i18next', function() {
//     return gulp.src(['client/**/*.jsx'])
//         .pipe(
//             babel(babelConfig)
//         )
//         .pipe(scanner({
//             lngs: ['en', 'vi'], // supported languages
//             resource: {
//                 // the source path is relative to current working directory
//                 loadPath: 'client/locales/{{lng}}/{{ns}}.json',

//                 // the destination path is relative to your `gulp.dest()` path
//                 savePath: 'locales/{{lng}}/{{ns}}.json'
//             }
//         }))
//         .pipe(gulp.dest('client'));
// });

// gulp.task('i18next', function() {
//     gulp.src('client/**/*.jsx')
//         .pipe(new i18nextParser({
//         locales: ['en', 'vi'],
//         output: 'client/locales/$LOCALE/$NAMESPACE.json'
//         }))
//         .pipe(gulp.dest('./'));
// });

// gulp.task('compile', function () {
//     var stream = gulp.src('./server/**/*.js') // your ES2015 code
//                      .pipe(cache.filter()) // remember files
//                      .pipe(babel(babelConfig)) // compile new ones
//                      .pipe(cache.cache()) // cache them
//                      .pipe(gulp.dest('./dist')) // write them
//     return stream // important for gulp-nodemon to wait for completion
// })

// gulp.task('watch', gulp.series('compile', function (done) {
//     var stream = nodemon({
//                 script: 'dist/server.js' // run ES5 code
//                 , watch: 'server' // watch ES2015 code
//                 , tasks: ['compile'] // compile synchronously onChange
//                 , done: done
//                 })

//     return stream
// }))

gulp.task('dev', (done) => {
    webpack(devconfig, onComplete);
    function onComplete(error, stats) {
      if (error) {
        onError(error);
      } else if ( stats.hasErrors() ) {
        onError( stats.toString(statsLog) );
      } else {
        onSuccess( stats.toString(statsLog));
      }
    }
    function onError(error) {
      let formatedError = new gutil.PluginError('webpack', error);

      notifier.notify({
        title: `Error: ${formatedError.plugin}`,
        message: formatedError.message
      });

      done(formatedError);
    }
    function onSuccess(detailInfo) {
      gutil.log('[webpack]', detailInfo);
      done();
    }
    startServer();
});

let packageAssets = function() {
    gulp.src(["./dist/**","!./dist/assets/js/**", "!./dist/uploads/**"])
        .pipe(gulp.dest("./build"));
};

gulp.task("package-assets", packageAssets);
gulp.task("start-db" ,()=>{
    run("cd Users/apple/Downloads/mongodb-osx-x86_64-3.6.3/bin/").exec(()=>{
        console.log("go to mongo dir")
        run("mongod").exec(() =>{
            console.log("Started mongodb");
        })
    })
})
gulp.task("build", (done) => {
    packageAssets();
    //stylusCompiler.compile("./build/assets/css").then(() => {
        console.log("Running Webpack");
        run("webpack --config webpack.config.prod").exec(() => {
            console.log("webpack done");
        });
    //})
});

gulp.task("stop-db", ()=>{
    // run("mongo").exec(()=>{
    //     run("use admin;").exec(()=>{
    //         run("db.shutdownServer();").exec(()=>{
    //             console.log("Stopped mongodb");
    //         })
    //     })
    // })
});

