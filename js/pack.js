
$(function () {
    class Utils {
        lenisInit() {
            const initSmoothScrolling = () => {
                this.lenis = new Lenis({
                    mouseMultiplier: 1.2,
                    smooth: true,
                    smoothTouch: false
                });
                const scrollFn = (time) => {
                    this.lenis.raf(time);
                    requestAnimationFrame(scrollFn);
                };
                requestAnimationFrame(scrollFn);
            };
            initSmoothScrolling();
        }
    }
    
    class App extends Utils {
        constructor() {
            super();
            this.init();
        }
    
        init() {
            this.lenisInit();
            this.definedAn();
        }
    
        definedAn() {
            let that = this;
            $('.l-morebox').hover(function () {
                let jttl = gsap.timeline({ paused: true });
                jttl.to($(this).find('svg.jt'), { xPercent: 100 })
                    .set($(this).find('svg.jt'), { xPercent: -100 })
                    .to($(this).find('svg.jt'), { xPercent: 0 });
                jttl.play();
            }, function () { });
    
            if ($('.index-title').length > 0) {
                let panels = gsap.utils.toArray(".index-title");
                panels.forEach((v, i) => {
                    let name = $(v).find('.name>*');
                    let nname = $(v).find('.nname>*');
                    gsap.from(name, {
                        xPercent: 100,
                        opacity: 0,
                        stagger: 0.05,
                        ease: 'power2.inOut',
                        scrollTrigger: {
                            trigger: v,
                            start: "top bottom",
                            toggleActions: "play resume resume reset"
                        }
                    });
                    gsap.from(nname, {
                        xPercent: 100,
                        opacity: 0,
                        stagger: 0.05,
                        ease: 'power2.inOut',
                        scrollTrigger: {
                            trigger: v,
                            start: "top bottom",
                            toggleActions: "play resume resume reset"
                        }
                    });
                });
            }
        }
    }
    
    const _app = new App();

    /* 全局公共属性 */
    let wH = window.innerHeight,
    wW = window.innerWidth,
    c = "active";


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


    

    // 导航
    function headNav() {
        // pc
        if ($(".header-pc").length) {
         
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

            // 下拉框导航


            $("#pcmenuBtn").click(function () {
                let c = "active";
                if (!$(this).hasClass(c)) {
                    $(this).addClass(c);

                    $("#pcHeaderBody").stop().slideDown(500);
                    // 关闭导航栏部分内容
                    $(".header-pc .header-wrap .header-right .menudown-show").css("display", "none");

                } else {
                    $("#pcHeaderBody").stop().slideUp(300);
                    $(this).removeClass(c);
                    $(".header-pc .header-wrap .header-right .menudown-show").css("display", "inline-flex");
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


    // 滚轮下滑--头部添加active
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

    // 窗口发生改变刷新页面
    var windoWidth = $(window).width();
    $(window).resize(function () {
        if (Math.abs($(this).width() - windoWidth) > 20) {
            window.location.href = "";
        }
    });
    
    //数字跳动
    $('.jump-num').countUp({
        delay: 5,
        time: 5000
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


    // 关于我们--弹窗
    $(document).on("click", "#video-pop", function () {
        $(".bullet_box").addClass('active');
    })
    $(document).on("click", ".bullet_box .close,.bullet_box", function () {
        $(".bullet_box").removeClass('active');
    });


    // 列表点击展开
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

    // a标签锚点平滑过渡
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top - 60 // 调整滚动位置以适应导航栏的高度
        }, 1000, function() {
            window.location.hash = target.selector;
        });
        }
    });
     

    // 文字过渡动画
	function aniText() {
		var PC = $(window).width() > 1200,
			mobile = $(window).width() <= 1200,
			winWidth = $(window).width(),
			winHeight = $(window).height();
		if (mobile) { }
		if (PC) {
			const textElements = gsap.utils.toArray('.ani-text-opacity');
			textElements.forEach(text => {
				gsap.to(text, {
					backgroundSize: '100%',
					ease: 'none',
					scrollTrigger: {
						trigger: text,
						start: 'center 80%',
						end: 'center 50%',
						scrub: true,
						// markers: {startColor: "red", endColor: "red", fontSize: "18px", fontWeight: "bold", indent: 20},
					},
				});
			});
		}
	}
	aniText();
   
            
    // 滚动加载入场动画 --开始
    
    // 判断元素出现在可视窗口的时候添加clsss  
    // 传参一： 需要出现在窗口的类名 
    // 传参二： 需要 
    // 传参二： 需要再窗口出现位置 取值范围 例如 0.5  就是 vh * 0.5  窗口的一半 
    // wowFun("svgBox1",0.5); 
    // let wH = window.innerHeight, wW = window.innerWidth, c = "active";
    function wowFun(a,b,c) {
        var box = $(a);
        if(c > 1 || c < 0 || c == 0) { c = 1 }
        if (box != "" || box != null) {
            box.each(function () {
                var  _this = $(this), topNum = _this.offset().top, scrollTop = $(window).scrollTop() + (wH * c), d = _this.attr("data-time");
                if(d == null || d == "undefined" || d == 0 ){ d = 0; }
                if (scrollTop > topNum) { setTimeout(function(){ _this.addClass(b); }, d)} else { _this.removeClass(b); }
                $(window).scroll(function () {
                    topNum = _this.offset().top, scrollTop = $(window).scrollTop() + (wH * c), scrollTop_wH = $(window).scrollTop() + wH;
                    if (scrollTop > topNum) { _this.addClass(b); _this.css({"animation-delay": d+"ms"}) } else if(scrollTop_wH < topNum || scrollTop_wH == topNum ) {  _this.removeClass(b);}
                });
            })
        }
    }
    wowFun(".s-animate", "fadeInLeft", 1);
    wowFun(".s-animate-up", "fadeInUp", 1);

    // 滚动加载入场动画 --结束


    
    



    // 解决方案
    function indexSolution() {
        var box = $('#idx_solution');
        var svg = '<svg width="28" height="28" style="transform: rotate(-90deg)"><circle id="progress" cx="14" cy="14" r="12" fill="transparent" stroke-width="1"  stroke="#fff" stroke-dasharray="314" stroke-dashoffset="314"/></svg>'


        if (box.length) {
            var slide = new Swiper('#idx_solution .center_box', {
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                
                effect: "fade",
                fadeEffect: {
                    crossFade: true //开启淡出。过渡时，原slide透明度从1->0（淡出），过渡中的slide透明度从0->1（淡入），其他slide透明度0。

                },
                preventLinksPropagation: false, // 阻止点击事件冒泡
                pagination: {
                    el: '#idx_solution .banner_sp',
                    clickable: true,
                },
                allowTouchMove: false,
                on: {
                    slideChangeTransitionStart: function () { //切换时分类也要改变状态
                        var d = this.activeIndex;
                        $(".idx_solve .swiper_box .topbox .swiper_list .item_box .item").eq(d).addClass("active").siblings().removeClass("active");

                    },
                    slideChange: function (mySwiper) {
                        $('.banner_sp span.swiper-pagination-bullet-active').html(svg).siblings().empty()
                    },
                },
            });

            $(".idx_solve .swiper_box .topbox .swiper_list .item_box .item").click(function () {
                var a = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                slide.slideTo($(this).index());
            });



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
                slidesPerView: 1,
                speed: 800,
                allowTouchMove: false,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true,
                },
                on: {
                    init() {
                        // swiperAnimateCache(this);
                        // swiperAnimate(this);
                    },
                    slideChangeTransitionEnd() {
                        swiperAnimate(this);
                    },
                },
            })
            num.each(function (e) {
                var _this = $(this),
                    swiper_img = _this.find('.swiper_img'),
                    swiper_text = _this.find('.swiper_text'),
                    pagination = _this.find('.idxPageHide'),
                    item = _this.find(".swiper_list  .item_box .item");
                var s1 = new Swiper(swiper_img, {
                    effect: 'fade',
                    slidesPerView: 1,
                    speed: 1200,
                    allowTouchMove: false,
                })
                var s2 = new Swiper(swiper_text, {
                    slidesPerView: 1,
                    speed: 800,
                    effect: 'fade',
                    // fadeEffect: {
                    //     crossFade: true,
                    // },
                    // pagination: { el: pagination, clickable: true, }, allowTouchMove: false,
                    breakpoints: {
                        768: {
                            allowTouchMove: true,
                        },
                    },
                    navigation: {
                        nextEl: '.pre-next-button .nextbtn',
                        prevEl: '.pre-next-button .prebtn',
                    },
                    on: {
                        init() {
                            // swiperAnimateCache(this);
                            // swiperAnimate(this);
                        },
                        // slideChangeTransitionEnd() {
                        //     swiperAnimateCache(this);
                        //     swiperAnimate(this);
                        // },
                        slideChangeTransitionStart: function () {
                            // swiperAnimateCache(this);
                            // swiperAnimate(this);
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

    // 解决方案列表
    function solutionList() {
        var slide = new Swiper('.solution-wrap .solutionlist', {
            loop:true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            
            // speed:1000,
            slidesPerView: 3.3,
            spaceBetween: 22,
            preventLinksPropagation: false, // 阻止点击事件冒泡
            pagination: {
                el: '#idx_solution .banner_sp',
                clickable: true,
            },
            allowTouchMove: false,
            
            breakpoints: {
                480: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                },
                990: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1280: {
                    
                    spaceBetween: 15,
                },
            },

        });
    }
    solutionList()
    // 关于我们--发展历程
    function development(){
        var mySwiper = new Swiper('.develoment-wrap .scrollcontent', {
            // loop : true,//可选选项，开启循环
            direction:"vertical",
            spaceBetween: 10,
            slidesPerView: 1.5,
            speed: 1000,
            breakpoints: {
                480: {
                    slidesPerView: 1,
                },
                990: {
                    slidesPerView: 1.8,
                },
                1280: {
                    slidesPerView: 2,
                },
            },
            pagination: {
                el: '.develoment-wrap .scrollcontent .swiper-pagination',
                clickable: true,
            },
            
        })
        $(".develoment-wrap .info .rightwrap .yeartab li").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            var index = $(this).index();
            mySwiper.slideTo(index)
        })
    }
    development();
    // 关于我们--发展历程线运动轨迹
   
    function idx_development() {
        var box = $(".develoment-wrap");
        var height = window.innerHeight + window.innerHeight / 5;
        if (box.length) {
            ScrollTrigger.create({
                trigger: box, start: "top 300px", end: "+=" + height, scrub: true,
                onUpdate: self => {
                    var idx = self.progress; 
                    if (idx > 0) { $(".develoment-wrap .svg_box").addClass("active"); } 
                    else { $(".develoment-wrap .svg_box").removeClass("active"); }
                }
            });
        }
	}
	idx_development();


    // 关于我们--合作伙伴1,2
    function cooperationOne() {
        var mySwiper = new Swiper('.cooperation-wrap .cooperate1', {
            // loop : true,//可选选项，开启循环
            slidesPerView: 5,
            spaceBetween: 20,
            allowTouchMove: false,
            speed: 8000,
            // autoplay:true,
            autoplay: {
                delay: 0,//自动播放间隔
                disableOnInteraction: false,//用户操作后是否停止自动播放
            },
            breakpoints: {
                768: {
                    slidesPerView: 4,
                },
                640: {
                    slidesPerView: 3,
                },
                480: {
                    slidesPerView: 2,
                },
            }
        })
    }
    cooperationOne();  
    function cooperationTwo() {
        var mySwiper = new Swiper('.cooperation-wrap .cooperate2', {
            // loop : true,//可选选项，开启循环
            slidesPerView: 5,
            spaceBetween: 20,
            allowTouchMove: false,
            speed: 8000,

            // autoplay:true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: {
                    slidesPerView: 4,
                },
                640: {
                    slidesPerView: 3,
                },
                480: {
                    slidesPerView: 2,
                },
            }
        })
    }
    cooperationTwo();
    

    // --------------------------------------------- 青绿解决方案详情--分选产物
    function solutionAdvantageList() {
        var slide = new Swiper('.sorting-products-wrap .innerbox', {
            loop:true,
            autoplay:true,
          
            slidesPerView: 4.4,
            spaceBetween: 22,
            preventLinksPropagation: false, // 阻止点击事件冒泡
            pagination: {
                el: '.sorting-products-wrap .swiper-pagination',
                clickable: true,
            },
            allowTouchMove: false,
            
            breakpoints: {
                480: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
               
                990: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1280: {
                    
                    spaceBetween: 15,
                },
            },

        });
    }
    solutionAdvantageList()

    // --------------------------------------------- 青绿解决方案详情--公司环境
    function companyEnviromentList() {
        var slide = new Swiper('.company-enviroment-wrap .solutionlist', {
            loop:true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            
            // speed:1000,
            slidesPerView: 2.24,
            spaceBetween: 32,
            preventLinksPropagation: false, // 阻止点击事件冒泡
            pagination: {
                el: '#idx_solution .banner_sp',
                clickable: true,
            },
            allowTouchMove: false,
            
            breakpoints: {
                480: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                
            },

        });
    }
    companyEnviromentList()

    // 青绿解决方案详情--表单
    
    $(".choose-btn").click(function () {
        $(this).find('img').toggleClass('active');

    });

    // --------------------------------------------- 青绿案例详情详情--项目亮点
    function projectHighlights() {
        var slide = new Swiper('.project-highlights .innerbox', {
            loop:true,
            autoplay:true,
            slidesPerView: 4.4,
            spaceBetween: 22,
            preventLinksPropagation: false, // 阻止点击事件冒泡
            pagination: {
                el: '.project-highlights .swiper-pagination',
                clickable: true,
            },
            // allowTouchMove: false,
            
            breakpoints: {
                480: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                990: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1280: {
                    
                    spaceBetween: 15,
                },
            },

        });
    }
    projectHighlights()
// --------------------------------------------- 青绿案例详情详情--采用设备
    // function equimentWrap(){
    //     var box = $('.equiment-wrap');
    //     var svg = '<svg width="28" height="28" style="transform: rotate(-90deg)"><circle id="progress" cx="14" cy="14" r="12" fill="transparent" stroke-width="1"  stroke="#333" stroke-dasharray="314" stroke-dashoffset="314"/></svg>'
    //     if (box.length) {
    //         var swiper1 = new Swiper('.equiment-wrap .firstcontainer', {
    //             autoplay: {
    //                 delay: 5000,
    //                 disableOnInteraction: false,
    //             },
    //             effect: "fade",
    //             fadeEffect: {
    //                 crossFade: true //开启淡出。过渡时，原slide透明度从1->0（淡出），过渡中的slide透明度从0->1（淡入），其他slide透明度0。

    //             },
    //             preventLinksPropagation: false, // 阻止点击事件冒泡
    //             pagination: {
    //                 el: '.equiment-wrap .banner_sp',
    //                 clickable: true,
    //             },
    //             allowTouchMove: false,
    //             on: {
                  
    //                 slideChangeTransitionStart: function () { //切换时分类也要改变状态
    //                     var d = this.activeIndex;
    //                     console.log("1d",d)

    //                 },
    //                 slideChange: function (mySwiper) {
    //                     $('.banner_sp span.swiper-pagination-bullet-active').html(svg).siblings().empty()
    //                 },
    //             },
    //         });

    //         var swiper2 = new Swiper(".equiment-wrap .leftitem", {
    //             autoplay: {
    //                 delay: 5000,
    //                 disableOnInteraction: false,
    //             },
    //             slidesPerView: 1,
    //             effect: 'fade',
    //             fadeEffect: {crossFade: true, },
    //             spaceBetween: 20,allowTouchMove: false,
                
                
    //         });
    //         console.log("swiper2",swiper2)
    //         // 内部轮播的点击事件
    //         $(".equiment-wrap .firstcontainer .innerbox .rightitem .caselist .item").click(function () {
    //             $(this).addClass('active').siblings().removeClass('active');
    //             var index  =  $(this).index();
    //             swiper2.slideTo(index);
    //         });

    //     }

    // }
    // equimentWrap();
    function checkType(data) {
        let res = ''
        if (typeof data === 'object' && Array.isArray(data)) { //检查 data 是否是一个数组。Array.isArray() 是一个全局函数，用于判断给定的值是否为数组。
          res = 'Array'
        } else if (typeof data === 'object' && !Array.isArray(data)) { //Array.isArray检查一个变量是否为数组
          res = 'Object'
        } else {
          res = ''
        }
        return res
    }
    function equimentWrap(){
        var swiper1ActiveIndex = 0 // 第一个轮播的索引
        var box = $('.equiment-wrap');
        var svg = '<svg width="28" height="28" style="transform: rotate(-90deg)"><circle id="progress" cx="14" cy="14" r="12" fill="transparent" stroke-width="1"  stroke="#333" stroke-dasharray="314" stroke-dashoffset="314"/></svg>'
        if (box.length) {
           
            var swiper1 = new Swiper('.equiment-wrap .firstcontainer', {
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                effect: "fade",
                fadeEffect: {
                    crossFade: true //开启淡出。过渡时，原slide透明度从1->0（淡出），过渡中的slide透明度从0->1（淡入），其他slide透明度0。
                },
                preventLinksPropagation: false, // 阻止点击事件冒泡
                pagination: {
                    el: '.equiment-wrap .banner_sp',
                    clickable: true,
                },
                allowTouchMove: false,
                on: {
                    slideChangeTransitionStart: function () { //切换时分类也要改变状态
                        var d = this.activeIndex;
                        console.log("1d",d)
                    },
                    slideChange: function (mySwiper) {
                        $('.banner_sp span.swiper-pagination-bullet-active').html(svg).siblings().empty()
                        // -----S ------
                        swiper1ActiveIndex = this.activeIndex
                        // -----E ------
                    },
                },
            });
            const swiper2 = new Swiper('.equiment-wrap .leftitem', {
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                slidesPerView: 1,
                effect: 'fade',
                fadeEffect: {crossFade: true, },
                spaceBetween: 20,allowTouchMove: false
            });
            
            // 内部轮播的点击事件
            $(".equiment-wrap .firstcontainer .innerbox .rightitem .caselist .item").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                var index  =  $(this).index();
                // swiper2.slideTo(index);
                console.log("swiper2",swiper2)
                // -----S ------
                if(checkType(swiper2) === 'Array') {
                    swiper2[swiper1ActiveIndex].slideTo(index)
                } else {
                    swiper2.slideTo(index)
                    
                }
                // -----E ------
            });

        }

    }
    equimentWrap();
   



    // --------------------------------------------- 新闻列表--新闻轮播
    function newsList(){
        var box = $('.newbanenr-wrap');
        var svg = '<svg width="28" height="28" style="transform: rotate(-90deg)"><circle id="progress" cx="14" cy="14" r="12" fill="transparent" stroke-width="1"  stroke="#25BB0F" stroke-dasharray="314" stroke-dashoffset="314"/></svg>'
        if (box.length) {
            var swiper1 = new Swiper('.newbanenr-wrap .innerbox', {
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                effect: "fade",
                fadeEffect: {
                    crossFade: true //开启淡出。过渡时，原slide透明度从1->0（淡出），过渡中的slide透明度从0->1（淡入），其他slide透明度0。

                },
                preventLinksPropagation: false, // 阻止点击事件冒泡
                pagination: {
                    el: '.newbanenr-wrap .banner_sp',
                    clickable: true,
                },
                allowTouchMove: false,
                on: {
                    slideChange: function (mySwiper) {
                        $('.banner_sp span.swiper-pagination-bullet-active').html(svg).siblings().empty()
                    },
                },
            });
        }
    }
    newsList();
})

