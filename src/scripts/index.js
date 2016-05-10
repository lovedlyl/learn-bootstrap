$(function() {

    (function() {
        // 为文档添加侧边栏菜单
        var menu = $("<ul id='side-menu'></ul>").addClass("nav nav-tabs nav-stacked")


        // 为每个h3标签设置ID
        $("h3").each(function(index, el) {
            var self = $(el);
            self.attr('id', 'h3' + index);
            $("<li></li>")
                .append($("<a>")
                    .html(self.html())
                    .attr('href', '#h3' + index))
                .appendTo(menu)
        });

        $("<div id='scrollSpy'></div>")
            .append(menu)
            .appendTo('body > .row')
            .addClass("col-lg-3 col-md-3 hidden-sm hidden-xs")

        // 
        menu.find("li").eq(0).addClass('active')
            // 调用bootstrap的affix插件
        menu.attr({
            "data-spy": 'affix',
            "data-offset-top": '200'
            // "data-offset-bottom": "200"
        });

        // 监听滚动
        $("body").attr({
            "data-spy": 'scroll',
            "data-target": '#scrollSpy'
        });
    })();

    // 翻页导航
    (function() {
        var start = 2;
        var end = 24;
        var here;
        var chapter = window.location.pathname.match(/\d+/);
        if (chapter) {
        		here =  parseFloat(chapter.join(""));
            var jumper = $("<ul></ul>").addClass("pager");
            var prev = $("<a>").addClass("text-info");
            var next = $("<a>").addClass("text-info");
            if (here > start) {
                $("<li></li>").addClass("previous").append(prev.html("上一章").attr('href', "ch" + (here - 1) + ".html")).appendTo(jumper);
            }
            if (here < end) {
                $("<li></li>").addClass("next").append(next.html("下一章").attr('href', "ch" + (here + 1) + ".html")).appendTo(jumper);
            }
            jumper.clone().insertAfter("h2");
            jumper.insertAfter('.content');
        }
    })();


})
