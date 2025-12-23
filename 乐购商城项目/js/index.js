// 垂直菜单栏的显示隐藏效果
//获取元素
let oLi = document.querySelectorAll('.ban_left>li');
// let oDiv = document.querySelectorAll('.ban_left')
//添加事件

for (let i = 0; i < oLi.length; i++) {
    //移入事件
    oLi[i].addEventListener('mouseenter', function () {
        this.classList.add('active');
    })
    //移除事件
    oLi[i].addEventListener('mouseleave', function () {
        this.classList.remove('active');
    })

}








// 轮播图效果 #slider

function slider(selector, boxh, w, h) {
    $(selector).slidebox({
        boxh: boxh || 420,//盒子的高度
        w: w || 1000,//图片的宽度
        h: h || 400,//图片的高度
        isShow: true,//是否显示控制器
        isShowBtn: true,//是否显示左右按钮
        controltop: 9,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
        controlsW: 20,//控制按钮宽度
        controlsH: 20,//控制按钮高度
        radius: 15,//控制按钮圆角度数

        controlsColor: "#d7d7d7",//普通控制按钮的颜色
        controlsCurrentColor: "#ff6600",//当前控制按钮的颜色
    });
}
//选项卡效果

//电子书左边区域

// 电子书右边区域
$('.e_right ol .hot_book').mouseenter(function () {
    //当前的p隐藏
    $(this).children('p').addClass('hidden');
    //其他的p显示
    $(this).siblings().children('p').removeClass('hidden');
    //当前的div显示
    $(this).children('.recomm_word').addClass('present');
    //其他的div隐藏
    $(this).siblings().children('.recomm_word').removeClass('present');
})

//回到顶部
let height;   //始终指向当前高度
let topHeight; //用于做头部滚动的高度
let speed = 100;

//设置监听事件
window.onscroll = function () {
    height = window.scrollY;
    topHeight = window.scrollY;
    //回到顶部效果
    if (height >= 1500) {
        $('#returnTop').css('display', 'block');
    } else {
        $('#returnTop').css('display', 'none');
    }
    //头部滚动效果
    if (topHeight >= 200) {
        $('.topScroll').stop().slideDown(100);
        $('.search').appendTo('.topScroll>div');
    } else {
        $('.topScroll').stop().slideUp(100);
        $('.search').prependTo('#header .check');
    }

}
$('#returnTop').click(function () {
    let time = setInterval(function () {
        //不断更新height的值
        height = height - speed;
        if (height <= 0) {
            clearInterval(time);
            window.scrollTo(0, 0);
        }
        window.scrollTo(0, height);  //实施滚动



    }, 50)
})


let bgArr = ['#93d46f', '#f65727', '#bb9dee', '#ff7394', '#c2ec51'];
//鼠标移入事件
$('.scroll>li').on({
    //楼层滚动
    mouseenter: function () {
        $(this).css('background-position-x', '-40px');
        $(this).css('background-color', bgArr[$(this).index()]);
        //隐藏的div从左向右滚动出现
        $(this).stop().animate({ width: 100 }, 500);
    },
    //鼠标移出事件
    mouseleave: function () {
        $(this).css('background-position-x', '0px');
        $(this).css('background-color', '');
        $(this).stop().animate({ width: 0 }, 10);
    },
    // 鼠标点击事件
    click: function () {
        let index = $(this).index();
        //获得当前索引值
        let top = $('#main .floor').eq(index).offset().top;
        $('html,body').stop().animate({ scrollTop: top }, 300);

    }
})




/*推广商品奶嘴*/

$('.produ_promotion>.wrapper>.promo_title>ul>li').mouseenter(function () {
    $(this).addClass("active").siblings("li").removeClass("active");
})

$(".produ_promotion>.wrapper>.promo_title>ul>li:last-child").mouseenter(function () {
    $('.produ_list_both').addClass("move_left"); // 添加样式
});

$(".produ_promotion>.wrapper>.promo_title>ul>li:first-child").mouseenter(function () {
    $('.produ_list_both').removeClass("move_left"); // 移除样式
});

