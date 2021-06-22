
//垂直向上滚动
//wrapper, 容器选择符
//sItem, 滚动元素选择符
jQuery.fn.scrollUp = function(settings) {
	settings = jQuery.extend({
		delayTime: 4000,
		sItem: 'li'
	}, settings);

	var obj = jQuery(this);
	this.each(function() {
		var stepScroll = function(){
			var curItem = obj.find(settings.sItem + ":first");
			curItem.animate({
				marginTop: "-" + curItem.height()
			},
			300,
			"",
			function(){
				curItem.appendTo(obj);
				curItem.css("margin-top", "0px");
			});
		};
		setInterval(stepScroll, settings.delayTime);
	});
	return this;
};

//内容无缝滚动
function Marquee(marqueeBox, delaytime, direction, itemCell){
	if(delaytime == undefined)delaytime = 50;
	if(direction == undefined)direction = "up";
	if(itemCell == undefined)itemCell = "ul";
	var oMarquee = jQuery(marqueeBox);
	var oMarqueeCon = oMarquee.find(itemCell);

	if( direction=="left"&&( oMarqueeCon.width()< oMarquee.width() ) ) return; //zx增加，当内容宽度少于显示宽度时不滚动
	if( direction=="up" &&( oMarqueeCon.height()< oMarquee.height() ) ) return; //zx增加，当内容高度少于显示高度时不滚动

	var oMarqueeCopy = oMarqueeCon.clone(true).insertAfter(oMarqueeCon);

	var ScrollUp = function(){
		if(oMarqueeCopy[0].offsetHeight-oMarquee[0].scrollTop<=0){
			oMarquee[0].scrollTop = 0;
		}else{
			oMarquee[0].scrollTop++;
		}
	}
	
	var ScrollLeft = function(){
		if(oMarqueeCopy[0].offsetWidth-oMarquee[0].scrollLeft<=0){
			oMarquee[0].scrollLeft = 0;
		}else{
			oMarquee[0].scrollLeft++;
		}
	}
	
	switch(direction){
		case "left":
			var oScroll=setInterval(ScrollLeft, delaytime);
			oMarquee.hover(function(){
				clearInterval(oScroll);
			}, function(){
				oScroll=setInterval(ScrollLeft, delaytime);
			});
			break;
		case "up":
		default:
			var oScroll = setInterval(ScrollUp, delaytime);
			oMarquee.hover(function(){
				clearInterval(oScroll);
			}, function(){
				oScroll=setInterval(ScrollUp, delaytime);
			});
	}
}

//列高度统一
function HeightFix(column, column2, offset){
	var oCol = jQuery(column);
	var oCol2 = jQuery(column2);
	if(offset == undefined)offset = 0;
	if(oCol.height() > oCol2.height()){
		oCol2.height(oCol.height() - offset);
	}else{
		oCol.height(oCol2.height() - offset);
	}
}


// 加入收藏代码 Start -->
function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
            alert("加入收藏失败,请手动添加.");
        }
    }
}

// 设为首页代码 Start -->
function SetHome(pageURL) {
    if (document.all) {
        document.body.style.behavior='url(#default#homepage)';
        document.body.setHomePage(pageURL);
    }
    else if (window.sidebar) {
        if(window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                alert( "该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项signed.applets.codebase_principal_support 值该为true" );
            }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage',pageURL);
    }
}

jQuery(function($){
	$("input.inputtext,input.inputxt").focus(function(){ 
	$(this).addClass("inpFocus"); 
	}); 
	$("input.inputtext,input.inputxt").blur(function(){ 
	$(this).removeClass("inpFocus"); 
	}); 
});
