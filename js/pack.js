$(function () {
   
    // 使用IE浏览器提示
    function hiUpgrade() {
        window.AESKey = '';
        // 判断浏览器是否支持placeholder属性
        function isSupportPlaceholder() {
            var input = document.createElement('input');
            return 'placeholder' in input;
        };
        //判断是否是IE浏览器，包括Edge浏览器
        function IEVersion() {
            //取得浏览器的userAgent字符串
            var userAgent = navigator.userAgent;
            //判断是否IE浏览器
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
            if (isIE) {
                // ie10及以下
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if (fIEVersion <= 10 || !isSupportPlaceholder()) {
                    return true;
                }
            } else if (!!window.ActiveXObject || "ActiveXObject" in window) {
                // ie11
                return true;
            } else {
                return false;
            }
        }
        var tpl = '<div id="hi-upgrade"><div class="hi-wrap"><p class="hi-title">无法正常浏览本网站！</p><div class="hi-close">继续浏览</div><div class="hi-text1"><p>1、您的浏览器版本过低，请升级您的浏览器。</p><p>2、如果您的浏览器是最新版本，请<span>切换到极速模式</span>访问。</p><p>3、您使用的是IE浏览器，请<span>使用主流浏览器</span>访问。</p></div><p class="hi-text2"><span>主流浏览器下载</span></p><ul class="hi-list"><li><a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank"><div class="hi-ico1"></div><p>谷歌浏览器</p></a></li><li><a href="http://www.firefox.com.cn/download/" target="_blank"><div class="hi-ico2"></div><p>火狐浏览器</p></a></li><li><a href="https://www.uc.cn" target="_blank"><div class="hi-ico3"></div><p>UC浏览器</p></a></li><li><a href="http://browser.360.cn" target="_blank"><div class="hi-ico4"></div><p>360浏览器</p></a></li><li><a href="https://browser.qq.com" target="_blank"><div class="hi-ico5"></div><p>QQ浏览器</p></a></li><li><a href="https://ie.sogou.com" target="_blank"><div class="hi-ico6"></div><p>搜狗浏览器</p></a></li></ul></div></div>';
        if (IEVersion()) {
            document.write(tpl);
        }
    }
    hiUpgrade();

    // 窗口发生改变刷新页面
    // var windoWidth = $(window).width();
    // $(window).resize(function () {
    //     if (Math.abs($(this).width() - windoWidth) > 20) {
    //         window.location.href = "";
    //     }
    // });


    
    // 导航
    function headNav() {
        // pc
        if ($(".header-pc").length) {
            
            // 触发白底
            // $("#header").mouseover(function () {
            //     $(this).addClass("active");
            //     console.log("111")
            // }).mouseleave(function () {
            //     $(this).removeClass("active");
            //     console.log("222")
            // })

            // 二级显示
            $(".header-pc .nav dl").mouseover(function () {
                // var i = $(this).index();
                $(".header-pc .nav dd").stop().slideUp(300);
                $(this).find("dd").stop().slideDown(300);
            });

            $(".header-pc .header-wrap .nav").mouseleave(function () {
                $(".header-pc .nav dd").stop().slideUp(300);
            });

            // 滑块
            var $nav_bor = $(".header .nav .bor");
            var $nav_a = $(".nav dl");
            var $on_a = $('.nav dt a.active');
            if ($on_a.length) {
                $nav_bor.css({
                    'width': $on_a.parents("dl").width() + 'px',
                    'left': $on_a.parents("dl").position().left
                });

                $nav_a.mouseover(function () {

                    $nav_bor.stop().animate({
                        'width': $(this).innerWidth() + 'px',
                        'left': $(this).position().left
                    });

                });
                $(".nav").mouseleave(function () {
                    // console.log($on_a.p)
                    $nav_bor.stop().animate({
                        'width': $on_a.parents("dl").width() + 'px',
                        'left': $on_a.parents("dl").position().left
                    });
                });
            }

            // 下拉框
            
            
            $("#menuBtn").click(function () {
                let c = "active";
                if (!$(this).hasClass(c)) {
                    $(this).addClass(c);
                    
                    $("#pcHeaderBody").stop().slideDown(500);
                    // 关闭导航栏部分内容
                    $(".header-pc .header-wrap .header-right .menudown-show").css("display","none");
                  
                } else {
                    $("#pcHeaderBody").stop().slideUp(300);
                    $(this).removeClass(c);
                    $(".header-pc .header-wrap .header-right .menudown-show").css("display","inline-flex");
                }
            });
        }

        // 返回顶部
        if ($(".backToTopBtn").length) {
            var btnTop = document.getElementById('backToTopBtn');
            btnTop.addEventListener('click', function () {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // 手机
        if ($(".m_header_box").length) {
            function mHeaderBox() {
                let c = "active";
                let mHeader = $('#mHeader'),
                    title = mHeader.children('#mHeaderTitle'),
                    btn = title.find('#menuBtn'),
                    body = mHeader.children('#mHeaderBody'),
                    nav = body.find('#menuNav');
                btn.click(function () {
                    if (!$(this).hasClass(c)) {
                        $(this).addClass(c);
                        body.stop().slideDown(500);
                    } else {
                        body.stop().slideUp(300);
                        $(this).removeClass(c);
                    }
                });
                let li = nav.children().children();
                li.find('.one.active').siblings().show();
                li.find('ul').siblings('.one').addClass('is_active')
                li.find('ul').siblings('a').attr('href', 'javascript:;');
                li.find('ul').siblings().click(function () {
                    $(this).siblings().stop().slideToggle(300).parent().siblings().children('.active').siblings().stop().slideUp(300);
                    $(this).toggleClass(c).parent().siblings().children('.active').removeClass(c);
                });
            }
            mHeaderBox();
        }
    }
    headNav();


    // 滚轮下滑
    $(window).scroll(function () {
        headInit();
    })

    function headInit() {
        var t = $(window).scrollTop();
        if (t >= 100) {
            $(".header-pc").addClass("pc-active")
        } else {
            $(".header-pc").removeClass("pc-active")
        }
    }
    headInit();


    //数字跳动
    $('.jump-num').countUp({
        delay: 5,
        time: 800
    });
    // 返回顶部
    $(document).ready(function () {
        if ($("#to-top").length) {
            var btnTop = document.getElementById('to-top');
            btnTop.addEventListener('click', function () {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    })
    
    

    // 点击展开
    function tabUl() {
        $(".tab-ul ul li:eq(0)").addClass("active");
        $(".tab-ul ul li:eq(0) .bom").slideToggle();
        $(".tab-ul ul").on("click", 'li .top', function () {
            var dd = $(this).next();
            var li = $(this).parent();
            var other = li.siblings();
            var otherDd = other.find(".bom");
            li.toggleClass("active");
            dd.slideToggle();
            other.removeClass("active");
            otherDd.slideUp();
        })
    }
    tabUl();

    // 可视化数据滚动
    function visualData(obj) {
        $(window).load(function () {
            obj.each(function () {
                var h = Number($(this).html());
                var t = "";
                var n = Math.ceil(h / 20);
                var a = true;
                var This = $(this);
                if ($(this).length != 0) {
                    t = $(this).offset().top;
                }
                This.html(0);
                fn1();
                $(window).scroll(function () {
                    fn1();
                });

                function fn1() {
                    var wT = $(window).scrollTop();
                    if (wT > t - $(window).height() + 50 && wT < t - 50 && a == true) {
                        a = false;
                        var y = 0;
                        var timer2 = setInterval(function () {
                            if (y >= h) {
                                y = h;
                                clearInterval(timer2);
                            }
                            This.html(y);
                            y += n;
                        }, 100);
                    }
                }
            });
        });
    }
    visualData($(".num-move"));



   

    // 首页-banner
    function indexSlide() {
        var slide = new Swiper('.indexbanner .bannerbox', {
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            speed: 900,
            effect: 'fade',
            
            // loop: true,
            watchOverflow: true, //因为仅有1个slide，swiper无效
            preventLinksPropagation: false, // 阻止点击事件冒泡
            navigation: {
                nextEl: '.indexbanner .bannerbox .swiper-button-next',
                prevEl: '.indexbanner .bannerbox .swiper-button-prev',
            },
            pagination: {
                el: '.indexbanner .bannerbox .swiper-pagination',
                clickable: true,
            },
        });
    }
    indexSlide();


    

    

    // 青绿环境 -banner
    function indexbanner() {
        var slide = new Swiper('.index-environment-banner .bannerbox', {
            autoplay:true,
            speed: 1000,
            effect: 'fade',
            
            // loop: true,
            watchOverflow: true, //因为仅有1个slide，swiper无效
            preventLinksPropagation: false, // 阻止点击事件冒泡
            navigation: {
                nextEl: '.index-environment-banner .bannerbox .swiper-button-next',
                prevEl: '.index-environment-banner .bannerbox .swiper-button-prev',
            },
            pagination: {
                el: '.index-environment-banner .bannerbox .swiper-pagination',
                clickable: true,
            },
        });
    }
    indexbanner(); 
    // 解决方案
    function indexSolution() {
        var box = $('#idx_solution');
        if (box.length) {
            var swiper = box.find(".swiper_box"), 
            num = swiper.find(".center_box");
            var s0 = new Swiper(swiper, {
                slidesPerView: 1, speed: 800, allowTouchMove: false,
                effect: 'fade', fadeEffect: { crossFade: true, },
                on: {
                    init() { swiperAnimateCache(this); swiperAnimate(this); },
                    slideChangeTransitionEnd() { swiperAnimate(this); },
                },
            })
            num.each(function (e) {
                var _this = $(this), swiper_img = _this.find('.swiper_img'), swiper_text = _this.find('.swiper_text'), pagination = _this.find('.idxPageHide'), item = _this.find(".swiper_list  .item_box .item");
                var s1 = new Swiper(swiper_img, {
                    slidesPerView: 1, speed: 1200,
                    allowTouchMove: false,
                })
                var s2 = new Swiper(swiper_text, {
                    slidesPerView: 1, speed: 800,
                    effect: 'fade', fadeEffect: { crossFade: true, },
                    pagination: { el: pagination, clickable: true, }, allowTouchMove: false,
                    breakpoints: {
                        768: { allowTouchMove: true, },
                    },
                    on: {
                        init() { swiperAnimateCache(this); swiperAnimate(this); },
                        slideChangeTransitionEnd() { swiperAnimate(this); },
                        slideChangeTransitionStart: function () {
                            var index = this.activeIndex;
                            s1.slideTo(index)
                            item.removeClass("active").eq(index).addClass("active");
                        },
                    },
                })
                item.click(function () {
                    var index = $(this).index();
                    s2.slideTo(index)
                })
                $(".idx_solve .swiper_box .topbox .swiper_list .item_box .item").click(function () {
                    
                    $(this).addClass("active").siblings().removeClass("active");
                    var index = $(this).index();
                    s2.slideTo(index)
                })
            })
    
          
            
        }
    }
    indexSolution();
    // 首页- 客户案例
	function idx_case() {
        var box = $('#idx_solve');
        if (box.length) {
            var swiper = box.find(".swiper_box"), 
            num = swiper.find(".center_box");
            var s0 = new Swiper(swiper, {
                slidesPerView: 1, speed: 800, allowTouchMove: false,
                effect: 'fade', fadeEffect: { crossFade: true, },
                on: {
                    init() { swiperAnimateCache(this); swiperAnimate(this); },
                    slideChangeTransitionEnd() { swiperAnimate(this); },
                },
            })
            num.each(function (e) {
                var _this = $(this), swiper_img = _this.find('.swiper_img'), swiper_text = _this.find('.swiper_text'), pagination = _this.find('.idxPageHide'), item = _this.find(".swiper_list  .item_box .item");
                var s1 = new Swiper(swiper_img, {
                    effect: 'fade',
                    slidesPerView: 1, speed: 1200,
                    allowTouchMove: false,
                })
                var s2 = new Swiper(swiper_text, {
                    slidesPerView: 1, speed: 800,
                    effect: 'fade', fadeEffect: { crossFade: true, },
                    pagination: { el: pagination, clickable: true, }, allowTouchMove: false,
                    breakpoints: {
                        768: { allowTouchMove: true, },
                    },
                    navigation: {
                        nextEl: '.pre-next-button .nextbtn',
                        prevEl: '.pre-next-button .prebtn',
                    },
                    on: {
                        init() { swiperAnimateCache(this); swiperAnimate(this); },
                        slideChangeTransitionEnd() { swiperAnimate(this); },
                        slideChangeTransitionStart: function () {
                            var index = this.activeIndex;
                            s1.slideTo(index)
                            item.removeClass("active").eq(index).addClass("active");
                        },
                    },
                    

                })
                item.click(function () {
                    var index = $(this).index();
                    s2.slideTo(index)
                })
            })
    
            
            $(".idx_solve .idx_title .item_box .item").click(function () {
                $(this).addClass("active").siblings().removeClass("active");
                var index = $(this).index();
                s0.slideTo(index)
            })
        }
    }
    idx_case();
})



// 鼠标跟随
function imousehover(obj, obj2) {
    // 鼠标跟随效果
    const isPad =
        navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2 &&
        /MacIntel/.test(navigator.platform);

    class CustomCursor {
        constructor(hoverItems) {
            this.cursor = obj;
            this.cursorInner = $(".inner", this.cursor);
            this.pageX = 0;
            this.pageY = 0;
            this.move = true;
            this.hoverItems = hoverItems;
        }

        init() {
            if (this.cursor[0]) {
                this.initCursor();
                this.initHovers();
                this.initMove();
            }
        }

        initCursor() {
            this.pageX = $(window).width() / 2 - 50;
            this.pageY = $(window).height() / 2 - 50;
            $(document).on("mousemove", (e) => {
                this.pageX = e.clientX;
                this.pageY = e.clientY;
            });
            const render = () => {
                if (this.move) {
                    window.TweenMax.to(this.cursor, 0.5, {
                        x: this.pageX,
                        y: this.pageY,
                        ease: "Power1.easeOut",
                    });
                }
                requestAnimationFrame(render);
            };
            render();
        }

        initHovers() {
            const handleMouseEnter = (e) => {
                window.TweenMax.to(this.cursor, 0.5, {
                    scale: 1,
                    opacity: 1,
                    ease: "Power1.easeOut",
                });
                e.stopPropagation();
            };
            const handleMouseLeave = () => {
                window.TweenMax.to(this.cursor, 0.5, {
                    scale: 0,
                    opacity: 0,
                    ease: "Power1.easeOut",
                });

                // this.cursor.removeClass(function (i, v) {return v.replace('cursor', '');});
            };
            this.hoverItems.each(function (i, item) {
                $(item).on("mouseenter", handleMouseEnter);
                $(item).on("mouseleave", handleMouseLeave);
            });
        }
        initMove() {
            const handleMouseMove = (e) => {
                if ($(e.target).closest('.owl-nav')[0]) {
                    this.initCircle(e.target, "[class*='owl-']");
                } else if ($(e.target).closest('.searchOnOff')[0]) {
                    this.initCircle(e.target, ".searchOnOff");
                } else {
                    window.TweenMax.to(this.cursor, 0.5, {
                        scale: 1,
                        // background: 'yellow',
                        ease: "Power1.easeOut",
                    });
                    window.TweenMax.to(this.cursorInner, 0.5, {
                        opacity: 1,
                        ease: "Power1.easeOut",
                    });
                    this.move = true;
                }
                if ($(e.currentTarget).hasClass('ff_topSlider') || $(e.currentTarget).parents('.mlist.project')[0]) {
                    // const sxPos = (e.clientX / window.innerWidth) * 200 - 100;
                    // this.cursor.toggleClass("next", sxPos > 0);
                    this.cursor.addClass('more');
                } else if ($(e.currentTarget).hasClass('videom') || $(e.currentTarget).parents('.bodyvideom')[0]) {
                    this.cursor.addClass('play');
                } else if ($(e.currentTarget).parents('.team_tabs')[0]) {
                    this.cursor.addClass('drag');
                } else if ($(e.currentTarget).hasClass('post-next')) {
                    this.cursor.addClass('next');
                }
            };

            this.hoverItems.each(function (i, item) {
                $(item).on("mousemove", item, handleMouseMove);
            });
        }
        initCircle(target, elm) {
            var _sTop = $(window).scrollTop();
            var _offset = Math.min($(target).closest(elm).outerWidth(), $(target).closest(elm).outerHeight());
            var _x = Math.round($(target).closest(elm).offset().left + _offset / 2);
            var _y = Math.round($(target).closest(elm).offset().top + _offset / 2 - _sTop);
            this.move = false;
            window.TweenMax.to(this.cursor, 0.5, {
                scale: 0.5,
                x: _x,
                y: _y,
                background: 'rgba(255,255,255,0)',
                ease: "Power1.easeOut",
            });
            window.TweenMax.to(this.cursorInner, 0.5, {
                opacity: 0,
                ease: "Power1.easeOut",
            });
        }
    }

    if (!isPad) {
        // $('body').append('<div class="cursor"><div class="inner">More</div></div>');
        const cursor = new CustomCursor(obj2);
        cursor.init();
    }
}