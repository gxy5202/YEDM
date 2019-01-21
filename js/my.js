import { nav } from "./nav-footer.js";
$(document).ready(function() {
  //点击切换信息栏
  $(".xiangxi>div")
    .eq(0)
    .show()
    .siblings()
    .hide();
  $(".list-unstyled li").click(function() {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
    $(".xiangxi>div")
      .eq($(this).index())
      .show()
      .siblings()
      .hide();
  });
  //用户数据获取
  let uid = sessionStorage.getItem("uid");
  $.ajax({
    type: "get",
    url: "https://www.gooomi.cn/my?uid=" + uid + "",
    dataType: "jsonp",
    jsonp: "jsonpCallback",
    success: function(res) {
      $(".m-message input")
        .eq(0)
        .val(res[0].u_name);
      $(".m-message input")
        .eq(1)
        .val(res[0].u_password);
      $(".m-message input")
        .eq(2)
        .val(res[0].u_nick_name);
      $(".m-message input")
        .eq(3)
        .val(res[0].u_gender);
      $(".m-message input")
        .eq(4)
        .val(res[0].u_email);
      $(".m-message input")
        .eq(5)
        .val(res[0].u_phone);
    }
  });
  //用户数据修改
  $(".update1").click(function() {
    $("form p input").attr("disabled", false);
    $("form p input")
      .eq(0)
      .attr("disabled", true);
    $(this).attr("type", "hidden");
    $(".update").attr("type", "submit");
  });
  $(".update").click(function() {
    $(".update1").attr("type", "submit");
    $(".update").attr("type", "hidden");
    $("form p input").attr("disabled", true);
    let uid = sessionStorage.getItem("uid"),
      password = $(".m-message input")
        .eq(1)
        .val(),
      nick_name = $(".m-message input")
        .eq(2)
        .val(),
      gender = $(".m-message input")
        .eq(3)
        .val(),
      email = $(".m-message input")
        .eq(4)
        .val(),
      phone = $(".m-message input")
        .eq(5)
        .val();
    $.ajax({
      type: "get",
      url:
        "https://www.gooomi.cn/update_user?uid=" +
        uid +
        "&password=" +
        password +
        "&nick_name=" +
        nick_name +
        "&gender=" +
        gender +
        "&email=" +
        email +
        "&phone=" +
        phone +
        "",
      dataType: "jsonp",
      jsonp: "jsonpCallback",
      success: function(res) {
        console.log(res);
        if (res == 1) {
          alert("修改成功");
        } else {
          alert("修改失败，请重试！");
        }
      }
    });
  });
  //音乐收藏
  $(".list-unstyled li:eq(1)").click(function() {
    $.ajax({
      type: "get",
      url: "https://www.gooomi.cn/music_collection?uid=" + uid + "",
      dataType: "jsonp",
      jsonp: "jsonpCallback",
      success: function(res) {
        let div = $("<div class='music-box'></div>"),
          num = res.length % 4;
        num = 4 - num;
        if (num == 4) {
          num = 0;
        }
        // if(res%4)
        for (let i = 0; i in res; i++) {
          div.append(
            `
              <div>
                  <p><img src="${res[i].m_img}" alt=""></p>
                  <p class="text-center">${res[i].m_name}</p>
                  <p class="text-center">${res[i].m_singer}</p>
              </div>
              `
          );
        }
        for (let i = 0; i < num; i++) {
          div.append(
            `
              <div></div>
              `
          );
        }
        $(".m-music").html(div);
      }
    });
  });
  //资讯
  $(".list-unstyled li:eq(2)").click(function() {
    $.ajax({
      type: "get",
      url: "https://www.gooomi.cn/article_collection?uid=" + uid + "",
      dataType: "jsonp",
      jsonp: "jsonpCallback",
      success: function(res) {
        console.log(res)
        let div = $("<div class='music-box'></div>"),
          num = res.length % 4;
        num = 4 - num;
        if (num == 4) {
          num = 0;
        }
        for (let i = 0; i in res; i++) {
          div.append(
            `
              <div>
                  <p><img src="${res[i].a_img}" alt=""></p>
                  <p class="text-center">${res[i].a_name}</p>
                  <p class="text-center">${res[i].a_content}</p>
              </div>
              `
          );
        }
        for (let i = 0; i < num; i++) {
          div.append(
            `
              <div></div>
              `
          );
        }
        $(".m-news").html(div);
      }
    });
  });
});
