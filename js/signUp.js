import {nav} from './nav-footer.js';
$(function(){

    //注册提交
    $('#sub').on('click',function(){
        var username = $('#username').val();
        var password = $('#pwd').val();
        var password_con = $('#pwd-confirm').val()
        
        if(username.length >=6 && password.length >= 6 && password == password_con){
            $.ajax({
                type: "get",
                url: "https://www.gooomi.cn/signUp?username="+username+"&pwd="+password_con,
                dataType: "jsonp",
                jsonp: "jsonpCallback",
                success: function (res) {
                    if(res == 0){
                        //提示用户名或密码错误
                        if($('.tips').length == 0){
                            $('.login-input:nth-child(3)').after(`<p class='tips' style="color:rgb(236, 57, 57);font-size:0.8rem">用户名已存在</p>`);
                        }
                    }else{
                        alert("注册成功！恭喜成为本站用户。")
                        console.log(res);
                        //登陆成功，改变状态
                        sessionStorage.setItem('uid',res.insertId)
                        location.replace('my.html');
                    }
                }
            });
        }else{
            if($('.tips').length == 0){
                $('.login-input:nth-child(3)').after(`<p class='tips' style="color:rgb(236, 57, 57);font-size:0.8rem">用户名或密码不能少于6位</p>`);
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



