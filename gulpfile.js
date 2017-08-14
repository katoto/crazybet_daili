/*npm install gulp-cache gulp-clean-css gulp-imagemin
 npm install gulp-cache@0.4.4   --按版本号安装
 */

// 载入gulp
var gulp = require('gulp'),
    //    sass = require('gulp-ruby-sass'),
    //    autoprefixer = require('gulp-autoprefixer'),  //自动增加浏览器前缀
    //    loadplugins = require('gulp-load-plugins'),   //自动加载插件
    //    jshint = require('gulp-jshint'),       //js拼写检查
    //    uglify = require('gulp-uglify'),       //js压缩
    rename = require('gulp-rename'), //修改文件名
    //    clean = require('gulp-clean'),            //清理文件
    //    concat = require('gulp-concat'),
    //    notify = require('gulp-notify'),
    cache = require('gulp-cache'), //文件缓存，有改动才压缩合并
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    px2rem = require('postcss-px2rem'),
    minifycss = require('gulp-clean-css'), //压缩CSS文件
    imagemin = require('gulp-imagemin'), //压缩图片
    pngquant = require('imagemin-pngquant'); //压缩png24半透明
//   spritesmith = require('gulp-css-spritesmith'), //雪碧图
//browserSync = require('browser-sync'); //浏览器配置（自动刷新）
//    livereload = require('gulp-livereload');


// 样式
gulp.task('styles', function() {
    var processors = [px2rem({ remUnit: 75 }), autoprefixer({ brpwsers: ['last 10 version', '>1%'] })]; //px2rem({ remUnit: 75 }),
    return gulp.src('static/2017/redPacket/css/register.css')
    //.pipe(sass({ style: 'expanded', }))
    //.pipe(gulp.dest('union/css/'))
        .pipe(rename({ suffix: '.min' }))
        //.pipe(autoprefixer({brpwsers:['last 2 version', 'android >= 4.0']}))
        .pipe(postcss(processors))
        .pipe(minifycss({
            'advanced': false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            'compatibility': 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            'keepBreaks': true, //类型：Boolean 默认：false [是否保留换行]
            'keepSpecialComments': '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('static/2017/redPacket/css/'))
});

gulp.task('styles2', function() {
    var processors = [autoprefixer({ brpwsers: ['last 10 version', '>1%'] })]; //px2rem({ remUnit: 200 }),
    return gulp.src('touch/css_test/gcai.css')
    //.pipe(sass({ style: 'expanded', }))
    //.pipe(gulp.dest('union/css/'))
    //.pipe(rename({ suffix: '.min' }))
    //.pipe(autoprefixer({brpwsers:['last 2 version', 'android >= 4.0']}))
        .pipe(postcss(processors))
        .pipe(minifycss({
            'advanced': false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            'compatibility': 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            'keepBreaks': true, //类型：Boolean 默认：false [是否保留换行]
            'keepSpecialComments': '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('touch/css/'))
});


// 脚本
/*gulp.task('scripts', function() {
 return gulp.src('js/*.js')
 .pipe(jshint('.jshintrc'))
 .pipe(jshint.reporter('default'))
 .pipe(concat('main.js'))
 .pipe(gulp.dest('dist/scripts'))
 .pipe(rename({ suffix: '.min' }))
 .pipe(uglify())
 .pipe(gulp.dest('dist/scripts'))
 .pipe(notify({ message: 'Scripts task complete' }));
 });
 */
// 图片
gulp.task('images', function() {
    gulp.src(['static/2017/redPacket/img/*{.jpg,.png}'])
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }], //不要移除svg的viewbox属性
            use: [pngquant()] //pngquant深度压缩
        })))
        .pipe(gulp.dest('static/2017/redPacket/img/'));

});


// 自动雪碧图
// autoSprite, with media query
// gulp.task('autoSprite', function() {
//     gulp.src('test/css/hezuo.css').pipe(spritesmith({

//         // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
//         imagepath: 'test/slice/',
//         // 映射CSS中背景路径，支持函数和数组，默认为 null
//         imagepath_map: null,
//         // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
//         spritedest: 'test/images/',
//         // 替换后的背景路径，默认 ../images/
//         spritepath: '../images/',
//         // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
//         padding: 2,
//         // 是否使用 image-set 作为2x图片实现，默认不使用
//         useimageset: false,
//         // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
//         newsprite: false,
//         // 给雪碧图追加时间戳，默认不追加
//         spritestamp: false,
//         // 在CSS文件末尾追加时间戳，默认不追加
//         cssstamp: false
//     }))
//     .pipe(gulp.dest('publish/'));
// });

var spritesmith = require('gulp.spritesmith');

gulp.task('imgSprite', function() {
    return gulp.src('sportstoday/images_test/*.sp.png') //需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sportstoday/images/icon_sprite.png', //保存合并后图片的地址
            cssName: 'sportstoday/style_test/sprite.css', //保存合并后对于css样式的地址
            padding: 2, //合并时两个图片的间距
            algorithm: 'binary-tree', //注释1
            cssTemplate: function(data) {
                var arr = [];
                data.sprites.forEach(function(sprite) {
                    arr.push(".icon-" + sprite.name +
                        "{" +
                        //"background-image: url(‘/union/"+sprite.escaped_image+"‘);"+
                        "background-position: " + sprite.px.offset_x + " " + sprite.px.offset_y + ";" +
                        "width:" + sprite.px.width + ";" +
                        "height:" + sprite.px.height + ";" +
                        "}\n");
                });
                return arr.join("");
            }
        }))
        //.pipe(replace(/^\.icon-/gm, '.'))
        .pipe(gulp.dest('./sportstoday/images_test/'));
});

// 清理
gulp.task('clean', function() {
    return gulp.src(['images_test', 'css_test'], { read: false })
        .pipe(clean());
});



// 预设任务
gulp.task('default', ['watch'], function() {});

// 监控
gulp.task('watch', function() {

    // 监控所有.css档
    gulp.watch('static/2017/redPacket/css/register.css', ['styles']);

    // 监控所有.js档
    //gulp.watch('src/scripts/*.js', ['scripts']);

    //监控所有图片档
    //gulp.watch('static/redPacket/img/*.*', ['images']);

    // 建立即时重整伺服器
    //var server = livereload();

    // 监控当前目录下的档案，一旦有更动，便进行重整
    // gulp.watch(['./**/*.*'],['serve']).on('change',browserSync.reload);


});