// 小广告
$('.adlet').hover(function () {
    console.log("你好");
    $('.qr').stop().animate({ left: '-100px' }, 600)
}, function () {
    $('.qr').stop().animate({ left: '40px' }, 600)
})

//电子书的tab
$(function () {
    // 定义三组图片数据 - 图书电子书区域
    var imgData = [
        // 第一组：最新上架（当前显示的这一组）
        {
            leftImg: "./images/index7_07.jpg",
            carouselImgs: [
                "IMGS/ppt2_05.jpg",
                "IMGS/ppt2_05.jpg",
                "IMGS/ppt2_05.jpg",
                "IMGS/ppt2_05.jpg"
            ],
            rightImgs: [
                "./images/index09_05.jpg",
                "./images/index09_05.jpg",
                "./images/index09_05.jpg",
                "./images/index09_05.jpg",
                "./images/index09_05.jpg",
                "./images/index09_05.jpg"
            ]
        },
        // 第二组：独家畅销（打乱位置）
        {
            leftImg: "./images/index09_05.jpg", // 改用右边图片
            carouselImgs: [
                "./images/index7_07.jpg", // 改用左边图片
                "./images/index7_07.jpg",
                "./images/index7_07.jpg",
                "./images/index7_07.jpg"
            ],
            rightImgs: [
                "IMGS/ppt2_05.jpg", // 改用轮播图片
                "IMGS/ppt2_05.jpg",
                "IMGS/ppt2_05.jpg",
                "IMGS/ppt2_05.jpg",
                "IMGS/ppt2_05.jpg",
                "IMGS/ppt2_05.jpg"
            ]
        },
        // 第三组：电子书（再次打乱）
        {
            leftImg: "IMGS/ppt2_05.jpg", // 改用轮播图片
            carouselImgs: [
                "./images/index09_05.jpg", // 改用右边图片
                "./images/index09_05.jpg",
                "./images/index09_05.jpg",
                "./images/index09_05.jpg"
            ],
            rightImgs: [
                "./images/index7_07.jpg", // 改用左边图片
                "./images/index7_07.jpg",
                "./images/index7_07.jpg",
                "./images/index7_07.jpg",
                "./images/index7_07.jpg",
                "./images/index7_07.jpg"
            ]
        }
    ];

    // 找到图书区域的标题li元素
    var $menuItems = $('.e_left .e-title ul li');

    // 鼠标移入事件
    $menuItems.hover(function () {
        // 获取当前li的索引
        var index = $(this).index();

        // 切换change类（这个区域用的是change类，不是active）
        $menuItems.removeClass('change');
        $(this).addClass('change');

        // 获取当前区域的con_production元素
        var $conProduction = $('.e_left .con_production');

        // 更新图片
        var currentData = imgData[index];

        // 更新左边区域大图
        $conProduction.find('.pro_left img').attr('src', currentData.leftImg);

        // 更新轮播图图片
        var $carouselImgs = $conProduction.find('#bannerInner-ebook .innerwrapper li img');
        $carouselImgs.each(function (i) {
            $(this).attr('src', currentData.carouselImgs[i]);
        });

        // 更新右边区域的6个小图片
        var $rightImgs = $conProduction.find('.pro_right li:not(:first-child) img');
        $rightImgs.each(function (i) {
            $(this).attr('src', currentData.rightImgs[i] || currentData.rightImgs[0]);
        });
    });
});

