
//获取每一个的数量和金额，然后累加，从而获取总价格和总金额
function calcuAmount(){
    let sum = 0; //用于累加每一个商品的数量
    let sum_price = 0; //用于累加每一个金额
    
    //获取单价
    let price = $('.list_price').find('span').html();
    $('.son_check:checked').each(function(index,dom){
        //计算总商品件数
        let amount = $(this).parent().siblings('.list_amount').find('input').val();
        sum = sum + parseInt(amount);
        //计算总金额
        /* sum_price = price * sum;
        console.log(sum_price); */
        let pieceprice = $(this).parent().siblings('.list_sum').find('span').html();
        sum_price = sum_price + parseFloat(pieceprice);
        console.log(pieceprice);
    })
    $('.amount').html(sum);
    $('.totalprice').html(sum_price);
}



//增加数量
$('.plus').click(function(){
    //增加数量
    let num = $(this).prev().val();
    num++;
    //赋回页面
    $(this).prev().val(num);
    //计算金额
    let price = $(this).closest('.list_amount').prev().find('span').html();
    //计算总价
    let totalprice = num * price;
    //将总价赋回页面
    $(this).closest('.list_amount').next().find('span').html(totalprice.toFixed(2));
    calcuAmount();
})

//减少数量
$('.reduce').click(function(){
    let num = $(this).next().val();
    num--;
    if(num < 1){
        num = 1;
    }
    $(this).next().val(num);
    //计算金额
    let price = $(this).closest('.list_amount').prev().find('span').html();
    //计算总价
    let totalprice = num * price;
    //将总价赋回页面
    $(this).closest('.list_amount').next().find('span').html(totalprice.toFixed(2));
    calcuAmount();
})

//通过子复选框来判断全选框是否选中
$('.son_check').change(function(){


   //下面的复选框的数组长度
    let length = $('.son_check').length;
    //选中的复选框的数组长度
    let check_leng = $('.son_check:checked').length;
    if(check_leng <length){
        $('.all_check').prop('checked',false);
    }else{
        $('.all_check').prop('checked',true);
    } 
   //获取总数量和总价格 
    calcuAmount();
})

//全选效果
$('.all_check').click(function(){
    let bool = $(this).prop('checked');
    $('.son_check').prop('checked',bool);
    calcuAmount();
})

$(document).ready(function() {
  $(".all_check").change(function() {
    var isChecked = $(this).prop("checked");
    $("input[type='checkbox']").prop("checked", isChecked);
  });
});


//移除当前行的功能
$('.delbtn').click(function(){
    if(window.confirm('亲爱的顾客，是否确定删除此商品?')){
        $(this).closest('ul').remove();
        //删除后更新当前商品行数
        let length = $('.son_check').length;
        //选中的复选框的数组长度
        let check_leng = $('.son_check:checked').length;
        if(check_leng <length){
            $('.all_check').prop('checked',false);
        }else{
            $('.all_check').prop('checked',true);
        } 
        calcuAmount();
    }
   
    let len = $('.order_content').children().length;
    if(len == 0){
        $('.all_check').prop('checked',false);
    }

})

//删除选中的商品
$('.delallsel').click(function(){
    let leng = $('.son_check:checked').length;
    if(leng>0){
        if(window.confirm('确定要删除选中的商品吗？')){
            $('.son_check:checked').closest('ul').remove();
            calcuAmount();
            let len = $('.order_content').children().length;
            if(len == 0){
                $('.all_check').prop('checked',false);
            }
        }
    }else{
        alert('请选中要删除的商品');
    }

})




