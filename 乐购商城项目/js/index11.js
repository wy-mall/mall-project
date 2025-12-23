window.onload = function () {
    // ==========================================
    // 1. 数据配置区域 (Configuration)
    // ==========================================

    // 轮播图图片数据池：包含所有模块所需的图片路径和 HTML 内容。
    const imgData = {
        // 主页顶部大轮播图图片
        main: ["img/banner1.jpg", "img/banner2.jpg", "img/banner3.png", "img/banner4.png", "img/banner5.png", "img/banner6.png"],

        // 图书模块 Tab 切换数据：数组索引对应 Tab 按钮的顺序。
        booksData: [
            // 索引 0: 电子书 Tab 的图片和内容
            { imgs: ["img/335x220_ljx_0729.jpg", "img/dsshbanner-zr-0914.jpg", "img/0804zhu.jpg"], html: getBooksHtml0() },

            // 索引 1: 独家畅销 Tab 的图片和内容
            { imgs: ["img/dsshbanner-zr-0914.jpg", "img/335x220_ljx_0729.jpg", "img/jingguan.jpg"], html: getBooksHtml1() },

            // 索引 2: 最新上架 Tab (默认显示) 的图片和内容
            { imgs: ["img/335x220_ljx_0729.jpg", "img/dsshbanner-zr-0914.jpg", "img/0804zhu.jpg", "img/jingguan.jpg"], html: getBooksHtml2() }
        ],

        // 其它楼层 Tab 切换数据（结构与 booksData 相同）
        dressData: [
            { imgs: ["img/162350015511487_y.jpg", "img/72190020507327_1_o.jpg", "img/68700016969136_y.jpg"], html: getDressHtml0() },
            { imgs: ["img/187720017020448_1_o.jpg", "img/lunbo.jpg", "img/a_ban_383-340.jpg"], html: getDressHtml1() },
            { imgs: ["img/139430026166665_y.jpg", "img/162350015511487_y.jpg", "img/72190020507327_1_o.jpg", "img/68700016969136_y.jpg"], html: getDressHtml2() }
        ],
        sportData: [
            { imgs: ["img/160801-12909pc-B1.jpg", "img/121440017773720_1_o.jpg", "img/91540017771809_1_o.jpg"], html: getSportHtml0() },
            { imgs: ["img/121440017773720_1_o.jpg", "img/91540017771809_1_o.jpg", "img/160729-3709pc-B.jpg"], html: getSportHtml1() },
            { imgs: ["img/160801-12909pc-B1.jpg", "img/121440017773720_1_o.jpg", "img/91540017771809_1_o.jpg", "img/160729-3709pc-B.jpg"], html: getSportHtml2() }
        ],
        garmentsData: [
            { imgs: ["img/a_ban_383-340.jpg", "img/187720017020448_1_o.jpg", "img/lunbo.jpg"], html: getGarmentsHtml0() },
            { imgs: ["img/187720017020448_1_o.jpg", "img/lunbo.jpg", "img/a_ban_383-340.jpg"], html: getGarmentsHtml1() },
            { imgs: ["img/86030026281665_y.jpg", "img/a_ban_383-340.jpg", "img/187720017020448_1_o.jpg", "img/lunbo.jpg"], html: getGarmentsHtml2() }
        ],

        // 推广商品模块数据 (不含轮播图数据，只有 HTML 内容)
        goodsData: [
            { html: getGoodsHtml0() },
            { html: getGoodsHtml1() }
        ]
    };

    // 所有需要自动轮播的楼层配置表：定义了哪些容器需要运行轮播图。
    const floorConfig = [
        { id: '#banner', imgs: imgData.main, activeClass: 'active' }, // 主轮播图配置
        // #books 轮播在 Tab 切换逻辑中单独处理，不在此处配置默认启动
        { id: '#dress', imgs: imgData.dressData[2].imgs, activeClass: 'lion' }, // 服装楼层默认 Tab 轮播
        { id: '#sport', imgs: imgData.sportData[2].imgs, activeClass: 'lion' }, // 运动楼层默认 Tab 轮播
        { id: '#garments', imgs: imgData.garmentsData[2].imgs, activeClass: 'lion' }, // 童装楼层默认 Tab 轮播
    ];

    // 定时器管理器：用于存储和清除每个轮播图的定时器，避免冲突。
    const slidersTimers = {};

    // ==========================================
    // 2. 核心初始化函数
    // ==========================================

    // 页面加载完成后，启动所有初始化流程
    initPage();

    function initPage() {
        initSideBar();      // 初始化左侧边栏导航
        initAllSliders();   // 初始化所有楼层的轮播图
        initAllTabs();      // 初始化所有楼层的 Tab 切换逻辑
        initTools();        // 初始化右侧工具栏和楼层跳转导航
    }

    // --- 通用轮播逻辑 ---

    // 批量初始化所有楼层的轮播
    function initAllSliders() {
        // 1. 初始化 floorConfig 中配置的（非 Tab 驱动的）轮播
        floorConfig.forEach(conf => {
            startSlider(conf.id, conf.imgs, conf.activeClass);
        });

        // 2. 针对 #books 模块的默认 Tab (最新上架) 启动轮播
        const defaultBookTab = imgData.booksData.findIndex(data => data.html === getBooksHtml2());
        if (defaultBookTab !== -1) {
            const defaultImgs = imgData.booksData[defaultBookTab].imgs;
            // 使用 #books 容器 ID 启动轮播
            startSlider('#books', defaultImgs, 'lion');
        }
    }

    // 启动单个轮播图的主函数
    function startSlider(containerId, imgArray, activeClass) {
        const $container = $(containerId);
        // 根据 containerId 查找正确的轮播图容器
        const $imgWrapper = containerId === '#banner' ? $container : $container.find('.banner');

        // 检查 DOM 元素是否存在
        if ($imgWrapper.length === 0 || $imgWrapper.find("img").length === 0) {
            return;
        }

        const $img = $imgWrapper.find("img");
        const $li = $imgWrapper.find("li"); // 楼层轮播图的指示点
        const $leftBtn = $imgWrapper.find("span").eq(0);
        const $rightBtn = $imgWrapper.find("span").eq(1);

        // 区分主轮播图和楼层轮播图的指示点元素
        const $dots = containerId === '#banner' ? $("#bottomBtn li") : $li;

        // 清除上一次运行的定时器，防止多个定时器同时运行
        if (slidersTimers[containerId]) clearInterval(slidersTimers[containerId]);

        // 启动轮播图的核心逻辑，并将新的定时器存储起来
        slidersTimers[containerId] = runSliderLogic($leftBtn, $rightBtn, $dots, $img, imgArray, 0, activeClass);
    }

    // 轮播图核心算法：控制图片切换、圆点更新、点击事件和定时器
    function runSliderLogic($leftBtn, $rightBtn, $li, $img, data, index, active) {
        // 移除所有已绑定的事件，避免重复绑定
        $leftBtn.off("click"); $rightBtn.off("click"); $li.off("click");

        // 初始化：设置第一张图片并激活第一个圆点
        $img.prop("src", data[index]).show();
        updateDots($li, index, active);

        // 绑定左右箭头和圆点的点击事件
        $leftBtn.on("click", () => changeImg(index - 1));
        $rightBtn.on("click", () => changeImg(index + 1));
        $li.on("click", function () { changeImg($(this).index()); });

        // 图片切换函数
        function changeImg(newIndex) {
            // 循环索引处理
            if (newIndex < 0) newIndex = data.length - 1;
            if (newIndex >= data.length) newIndex = 0;
            index = newIndex;
            $img.prop("src", data[index]);
            updateDots($li, index, active);
        }

        // 自动轮播定时器
        let timer = setInterval(() => {
            let nextIndex = (index + 1) >= data.length ? 0 : index + 1;
            // 使用淡出淡入效果切换图片
            $img.fadeOut("fast", function () {
                $(this).prop("src", data[nextIndex]).stop(false, true).fadeIn(500);
            });
            index = nextIndex;
            updateDots($li, index, active);
        }, 2000); // 2秒切换一次

        return timer; // 返回定时器ID，以便在需要时清除
    }

    // 更新轮播图指示点（圆点或小方块）的样式
    function updateDots($li, index, active) {
        $li.eq(index).addClass(active).siblings().removeClass(active);
    }

    // ==========================================
    // 3. 交互逻辑区域
    // ==========================================

    // --- Tab 切换通用逻辑 ---

    // 初始化所有楼层的 Tab 切换功能
    function initAllTabs() {
        // 楼层 Tab (例如 #books) - 点击后需要替换内容并**重启轮播**
        initFloorTabs('#bTop', '#bLeft', imgData.booksData);
        initFloorTabs('#dressTop', '#dressMiddle', imgData.dressData);
        initFloorTabs('#sportTop', '#sportMiddle', imgData.sportData);
        initFloorTabs('#garmentsTop', '#garmentsMiddle', imgData.garmentsData);

        // 推广商品 Tab (例如 #goods) - 点击后只替换内容，**不涉及轮播**
        initGoodsTabs('#goodsTop', '#goodsMiddle', imgData.goodsData);
    }

    // 通用楼层 Tab 切换逻辑 (针对具有轮播图的楼层)
    function initFloorTabs(topId, middleId, dataArray) {
        // 获取 Tab 按钮 (排除楼层名称的第一个 span 元素)
        const $tabs = $(`${topId} > a`);

        $tabs.on("click", function (e) {
            e.preventDefault(); // 阻止 a 标签的默认跳转行为

            const dataIndex = $tabs.index(this);
            // 样式切换：当前 Tab 激活，其它 Tab 取消激活
            $(this).addClass("on").siblings('a').removeClass("on");

            const targetData = dataArray[dataIndex];
            // 替换内容：用新 Tab 的 HTML 替换整个内容区域
            $(middleId).html(targetData.html);

            // 获取容器ID（如从 #bLeft 得到 #books）
            const containerId = middleId.replace('Left', '').replace('Middle', '');

            // 模块内有轮播图，需要用新 Tab 的图片数组重启轮播
            startSlider(containerId, targetData.imgs, 'lion');
        });
    }

    // 推广商品模块的 Tab 切换逻辑 (针对无轮播图的楼层)
    function initGoodsTabs(topId, middleId, dataArray) {
        const $tabs = $(`${topId} ul > li`);

        $tabs.on("click", function () {
            const dataIndex = $tabs.index(this);
            // 1. 样式切换
            $(this).addClass("on").siblings('li').removeClass("on");

            // 2. 内容切换 (直接替换 HTML)
            const targetData = dataArray[dataIndex];
            $(middleId).html(targetData.html);
        });
    }

    // --- 其他交互功能 ---

    // 左侧边栏导航的鼠标悬停效果
    function initSideBar() {
        $("#aside li").hover(function () {
            // 鼠标移入：显示子菜单，改变 li 样式，显示指示 span
            $(".sub").css("display", "block").appendTo(this);
            $(this).css({ "background": "#fff", "border": "1px solid #f60" });
            $(this).find("span").css({ top: $(this).index() * 31 + 1 + "px", display: "block" });
        }, function () {
            // 鼠标移出：隐藏子菜单，恢复 li 样式，隐藏指示 span
            $(this).find(".sub").hide();
            $(this).css({ "background": "#f3f3f3", "border": "0" });
            $(this).find("span").hide();
        });
    }

    // 右侧工具栏和楼层导航的逻辑
    function initTools() {
        // 点击右侧工具栏第二个 div (可能是聊天/客服按钮)，切换显示第 5 个 div (二维码/详情)
        $("#rightAside>div:eq(1)").click(function () {
            $(this).closest("#rightAside").find("div").eq(4).stop(true, false).toggle("slow");
        });

        const $navItems = $("#asideNav>div:not(.aNav2)"); // 楼层导航按钮 (如 B1, B2)
        const $navLabels = $(".aNav2>div"); // 楼层导航提示文字 (如 "图书")
        const baseBg = $navItems.css("background");

        $navItems.on("mouseover", function () {
            let idx = $(this).index();
            // 鼠标悬停：改变按钮背景色，显示对应的文字提示
            $(this).css("background", $navLabels.eq(idx).css("background"));
            $navLabels.eq(idx).stop(true, false).show(300).parent().css("top", 40 * idx);
        }).on("mouseout", function () {
            // 鼠标移出：隐藏文字提示，恢复按钮背景色
            $navLabels.eq($(this).index()).hide();
            $(this).css("background", baseBg);
        }).on("click", function () {
            // 点击跳转到对应楼层
            let t = $(".floor").eq($(this).index()).offset().top; // 获取目标楼层距顶部的距离
            $("html,body").animate({ "scrollTop": t }, 500); // 动画滚动
        });

        // 返回顶部按钮
        $("#returnTop").click(function () {
            $("html,body").animate({ scrollTop: 0 }, 500);
        });
    }

    // ==========================================
    // 4. 完整 HTML 模板区域 (Templates)
    // ==========================================
    // 注意：以下所有 HTML 模板函数返回的内容保持原样，未做任何功能性或结构性更改。

    // --- Books 模块模板 ---

    // 索引 0: 电子书 Tab 的 HTML 内容
    function getBooksHtml0() {
        return `<div class="fl">
            <ul>
                <li><a href="#">热门电子书</a></li>
                <li><a href="#">经典小说</a></li>
                <li><a href="#">科幻作品</a></li>
                <li><a href="#">文学名著</a></li>
                <li><a href="#">历史文化</a></li>
                <li><a href="#">成功励志</a></li>
                <li><a href="#">全部分类></a></li>
            </ul>
        </div>
        <div class="fr clearfix">
            <div class="banner">
                <img src="img/335x220_ljx_0729.jpg" alt="">
                <span></span>
                <span></span>
                <ul><li></li><li></li><li></li><li class="lion"></li></ul>
            </div>
            <div><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
            <div class="br"><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
            <div><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
            <div><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
            <div><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
            <div class="br"><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
        </div>`;
    }

    // 索引 1: 独家畅销 Tab 的 HTML 内容
    function getBooksHtml1() {
        return `<div class="fl">
            <ul>
                <li><a href="#">独家发售</a></li>
                <li><a href="#">畅销排行</a></li>
                <li><a href="#">热门推荐</a></li>
                <li><a href="#">限量典藏</a></li>
                <li><a href="#">年度热卖</a></li>
                <li><a href="#">独家定制</a></li>
                <li><a href="#">全部分类></a></li>
            </ul>
        </div>
        <div class="fr clearfix">
            <div class="banner">
                <img src="img/dsshbanner-zr-0914.jpg" alt="">
                <span></span>
                <span></span>
                <ul><li></li><li></li><li></li><li class="lion"></li></ul>
            </div>
            <div><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
            <div class="br"><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
            <div><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
            <div><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
            <div><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
            <div class="br"><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
        </div>`;
    }

    // 索引 2: 最新上架 Tab (默认显示) 的 HTML 内容
    function getBooksHtml2() {
        return `<div class="fl">
            <ul>
                <li><a href="productdetails.html">中小学教辅</a></li>
                <li><a href="#">外语</a></li>
                <li><a href="#">考试</a></li>
                <li><a href="#">小说</a></li>
                <li><a href="#">文学</a></li>
                <li><a href="#">青春文学</a></li>
                <li><a href="#">成功\\励志</a></li>
                <li><a href="#">管理</a></li>
                <li><a href="#">历史</a></li>
                <li><a href="#">哲学\\宗教</a></li>
                <li><a href="#">亲子\\家教</a></li>
                <li><a href="#">全部分类></a></li>
            </ul>
        </div>
        <div class="fr clearfix">
            <div class="banner">
                <img src="img/335x220_ljx_0729.jpg" alt="">
                <span></span>
                <span></span>
                <ul><li></li><li></li><li></li><li class="lion"></li></ul>
            </div>
            <div><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
            <div class="br"><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
            <div><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
            <div><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
            <div><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
            <div class="br"><img src="img/0804zhu.jpg" alt=""><p><span>￥49</span><span>￥79</span></p></div>
        </div>`;
    }

    // --- Dress 模块模板 (保持不变) ---
    function getDressHtml0() { return `<div class="fl"><ul><li><a href="#">鞋包专场</a></li><li><a href="#">春季新品</a></li><li><a href="#">运动休闲</a></li><li><a href="#">时尚单鞋</a></li><li><a href="#">手拿包</a></li><li><a href="#">皮带</a></li><li><a href="#">旅行箱</a></li><li><a href="#">童鞋</a></li><li><a href="#">户外鞋</a></li><li><a href="#">凉拖</a></li><li><a href="#">帆布鞋</a></li><li><a href="#">皮靴</a></li><li><a href="#">全部分类></a></li></ul></div><div class="fr clearfix"><div class="banner"><img src="img/162350015511487_y.jpg" alt=""><span></span><span></span><ul><li></li><li></li><li></li><li class="lion"></li></ul></div><div><img src="img/182870022195704_y.jpg" alt=""></div><div><img src="img/182870022195704_y.jpg" alt=""></div><div class="br"><img src="img/182870022195704_y.jpg" alt=""></div><div><img src="img/2016080422191191483.jpg" alt=""></div><div><img src="img/169350015361068_y.jpg" alt=""></div><div><img src="img/169350015361068_y.jpg" alt=""></div><div class="br"><img src="img/169350015361068_y.jpg" alt=""></div></div>`; }
    function getDressHtml1() { return `<div class="fl"><ul><li><a href="#">潮流男装</a></li><li><a href="#">衬衫</a></li><li><a href="#">夹克</a></li><li><a href="#">T恤</a></li><li><a href="#">运动装</a></li><li><a href="#">牛仔裤</a></li><li><a href="#">内衣</a></li><li><a href="#">配件</a></li><li><a href="#">皮鞋</a></li><li><a href="#">袜子</a></li><li><a href="#">帽子</a></li><li><a href="#">围巾</a></li><li><a href="#">全部分类></a></li></ul></div><div class="fr clearfix"><div class="banner"><img src="img/187720017020448_1_o.jpg" alt=""><span></span><span></span><ul><li></li><li></li><li></li><li class="lion"></li></ul></div><div><img src="img/182870022195704_y.jpg" alt=""></div><div><img src="img/182870022195704_y.jpg" alt=""></div><div class="br"><img src="img/182870022195704_y.jpg" alt=""></div><div><img src="img/2016080422191191483.jpg" alt=""></div><div><img src="img/169350015361068_y.jpg" alt=""></div><div><img src="img/169350015361068_y.jpg" alt=""></div><div class="br"><img src="img/169350015361068_y.jpg" alt=""></div></div>`; }
    function getDressHtml2() { return `<div class="fl"><ul><li><a href="#">女包</a></li><li><a href="#">防晒品</a></li><li><a href="#">短裤</a></li><li><a href="#">冰丝内裤</a></li><li><a href="#">男包</a></li><li><a href="#">功能箱包</a></li><li><a href="#">蕾丝衬衫</a></li><li><a href="#">奢侈品</a></li><li><a href="#">男鞋</a></li><li><a href="#">女包</a></li><li><a href="#">女鞋</a></li><li><a href="#">全部分类></a></li></ul></div><div class="fr clearfix"><div class="banner"><img src="img/139430026166665_y.jpg" alt=""><span></span><span></span><ul><li></li><li></li><li></li><li class="lion"></li></ul></div><div><img src="img/182870022195704_y.jpg" alt=""></div><div><img src="img/182870022195704_y.jpg" alt=""></div><div class="br"><img src="img/182870022195704_y.jpg" alt=""></div><div><img src="img/2016080422191191483.jpg" alt=""></div><div><img src="img/169350015361068_y.jpg" alt=""></div><div><img src="img/169350015361068_y.jpg" alt=""></div><div class="br"><img src="img/169350015361068_y.jpg" alt=""></div></div>`; }
    // --- Sport 模块模板 (保持不变) ---
    function getSportHtml0() { return `<div class="fl"><ul><li><a href="#">休闲鞋</a></li><li><a href="#">跑鞋</a></li><li><a href="#">篮球鞋</a></li><li><a href="#">运动服</a></li><li><a href="#">健身器材</a></li><li><a href="#">运动配件</a></li><li><a href="#">瑜伽垫</a></li><li><a href="#">羽毛球</a></li><li><a href="#">全部分类></a></li></ul></div><div class="fr clearfix"><div class="banner"><img src="img/160801-12909pc-B1.jpg" alt=""><span></span><span></span><ul><li></li><li></li><li></li><li class="lion"></li></ul></div><div><img src="img/160801-17862pc-C.jpg" alt=""></div><div><img src="img/160801-17862pc-C.jpg" alt=""></div><div class="br"><img src="img/160801-17862pc-C.jpg" alt=""></div><div><img src="img/2016080422191191483.jpg" alt=""></div><div><img src="img/160729-12609pc-D.jpg" alt=""></div><div><img src="img/160729-12609pc-D.jpg" alt=""></div><div class="br"><img src="img/160729-12609pc-D.jpg" alt=""></div></div>`; }
    function getSportHtml1() { return `<div class="fl"><ul><li><a href="#">户外服饰</a></li><li><a href="#">登山鞋</a></li><li><a href="#">徒步背包</a></li><li><a href="#">帐篷</a></li><li><a href="#">睡袋</a></li><li><a href="#">冲锋衣</a></li><li><a href="#">骑行装备</a></li><li><a href="#">全部分类></a></li></ul></div><div class="fr clearfix"><div class="banner"><img src="img/121440017773720_1_o.jpg" alt=""><span></span><span></span><ul><li></li><li></li><li></li><li class="lion"></li></ul></div><div><img src="img/160801-17862pc-C.jpg" alt=""></div><div><img src="img/160801-17862pc-C.jpg" alt=""></div><div class="br"><img src="img/160801-17862pc-C.jpg" alt=""></div><div><img src="img/2016080422191191483.jpg" alt=""></div><div><img src="img/160729-12609pc-D.jpg" alt=""></div><div><img src="img/160729-12609pc-D.jpg" alt=""></div><div class="br"><img src="img/160729-12609pc-D.jpg" alt=""></div></div>`; }
    function getSportHtml2() { return `<div class="fl"><ul><li><a href="#">女包</a></li><li><a href="#">防晒品</a></li><li><a href="#">短裤</a></li><li><a href="#">冰丝内裤</a></li><li><a href="#">男包</a></li><li><a href="#">功能箱包</a></li><li><a href="#">蕾丝衬衫</a></li><li><a href="#">奢侈品</a></li><li><a href="#">男鞋</a></li><li><a href="#">女包</a></li><li><a href="#">女鞋</a></li><li><a href="#">全部分类></a></li></ul></div><div class="fr clearfix"><div class="banner"><img src="img/160801-12909pc-B1.jpg" alt=""><span></span><span></span><ul><li></li><li></li><li></li><li class="lion"></li></ul></div><div><img src="img/160801-17862pc-C.jpg" alt=""></div><div><img src="img/160801-17862pc-C.jpg" alt=""></div><div class="br"><img src="img/160801-17862pc-C.jpg" alt=""></div><div><img src="img/2016080422191191483.jpg" alt=""></div><div><img src="img/160729-12609pc-D.jpg" alt=""></div><div><img src="img/160729-12609pc-D.jpg" alt=""></div><div class="br"><img src="img/160729-12609pc-D.jpg" alt=""></div></div>`; }
    // --- Garments 模块模板 (保持不变) ---
    function getGarmentsHtml0() { return `<div class="fl"><ul><li><a href="#">童鞋新品</a></li><li><a href="#">学步鞋</a></li><li><a href="#">运动童鞋</a></li><li><a href="#">帆布鞋</a></li><li><a href="#">凉鞋</a></li><li><a href="#">儿童皮鞋</a></li><li><a href="#">全部分类></a></li></ul></div><div class="fr clearfix"><div class="banner"><img src="img/a_ban_383-340.jpg" alt=""><span></span><span></span><ul><li></li><li></li><li></li><li class="lion"></li></ul></div><div><img src="img/55260017675581_y.jpg" alt=""></div><div><img src="img/55260017675581_y.jpg" alt=""></div><div class="br"><img src="img/55260017675581_y.jpg" alt=""></div><div><img src="img/2016080422191191483.jpg" alt=""></div><div><img src="img/99999990000357083.jpg" alt=""></div><div><img src="img/99999990000357083.jpg" alt=""></div><div class="br"><img src="img/99999990000357083.jpg" alt=""></div></div>`; }
    function getGarmentsHtml1() { return `<div class="fl"><ul><li><a href="#">新生儿礼盒</a></li><li><a href="#">婴儿连体衣</a></li><li><a href="#">内衣裤</a></li><li><a href="#">爬服/哈衣</a></li><li><a href="#">婴儿鞋袜</a></li><li><a href="#">口水巾</a></li><li><a href="#">全部分类></a></li></ul></div><div class="fr clearfix"><div class="banner"><img src="img/187720017020448_1_o.jpg" alt=""><span></span><span></span><ul><li></li><li></li><li></li><li class="lion"></li></ul></div><div><img src="img/55260017675581_y.jpg" alt=""></div><div><img src="img/55260017675581_y.jpg" alt=""></div><div class="br"><img src="img/55260017675581_y.jpg" alt=""></div><div><img src="img/2016080422191191483.jpg" alt=""></div><div><img src="img/99999990000357083.jpg" alt=""></div><div><img src="img/99999990000357083.jpg" alt=""></div><div class="br"><img src="img/99999990000357083.jpg" alt=""></div></div>`; }
    function getGarmentsHtml2() { return `<div class="fl"><ul><li><a href="#">女包</a></li><li><a href="#">防晒品</a></li><li><a href="#">短裤</a></li><li><a href="#">冰丝内裤</a></li><li><a href="#">男包</a></li><li><a href="#">功能箱包</a></li><li><a href="#">蕾丝衬衫</a></li><li><a href="#">奢侈品</a></li><li><a href="#">男鞋</a></li><li><a href="#">女包</a></li><li><a href="#">女鞋</a></li><li><a href="#">全部分类></a></li></ul></div><div class="fr clearfix"><div class="banner"><img src="img/86030026281665_y.jpg" alt=""><span></span><span></span><ul><li></li><li></li><li></li><li class="lion"></li></ul></div><div><img src="img/55260017675581_y.jpg" alt=""></div><div><img src="img/55260017675581_y.jpg" alt=""></div><div class="br"><img src="img/55260017675581_y.jpg" alt=""></div><div><img src="img/2016080422191191483.jpg" alt=""></div><div><img src="img/99999990000357083.jpg" alt=""></div><div><img src="img/99999990000357083.jpg" alt=""></div><div class="br"><img src="img/99999990000357083.jpg" alt=""></div></div>`; }

    // --- Goods 模块模板 (使用原始占位图路径) ---
    function getGoodsHtml0() {
        return `
            <div class="divMr"><img src="img/60108119-1_l_1.jpg" alt=""><p>Pigeon法国制奶嘴，无 毒天然乳胶</p><span>￥:189</span><p>已有<span>988</span>条评价</p></div>
            <div class="divMr"><img src="img/60108119-1_l_1.jpg" alt=""><p>Pigeon法国制奶嘴，无 毒天然乳胶</p><span>￥:189</span><p>已有<span>988</span>条评价</p></div>
            <div class="divMr"><img src="img/60108119-1_l_1.jpg" alt=""><p>Pigeon法国制奶嘴，无 毒天然乳胶</p><span>￥:189</span><p>已有<span>988</span>条评价</p></div>
            <div class="divMr"><img src="img/60108119-1_l_1.jpg" alt=""><p>Pigeon法国制奶嘴，无 毒天然乳胶</p><span>￥:189</span><p>已有<span>988</span>条评价</p></div>
            <div><img src="img/60108119-1_l_1.jpg" alt=""><p>Pigeon法国制奶嘴，无 毒天然乳胶</p><span>￥:189</span><p>已有<span>988</span>条评价</p></div>
            <div class="divMr divMt"><img src="img/60108119-1_l_1.jpg" alt=""><p>Pigeon法国制奶嘴，无 毒天然乳胶</p><span>￥:189</span><p>已有<span>988</span>条评价</p></div>
            <div class="divMr divMt"><img src="img/60108119-1_l_1.jpg" alt=""><p>Pigeon法国制奶嘴，无 毒天然乳胶</p><span>￥:189</span><p>已有<span>988</span>条评价</p></div>
            <div class="divMr divMt"><img src="img/60108119-1_l_1.jpg" alt=""><p>Pigeon法国制奶嘴，无 毒天然乳胶</p><span>￥:189</span><p>已有<span>988</span>条评价</p></div>
            <div class="divMr divMt"><img src="img/60108119-1_l_1.jpg" alt=""><p>Pigeon法国制奶嘴，无 毒天然乳胶</p><span>￥:189</span><p>已有<span>988</span>条评价</p></div>
            <div class="divMt"><img src="img/60108119-1_l_1.jpg" alt=""><p>Pigeon法国制奶嘴，无 毒天然乳胶</p><span>￥:189</span><p>已有<span>988</span>条评价</p></div>
        `;
    }

    function getGoodsHtml1() {
        return `
            <div class="divMr"><img src="img/60108119-1_l_1.jpg" alt=""><p>新品-电动牙刷</p><span>￥:399</span><p>已有<span>1200</span>条评价</p></div>
            <div class="divMr"><img src="img/60108119-1_l_1.jpg" alt=""><p>新品-智能手表</p><span>￥:899</span><p>已有<span>500</span>条评价</p></div>
            <div class="divMr"><img src="img/60108119-1_l_1.jpg" alt=""><p>新品-空气炸锅</p><span>￥:459</span><p>已有<span>1500</span>条评价</p></div>
            <div class="divMr"><img src="img/60108119-1_l_1.jpg" alt=""><p>新品-便携风扇</p><span>￥:59</span><p>已有<span>3000</span>条评价</p></div>
            <div><img src="img/60108119-1_l_1.jpg" alt=""><p>新品-车载支架</p><span>￥:69</span><p>已有<span>700</span>条评价</p></div>
            <div class="divMr divMt"><img src="img/60108119-1_l_1.jpg" alt=""><p>新品-蓝牙耳机</p><span>￥:199</span><p>已有<span>1800</span>条评价</p></div>
            <div class="divMr divMt"><img src="img/60108119-1_l_1.jpg" alt=""><p>新品-运动水杯</p><span>￥:89</span><p>已有<span>600</span>条评价</p></div>
            <div class="divMr divMt"><img src="img/60108119-1_l_1.jpg" alt=""><p>新品-数据线</p><span>￥:39</span><p>已有<span>4000</span>条评价</p></div>
            <div class="divMr divMt"><img src="img/60108119-1_l_1.jpg" alt=""><p>新品-键盘套装</p><span>￥:289</span><p>已有<span>900</span>条评价</p></div>
            <div class="divMt"><img src="img/60108119-1_l_1.jpg" alt=""><p>新品-护眼台灯</p><span>￥:159</span><p>已有<span>1100</span>条评价</p></div>
        `;
    }
};
// 顶部搜索框
$(document).scroll(function(){
    // 获取到顶部的距离
    var topDistance =$('html,body').scrollTop();
    // 判断
    if(topDistance>500){
        $('.top-search-box').slideDown()
    }else{
        $('.top-search-box').slideUp()
    }
})