// 服装区域tab栏
$(function () {
    // 定义三组图片数据
    var imgData = [
        // 第一组：女装内衣（当前显示的这一组）
        {
            leftImg: "./images/index7_17.jpg",
            carouselImgs: [
                "imgs/index10_05.jpg",
                "imgs/index10_05.jpg",
                "imgs/index10_05.jpg",
                "imgs/index10_05.jpg"
            ],
            bottomImg: "./images/index11_08.jpg",
            rightTopImgs: [
                "./images/index100_05.jpg",
                "./images/index100_05.jpg",
                "./images/index100_05.jpg"
            ],
            rightBottomImgs: [
                "./images/index100_11.jpg",
                "./images/index100_11.jpg",
                "./images/index100_11.jpg"
            ]
        },
        // 第二组：热销男装（用不同位置的图片）
        {
            leftImg: "./images/index100_05.jpg", // 改用右边的图片
            carouselImgs: [
                "./images/index11_08.jpg", // 改用底部的图片
                "./images/index11_08.jpg",
                "./images/index11_08.jpg",
                "./images/index11_08.jpg"
            ],
            bottomImg: "imgs/index10_05.jpg", // 改用轮播的图片
            rightTopImgs: [
                "./images/index7_17.jpg", // 改用左边的图片
                "./images/index7_17.jpg",
                "./images/index7_17.jpg"
            ],
            rightBottomImgs: [
                "./images/index100_11.jpg",
                "./images/index100_11.jpg",
                "./images/index100_11.jpg"
            ]
        },
        // 第三组：精品鞋靴（再次打乱）
        {
            leftImg: "./images/index100_11.jpg", // 改用右下角的图片
            carouselImgs: [
                "./images/index100_05.jpg", // 改用右上角的图片
                "./images/index100_05.jpg",
                "./images/index100_05.jpg",
                "./images/index100_05.jpg"
            ],
            bottomImg: "./images/index7_17.jpg", // 改用左边的图片
            rightTopImgs: [
                "imgs/index10_05.jpg", // 改用轮播的图片
                "imgs/index10_05.jpg",
                "imgs/index10_05.jpg"
            ],
            rightBottomImgs: [
                "./images/index11_08.jpg", // 改用底部的图片
                "./images/index11_08.jpg",
                "./images/index11_08.jpg"
            ]
        }
    ];

    // 找到标题的li元素
    var $menuItems = $('.clothes .common_title ul li');

    // 鼠标移入事件
    $menuItems.hover(function () {
        // 获取当前li的索引
        var index = $(this).index();

        // 切换active类
        $menuItems.removeClass('active');
        $(this).addClass('active');

        // 更新图片
        var currentData = imgData[index];

        // 更新左边区域图片
        $('.common_left img').attr('src', currentData.leftImg);

        // 更新轮播图图片
        var $carouselImgs = $('.innerwrapper li img');
        $carouselImgs.each(function (i) {
            $(this).attr('src', currentData.carouselImgs[i]);
        });

        // 更新中间底部图片
        $('.bottom_img img').attr('src', currentData.bottomImg);

        // 更新右边上部图片
        var $rightTopImgs = $('.ul-top li img');
        $rightTopImgs.each(function (i) {
            $(this).attr('src', currentData.rightTopImgs[i]);
        });

        // 更新右边下部图片
        var $rightBottomImgs = $('.ul-bottom li img');
        $rightBottomImgs.each(function (i) {
            $(this).attr('src', currentData.rightBottomImgs[i]);
        });
    });

    // 如果需要点击切换，可以加上这个
    // $menuItems.click(function() {
    //     var index = $(this).index();
    //     $menuItems.removeClass('active');
    //     $(this).addClass('active');
    //     // 这里可以调用更新图片的函数
    // });
});

