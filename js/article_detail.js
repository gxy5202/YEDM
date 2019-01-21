import {nav} from './nav-footer.js';
(function(){
    var _offset = JSON.parse(sessionStorage.getItem("goods_item"));
    console.log(_offset);
    var htmlStr = "";
    //获取接口
    var Det = document.getElementsByClassName("NewDetail")[0];
        //拼接数据
    Det.innerHTML = `
        <div class="row clearfix">
            <div class="col-md-12 column">
                <div class="page-header">
                    <h2>
                        ${_offset.a_name}
                    </h2>
                    <div class="collection">
                      <span class="glyphicon glyphicon glyphicon-time">${_offset.a_date}</span>
                      <span class="glyphicon glyphicon-eye-open">999</span>
                      <span class="glyphicon glyphicon-heart colle" >收藏</span>
                    </div>
                    <img src="${_offset.a_img}" class="img-responsive" alt="Cinque Terre">
                    <p style="display:flex;justify-content:space-between">${_offset.a_content}</p>
                </div>
            </div>
        </div>
                         
        `;

        
        

        var uid = JSON.parse(sessionStorage.getItem('uid'));
        var aid = _offset.aid;
        if(uid){
            $.ajax({
                type: "get",
                url: "https://www.gooomi.cn/article_collection_query?uid="+uid+"&aid="+aid,
                dataType: "jsonp",
                jsonp: "jsonpCallback",
                success: function (res) {
                    if(res == 1){
                        $('.colle').css('color','rgb(240, 85, 85)')
                    }
                }
            });
        }
        $('.colle').on('click',function(){
            if(uid){
                $.ajax({
                    type: "get",
                    url: "https://www.gooomi.cn/article_collection_insert?uid="+uid+"&aid="+aid,
                    dataType: "jsonp",
                    jsonp: "jsonpCallback",
                    success: function (res) {
                        if(res == 2){
                            alert('您已取消收藏过该文章');
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
   
})();