// --------------------------------------------- 荣誉资质
$(".honor-qualification .honor-title li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    // 切换内容列表
    var index  =  $(this).index();
    $(".honor-qualification .honor-wrap .cardlist").eq(index).addClass("active").siblings().removeClass("active");

})
// --------------------------------------------- 新闻-荣誉资质
$(".conpany-news .honor-title li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    // 切换内容列表
    var index  =  $(this).index();
    $(".conpany-news .newswrap .new-list").eq(index).addClass("active").siblings().removeClass("active");

})


// --------------------------------------------- 产品详情-产品参数
function productParams() {
    var pSwiper1 = new Swiper('.product-params-wrap .innerbox .left-box .swiper-img', {
        slidesPerView: 1,
        speed: 800,
        allowTouchMove: false,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        on: {
            init() {
                // swiperAnimateCache(this);
                // swiperAnimate(this);
            },
            slideChangeTransitionEnd() {
                swiperAnimate(this);
            },
        },
        
    })
    var pSwiper2 = new Swiper('.product-params-wrap .innerbox .right-box .params-info', {
        slidesPerView: 1,
        speed: 800,
        allowTouchMove: false,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        on: {
            init() {
                // swiperAnimateCache(this);
                // swiperAnimate(this);
            },
            slideChangeTransitionEnd() {
                swiperAnimate(this);
            },
        },
        
    })



    $(".product-params-wrap .innerbox .right-box .params-title li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(this).index();
        pSwiper1.slideTo(index)
        pSwiper2.slideTo(index)

    })
}
productParams()

