$(document).ready(function(){

	var contents_height = $(window).height()-$("header").height()-$("footer").height();
	var contents_width = $(window).width();

	if (contents_width>700) {
		if($(".direct-cover-box").length>0) {
			$(".content").css("min-height", contents_height);
			(contents_height<680) ? $(".direct-cover-box").css("height", 680) : $(".direct-cover-box").css("height", contents_height);
		}
	} else {
		if($(".direct-cover-box").length>0) {
			$(".content").css("min-height", contents_height+$("footer").height());
			$(".direct-cover-box").css("height", contents_height+$("footer").height());
		}
	}


	/*tab*/
	$('.tabgroup>div').hide();
	$('.tabgroup>div:first-of-type').show();
	motionCheck("#tab1");

	$('.tabs a').click(function(e){
		e.preventDefault();
		var $this = $(this),
		tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
		others = $this.closest('li').siblings().children('a'),
		target = $this.attr('href');
		others.removeClass('active');
		$this.addClass('active');
		$(tabgroup).children('div').hide();
		$(target).show();
		var txt = $(this).closest('.tab_basic').find('.sel_txt');
		txt.text($(this).text());

		checkTh();
		tableNoData();
		motionCheck(target);
	});

	$(".accordion_wrap").each(function() {
		$(this).find(".accordionbody").hide();
		//$(this).find(".accordionbody").hide().end().find(".accordionbody").eq(0).show();
		//$(this).find(".accordionheader").eq(0).addClass("on");

		$(this).find(".accordionheader").on("click", function(event, param=null) {
			if($(this).hasClass("on")) {
				$(this).removeClass("on");
				$(this).next().slideUp(100);
				checkTh();
				tableNoData();
			} else {
				$(this).addClass("on").siblings(".accordionheader").removeClass("on");
				$(this).next().slideDown(100).siblings(".accordionbody").hide();
				checkTh();
				tableNoData();
				if(param) {
					setTimeout(function() {
						top_scroll_pos = $(".rate_table_title").eq(param-1).offset().top;
						$("body,html").animate({
							scrollTop : top_scroll_pos
						});
					},100);
				}
				animateGraph($(this).next());
			}
			return false;
		});	

	});


	$("[data-alert]").on("click", function(){
		var mode = $(this).data("alert").mode;

		$("body").append("<div id='dimmed'>");
		$("body").append("<div class='alert-wrap'>");
		$(".alert-wrap").wrapInner("<div class='alert-box'>");
		$(".alert-box").html("<p>" + $(this).data("alert").msg + "</p>");

		if(mode=="confirm") {
			$(".alert-box").html($(".alert-box").html() + "<a href='#' data-action='close'>취소</a>");
			$(".alert-box").html($(".alert-box").html() + "<a href='javascript:alert(\"OK\")' data-action='submit'>확인</a>");
		} else {
			$(".alert-box").html($(".alert-box").html() + "<a href='#' data-action='close'>확인</a>");	
		}

		if($(window).width()>540) {
			$(".alert-wrap").css({
				"marginLeft" : -($(".alert-wrap").width()/2),
				"marginTop" : -($(".alert-wrap").height()/2)
			});
		} else {
			$(".alert-wrap").css({
				"marginTop" : -($(".alert-wrap").height()/2)
			});
		}

		$(".alert-box > a").on("click", function(){
			if($(this).data("action")=="close") {
				$("#dimmed, .alert-wrap").detach();
				return false;
			} else if($(this).data("action")=="submit") {
				$("#dimmed, .alert-wrap").detach();
			}
		});

	});

	$("[data-click]").on("click", function(){
		var acting = $(this).data("click");
		var obj = $(this).attr("href");

		if(acting=="layer-pop") {
			$("body").append("<div id='dimmed'>");
			$(obj).show();

			if($(obj).hasClass("pop-wrap")) {
				$(obj).css("marginTop",-($(obj).height()/2));
			} else {
				if($(window).width() <= 768) {
					$(".smart-pop-wrap").css("height",$("#smartPop").height()-$("#smartPop>h3").outerHeight());
				}
			}

			$("#dimmed").on("click", function() {
				$(obj).hide();
				$("#dimmed").detach();
			});
		}
		return false;
	});

	$("#smartPop > a, .pop-wrap > a").click(function() {
		$($(this).attr("href")).hide();
		$("#dimmed").detach();	
		return false;
	});

	$(".td_block,.th_block").wrapInner("<p>");
	$(".accordionheader").wrapInner("<h3>");

	if($(".longterm-push").length>0) {
		$("body").append("<div id='dimmed'>");
		$(".longterm-push").addClass("longterm-ani");
		$("#dimmed,.longterm-push").on("click", function() {
			$(".longterm-push").removeClass("longterm-ani").addClass("longterm-ani2");
			$("#dimmed").fadeOut().detach();	
		});
	}

	if($("[href='#rateMap']").length>0) moveRateTable();
	checkHashLink();

});

$(window).on("resize", function() {
	var win = $(window).width();
	if(win<=768) {
		 $("body").addClass("mobile");
		checkTh();
		tableNoData();
	} else {
		$("body").removeClass("mobile");
		$(".scroll-hand").detach();
		checkTh();
		tableNoData();
	}
});

$(window).on("load", function(){
	var win = $(window).width();

	if(win<=768) {
		 $("body").addClass("mobile");
		checkTh();
		tableNoData();
	} else {
		tableNoData();
		$(".scroll-hand").detach();
	}

	if ($(".visual").length>0) {
		aniVisual();
	}
});

