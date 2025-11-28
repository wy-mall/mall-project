/**
 * 乐购商城首页js
 * 2025-11-26 by wy
 */
// 当前页面加载完毕
$(function(){
	// 首页大图轮播
    $('#banner').tyslide({
				boxh:460,//盒子的高度
				w:1000,//盒子的宽度
				h:390,//图片的高度
				isShow:true,//是否显示控制器
				isShowBtn:true,//是否显示左右按钮
				controltop:40,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
				controlsW:20,//控制按钮宽度
				controlsH:20,//控制按钮高度
				radius:10,//控制按钮圆角度数
				controlsColor:"#d7d7d7",//普通控制按钮的颜色
				controlsCurrentColor:"#ff6600",//当前控制按钮的颜色
				isShowNum:true //是否显示数字
			});

	// 图书电子小轮播
	$('.ebooks-banner').tyslide({
				boxh:223,//盒子的高度
				w:332,//盒子的宽度
				h:223,//图片的高度
				isShow:true,//是否显示控制器
				isShowBtn:true,//是否显示左右按钮
				controltop:10,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
				controlsW:20,//控制按钮宽度
				controlsH:2,//控制按钮高度
				controlsColor:"#d7d7d7",//普通控制按钮的颜色
				controlsCurrentColor:"#00ff00",//当前控制按钮的颜色
			});
	// 电子书table切换
	var $lis = $('.ebooks ebooks-nav > li');
	$lis.mouseover(function(){
		//给自己添加激活类active 把兄弟的都干掉
		$(this).addClass('active').siblings().removeClass('active');
		//获取index
		var index = $(this).index();
		//选择内容
		var $ebooksList = $('.ebooks-list');
		//显示索引等于当前index
		$ebooksList.eq(index).show().siblings('.ebooks-list').hide();
	})
	// 新书列表手风琴效果
	$('.ebooks .rigt-box ul>li').mouseenter(function(){
		//所以兄弟：隐藏详情 显示标题
		$(this).siblings().find('.desc').hide();//隐藏详情
		$(this).siblings().find('.ebooks-title').show();//显示标题
		//当前：隐藏标题 显示详情
		$(this).find('.ebooks-title').hide();//隐藏标题
		$(this).find('desc').show();//显示标题
	})
    //dress
    let dressPng = ["img/139430026166665_y.jpg","img/162350015511487_y.jpg","img/72190020507327_1_o.jpg","img/68700016969136_y.jpg"];
    let $dressImg = $("#dress .banner img");
    let $dressLi = $("#dress .banner li");
    let $dressLeftBtn = $("#dress .banner span:eq(0)");
    let $dressRightBtn = $("#dress .banner span:eq(1)");
    // let liOn = "lion";
    slider($dressLeftBtn,$dressRightBtn,$dressLi,$dressImg,dressPng,imgIndex,liOn);


    //sport 
    let sportPng = ["img/160801-12909pc-B1.jpg","img/121440017773720_1_o.jpg","img/91540017771809_1_o.jpg","img/160729-3709pc-B.jpg"];
    let $sportImg = $("#sport .banner img");
    let $sportLi = $("#sport .banner li");
    let $sportLeftBtn = $("#sport .banner span:eq(0)");
    let $sportRightBtn = $("#sport .banner span:eq(1)");
    // let liOn = "lion";
    slider($sportLeftBtn,$sportRightBtn,$sportLi,$sportImg,sportPng,imgIndex,liOn);


    //garments 
    let garmentsPng = ["img/86030026281665_y.jpg","img/a_ban_383-340.jpg","img/187720017020448_1_o.jpg","img/lunbo.jpg"];
    let $garmentsImg = $("#garments .banner img");
    let $garmentsLi = $("#garments .banner li");
    let $garmentsLeftBtn = $("#garments .banner span:eq(0)");
    let $garmentsRightBtn = $("#garments .banner span:eq(1)");
    // let liOn = "lion";
    slider($garmentsLeftBtn,$garmentsRightBtn,$garmentsLi,$garmentsImg,garmentsPng,imgIndex,liOn);



    function slider($leftBtn,$rightBtn,$li,$img,ban1,imgIndex,active){
        //上一张
        $leftBtn.on("click",function(){
            imgIndex--;
            if(imgIndex<0){
                imgIndex = ban1.length-1;
            }
            $img.prop("src",ban1[imgIndex]);
            zOn($li,imgIndex,active)
        });

        //下一张
        $rightBtn.on("click",function(){
            imgIndex++;
            if(imgIndex>=ban1.length){
                imgIndex = 0;
            }
            $img.prop("src",ban1[imgIndex]);
            zOn($li,imgIndex,active);
        });

        //获取li点击li切换图片
        $li.on("click",function(){
            $(this).addClass(active).siblings().removeClass(active)
            let $index = $(this).index();
            $img.prop("src",ban1[$index]);
            imgIndex = $(this).index();
        })

        //自动切换
        setInterval(function(){
            imgIndex++;
            if(imgIndex>=ban1.length){
                imgIndex = 0;
            }
            $img.prop("src",ban1[imgIndex-1]).fadeOut("fast");
            $img.prop("src",ban1[imgIndex]).stop(false,true).fadeIn(500);
            zOn($li,imgIndex,active)
        },2000)

        //切换选中状态
        function zOn(obj,index,active){
            obj.eq(index).addClass(active).siblings().removeClass(active);
        }
    }



    //二维码
    $("#rightAside>div:eq(1)").on("click",function(){
        $(this).closest("#rightAside").find("div").eq(4).stop(true,false).toggle("slow");
    })

    //楼层
    let bg = $("#asideNav>div:not(.aNav2)").css("background")
    $("#asideNav>div:not(.aNav2)").on("mouseover",function(){
        let index = $(this).index();
        let bg = $(".aNav2>div").eq(index).css("background");
        $(this).css({background:bg});
        $(".aNav2>div").eq(index).stop(true,false).show(300);
        $(".aNav2").css("top",40*index);
    }).on("mouseout",function(){
        let index = $(this).index();
        $(".aNav2>div:not(.aNav2)").eq(index).hide();
        $(this).css({background:bg})
    }).on("click",function(){
        let index = $(this).index();
        let t = $(".floor").eq(index).offset().top;
        $("html,body").animate({"scrollTop":t},500)
    })
    /* $(window).scroll(function(){
        let sTop = $(".floor").scrollTop();
        // let index = $(this).index();
        
        console.log(sTop)
    }) */


    //top
    $("#returnTop").on("click",function(){
        let sTop = $("html,body").scrollTop();
        let time = setInterval(function(){
        sTop-=300;
        $("html,body").prop("scrollTop",sTop) 
        if(sTop<=0){
            clearInterval(time)
        }
        },30)
    })
})