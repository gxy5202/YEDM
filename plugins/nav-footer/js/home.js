//文档加载完成后
$(function(){
    /**
     * 导航样式
     *  
    **/
    function menu(){
        //判断点击状态
        let click_status = 0;
        //导航宽度改变
        (function(){
            $(window).resize(function() {
                const nav = $('nav');
                //获取浏览器宽度
                const win_width = $(window).width();
                var data = $('.glyphicon-search').data('id');
                console.log(win_width)
                if(win_width < 1200 ){
                    //改变菜单样式
                    $('.nav-box').removeClass('container').addClass('wid_full');
                    $('.search-box').css('max-width','50%');
                    $('.nav-menu').hide();
                    
                }else{
                    $('.nav-box').addClass('container').removeClass('wid_full');
                    //$('.nav-menu-bar').hide();
                    $('.search-box').css('max-width','80%');
                    $('.menu-all').slideUp();
                    $('.nav-menu-bar>div:nth-child(1)').removeClass('rotate-one').css('background','rgb(255,255,255)').siblings().removeClass('rotate-two').css('background','rgb(255,255,255)');
                    click_status = 0;
                    if(data == 1){
                        $('.nav-menu').hide();
                    }else{
                        $('.nav-menu').show();
                    }

                    $('.glyphicon-search').css('color','rgb(255,255,255)');
                    $('.glyphicon-user').css('color','rgb(255,255,255)');
                    $('.dropdown').css('color','rgb(255,255,255)');
                    
                }
            })
        })();

        //菜单点击样式
        (function(){
            $('.nav-menu-bar').on('click',function(){
                if(click_status == 0){
                    $('.nav-menu-bar').addClass('flex-content');
                    $('.nav-menu-bar>div:nth-child(1)').addClass('rotate-one').css('background','rgb(0,136,255)').siblings().addClass('rotate-two').css('background','rgb(0,136,255)');
                    //$('.logo>a>img').attr('src','../../images/common/logo-colorful.png');
                    click_status = 1;
                    $('.menu-all').slideDown().addClass('flex-content');
                    $('.glyphicon-search').css('color','rgb(0,136,255)');
                    $('.glyphicon-user').css('color','rgb(0,136,255)');
                    $('.dropdown').css('color','rgb(0,136,255)')
                }else{
                    $('.nav-menu-bar').removeClass('flex-content');
                    $('.nav-menu-bar>div:nth-child(1)').removeClass('rotate-one').css('background','rgb(255,255,255)').siblings().removeClass('rotate-two').css('background','rgb(255,255,255)');
                    //$('.logo>a>img').attr('src','../../images/common/logo-white.png');
                    click_status = 0;
                    $('.menu-all').slideUp();
                    $('.glyphicon-search').css('color','rgb(255,255,255)');
                    $('.glyphicon-user').css('color','rgb(255,255,255)');
                    $('.dropdown').css('color','rgb(255,255,255)')
                }
            })
        })();

        //滚动高度
        $(window).scroll(function(){
            //获取当前滚动条高度
            var topHight = $(document).scrollTop();
            //用于调试 弹出当前滚动条高度
            console.log(topHight);
            //判断如果滚动条大于90则弹出 "ok"
            if(topHight > 200){
                $('.logo>a>img').attr('src','../../../images/common/logo-colorful.png');
            }else {
                $('.logo>a>img').attr('src','../../../images/common/logo-white.png');
            }
        })

        //搜索点击
        function search(){
            //点击
            $('.glyphicon-search').on({
                click:function(){
                    var data = $('.glyphicon-search').data('id');
                    console.log(data);
                    if(data == 0){
                        $('.search-box').css({
                            border:'1px rgb(0,136,255) solid',
	                        boxShadow:'0 0 1rem rgb(0,136,255)'
                        })
                        $('.search-box input').focus();
                        $(this).attr('id','search-icon');
                        $('.nav-menu').hide();
                        $(this).data('id',1);
                        $('.search-box input').css('display','block')
                        $('.dropdown').show();
                    }else {
                        var value =  $('.search-box input').val();
                        if(value == ""){
                            alert('请输入搜索条件')
                        }
                        //$('.search-box').removeProp('id','search-color')
                    }
                    console.log(123);
                    $('.search-box').attr('id','search-show')
                }
            })
            //移除鼠标隐藏
            
                $('.search-box input').on('blur',function(){
                    var data = $('.glyphicon-search').data('id')
                    $('.search-box').attr('id','').css({
                        border:'none',
                        boxShadow:'none'
                    });
                    $('.dropdown').hide();
                    $('.glyphicon-search').attr('id','');
                    $(this).css('display','none');
                    $('.glyphicon-search').data('id',0);
                    if($(window).width() <= 1200) {
                        $('.nav-menu').hide();
                    }else{
                        $('.nav-menu').show();
                    }
                    //$('.glyphicon-search').removeProp('style');
                })
            
            
        }
        search();
    }
    menu();
})