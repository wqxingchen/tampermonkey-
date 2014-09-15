// ==UserScript==
// @name       屏蔽百度贴吧垃圾发言
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==

function insertButton()
{
    var lstHiddenUser = ['地罗天征','beluoe'];
    var lstDiv = $(".l_post.l_post_bright");
    lstDiv.each(function(){
        var sUserInfo = $(this).attr("data-field");
        var userInfo = JSON.parse(sUserInfo);
        var name = userInfo["author"]["user_name"];
        if (-1 != lstHiddenUser.indexOf(name))
        {
            $(this).before("<a href=\"#\" class='hidden_link'>手贱显示</a><br/>");
            $(this).css("display","none");
        }
    });
    //lstDiv.before("<a href=\"#\" class='hidden_link'>隐藏</a><br/>");
    var lstLink = $(".hidden_link");
    lstLink.click(function(){
        var item = $(this);
        item.next().next().css("display","");
        item.css("display","none");
    });
}
insertButton();
