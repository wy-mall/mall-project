//添加选择地址选项卡 效果
$('.good_address .ok').click(function(){
    $(this).addClass('on').closest('.address').siblings('.address').children('.ok').removeClass('on');
    $(this).children().addClass('present').closest('.address').siblings('.address').find('i').removeClass('present');
})

// 添加支付方式选项卡效果
$('.pay_pattern>span').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    $(this).children().addClass('present').parent().siblings().children().removeClass('present');
})
//添加点击提交订单按钮效果
$('.submit_order').click(function(){
    $('.log_modal').css('display','block');
})
//点击确定按钮关闭
$('.ensure').click(function(){
    $(this).closest('.log_modal').css('display','none');
})

//点击xx按钮关闭
$('.del').click(function(){
    $(this).closest('.log_modal').css('display','none');
})