// --------------------------------------------- 产品详情-产品介绍
function productIntroduce() {
    var swiper = new Swiper('.product-introduce-wrap .swiperbox', {
        slidesPerView: 1,
        speed: 800,
        allowTouchMove: false,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        navigation: {
            nextEl: '.product-introduce-wrap .pre-next-button .nextbtn',
            prevEl: '.product-introduce-wrap .pre-next-button .prebtn',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

       
        
    })
}
productIntroduce()

// --------------------------------------------- 产品详情-应用场景
function applicationScenarios() {
    var box = $('#appl_scenarios');
    var svg = '<svg width="28" height="28" style="transform: rotate(-90deg)"><circle id="progress" cx="14" cy="14" r="12" fill="transparent" stroke-width="1"  stroke="#fff" stroke-dasharray="314" stroke-dashoffset="314"/></svg>'

    if (box.length) {
        var swiper = box.find(".swiper_box"),
            num = swiper.find(".center_box");
        var s1;
        var s0 = new Swiper(swiper, {
            slidesPerView: 1,
            speed: 800,
            allowTouchMove: false,
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            on: {
                slideChangeTransitionEnd() {
                    swiperAnimate(this);
                },
            },
        })
        num.each(function (e) {
            var _this = $(this),
                swiper_img = _this.find('.swiper_img'),
                pagination = _this.find('.idxPageHide'),
                item = _this.find(".swiper_list  .item_box .item");
            s1 = new Swiper(swiper_img, {
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                effect: 'fade',
                slidesPerView: 1,
                speed: 1200,
                allowTouchMove: false,
                pagination: {
                    el: '.banner_sp',
                    clickable: true,
                },
                on: {
                    slideChangeTransitionStart: function () { //切换时分类也要改变状态
                        var d = this.activeIndex;
                        $(".application-scenarios .appl_solve .center_box .right .swiper_list .item_box .item").eq(d).addClass("active").siblings().removeClass("active");

                    },
                    slideChange: function (mySwiper) {
                        $('.banner_sp span.swiper-pagination-bullet-active').html(svg).siblings().empty()
                    }
                },
            })
        })

        $(".application-scenarios .appl_solve .center_box .right .swiper_list .item_box .item").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            var index = $(this).index();
            s1.slideTo(index)
        })
    }
}
applicationScenarios();