//运动模块tab
$(function () {
    // 定义三组图片数据 - 使用你提供的图片路径
    var imgData = [
        // 第一组：国际名品（当前显示的这一组）
        {
            leftImg: "./images/160729pc-A.jpg",
            carouselImgs: [
                "imgs/160801-12909pc-B1.jpg",
                "imgs/160801-12909pc-B1.jpg",
                "imgs/160801-12909pc-B1.jpg",
                "imgs/160801-12909pc-B1.jpg"
            ],
            bottomImg: "./images/index11_08.jpg",
            rightTopImgs: [
                "./images/160801-17862pc-C.jpg",
                "./images/160801-17862pc-C.jpg",
                "./images/160801-17862pc-C.jpg"
            ],
            rightBottomImgs: [
                "./images/160729-12609pc-D.jpg",
                "./images/160729-12609pc-D.jpg",
                "./images/160729-12609pc-D.jpg"
            ]
        },
        // 第二组：户外装备（打乱位置）
        {
            leftImg: "./images/160801-17862pc-C.jpg", // 改用右上角图片
            carouselImgs: [
                "./images/160729-12609pc-D.jpg", // 改用右下角图片
                "./images/160729-12609pc-D.jpg",
                "./images/160729-12609pc-D.jpg",
                "./images/160729-12609pc-D.jpg"
            ],
            bottomImg: "imgs/160801-12909pc-B1.jpg", // 改用轮播图片
            rightTopImgs: [
                "./images/160729pc-A.jpg", // 改用左边图片
                "./images/160729pc-A.jpg",
                "./images/160729pc-A.jpg"
            ],
            rightBottomImgs: [
                "./images/index11_08.jpg", // 改用底部图片
                "./images/index11_08.jpg",
                "./images/index11_08.jpg"
            ]
        },
        // 第三组：运动潮流（再次打乱）
        {
            leftImg: "./images/index11_08.jpg", // 改用底部图片
            carouselImgs: [
                "./images/160801-17862pc-C.jpg", // 改用右上角图片
                "./images/160801-17862pc-C.jpg",
                "./images/160801-17862pc-C.jpg",
                "./images/160801-17862pc-C.jpg"
            ],
            bottomImg: "./images/160729-12609pc-D.jpg", // 改用右下角图片
            rightTopImgs: [
                "imgs/160801-12909pc-B1.jpg", // 改用轮播图片
                "imgs/160801-12909pc-B1.jpg",
                "imgs/160801-12909pc-B1.jpg"
            ],
            rightBottomImgs: [
                "./images/160729pc-A.jpg", // 改用左边图片
                "./images/160729pc-A.jpg",
                "./images/160729pc-A.jpg"
            ]
        }
    ];

    // 找到这个区域的标题li元素
    var $menuItems = $('.outdoor_sport .common_title ul li');

    // 鼠标移入事件
    $menuItems.hover(function () {
        // 获取当前li的索引
        var index = $(this).index();

        // 切换active类
        $menuItems.removeClass('active');
        $(this).addClass('active');

        // 获取当前区域的common_body元素
        var $commonBody = $(this).closest('.common_title').nextAll('.common_body').first();

        // 更新图片
        var currentData = imgData[index];

        // 更新左边区域图片
        $commonBody.find('.common_left img').attr('src', currentData.leftImg);

        // 更新轮播图图片
        var $carouselImgs = $commonBody.find('.innerwrapper li img');
        $carouselImgs.each(function (i) {
            $(this).attr('src', currentData.carouselImgs[i]);
        });

        // 更新中间底部图片
        $commonBody.find('.bottom_img img').attr('src', currentData.bottomImg);

        // 更新右边上部图片
        var $rightTopImgs = $commonBody.find('.ul-top li img');
        $rightTopImgs.each(function (i) {
            $(this).attr('src', currentData.rightTopImgs[i]);
        });

        // 更新右边下部图片
        var $rightBottomImgs = $commonBody.find('.ul-bottom li img');
        $rightBottomImgs.each(function (i) {
            $(this).attr('src', currentData.rightBottomImgs[i]);
        });
    });
});

