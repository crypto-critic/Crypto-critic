require('babel-polyfill')
const gulp = require("gulp");
const nodemon = require('gulp-nodemon');
const spawn = require('child_process').spawn;
const run = require('gulp-run');
const webpack = require('webpack');
const gutil    = require('gulp-util');
const notifier = require('node-notifier');
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

