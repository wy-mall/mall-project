//头部导航栏选项卡效果
$('.vip .vip_right>li').click(function(){
    $(this).addClass('on').siblings().removeClass('on');
})

//回到顶部
let height;
let speed = 100;  //滚动速度

//设置监听事件
window.onscroll = function(){
    height = window.scrollY;
    console.log(height);
    if(height>=1000){
        $('#returnTop').css('display','block');
    }else{
        $('#returnTop').css('display','none');
    }
}
$('#returnTop').click(function(){
    let time = setInterval(function(){
        //不断更新height的值
        height = height - speed;
        if(height<=0){
            clearInterval(time);
            window.scrollTo(0,0);
        }
        window.scrollTo(0,height);  //实施滚动
    },50)
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
// banner轮播区域
slider('.banner_center #slider',474,732,474);