//童装模块tab
$(function () {
    // 童装区域的图片数据
    var imgData = [
        // 第一组：儿童服装（当前显示的这一组）
        {
            leftImg: "imgs/儿童服装/86030026097384_y.jpg",
            carouselImgs: [
                "imgs/儿童服装/86030026281665_y.jpg",
                "imgs/儿童服装/86030026281665_y.jpg",
                "imgs/儿童服装/86030026281665_y.jpg",
                "imgs/儿童服装/86030026281665_y.jpg"
            ],
            bottomImg: "./images/index11_08.jpg",
            rightTopImgs: [
                "imgs/儿童服装/55260017675581_y.jpg",
                "imgs/儿童服装/55260017675581_y.jpg",
                "imgs/儿童服装/55260017675581_y.jpg"
            ],
            rightBottomImgs: [
                "imgs/儿童服装/99999990000357083.jpg",
                "imgs/儿童服装/99999990000357083.jpg",
                "imgs/儿童服装/99999990000357083.jpg"
            ]
        },
        // 第二组：婴儿装（打乱位置）
        {
            leftImg: "imgs/儿童服装/55260017675581_y.jpg", // 改用右上角图片
            carouselImgs: [
                "imgs/儿童服装/99999990000357083.jpg", // 改用右下角图片
                "imgs/儿童服装/99999990000357083.jpg",
                "imgs/儿童服装/99999990000357083.jpg",
                "imgs/儿童服装/99999990000357083.jpg"
            ],
            bottomImg: "imgs/儿童服装/86030026281665_y.jpg", // 改用轮播图片
            rightTopImgs: [
                "imgs/儿童服装/86030026097384_y.jpg", // 改用左边图片
                "imgs/儿童服装/86030026097384_y.jpg",
                "imgs/儿童服装/86030026097384_y.jpg"
            ],
            rightBottomImgs: [
                "./images/index11_08.jpg", // 改用底部图片
                "./images/index11_08.jpg",
                "./images/index11_08.jpg"
            ]
        },
        // 第三组：小潮童装（再次打乱）
        {
            leftImg: "./images/index11_08.jpg", // 改用底部图片
            carouselImgs: [
                "imgs/儿童服装/55260017675581_y.jpg", // 改用右上角图片
                "imgs/儿童服装/55260017675581_y.jpg",
                "imgs/儿童服装/55260017675581_y.jpg",
                "imgs/儿童服装/55260017675581_y.jpg"
            ],
            bottomImg: "imgs/儿童服装/99999990000357083.jpg", // 改用右下角图片
            rightTopImgs: [
                "imgs/儿童服装/86030026281665_y.jpg", // 改用轮播图片
                "imgs/儿童服装/86030026281665_y.jpg",
                "imgs/儿童服装/86030026281665_y.jpg"
            ],
            rightBottomImgs: [
                "imgs/儿童服装/86030026097384_y.jpg", // 改用左边图片
                "imgs/儿童服装/86030026097384_y.jpg",
                "imgs/儿童服装/86030026097384_y.jpg"
            ]
        }
    ];

    // 找到童装区域的标题li元素
    var $menuItems = $('.kids_clothes .common_title ul li');

    // 鼠标移入事件
    $menuItems.hover(function () {
        // 获取当前li的索引
        var index = $(this).index();

        // 切换active类
        $menuItems.removeClass('active');
        $(this).addClass('active');

        // 获取当前区域的common_body元素
        var $commonBody = $('.kids_clothes .common_body');

        // 更新图片
        var currentData = imgData[index];

        // 更新左边区域图片
        $commonBody.find('.common_left img').attr('src', currentData.leftImg);

        // 更新轮播图图片
        var $carouselImgs = $commonBody.find('.innerwrapper li img');
        $carouselImgs.each(function (i) {
            $(this).attr('src', currentData.carouselImgs[i]);
        });

        // 更新中间底部图片
        $commonBody.find('.bottom_img img').attr('src', currentData.bottomImg);

        // 更新右边上部图片
        var $rightTopImgs = $commonBody.find('.ul-top li img');
        $rightTopImgs.each(function (i) {
            $(this).attr('src', currentData.rightTopImgs[i]);
        });

        // 更新右边下部图片
        var $rightBottomImgs = $commonBody.find('.ul-bottom li img');
        $rightBottomImgs.each(function (i) {
            $(this).attr('src', currentData.rightBottomImgs[i]);
        });
    });
});

