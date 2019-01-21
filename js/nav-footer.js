var nav = $(function(){
    function menu(){
        //判断点击状态
        let click_status = 0;
        //导航宽度改变
        (function(){
            var  now_width = $(window).width();
            if( now_width <= 991){
                $('.nav-box').removeClass('container').addClass('wid_full');
            }
            $(window).resize(function() {
                const nav = $('nav');
                //获取浏览器宽度
                const win_width = $(window).width();
                var data = $('.glyphicon-search').data('id');
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
                    document.documentElement.style.overflowY = 'visible';
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
                    $('.dropdown').css('color','rgb(0,136,255)');
                    document.documentElement.style.overflowY = 'hidden';
                }else{
                    $('.nav-menu-bar').removeClass('flex-content');
                    $('.nav-menu-bar>div:nth-child(1)').removeClass('rotate-one').css('background','rgb(255,255,255)').siblings().removeClass('rotate-two').css('background','rgb(255,255,255)');
                    //$('.logo>a>img').attr('src','../../images/common/logo-white.png');
                    click_status = 0;
                    $('.menu-all').slideUp();
                    $('.glyphicon-search').css('color','rgb(255,255,255)');
                    $('.glyphicon-user').css('color','rgb(255,255,255)');
                    $('.dropdown').css('color','rgb(255,255,255)');
                    document.documentElement.style.overflowY = 'visible';
                }
            })
        })();
    
        //滚动高度
        $(window).scroll(function(){
            //获取当前滚动条高度
            var topHight = $(document).scrollTop();
            //判断如果滚动条大于200则
            if(topHight > 200){
                $('.logo>a>img').attr('src','../images/common/logo-colorful.png');
            }else {
                $('.logo>a>img').attr('src','../images/common/logo-white.png');
            }
        })
    
        //搜索点击
        function search(){
            //点击
            $('.glyphicon-search').on({
                click:function(){
                    var data = $('.glyphicon-search').data('id');
                    if(data == 0){
                        $('.search-box input').focus();
                        $('.search-btn').css({
                            marginRight:'20px',
                        })
                        $(this).attr('id','search-icon');
                        $('.nav-menu').hide();
                        $(this).data('id',1);
                        $('.search-box input').css('display','block')
                        $('.dropdown').show();
                    }else {
                        var value =  $('.search-box input').val();
                        var type = $('#dropdownMenu1').text();
                        if(value == "" || type != "音乐" && type != "资讯" && type != "商品"){
                            alert('请输入搜索条件')
                        }else if(value != "" && type != "主题"){
                            //获取当前网址，改变跳转路径
                                var href = location.href;
                                if(href.indexOf('index') == -1){
                                    if(type == '商品'){
                                        location.assign('./shop.html?search_value='+value+'#1');
                                    }else if(type == '资讯'){
                                        location.assign('./article.html?search_value='+value+'#1');
                                    }else {
                                        location.assign('./music.html?search_value='+value+'#1');
                                    }
                                }else{
                                    if(type == '商品'){
                                        location.assign('./pages/shop.html?search_value='+value+'#1');
                                    }else if(type == '资讯'){
                                        location.assign('./pages/article.html?search_value='+value+'#1');
                                    }else {
                                        location.assign('./pages/music.html?search_value='+value+'#1');
                                    }
                                }
                            
                            
                        }
                        //$('.search-box').removeProp('id','search-color')
                    }
                    $('.search-box').attr('id','search-show');
                    
                }
            })
            //筛选条件
            $('.dropdown-menu a').on('click',function(){
                var value = $(this).text();
                console.log(value);
                $('#dropdownMenu1').text(value);
            })

            //移除鼠标隐藏
            $(document).click(function(e){
                    //class为search的是菜单           
                    if($(e.target).closest(".search-box").length == 0 && $(e.target).closest(".btn").length == 0){
                    //点击class为search之外,则触发
                    var data = $('.glyphicon-search').data('id')
                    $('.search-box').attr('id','');
                    $('.search-btn').css({
                        marginRight:'0',
                    })
                    $('.dropdown').hide();
                    $('.glyphicon-search').attr('id','');
                    $(this).css('display','none');
                    $('.glyphicon-search').data('id',0);
                    if($(window).width() <= 1200) {
                        $('.nav-menu').hide();
                    }else{
                        $('.nav-menu').show(400);
                    }
                }
            })            
        }
        search();

        //添加哈希值
        

        //判断是否登录
        var uid = sessionStorage.getItem('uid');
        var newPage = 'login.html';
        var href = location.href;
        if(newPage.indexOf('index') == -1) {
            
        }
        if(uid){
            $('.glyphicon-user').hide();
            $('.user').show();
            if(href.indexOf('index') == -1){
                $('.login-choice-one').attr('href','my.html').text('个人主页');
                $('.login-choice-two').attr('href',newPage).text('退出').on('click',function(){
                    sessionStorage.removeItem("uid");
                })
            }else{
                $('.login-choice-one').attr('href','pages/my.html').text('个人主页');
                $('.login-choice-two').attr('href','pages/login.html').text('退出').on('click',function(){
                    sessionStorage.removeItem("uid");
                })
            }
            
            
        }else{
            
        }

        //个人信息悬浮
        $('.login').on({
            'mouseover':function(){
                $('.login-choose').show();
            },
        })
        $('.login-choose').on({
            'mouseout':function(){
                $(this).hide();
            },
            'mouseover':function(){
                $(this).show()
            }
        })

        //获取搜索值
        
    }
    menu();
})


export {nav}