// --------------------------------------------- 产品详情-产品亮点
function projectHighlights() {
    var slide = new Swiper('.product-highlights .innerbox', {
        loop:true,
        autoplay:true,
        slidesPerView: 3.4,
        preventLinksPropagation: false, // 阻止点击事件冒泡
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        allowTouchMove: false,
        breakpoints: {
            480: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            990: {
                slidesPerView: 3,
            },
        },

    });
}
projectHighlights()

// --------------------------------------------- 科技创新-- 研发中心
function searchCenterList() {
    var slide = new Swiper('.search-center-wrap .swiperimg', {
        loop : true,//可选选项，开启循环
        slidesPerView: 5,
        spaceBetween: 20,
        allowTouchMove: false,
        speed: 8000,
        // autoplay:true,
        autoplay: { delay: 0, disableOnInteraction: false, },
        breakpoints: {
            768: { slidesPerView: 4, },
            640: { slidesPerView: 3, },
            480: { slidesPerView: 2, },
        }
    });
}
searchCenterList()

// --------------------------------------------- 科技创新-- 自研设备
function developedEquipmentList() {
    var slide = new Swiper('.developed-equipment-wrap .itemlist', {
        loop:true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        
        // speed:1000,
        slidesPerView: 3.3,
        spaceBetween: 32,
        preventLinksPropagation: false, // 阻止点击事件冒泡
        
        // allowTouchMove: false,
        
        breakpoints: {
            480: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            
        },

    });
}
developedEquipmentList()


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

// 鼠标滚动图片上下位移


    