//推广区域
$(function () {
    // 定义两组商品数据
    var promotionData = [
        // 第一组商品
        {
            products: [
                { img: "./images/index25_12.jpg", title: "Pigeon法国制奶嘴，无毒天然乳胶", price: "￥:189", reviews: "988条评价" },
                { img: "./images/index25_12.jpg", title: "Pigeon法国制奶嘴，无毒天然乳胶", price: "￥:189", reviews: "988条评价" },
                { img: "./images/index25_12.jpg", title: "Pigeon法国制奶嘴，无毒天然乳胶", price: "￥:189", reviews: "988条评价" },
                { img: "./images/index25_12.jpg", title: "Pigeon法国制奶嘴，无毒天然乳胶", price: "￥:189", reviews: "988条评价" },
                { img: "./images/index25_12.jpg", title: "Pigeon法国制奶嘴，无毒天然乳胶", price: "￥:189", reviews: "988条评价" },
                { img: "./images/index25_12.jpg", title: "Pigeon法国制奶嘴，无毒天然乳胶", price: "￥:189", reviews: "988条评价" },
                { img: "./images/index25_12.jpg", title: "Pigeon法国制奶嘴，无毒天然乳胶", price: "￥:189", reviews: "988条评价" },
                { img: "./images/index25_12.jpg", title: "Pigeon法国制奶嘴，无毒天然乳胶", price: "￥:189", reviews: "988条评价" },
                { img: "./images/index25_12.jpg", title: "Pigeon法国制奶嘴，无毒天然乳胶", price: "￥:189", reviews: "988条评价" },
                { img: "./images/index25_12.jpg", title: "Pigeon法国制奶嘴，无毒天然乳胶", price: "￥:189", reviews: "988条评价" }
            ]
        },
        // 第二组商品
        {
            products: [
                { img: "./images/index27_14.jpg", title: "高级婴儿奶瓶套装", price: "￥:300", reviews: "1200条评价" },
                { img: "./images/index27_14.jpg", title: "高级婴儿奶瓶套装", price: "￥:300", reviews: "1200条评价" },
                { img: "./images/index27_14.jpg", title: "高级婴儿奶瓶套装", price: "￥:300", reviews: "1200条评价" },
                { img: "./images/index27_14.jpg", title: "高级婴儿奶瓶套装", price: "￥:300", reviews: "1200条评价" },
                { img: "./images/index27_14.jpg", title: "高级婴儿奶瓶套装", price: "￥:300", reviews: "1200条评价" },
                { img: "./images/index27_14.jpg", title: "高级婴儿奶瓶套装", price: "￥:300", reviews: "1200条评价" },
                { img: "./images/index27_14.jpg", title: "高级婴儿奶瓶套装", price: "￥:300", reviews: "1200条评价" },
                { img: "./images/index27_14.jpg", title: "高级婴儿奶瓶套装", price: "￥:300", reviews: "1200条评价" },
                { img: "./images/index27_14.jpg", title: "高级婴儿奶瓶套装", price: "￥:300", reviews: "1200条评价" },
                { img: "./images/index27_14.jpg", title: "高级婴儿奶瓶套装", price: "￥:300", reviews: "1200条评价" }
            ]
        }
    ];

    // 获取元素 - 保持原有结构不变
    var $indicators = $('.promo_title ul li');
    var $produListWrapper = $('.produ_list_father');
    var $produListBoth = $('.produ_list_both');
    var $produLists = $produListBoth.children(); // 两个包含ul的div
    var currentIndex = 0;
    var totalSlides = $produLists.length;

    // 只添加必要的样式，不改变原有布局
    $produListWrapper.css({
        'overflow': 'hidden',
        'position': 'relative'
    });

    // 设置produ_list_both的宽度为200%（保持原有结构，只是水平排列）
    $produListBoth.css({
        'width': '200%',
        'white-space': 'nowrap',
        'font-size': '0' // 消除inline-block元素间的空白间隙
    });

    // 设置每个produ_list容器的宽度为50%，并并排显示
    $produLists.css({
        'width': '50%',
        'display': 'inline-block',
        'vertical-align': 'top',
        'font-size': '14px' // 恢复字体大小
    });

    // 添加CSS过渡效果
    $produListBoth.css('transition', 'transform 0.3s ease');

    // 滑动函数
    function slideTo(index) {
        if (index < 0 || index >= totalSlides) return;

        currentIndex = index;
        var translateX = -currentIndex * 50; // 每个slide占50%宽度

        $produListBoth.css('transform', 'translateX(' + translateX + '%)');

        // 更新指示器高亮
        $indicators.removeClass('active').eq(currentIndex).addClass('active');
    }

    // 鼠标拖动事件
    var isDragging = false;
    var startX = 0;
    var currentTranslate = 0;

    $produListWrapper.on('mousedown', function (e) {
        isDragging = true;
        startX = e.pageX;
        currentTranslate = -currentIndex * 50;
        $produListBoth.css('transition', 'none');
    });

    $(document).on('mousemove', function (e) {
        if (!isDragging) return;

        var diffX = e.pageX - startX;
        var wrapperWidth = $produListWrapper.width();
        var translateX = currentTranslate + (diffX / wrapperWidth * 100);

        // 限制滑动范围
        var maxTranslate = 0;
        var minTranslate = -50;
        translateX = Math.max(minTranslate, Math.min(maxTranslate, translateX));

        $produListBoth.css('transform', 'translateX(' + translateX + '%)');
    });

    $(document).on('mouseup', function (e) {
        if (!isDragging) return;
        isDragging = false;

        var diffX = e.pageX - startX;
        var wrapperWidth = $produListWrapper.width();

        // 恢复过渡效果
        $produListBoth.css('transition', 'transform 0.3s ease');

        // 判断是否切换
        if (Math.abs(diffX) > wrapperWidth * 0.1) {
            if (diffX > 0 && currentIndex > 0) {
                slideTo(currentIndex - 1);
            } else if (diffX < 0 && currentIndex < totalSlides - 1) {
                slideTo(currentIndex + 1);
            } else {
                slideTo(currentIndex);
            }
        } else {
            slideTo(currentIndex);
        }
    });

    // 触摸滑动事件（移动端）
    $produListWrapper.on('touchstart', function (e) {
        isDragging = true;
        startX = e.originalEvent.touches[0].pageX;
        currentTranslate = -currentIndex * 50;
        $produListBoth.css('transition', 'none');
    });

    $produListWrapper.on('touchmove', function (e) {
        if (!isDragging) return;

        var currentX = e.originalEvent.touches[0].pageX;
        var diffX = currentX - startX;
        var wrapperWidth = $produListWrapper.width();
        var translateX = currentTranslate + (diffX / wrapperWidth * 100);

        // 限制滑动范围
        var maxTranslate = 0;
        var minTranslate = -50;
        translateX = Math.max(minTranslate, Math.min(maxTranslate, translateX));

        $produListBoth.css('transform', 'translateX(' + translateX + '%)');
    });

    $produListWrapper.on('touchend', function (e) {
        if (!isDragging) return;
        isDragging = false;

        var endX = e.originalEvent.changedTouches[0].pageX;
        var diffX = endX - startX;
        var wrapperWidth = $produListWrapper.width();

        // 恢复过渡效果
        $produListBoth.css('transition', 'transform 0.3s ease');

        if (Math.abs(diffX) > wrapperWidth * 0.1) {
            if (diffX > 0 && currentIndex > 0) {
                slideTo(currentIndex - 1);
            } else if (diffX < 0 && currentIndex < totalSlides - 1) {
                slideTo(currentIndex + 1);
            } else {
                slideTo(currentIndex);
            }
        } else {
            slideTo(currentIndex);
        }
    });

    // 指示器点击事件
    $indicators.click(function () {
        var index = $(this).index();
        slideTo(index);
    });

    // 鼠标滚轮切换（可选）
    $produListWrapper.on('wheel', function (e) {
        e.preventDefault();

        if (e.originalEvent.deltaY > 0) {
            // 向下滚动，向左滑动
            if (currentIndex < totalSlides - 1) {
                slideTo(currentIndex + 1);
            }
        } else {
            // 向上滚动，向右滑动
            if (currentIndex > 0) {
                slideTo(currentIndex - 1);
            }
        }
    });

    // 初始化：只显示第一组，但第二组也加载在右侧
    slideTo(0);

    // 如果需要，可以添加商品数据更新功能
    function updateProducts(index) {
        var products = promotionData[index].products;
        var $currentList = $produLists.eq(index).find('.produ_list li');

        $currentList.each(function (i) {
            if (products[i]) {
                $(this).find('a img').attr('src', products[i].img);
                $(this).find('p:nth-child(2)').text(products[i].title);
                $(this).find('p:nth-child(3)').text(products[i].price);
                $(this).find('p:nth-child(4)').html('<img src="./images/index27_14.jpg" alt="">' + products[i].reviews);
            }
        });
    }
});



