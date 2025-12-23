document.addEventListener('DOMContentLoaded', function() {
  const allCheck = document.querySelector('.all_check');
  const sonCheckboxes = document.querySelectorAll('.son_check');

  // 遍历所有的son_check复选框，为每个复选框添加change事件监听器
  sonCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      // 检查是否所有的son_check复选框都被选中
      const allSonCheckboxesChecked = Array.from(sonCheckboxes).every(checkbox => checkbox.checked);
      // 如果是，则选中all_check复选框，否则取消选中
      allCheck.checked = allSonCheckboxesChecked;
    });
  });
});







document.addEventListener('DOMContentLoaded', function() {
  const allCheck = document.querySelector('.all_check');
  const sonCheckboxes = document.querySelectorAll('.son_check');

  // 为全选复选框添加点击事件监听器
  allCheck.addEventListener('change', function() {
    // 遍历所有的son_check复选框，将它们的状态设置为与全选复选框相同
    sonCheckboxes.forEach(function(checkbox) {
      checkbox.checked = allCheck.checked;
    });
  });
});




















//删除一行
document.addEventListener('DOMContentLoaded', function() {
  var deleteButtons = document.querySelectorAll('.delbtn');
  deleteButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var orderList = this.closest('.order_lists');
      orderList.remove();
    });
  });
});



//删除选中订单商品
document.addEventListener('DOMContentLoaded', function() {
  var deleteSelectedButton = document.querySelector('.delallsel');
  deleteSelectedButton.addEventListener('click', function() {
    var selectedBoxes = document.querySelectorAll('.son_check:checked');
    selectedBoxes.forEach(function(box) {
      var orderList = box.closest('.order_lists');
      orderList.remove();
    });
  });
});

//获取商品个数
document.addEventListener('DOMContentLoaded', function() {
  var orderLists = document.querySelectorAll('.order_lists');
  var allOrders = document.querySelector('.allorders');
  allOrders.textContent = `（${orderLists.length}）`;
});

//删除时重新获取商品个数
document.addEventListener('DOMContentLoaded', function() {
  var orderLists = document.querySelectorAll('.order_lists');
  var allOrders = document.querySelector('.allorders');
  var deleteButtons = document.querySelectorAll('.delbtn, .delallsel');
  deleteButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      orderLists = document.querySelectorAll('.order_lists');
      allOrders.textContent = `（${orderLists.length}）`;
    });
  });
});









$(document).ready(function() {
    // 复选框点击事件
    $(".son_check").click(function() {
        var checkedNum = $(".son_check:checked").length; // 获取被选中的复选框个数
        $(".amounts").text(checkedNum); // 将被选中的商品个数赋值给amounts
    });
});





$(document).ready(function() {
    // 复选框点击事件
    $(".son_check").click(function() {
        var total = 0;
        // 遍历被选中的复选框，累加其对应商品的价格
        $(".son_check:checked").each(function() {
            var price = parseFloat($(this).closest(".order_lists").find(".price").text());
            total += price;
        });
        $(".totalprice").text(total.toFixed(2)); // 将总价赋值给totalprice，并保留两位小数
    });
});






