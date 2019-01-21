import {nav} from './nav-footer.js';
$(document).ready(function(){
    //高度宽度协调
    var width=$(".user-image").css("width")
    $(".user-image").css("height",width)
    
    var width=$("#main").css("height")
    $(".xiangxi").css("height",width)
    //点击切换信息栏
    $(".xiangxi>div").eq(0).show().siblings().hide()
    $(".list-unstyled li").click(function(){
        $(this).addClass("active").siblings().removeClass("active")
        $(".xiangxi>div").eq($(this).index()).show().siblings().hide()
    })
})