function checkTh() {
	var win = $(window).width();
	if(win>768) {
		$(".td_block,.td_block > p,.th_block,.th_block > p").removeAttr("style");
		return;
	}

	$(".th_block").each(function() {
		$(this).removeAttr("style");
		$(this).find(">p").removeAttr("style");
		var th = $(this).outerHeight();
		var th_in = th-24;
		var td = $(this).next().outerHeight();
		var td_in = td-24;
		if(th>td) {
			$(this).next().css("height", th);
			$(this).next().children("p").css({"height":th_in,"display":"table-cell"});
		} else {
			$(this).css("height", td);
			$(this).children("p").css({"height":td_in,"display":"table-cell"});

		}
	});

	$(".tbl-scroll-box").each(function() {
		if($(this).find(".scroll-hand").length == 0) $(this).append("<div class='scroll-hand'>");
		$(this).on("scroll", function() {$(this).find(".scroll-hand").detach();});
	});
}

function tableNoData() {
	$(".div_tbl.noData").each(function() {
		var tbl_h = $(this).outerHeight();
		var cell_width = $(this).find(".td_block:eq(0)").outerWidth();
		var cell_start = $(this).find(".th_block:eq(0)").outerWidth();

		if($("body").hasClass("mobile")) {
			$(".nodata-cell").detach();
			$(this).append("<div class='nodata-cell cell01'><p>해당내용없음</p></div>");
			$(".cell01").css({
					"height" : tbl_h-2,
					"right" : 0,
					"left" : cell_start,
					"width" : "auto"
			});
		} else {
			$(".nodata-cell").detach();
			$(this).append("<div class='nodata-cell cell01'><p>해당내용없음</p></div>");
			$(this).append("<div class='nodata-cell cell02'><p>해당내용없음</p></div>");
			$(".cell01").css({
					"height" : tbl_h-2,
					"width" : cell_width+1,
					"left" : cell_start
			});
			$(".cell02").css({
					"height" : tbl_h-2,
					"width" : cell_width,
					"right" : 0,
					"left"	: "auto"
			});
		}
	});
}

function motionCheck(tabgroup) {
	if($(tabgroup).find(".accordion_wrap").length>0) {
		if(!$(tabgroup).find(".accordion_wrap").find(".accordionheader").eq(0).hasClass("on"))
			$(tabgroup).find(".accordion_wrap").find(".accordionheader").eq(0).trigger("click");
	}
	
	$(tabgroup).find(".character-box").each(function() {
		var char_obj = $(this);
		var tab_top = $(this).offset().top;
		$(window).scrollTop($(window).scrollTop()-1);

		$(window).on("scroll",function(){
			var st = $(window).scrollTop() + $(window).height() - (char_obj.height()/2);
			if(st > tab_top) {
				char_obj.find("[data-ani]").each(function(){
					$(this).addClass($(this).data("ani"));
				});
			} else {
				char_obj.find("[data-ani]").each(function(){
					$(this).removeClass($(this).data("ani"));
				});

			}
		});
	});

}

function checkHashLink() {
	var hash_txt = location.hash;
	if(hash_txt) {
		if(hash_txt.indexOf("&")>1) tabname = hash_txt.substring(5,hash_txt.indexOf("&"));
		accordion_idx = hash_txt.substring(hash_txt.lastIndexOf(".")+1);

		if(tabname) {
			var obj = $(".tabs li > a[href='#" + tabname + "']");
			obj.trigger("click");
		}
		if(accordion_idx) {
			if(!$("#" + tabname).find($(".accordion_wrap .accordionheader")).eq(accordion_idx).hasClass("on"))
				$("#" + tabname).find($(".accordion_wrap .accordionheader")).eq(accordion_idx).trigger("click");
		}
	}
}

function moveRateTable() {
	$("[href='#rateMap']").on("click", function() {
		var lnk_text = $(this).text();
		lnk_text = lnk_text.replace(/(\s*)/g, "");

		$("#rateMap .rate_table_title").each(function(i) {
			var compare_text = $(this).text();
			compare_text = compare_text.replace(/(\s*)/g, "");

			if(compare_text == lnk_text) {
				$(".accordion_wrap .accordionheader").trigger("click", i+1);
			}

		});

		return false;
	});
}

function animateGraph(graph_obj) {
	if($(graph_obj).find(".bar-graph-box").length>0) {
			var graph_box = $(graph_obj).find(".bar-graph-box");

			var graph_scroll_top = graph_box.offset().top + graph_box.outerHeight();

			$(window).on("scroll",function(){
				var st = $(window).scrollTop() + $(window).height();
				if(st > graph_scroll_top) {
					graph_box.each(function() {
						if($(this).hasClass("type01")) {
							$(this).find(".graph-bar").each(function(i) {
								$(this).addClass("bar-ani")
							});

						} else if($(this).hasClass("type02")) {
							$(this).find(".graph-bar").each(function(i) {
								(i%2==0) ? $(this).addClass("bar-ani2") : $(this).addClass("bar-ani2-1");
							});
						}
					});
				} else {

				}
			});
		
	}

}

var screenX = $(window).width();

var star_count = (screenX>768) ? 0 : 3;
var star_length = 11;
var img_txt01 = "<img src='../resources/images/common/star_yellow.png' alt=''>";
var img_txt02 = "<img src='../resources/images/common/star_orange.png' alt=''>";
var time = -400;

function aniVisual() {
	for(i=star_count;i<star_length;i++) {
		time_gap = (i>5) ? time_gap-=80 : 500;
		setTimeout(aniStar, time+=time_gap);
	}
}

function aniStar() {
	star_count ++;

	$(".visual").append("<div class='star-box star" + star_count + "'></div>");
	(star_count%2==1) ? $(".star"+star_count).html(img_txt01) : $(".star"+star_count).html(img_txt02);

	$(".star"+star_count).addClass("star-ani"+star_count);
}