
//放大镜效果
$(function() {
	
	var magnifierConfig = {
		magnifier : "#magnifier1",//最外层的大容器
		width : 340,//承载容器宽
		height : 350,//承载容器高
		moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
		zoom : 5//缩放比例
	};

	var _magnifier = magnifier(magnifierConfig);

	/*magnifier的内置函数调用*/
	/*
		//设置magnifier函数的index属性
		_magnifier.setIndex(1);

		//重新载入主图,根据magnifier函数的index属性
		_magnifier.eqImg();
	*/
});

//banner右边区域选项卡效果
$('.book_style>div').click(function(){
	$(this).addClass('on').siblings('div').removeClass('on');
	$(this).children().addClass('active').parent().siblings('div').children().removeClass('active');
})

//购物车加减
$('.plus').click(function(){
	let num = $(this).siblings('.num').val();
	num++;
	$(this).siblings('.num').val(num);
})
$('.reduce').click(function(){
	let num = $(this).siblings('.num').val();
	num--;
	if(num<1){
		num = 1;
	}
	$(this).siblings('.num').val(num);
})

//商品右边的选项卡效果
$('.infor_area li').click(function(){
	let i = $(this).index();
	$(this).addClass('present').siblings().removeClass('present');
	$(this).closest('.right_infor').children('.information').eq(i).addClass('appear').siblings().removeClass('appear');
})


//翻页区域效果
let index=0;
$('.pageDown li').click(function(){
	index = $(this).index();	
	$(this).addClass('down').siblings().removeClass('down');
	
})

$('.nextPage').click(function(){
	index++;
	if(index>5){
		index = 0;
	}
	console.log(index);
	$('.pageDown li').eq(index).addClass('down').siblings().removeClass('down');
	
})

// 回到顶部
//回到顶部
let height;   //始终指向当前高度
let speed = 100;

//设置监听事件
window.onscroll = function(){
    height = window.scrollY;
    
    //回到顶部效果
    if(height>=1500){
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