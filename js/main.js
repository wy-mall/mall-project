// 乐购商城 JavaScript
console.log("乐购商城项目启动");

// 商品数据
const products = [
    { 
        id: 1, 
        name: "iPhone 15 Pro", 
        price: 7999, 
        description: "最新款苹果手机，性能强劲",
        image: "images/iphone.jpg"
    },
    { 
        id: 2, 
        name: "MacBook Air", 
        price: 8999, 
        description: "轻薄便携，办公学习首选",
        image: "images/macbook.jpg"
    },
    { 
        id: 3, 
        name: "AirPods Pro", 
        price: 1899, 
        description: "主动降噪，音质出色",
        image: "images/airpods.jpg"
    },
    { 
        id: 4, 
        name: "iPad Air", 
        price: 4399, 
        description: "大屏体验，创作利器",
        image: "images/ipad.jpg"
    }
];

// 显示商品列表
function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">¥${product.price}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                加入购物车
            </button>
        `;
        productGrid.appendChild(productCard);
    });
}

// 购物车功能
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showMessage(`已添加 ${product.name} 到购物车`);
    }
}

function updateCartCount() {
    // 在实际项目中，这里会更新购物车图标上的数量
    console.log(`购物车中有 ${cart.length} 件商品`);
}

function showMessage(message) {
    // 简单的消息提示
    alert(message);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    console.log('页面加载完成，商品已显示');
});

// 添加一些交互效果
document.addEventListener('DOMContentLoaded', function() {
    // 为导航链接添加点击效果
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // 在实际项目中，这里会进行页面导航
            showMessage('功能开发中，敬请期待！');
        });
    });
});
