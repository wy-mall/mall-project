window.onload = function () {
    let ban1 = ["img/banner1.jpg", "img/banner2.jpg", "img/banner3.png", "img/banner4.png", "img/banner5.png", "img/banner6.png"];
    let imgIndex = 0;
    let $img = $("#banner .bannerLeft img");
    let $li = $("#bottomBtn li");
    let $leftBtn = $("#banner .bannerLeft span:eq(0)");
    let $rightBtn = $("#banner .bannerLeft span:eq(1)");
    let ac = "active";
    slider($leftBtn, $rightBtn, $li, $img, ban1, imgIndex, ac);

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

    //手风琴
    $(".bannerRight>.b").on("mouseover", function () {
        $(this).addClass("brBook").siblings(".b").removeClass("brBook")
        $(this).removeClass("brBooks").siblings(".b").addClass("brBooks")
    })

    function slider($leftBtn, $rightBtn, $li, $img, ban1, imgIndex, active) {
        //上一张
        $leftBtn.on("click", function () {
            imgIndex--;
            if (imgIndex < 0) {
                imgIndex = ban1.length - 1;
            }
            $img.prop("src", ban1[imgIndex]);
            zOn($li, imgIndex, active)
        });

        //下一张
        $rightBtn.on("click", function () {
            imgIndex++;
            if (imgIndex >= ban1.length) {
                imgIndex = 0;
            }
            $img.prop("src", ban1[imgIndex]);
            zOn($li, imgIndex, active);
        });

        //获取li点击li切换图片
        $li.on("click", function () {
            $(this).addClass(active).siblings().removeClass(active)
            let $index = $(this).index();
            $img.prop("src", ban1[$index]);
        })

        //自动切换
        setInterval(function () {
            imgIndex++;
            if (imgIndex >= ban1.length) {
                imgIndex = 0;
            }
            $img.prop("src", ban1[imgIndex - 1]).fadeOut("fast");
            $img.prop("src", ban1[imgIndex]).stop(false, true).fadeIn(500);
            zOn($li, imgIndex, active)
        }, 2000)

        //切换选中状态
        function zOn(obj, index, active) {
            obj.eq(index).addClass(active).siblings().removeClass(active);
        }
    }

    //添加区域
    // 简化的版本
    $(document).ready(function () {
        // 为所有分类链接绑定点击事件
        $("#offerTop a").on("click", function (e) {
            e.preventDefault();

            // 获取分类名称
            const category = $(this).text();

            // 更新选中状态
            $(this).addClass("offerOn").siblings().removeClass("offerOn");

            // 定义每个分类对应的图片数组
            const imageSets = {
                "小说": ["img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png"],
                "生活": ["img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png"],
                "教学参辅": ["img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png"],
                "儿童文学": ["img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png"],
                "科学技术": ["img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png"],
                "社会文学": ["img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png"],
                "货币金融": ["img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/K1.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png", "img/k2.png"]
            };

            // 获取该分类的图片数组（如果没有就使用货币金融的）
            const images = imageSets[category] || imageSets["货币金融"];

            // 更新图片显示
            $("#offerMiddle img").each(function (index) {
                if (images[index]) {
                    $(this).attr("src", images[index]);
                }
            });

            // 更新小圆点
            const dotCounts = {
                "小说": 4, "生活": 6, "教学参辅": 5,
                "儿童文学": 3, "科学技术": 4, "社会文学": 6, "货币金融": 8
            };

            const dots = dotCounts[category] || 8;
            updateOfferDots(dots);
        });

        // 更新小圆点函数
        function updateOfferDots(count) {
            const $ul = $("#offerBottom ul");
            $ul.empty();

            for (let i = 0; i < count; i++) {
                const $li = $("<li></li>");
                if (i === 0) $li.addClass("on");
                $ul.append($li);
            }

            // 绑定小圆点点击事件
            $ul.find("li").on("click", function () {
                $(this).addClass("on").siblings().removeClass("on");
            });
        }

        // 初始化：触发货币金融的点击事件
        $("#offerTop a.offerOn").trigger("click");
    });

}

