//垂直菜单显示与隐藏
$('.ban_left>li').mouseenter(function(){
    $(this).addClass('active').siblings().removeClass('active');
})
//当鼠标移开时所有li下的子菜单都隐藏
$('.ban_left>li').mouseleave(function(){
    $(this).removeClass('active');
})

//新书上架右边区域
$('.sale-right ol .hot_book>p').mouseenter(function(){
    $(this).addClass('hidden').closest('.hot_book').siblings().children('p').removeClass('hidden');
    $(this).next().addClass('present').closest('.hot_book').siblings().children('.recomm_word').removeClass('present');
})


// 轮播图效果 #slider

function slider(selector,boxh,w,h){
    $(selector).slidebox({
        boxh: boxh||400,//盒子的高度
        w: w||1000,//图片的宽度
        h: h||400,//图片的高度
        isShow: true,//是否显示控制器
        isShowBtn: true,//是否显示左右按钮
        controltop: 10,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
        controlsW: 12,//控制按钮宽度
        controlsH: 12,//控制按钮高度
        radius: 6//控制按钮圆角度数
    }); 
}


// banner轮播图效果 
slider('#slider',448,1000,448);

//切换垂直菜单的效果
let flag = true;
$('.top .logo').click(function(){
    if(flag){
        $(this).children().prop('src','./images/01-产品列表_02.jpg');
        $('.ban_left').css('display','none');  
    }else{
        $(this).children().prop('src','./images/02-产品列表_02.jpg');
        $('.ban_left').css('display','block');
        
    }
    flag = !flag;
})
//独家提供区域
$('.common_title ul>li').mouseenter(function(){
    //改变li的样式
    $(this).addClass('active').siblings().removeClass('active');
    //获取当前鼠标移入的li的索引
    let index = $(this).index(); 
    //改变下面内容
    $(this).closest('.common_title').siblings('.common_body').eq(index).addClass('on').siblings().removeClass('on');
})


//独家提供区域轮播图
slider('.common_body #slider',520,1200,520);

//猜你喜欢区域选项卡效果
let index = 0;  //指向当前的显示盒子
$('#change').click(function(){
    index++;
    if(index==3){
        index = 0;
    }
    $('.guess-like .global_list').eq(index).addClass('find').siblings().removeClass('find');
})