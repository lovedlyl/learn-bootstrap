// 引入模块
var gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload,
    stream = browserSync.stream,
    concat = require("gulp-concat"),
    pug = require("gulp-pug"),
    rename = require("gulp-rename"),
    plumber = require("gulp-plumber");

// 合并库文件
gulp.task("lib", function() {
    // 样式
    gulp.src(["bower_components/bootstrap/dist/css/bootstrap.min.css"])
        .pipe(concat("bootstrap.css"))
        .pipe(gulp.dest("dist/styles"));
    // 脚本
    gulp.src(["bower_components/jquery/dist/jquery.min.js",
            "bower_components/bootstrap/dist/js/bootstrap.min.js"
        ])
        .pipe(concat("bootstrap.js"))
        .pipe(gulp.dest("dist/scripts"))
});

// 将pug文件转换为html文件
gulp.task("convertPug", function() {
    gulp.src(["src/index.pug", "src/ch*.pug"])
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(plumber.stop())
        .pipe(gulp.dest("dist"))
        .pipe(stream());
});



gulp.task("default", function() {
    browserSync.init({
        server: "dist"
    });
    gulp.watch("src/*.pug", ["convertPug"]);
    gulp.watch("dist/*.html").on("change", reload);

});