//服装区域
$(function () {
    var categoryData = {
        '小说': [
            // 第1组数据（8张图片）
            [
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" }
            ],
            // 第2组数据（打乱位置）
            [
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" }
            ]
        ],
        '生活': [
            // 第1组数据
            [
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" }
            ],
            // 第2组数据
            [
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" }
            ]
        ],
        '教学参辅': [
            // 第1组数据
            [
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" }
            ],
            // 第2组数据
            [
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" }
            ]
        ],
        '儿童文学': [
            // 第1组数据
            [
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" }
            ],
            // 第2组数据
            [
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" }
            ]
        ],
        '科学技术': [
            // 第1组数据
            [
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" }
            ],
            // 第2组数据
            [
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" }
            ]
        ],
        '社会文学': [
            // 第1组数据
            [
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" }
            ],
            // 第2组数据
            [
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" }
            ]
        ],
        '货币金融': [
            // 第1-8组数据（8组）
            [
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" }
            ],
            [
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" }
            ],
            [
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" }
            ],
            [
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" }
            ],
            [
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" }
            ],
            [
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" }
            ],
            [
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" }
            ],
            [
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" },
                { src: "img/k2.png" },
                { src: "img/K1.png" },
                { src: "img/K1.png" },
                { src: "img/k2.png" }
            ]
        ]
    };

    // 当前状态
    var currentCategory = '货币金融';
    var currentPage = 0;

    // 获取元素
    var $categoryLinks = $('#offerTop a');
    var $offerMiddle = $('#offerMiddle');
    var $leftSpan = $offerMiddle.find('span:first-child'); // 左边的span
    var $rightSpan = $offerMiddle.find('span:last-child'); // 右边的span
    var $bottomIndicators = $('#offerBottom ul li');

    // 初始化
    updateImages();
    updatePagination();

    // 分类切换
    $categoryLinks.hover(function () {
        var category = $(this).text().trim();

        $categoryLinks.removeClass('offerOn');
        $(this).addClass('offerOn');

        currentCategory = category;
        currentPage = 0;

        updateImages();
        updatePagination();
    });

    // 左边的span：上一页
    $leftSpan.click(function () {
        if (currentPage > 0) {
            currentPage--;
            updateImages();
            updatePagination();
        }
    });

    // 右边的span：下一页
    $rightSpan.click(function () {
        var categoryPages = categoryData[currentCategory];
        if (currentPage < categoryPages.length - 1) {
            currentPage++;
            updateImages();
            updatePagination();
        }
    });

    // 底部分页器点击事件
    $bottomIndicators.click(function () {
        var index = $(this).index();
        currentPage = index;
        updateImages();
        updatePagination();
    });

    // 更新图片函数
    function updateImages() {
        var categoryPages = categoryData[currentCategory];
        if (!categoryPages || categoryPages.length === 0) return;

        var currentImages = categoryPages[currentPage];
        if (!currentImages) return;

        var $images = $offerMiddle.find('img');
        $images.each(function (index) {
            if (currentImages[index]) {
                $(this).attr('src', currentImages[index].src);
            }
        });
    }

    // 更新分页器函数
    function updatePagination() {
        var categoryPages = categoryData[currentCategory];
        var totalPages = categoryPages ? categoryPages.length : 0;

        if (totalPages <= 1) {
            $('#offerBottom').hide();
        } else {
            $('#offerBottom').show();
            updateIndicatorCount(totalPages);
            $bottomIndicators.removeClass('on').eq(currentPage).addClass('on');
        }
    }

    // 更新分页器数量函数
    function updateIndicatorCount(count) {
        var $indicatorList = $('#offerBottom ul');
        var currentCount = $indicatorList.children().length;

        if (currentCount < count) {
            for (var i = currentCount; i < count; i++) {
                $indicatorList.append('<li></li>');
            }
        } else if (currentCount > count) {
            $indicatorList.children().slice(count).remove();
        }

        $bottomIndicators = $('#offerBottom ul li');

        $bottomIndicators.off('click').click(function () {
            var index = $(this).index();
            currentPage = index;
            updateImages();
            $bottomIndicators.removeClass('on').eq(currentPage).addClass('on');
        });
    }

    // 添加自动轮播（可选）
    var autoSlideInterval;

    function startAutoSlide() {
        stopAutoSlide();

        autoSlideInterval = setInterval(function () {
            var categoryPages = categoryData[currentCategory];
            var totalPages = categoryPages ? categoryPages.length : 0;

            if (totalPages <= 1) return;

            var nextPage = (currentPage + 1) % totalPages;
            currentPage = nextPage;

            updateImages();
            updatePagination();
        }, 3000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    startAutoSlide();

    // 鼠标悬停时停止轮播
    $('#offer').hover(stopAutoSlide, startAutoSlide);

    // 用户操作后重置轮播
    $categoryLinks.hover(function () {
        stopAutoSlide();
        setTimeout(startAutoSlide, 100);
    });

    $leftSpan.click(function () {
        stopAutoSlide();
        setTimeout(startAutoSlide, 3000);
    });

    $rightSpan.click(function () {
        stopAutoSlide();
        setTimeout(startAutoSlide, 3000);
    });

    $bottomIndicators.click(function () {
        stopAutoSlide();
        setTimeout(startAutoSlide, 3000);
    });
});

//换一批
$(function () {
    // 定义多组图片数据（可以定义多组，轮流切换）
    var likeData = [
        // 第1组数据
        [
            { src: "img/K1.png" },
            { src: "img/K1.png" },
            { src: "img/K1.png" },
            { src: "img/K1.png" },
            { src: "img/K1.png" },
            { src: "img/K1.png" },
            { src: "img/k2.png" },
            { src: "img/k2.png" },
            { src: "img/k2.png" },
            { src: "img/k2.png" },
            { src: "img/k2.png" },
            { src: "img/k2.png" }
        ],
        // 第2组数据（打乱位置）
        [
            { src: "img/k2.png" },
            { src: "img/k2.png" },
            { src: "img/k2.png" },
            { src: "img/k2.png" },
            { src: "img/k2.png" },
            { src: "img/k2.png" },
            { src: "img/K1.png" },
            { src: "img/K1.png" },
            { src: "img/K1.png" },
            { src: "img/K1.png" },
            { src: "img/K1.png" },
            { src: "img/K1.png" }
        ],
        // 第3组数据（再次打乱）
        [
            { src: "img/K1.png" },
            { src: "img/k2.png" },
            { src: "img/K1.png" },
            { src: "img/k2.png" },
            { src: "img/K1.png" },
            { src: "img/k2.png" },
            { src: "img/K1.png" },
            { src: "img/k2.png" },
            { src: "img/K1.png" },
            { src: "img/k2.png" },
            { src: "img/K1.png" },
            { src: "img/k2.png" }
        ],
        // 第4组数据
        [
            { src: "img/k2.png" },
            { src: "img/K1.png" },
            { src: "img/k2.png" },
            { src: "img/K1.png" },
            { src: "img/k2.png" },
            { src: "img/K1.png" },
            { src: "img/k2.png" },
            { src: "img/K1.png" },
            { src: "img/k2.png" },
            { src: "img/K1.png" },
            { src: "img/k2.png" },
            { src: "img/K1.png" }
        ],
        // 第5组数据
        [
            { src: "img/K1.png" },
            { src: "img/K1.png" },
            { src: "img/k2.png" },
            { src: "img/k2.png" },
            { src: "img/K1.png" },
            { src: "img/K1.png" },
            { src: "img/k2.png" },
            { src: "img/k2.png" },
            { src: "img/K1.png" },
            { src: "img/K1.png" },
            { src: "img/k2.png" },
            { src: "img/k2.png" }
        ],
        // 第6组数据
        [
            { src: "img/k2.png" },
            { src: "img/k2.png" },
            { src: "img/K1.png" },
            { src: "img/K1.png" },
            { src: "img/k2.png" },
            { src: "img/k2.png" },
            { src: "img/K1.png" },
            { src: "img/K1.png" },
            { src: "img/k2.png" },
            { src: "img/k2.png" },
            { src: "img/K1.png" },
            { src: "img/K1.png" }
        ]
    ];

    // 当前显示的组索引
    var currentGroupIndex = 0;
    var totalGroups = likeData.length;

    // 获取元素
    var $refreshBtn = $('#likeTop span:last-child'); // 换一批按钮
    var $likeMiddle = $('#likeMiddle');
    var $images = $likeMiddle.find('img'); // 所有图片元素

    // 初始化显示第一组
    updateImages();

    // "换一批"按钮点击事件
    $refreshBtn.click(function () {
        // 切换到下一组（循环）
        currentGroupIndex = (currentGroupIndex + 1) % totalGroups;

        // 更新图片
        updateImages();

        // 可以添加一些点击反馈效果
        $(this).css({
            'background-color': '#ff6600',
            'color': '#fff'
        });

        setTimeout(function () {
            $refreshBtn.css({
                'background-color': '',
                'color': ''
            });
        }, 300);
    });

    // 更新图片函数
    function updateImages() {
        var currentImages = likeData[currentGroupIndex];

        if (!currentImages) return;

        // 更新所有图片的src
        $images.each(function (index) {
            if (currentImages[index]) {
                $(this).attr('src', currentImages[index].src);
            }
        });
    }
});

//新书上架高亮
$(function () {
    // 获取nBooksLeft的所有直接子元素
    var $children = $('#nBooksLeft > *');

    // 鼠标移入事件
    $children.hover(
        function () {
            // 鼠标移入：添加浅灰色背景
            $(this).css('background-color', '#f5f5f5');
        },
        function () {
            // 鼠标移出：恢复原样（移除背景色）
            $(this).css('background-color', '');
        }
    );
});

//独家提供高亮
$(function () {
    // 给#offerMiddle所有div内的img添加鼠标悬停滤镜效果
    $('#offerMiddle > div').hover(
        function () {
            // 鼠标移入：给图片添加滤镜
            $(this).find('img').css({
                'filter': 'brightness(0.9) contrast(1.1) saturate(1.1)',
                'transition': 'filter 0.3s ease'
            });

            // 也可以添加一个容器背景色变化（可选）
            $(this).css('background-color', 'rgba(0,0,0,0.05)');
        },
        function () {
            // 鼠标移出：移除滤镜
            $(this).find('img').css('filter', 'none');
            $(this).css('background-color', '');
        }
    );
});

//换一批高亮
$(function () {
    // 给#likeMiddle所有div内的img添加鼠标悬停滤镜效果
    $('#likeMiddle > div').hover(
        function () {
            // 鼠标移入：图片变暗
            $(this).find('img').css({
                'filter': 'brightness(0.9)',
                'transition': 'filter 0.3s ease'
            });
        },
        function () {
            // 鼠标移出：恢复
            $(this).find('img').css('filter', 'none');
        }
    );
});

//底部图片
$(function () {
    // 给#bBottom的所有img添加鼠标悬停滤镜效果
    $('#bBottom img').hover(
        function () {
            // 鼠标移入：添加滤镜效果
            $(this).css({
                'filter': 'brightness(0.9)',
                'transition': 'filter 0.3s ease'
            });
        },
        function () {
            // 鼠标移出：移除滤镜
            $(this).css('filter', 'none');
        }
    );
});