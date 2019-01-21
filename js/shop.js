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
    // if(!hash){
    //     location.href = href+'#1';
    // }
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
            
            arr = resultArr.slice((value_length-1)*9 ,value_length * 9);
            for(let i = 0;i<arr.length;i++){
                $('.shop-box-inner').append(`
                <div class="col-md-4 shop-goods">
                    <div class="thumbnail">
                        <img alt="300x200" src="${arr[i].g_img}" />
                        <div class="caption">
                            <h3>
                                ${arr[i].g_name}
                            </h3>
                            <p>
                                ${arr[i].g_des}
                            </p>
                            <p class="price">
                                <span>${arr[i].g_price}元</span>
                            </p>
                            <p>
                                <a class="btn btn-primary" href="#">购买</a>
                            </p>
                        </div>
                    </div>
                </div>
                `)
                var shop_goods = document.getElementsByClassName('shop-goods')[i];
                shop_goods.addEventListener('click',function(){
                    var goods_item = JSON.stringify(arr[i])
                    sessionStorage.setItem('goods_item',goods_item);
                })
            }

        })()             
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
        $('.shop-box-inner').html('');

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
        $('.shop-box-inner').html('');
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
            url: "https://www.gooomi.cn/goods"+search_value,
            dataType: "jsonp",
            jsonp: "jsonpCallback",
            //jsonpCallback:"getName",
            success: function (resultArr) {
                
                //计算分出的总页数
                if(resultArr.length == 0){
                    $('.shop-box-inner').html('').append(`
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
            url: "https://www.gooomi.cn/goods",
            dataType: "jsonp",
            jsonp: "jsonpCallback",
            success: function (resultArr) {
                
                //计算分出的总页数
                var pageTotal = Math.ceil(resultArr.length/9);
               
                //console.log(page)
                
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