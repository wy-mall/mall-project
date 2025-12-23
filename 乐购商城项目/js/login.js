//登录页面的选项卡效果
$('.loginInfor ul>li').click(function () {
    let index = $(this).index();
    $(this).addClass('hove').siblings().removeClass('hove');
    $(this).closest('ul').siblings('.logIn').children().eq(index).addClass('appear').siblings().removeClass('appear');
    // $(this).closest('div').addClass('appear').siblings('#myform').removeClass('appear');
})

$(".indexrerun").click(function () {
    location.href = "index.html";
})