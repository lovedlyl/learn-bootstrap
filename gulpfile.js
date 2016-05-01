// 引入模块
var gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload,
    stream = browserSync.stream,
    concat = require("gulp-concat"),
    pug = require("gulp-pug"),
    rename = require("gulp-rename"),
    plumber = require("gulp-plumber");

// gulp browser-sync gulp-concat gulp-plumber gulp-pug gulp-rename 
// 合并库文件
gulp.task("lib", function() {
    // 样式
    gulp.src(["bower_components/bootstrap/dist/css/bootstrap.min.css"])
        .pipe(concat("bootstrap.css"))
        .pipe(gulp.dest("../lovedlyl.github.io/learn-bootstrap/styles"))
        .pipe(gulp.dest("dist/styles"));
    // 字体文件
    gulp.src(["bower_components/bootstrap/dist/fonts/*"])
        .pipe(gulp.dest("../lovedlyl.github.io/learn-bootstrap/fonts"))
        .pipe(gulp.dest("dist/fonts"))

    // 脚本
    gulp.src(["bower_components/jquery/dist/jquery.min.js",
            "bower_components/bootstrap/dist/js/bootstrap.min.js"
        ])
        .pipe(concat("bootstrap.js"))
        .pipe(gulp.dest("../lovedlyl.github.io/learn-bootstrap/scripts"))
        .pipe(gulp.dest("dist/scripts"))
});

// 将图片导入github.io中
gulp.task("image", function () {
    gulp.src("dist/images/*")
        .pipe(gulp.dest("../lovedlyl.github.io/learn-bootstrap/images"))
})
// 将pug文件转换为html文件
gulp.task("convertPug", function() {
    gulp.src("src/!(data|mixin|bootstrap-engin).pug")
        .pipe(plumber())
        .pipe(pug({ pretty: false }))
        .pipe(plumber.stop())
        .pipe(gulp.dest("dist"))
        .pipe(gulp.dest("../lovedlyl.github.io/learn-bootstrap"))
        .pipe(stream());
});



gulp.task("default", function() {
    browserSync.init({
        server: "../lovedlyl.github.io/learn-bootstrap"
        // server: "dist"
    });
    gulp.watch("src/*.pug", ["convertPug"]);
    gulp.watch("dist/*.html").on("change", reload);

});
