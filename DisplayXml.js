// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://tampermonkey.net/scripts.php
// @copyright  2012+, You
// ==/UserScript==

function addTable(arg1,arg2,arg3,arg4,arg5,arg6) {
    var table = document.getElementById("PathGrid");
    //table.style="word-break:break-all; word-wrap:break-word";
    var row = table.insertRow(table.rows.length-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);//path
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    //拆分文件路径
    var listPath = arg4.split(/[; ]+/i);
    var sPathWithBr=""
    for (var i = 0; i < listPath.length; i++) {
    	sPathWithBr+=listPath[i]+"<br/>";
    };

    cell1.innerHTML = arg1;
    cell2.innerHTML = arg2;
    cell3.innerHTML = arg3;
    cell4.style.wordWrap="break-word";
    cell4.innerHTML = sPathWithBr;//path
    cell5.innerHTML = arg5;//version
    cell6.innerHTML = arg6;

    var sWebSVNUrl = "http://10.78.13.168/websvn/revision.php" ;
	sWebSVNUrl += "?repname="+ listPath[0] + "&isdir=1&rev=" + arg5 + "&peg="+ arg5;
	var sViewRepos = "<a href=\"" + sWebSVNUrl +  "\" target=\"_blank\" >查看 </a>";
	var sDelButton = "<a href=\"javascript:void(0);\" onclick ='DelPathNew(this);'>删除</a>";
	cell7.innerHTML = sViewRepos ;
	cell8.innerHTML = sDelButton;
}
function loadSvnPostList ()
{
	var date = new Date();
	document.getElementsByTagName("body")[0].innerHTML+="<button>"+date.toString()+"</button>";

	//document.getElementsByTagName("body")[0].innerHTML+="<hr/>";
	//document.getElementsByTagName("body")[0].innerHTML+="为什么呢<hr/>";

	try
	{
		var xf = document.getElementById("xmlFile")
	    var doc = (new DOMParser()).parseFromString(xf.innerHTML, "text/xml")
	    var lstitem = doc.getElementsByTagName("pathlist");
	    for (var i = 0; i < lstitem.length; ++i)
	    {
	    	var item = lstitem[i];
	    	var arg1=item.getAttribute("index");
	    	var arg2=item.getAttribute("submiter");
	    	
	    	var arg3=item.getAttribute("datetime");
	    	var arg4=item.getAttribute("path");
	    	var arg5=item.getAttribute("version");
	    	var arg6=item.getAttribute("comment");
	    	//alert(arg6)
	    	addTable(arg1,arg2,arg3,arg4,arg5,arg6)
	    }
	}
	catch(e)
	{
		//alert(e.message);
	}
}

//删除提示字符串
function DelWarnStr()
{
	try
	{
		var lstspan=document.getElementsByTagName("span");
		for (var i = 0; i < lstspan.length; i++) {
			var item=lstspan[i];
			if (item.innerHTML.indexOf("请使用IE浏览器访问") >= 0)
			{
				//alert(item.class);
				//alert(item.innerHTML);
				item.parentNode.removeChild(item);
			}
		};
	}
	catch(e)
	{
		//alert(e.message);
	}	
}
DelWarnStr();
loadSvnPostList();