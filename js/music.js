import {nav} from './nav-footer.js';
$(function(){
    //var session = JSON.parse(sessionStorage.getItem('search'));
    //var search_value = session.value;
    //console.log(session);       
    var search_value = location.search;
    console.log(search_value);
    
    var hash = location.hash;
    console.log(hash[1]);
    var href = location.href;
    if(!hash){
        location.href = href+'#1';
    }
    //获取当前页数缓存;
    

    var session = JSON.parse(sessionStorage.getItem('page'));
    console.log(session);
    

    //获取商品信息，生成节点
    var page = 1;
    var arr=[];
    var length = 0;
    var pageInfo = [];
    //如果当前页数和缓存页数相等，就将页数替换为缓存页数，避免刷新后回到首页
    if (session == hash[1]) {
        page = session;
    }
    var creatList = function(resultArr,value_length){
        (function(){
            //arr = resultArr.slice(value_length ,value_length + 9);
            console.log(resultArr)
            
            arr = resultArr.slice((value_length-1)*9 ,value_length * 9);
            for(let i = 0;i<arr.length;i++){
                $('.main').append(`
                <div class="wow col-md-4 shop-goods">
                    <div class="wrap">
                        <div class="music" style="background-image:url('${arr[i].m_img}')" >
                            <div class="name">
                                <p>${arr[i].m_name}</p>
                                <p>${arr[i].m_singer}</p>
                                <p style="color:rgb(240, 85, 85);font-size:20px"><span class="glyphicon glyphicon-heart" style="margin-right:10px"></span>${arr[i].m_coll_num}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `)
                var shop_goods = document.getElementsByClassName('music')[i];
                shop_goods.addEventListener('click',function(){
                    function preventBubble(event){  
                        var e= event; 
                        //若省略此句，下面的e改为event，IE运行可以，但是其他浏览器就不兼容  
                        if (e && e.stopPropagation) { 
                            e.stopPropagation();  
                        } else if (window.event) {    
                            window.event.cancelBubble = true; 
                    }}
                    var body = document.getElementsByClassName('main')[0];
                    var wrapper= document.getElementsByClassName('wrapper');
                    var music = document.getElementsByClassName('music');
                    var mask = document.getElementById('mask');
                    
                        
                             

                                mask.style.display = "block";
                                mask.innerHTML = `
                                    <div class="newMusic" >
                                        <div class="image" style="background-image:url('${arr[i].m_img}')"><div>
                                        <audio src="${arr[i].m_url}"  preload="auto"></audio>
                                        <div class="collection">
                                            <span class="glyphicon glyphicon-heart colle"></span>
                                        </div> 
                                        <div class="newName">
                                            <p>${arr[i].m_name}</p>
                                            <p>${arr[i].m_singer}</p>
                                        </div>
                                         
                                        <div class="play icon"></div> 
                                        <div class="rotate" style="background-image:url('${arr[i].m_img}')"></div>
                                        
                                    </div>
                                `
                                var uid = JSON.parse(sessionStorage.getItem('uid'));
                                var mid = arr[i].mid;
                                if(uid){
                                    $.ajax({
                                        type: "get",
                                        url: "https://www.gooomi.cn/music_collection_query?uid="+uid+"&mid="+mid,
                                        dataType: "jsonp",
                                        jsonp: "jsonpCallback",
                                        success: function (res) {
                                            if(res == 1){
                                                $('.colle').css('color','rgb(240, 85, 85)')
                                            }
                                        }
                                    });
                                }
                                console.log(i)
                                var audio = document.getElementsByTagName('audio')[0];
                                var playicon = document.getElementsByClassName('icon')[0];
                                var rotate= document.getElementsByClassName('rotate')[0];
                                var newMusic = document.getElementsByClassName('newMusic')[0];
                                $('.colle').on('click',function(){
                                    preventBubble();
                                    if(uid){
                                        $.ajax({
                                            type: "get",
                                            url: "https://www.gooomi.cn/music_collection_insert?uid="+uid+"&mid="+mid,
                                            dataType: "jsonp",
                                            jsonp: "jsonpCallback",
                                            success: function (res) {
                                                if(res == 2){
                                                    alert('您已取消收藏过该音乐');
                                                    $('.colle').css('color','rgba(0,0,0,0.8)')
                                                }else{
                                                    alert('收藏成功！可在我的主页查看收藏。');
                                                    $('.colle').css('color','rgb(240, 85, 85)')
                                                }
                                                console.log(res)
                                            }
                                        });
                                    }else{
                                        alert('您还未登录账号，请先登录！')
                                    }
                                    console.log(uid);
                                    
                                })
                                playicon.onclick = function(){
                                    preventBubble();
                                    //event.stopPropagation();
                                    //window.event? window.event.cancelBubble = true : e.stopPropagation();
                                    if(audio.paused){
                                        audio.play();
                                        playicon.className = 'pause icon';
                                        rotate.className = 'rotate retatePlay'
                                    }else{
                                        audio.pause();
                                        playicon.className = 'play icon'
                                        rotate.className = 'rotate retatePause'
                                    }
                                }
                                audio.onended = function(){
                                    console.log("播放结束")
                                    audio.pause();
                                    playicon.className = 'play icon'
                                    rotate.className = 'rotate'
                                }
                                mask.onclick = function(){
                                    
                                    newMusic.className = "newMusic disappear";
                                    setTimeout(function(){
                                        mask.style.display = "none";
                                    },500)
                                    
                                    audio.pause();
                                    playicon.className = 'play icon'
                                }    
                        
                    
                })
            }
            
            

        })();
        
            //动画
            new WOW().init();
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'fadeInUp',
                offset: 0,
                mobile: true,
                live: true
            });
            wow.init();           
    }

    var btnNext = document.getElementById('next-page');
    var btnLast = document.getElementById('last-page');
                    
    //判断按钮是否显示
    var btnDisplay = function (page,pageTotal) {
        (function(){
            if (page > 1) {
                btnLast.style.display = 'block';
                if (page == pageTotal) {
                    btnNext.style.display = 'none';
                } else {
                    btnNext.style.display = 'block';
                }
            }else if(pageTotal == 1){
                btnNext.style.display = 'none';
                btnLast.style.display = 'none';
            } 
            else {
                btnLast.style.display = 'none';
                btnNext.style.display = 'block';
            }
        })();
    }

    var nextPage = function (next_page,pageTotal,resultArr,info) {
        //length = length + 9;
        $('.main').html('');

        page++;
        //存入当前所处页数
        sessionStorage.setItem('page',page);
        //
        creatList(resultArr, page);
        console.log(page);
        btnDisplay(page, pageTotal);
        
        
        var href = location.href;
        console.log(href);
        location.assign('#'+page);
        //改变需要截取数据的长度，起始位置
        
        
        console.log(arr);
        //var href = location.href;
        //var path = location.pathname;
        //console.log(path)
        //history.pushState({name: "华为"}, "", 'template-page1.html?page='+page); 
        
    }

    var lastPage = function (last_page,pageTotal,resultArr,info) {
        //length = length - 9;
        $('.main').html('');
        //creatList(resultArr, length);
        
        page--;
        sessionStorage.setItem('page',page);
        creatList(resultArr, page);
        console.log(page);
        btnDisplay(page, pageTotal);
        
        
        
        location.assign('#'+page);
        //改变需要截取数据的长度，起始位置
        
        console.log(arr)
        //history.pushState({name: "华为"}, "", href+'?page='+page);
    }

    if(search_value){
        $.ajax({
            type: "get",
            url: "https://www.gooomi.cn/music"+search_value,
            dataType: "jsonp",
            jsonp: "jsonpCallback",
            //jsonpCallback:"getName",
            success: function (resultArr) {
                $('.music-num').html(`
                共${resultArr.length}条搜索结果
            `)
                //计算分出的总页数
                if(resultArr.length == 0){
                    $('.music-box').html('').append(`
                    <div class="container">
                    <div class="row clearfix">
                        <div class="col-md-12 column">
                            <div class="alert alert-dismissable alert-danger">
                                 <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h4>
                                    抱歉！本站暂时没有您想要的内容...
                                </h4> <strong>Warning!</strong> Best check yo self, you're not looking too good. <a href="#" class="alert-link">alert link</a>
                            </div>
                        </div>
                    </div>
                </div>
                    `);
                    $('.page-btn-box').hide();
                }
                var pageTotal = Math.ceil(resultArr.length/9);
                
                console.log(page)
                
                if(resultArr.length>9){
                    //动态生成列表内容,封装为函数
                   
                    //调用该函数
                    creatList(resultArr,page);
                    btnDisplay(page,pageTotal);
            
                    //给下一页添加监听事件
                    btnNext.addEventListener('click',function(){
                        nextPage(page,pageTotal,resultArr,pageInfo);
                    });
                    //给上一页添加监听事件
                    btnLast.addEventListener('click',function(){
                        lastPage(page,pageTotal,resultArr,pageInfo)
                    })
            
                }else{
                    arr = resultArr;
                    creatList(resultArr,page);
                    btnDisplay(page,pageTotal);
                    btnNext.addEventListener('click',function(){
                        nextPage(page,pageTotal,resultArr,pageInfo)
                    });
                    //给上一页添加监听事件
                    btnLast.addEventListener('click',function(){
                        lastPage(page,pageTotal,resultArr,pageInfo)
                    })
                }
            }
        });
    }else{
        $.ajax({
            type: "get",
            url: "https://www.gooomi.cn/music",
            dataType: "jsonp",
            jsonp: "jsonpCallback",
            success: function (resultArr) {
                $('.music-num').html(`
                共${resultArr.length}首音乐
            `)
                //计算分出的总页数
                
                var pageTotal = Math.ceil(resultArr.length/9);
                console.log(page)
                
                if(resultArr.length>9){
                    //动态生成列表内容,封装为函数
                   
                    //调用该函数
                    creatList(resultArr,page);
                    btnDisplay(page,pageTotal);
            
                    //给下一页添加监听事件
                    btnNext.addEventListener('click',function(){
                        nextPage(page,pageTotal,resultArr,pageInfo)
                    });
                    //给上一页添加监听事件
                    btnLast.addEventListener('click',function(){
                        lastPage(page,pageTotal,resultArr,pageInfo)
                    })
            
                }else{
                    arr = resultArr;
                    creatList(resultArr,page);
                    btnDisplay(page,pageTotal);
                    btnNext.addEventListener('click',function(){
                        nextPage(page,pageTotal,resultArr,pageInfo)
                    });
                    //给上一页添加监听事件
                    btnLast.addEventListener('click',function(){
                        lastPage(page,pageTotal,resultArr,pageInfo)
                    })
                }
            }
        });
    }
    
})
       
        
        

        


