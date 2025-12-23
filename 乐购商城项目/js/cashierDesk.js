//添加银行卡选项卡 效果
$('#main .add_card>div').click(function(){
    $(this).addClass('on').siblings().removeClass('on');
    $(this).children('.hidden').addClass('active').parent('div').siblings().children('.hidden').removeClass('active');
})

//立即支付效果
let index = 0;
$('.btn_pay').click(function(){
    index = Number(index);
    $('.log_modal').eq(index).css('display','block').siblings('.log_modal').css('display','none');
    index = !index; 
    console.log(index);
})
//点击确定按钮关闭
$('.ensure').click(function(){
    $(this).closest('.log_modal').css('display','none');
})

//点击xx按钮关闭
$('.del').click(function(){
    $(this).closest('.log_modal').css('display','none');
})