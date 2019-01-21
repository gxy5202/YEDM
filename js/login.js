import {nav} from './nav-footer.js';
$(function(){

    //登录提交
    $('#sub').on('click',function(){
        var username = $('#username').val();
        var password = $('#pwd').val();
        console.log(username); 
        console.log(password);
        if(username.length >=6 && password.length >= 6){
            $.ajax({
                type: "post",
                url: "https://www.gooomi.cn/user",
                data:{
                    username:username,
                    pwd:password
                },
                dataType: "jsonp",
                jsonp: "jsonpCallback",
                success: function (res) {
                    if(res == 0){
                        $('.login-input>input:not([type=submit])').css({
                            'border':'1px solid rgb(236, 57, 57)',
                            'boxShadow':'0 0 5px rgb(236, 57, 57)'
                        });
                        //提示用户名或密码错误
                        if($('.tips').length == 0){
                            $('.login-input:nth-child(2)').after(`<p class='tips' style="color:rgb(236, 57, 57);font-size:0.8rem">用户名或密码错误</p>`);
                        }
                    }else{
                        console.log(res);
                        //登陆成功，改变状态
                        sessionStorage.setItem('uid',res[0].uid)
                        location.replace('my.html');
                    }
                }
            });
        }else{
            if($('.tips').length == 0){
                $('.login-input:nth-child(2)').after(`<p class='tips' style="color:rgb(236, 57, 57);font-size:0.8rem">用户名或密码不能少于6位</p>`);
            }
        }
        
    })

    //点击输入框
    $('.login-input>input:not([type=submit])').on(
        {
            'click':function(){
                $(this).css({
                    'border':'1px solid rgb(0,136,255)',
                    'boxShadow':'0 0 5px rgb(0,136,255)'
                })
                $('.tips').remove();
            },
            'blur':function(){
                $(this).css({
                    'border':'1px solid rgb(0,0,0)',
                    'boxShadow':'none'
                });
                var value = $(this).val();
                // if(value.length< 6){
                //     if($('.tips').length == 0){
                //         $('.login-input:nth-child(2)').after(`<p class='tips' style="color:rgb(236, 57, 57);font-size:0.8rem">输入值长度需大于6位</p>`);
                //     }
                // }
            }
        }
    )

    
})