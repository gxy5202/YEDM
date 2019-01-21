//文档加载完成后
//引入导航
import {nav} from './nav-footer.js';
$(function(){
    /**
     * 导航样式
     *  
    **/

    
   

    

    //跨域访问数据
    $.ajax({
        type: "get",
        url: "https://www.gooomi.cn/article",
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        success: function (res) {
            var arr = res.slice(2,5);
            console.log(arr)
                $('.content-article-box').append(`
                <div class="wow content-article1 content-article-show col-xs-12 col-ms-12 col-md-12"  >
                    <div class="content-mask">
                        <p class="content-mask-title">${arr[0].a_name}</p>
                        <p class="content-mask-date">${arr[0].a_date}</p>
                    </div>
                    <img data-original="${arr[0].a_img}" alt="">
                </div>
                <div class="content-article-box2 col-xs-12 col-ms-12 col-md-8"  >
                    <div class="wow content-article2 content-article-show " >
                        <div class="content-mask">
                            <p class="content-mask-title">${arr[1].a_name}</p>
                            <p class="content-mask-date">${arr[1].a_date}</p>
                        </div>
                        <img data-original="${arr[1].a_img}" alt="">
                    </div>
                </div>
                <div class="content-article-box3 col-xs-12 col-ms-12 col-md-4" >
                    <div class="wow content-article3 content-article-show " >
                    <div class="content-mask">
                            <p class="content-mask-title" style="font-size:30px">${arr[2].a_name}</p>
                            <p class="content-mask-date" >${arr[2].a_date}</p>
                        </div>
                        <img data-original="${arr[2].a_img}" alt="">
                    </div>
                </div>
                `);
                
                var content_mask = document.getElementsByClassName('content-mask');
                for(let i = 0;i<content_mask.length;i++){
                    content_mask[i].addEventListener('click',function(){
                        var goods_item = JSON.stringify(arr[i])
                        sessionStorage.setItem('goods_item',goods_item);
                        location.assign('pages/article_detail.html');
                    });
                }
                
           //懒加载
    $("img").lazyload({effect: "fadeIn"});

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
    });
    

    //跨域访问数据
    $.ajax({
        type: "get",
        url: "https://www.gooomi.cn/music",
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        success: function (res) {
            var arr = res.slice(0,10);
            console.log(arr)
            for(let i = 0;i<arr.length;i++){
                
                $('.swiper-wrapper').append(`
                    <div class="swiper-slide">
                        <img class="swiper-img" src="${arr[i].m_img}" alt="">
                        <span class="glyphicon glyphicon-headphones"></span>
                        <p>${arr[i].m_name}</p>
                        
                    </div>
                `)
                
            }
            $('.swiper-slide').on('click',function(){
                location.assign('pages/music.html#1');
            })
           //懒加载
            $("img").lazyload({effect: "fadeIn"});

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

            //swiper
     var mySwiper = new Swiper('.swiper-container',{
        slidesPerView : 3,
        spaceBetween : 20,
        //spaceBetween : '10%',按container的百分比
    })
        }
    });
     
})


