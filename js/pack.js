$(function () {
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


    setTimeout(function () {
        const MathUtils = {
            // map number x from range [a, b] to [c, d]
            map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
            // linear interpolation
            lerp: (a, b, n) => (1 - n) * a + n * b
        };
        const clamp = (min, max) => (value) =>
            value < min ? min : value > max ? max : value;
        const vertex_img = `uniform float time;
        uniform float progress;
        uniform vec4 resolution;
        varying vec2 vUv;
        uniform sampler2D texture1;
        
        const float pi = 3.1415925;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
        }
        `;
        const fragment_img = `uniform float time;
        uniform float progress;
        uniform sampler2D texture1;
        uniform vec4 resolution;
        varying vec2 vUv;
        
        
        void main(){
        vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
        // newUV.x += 0.02*sin(newUV.y*20. + time);
        gl_FragColor = texture2D(texture1,newUV);
        }`;
        const postFragemt = `uniform float time;
        uniform float progress;
        uniform sampler2D tDiffuse;
        uniform vec2 resolution;
        varying vec2 vUv;
        uniform vec2 uMouse;
        uniform float uVelo;
        uniform int uType;
        
        
        \tfloat circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
        \t\tuv -= disc_center;
        \t\tuv*=resolution;
        \t\tfloat dist = sqrt(dot(uv, uv));
        \t\treturn smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
        \t}
        
        \tfloat map(float value, float min1, float max1, float min2, float max2) {
        \t\treturn min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        \t}
        
        \tfloat remap(float value, float inMin, float inMax, float outMin, float outMax) {
        \t\treturn outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
        \t}
        
        \tfloat hash12(vec2 p) {
        \t\tfloat h = dot(p,vec2(127.1,311.7));\t
        \t\treturn fract(sin(h)*43758.5453123);
        \t}
        
        \t// #define HASHSCALE3 vec3(.1031, .1030, .0973)
        \tvec2 hash2d(vec2 p)
        \t{
        \t\tvec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
        \t    p3 += dot(p3, p3.yzx+19.19);
        \t    return fract((p3.xx+p3.yz)*p3.zy);
        \t}
        void main()\t{
        \tvec2 newUV = vUv;
        \tvec4 color = vec4(1.,0.,0.,1.);
        \t
        \t// colorful
        \tif(uType==0){
        \t\tfloat c = circle(newUV, uMouse, 0.0, 0.2);
        \t\tfloat r = texture2D(tDiffuse, newUV.xy += c * (uVelo * .5)).x;
        \t\tfloat g = texture2D(tDiffuse, newUV.xy += c * (uVelo * .525)).y;
        \t\tfloat b = texture2D(tDiffuse, newUV.xy += c * (uVelo * .55)).z;
        \t\tcolor = vec4(r, g, b, 1.);
        \t}
        \t// zoom
        \tif(uType==1){
        \t\tfloat c = circle(newUV, uMouse, 0.0, 0.1+uVelo*2.)*70.*uVelo;
        \t\tvec2 offsetVector = normalize(uMouse - vUv);
        \t\tvec2 warpedUV = mix(vUv, uMouse, c * 0.29); //power
        \t\tcolor = texture2D(tDiffuse,warpedUV) + texture2D(tDiffuse,warpedUV)*vec4(vec3(c),1.);
        \t}
        \t// zoom
        \tif(uType==2){
        \t\tfloat hash = hash12(vUv*10.);
        \t\t// float c = -circle(newUV, uMouse, 0.0, 0.1+uVelo*2.)*20.*uVelo;
        \t\t// vec2 offsetVector = -normalize(uMouse - vUv);
        \t\t// vec2 warpedUV = mix(vUv, uMouse, c * 0.6); //power
        \t\t// vec2 warpedUV1 = mix(vUv, uMouse, c * 0.3); //power
        \t\t// vec2 warpedUV2 = mix(vUv, uMouse, c * 0.1); //power
        \t\t// color = vec4(
        \t\t// \ttexture2D(tDiffuse,warpedUV ).r,
        \t\t// \ttexture2D(tDiffuse,warpedUV1 ).g,
        \t\t// \ttexture2D(tDiffuse,warpedUV2 ).b,
        \t\t// \t1.);
        \t\t// color = vec4(,0.,0.,1.);
        \t\tfloat c = circle(newUV, uMouse, 0.0, 0.1+uVelo*0.01)*10.*uVelo;
        \t\tvec2 offsetVector = normalize(uMouse - vUv);
        \t\t// vec2 warpedUV = mix(vUv, uMouse,  20.*hash*c); //power
        \t\tvec2 warpedUV = vUv + vec2(hash - 0.5)*c; //power
        \t\tcolor = texture2D(tDiffuse,warpedUV) + texture2D(tDiffuse,warpedUV)*vec4(vec3(c),1.);
        \t}
        \tgl_FragColor = color;
        }`
    
        //base
        class Zhcool {
            constructor(child = null) {
                this.body = document.body;
                this.version = this.getVersion(); //浏览器版本
                this.shu = window.matchMedia("(orientation: portrait)").matches; //竖屏
                this.support = {
                    animations: Modernizr.cssanimations
                }; //是否支持1，animations
                this.animEndEventNames = {
                    'WebkitAnimation': 'webkitAnimationEnd',
                    'OAnimation': 'oAnimationEnd',
                    'msAnimation': 'MSAnimationEnd',
                    'animation': 'animationend'
                };
                this.animEndEventName = this.animEndEventNames[Modernizr.prefixed('animation')];
                this.onEndAnimation = function (el, callback) { //动画所属元素，如果不支持animations回调函数。
                    var self = this;
                    var onEndCallbackFn = function (ev) {
                        if (self.support.animations) {
                            if (ev.target != this) return;
                            this.removeEventListener(self.animEndEventName, onEndCallbackFn);
                        }
                        if (callback && typeof callback === 'function') {
                            callback.call();
                        }
                    };
                    if (self.support.animations) {
                        el.addEventListener(self.animEndEventName, onEndCallbackFn);
                    } else {
                        onEndCallbackFn();
                    }
                };
                this.IMAGES = null;
                window.addEventListener("resize", this.calcWinsize.bind(this));
                this.calcWinsize();
                //滚动位置更新
                this.docScroll = window.pageYOffset || document.documentElement.scrollTop;
                this.cache = 0; //存储滚动位置
                this.distance = 0; //滚动偏移值
                this.IsPc();
                if (child === 'bannerSlider') {
                    this.storage();
                } else if (child === 'SmoothScroll') {
                    var op = window.location.hash,
                        hash_ = op.split('#')[1];
                    if (hash_) {
                        var top = this.getTop(document.querySelector('.' + hash_));
                        console.log(top);
                        $("html, body").animate({
                            scrollTop: top
                        }, 600);
                    }
                }
            }
    
            createScrollEvent() {
                window.addEventListener("scroll", this.getPageYScroll.bind(this));
            }
    
            //窗口宽高数据
            calcWinsize() {
                this.winsize = {
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            }
    
            getPageYScroll() {
                this.docScroll = window.pageYOffset || document.documentElement.scrollTop;
                this.distance = this.docScroll - this.cache;
                this.cache = this.docScroll;
                this.scrollChildFn();
            }
    
            //下级绑定滚动条
            scrollChildFn() {}
    
            // 获取浏览器版本
            getVersion() {
                var explorer = window.navigator.userAgent;
                if (explorer.indexOf("MSIE") >= 0 || explorer.indexOf("Trident") > 0) {
                    if (explorer.indexOf("MSIE 5") > 0 || explorer.indexOf("MSIE 6") > 0 || explorer.indexOf("MSIE 7") > 0 || explorer.indexOf("MSIE 8") > 0) {
                        return 'LowerIEVersion';
                    } else {
                        return 'EdgeOrTrident';
                    }
                } else if (explorer.indexOf("Maxthon") >= 0) {
                    return 'Maxthon';
                } else if (explorer.indexOf("Firefox") >= 0) {
                    return 'FireFox';
                } else if (explorer.indexOf("Chrome") >= 0) {
                    return 'Chrome';
                } else if (explorer.indexOf("Opera") >= 0) {
                    return 'Opera';
                } else if (explorer.indexOf("Safari") >= 0) {
                    return 'Safari';
                }
            }
    
            //判断是否为pc端
            IsPc() {
                var self = this;
                var userAgentInfo = navigator.userAgent;
                var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
                self.isPc = true;
                for (var v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) {
                        self.isPc = false;
                        break;
                    } else if (navigator.maxTouchPoints > 0) {
                        self.isPc = false;
                        break;
                    }
                }
                self.isAndroid = userAgentInfo.indexOf('Android') > -1 || userAgentInfo.indexOf('Adr') > -1; //android终端
                self.isiOS = !!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                return self.isPc;
            }
    
            extend() {
                // Variables
                var extended = {};
                var deep = false;
                var i = 0;
                var length = arguments.length;
                // Merge the object into the extended object
                var merge = function (obj) {
                    for (var prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            extended[prop] = obj[prop];
                        }
                    }
                };
                // Loop through each object and conduct a merge
                for (; i < length; i++) {
                    var obj = arguments[i];
                    merge(obj);
                }
                return extended;
            }
    
            //下级绑定逐帧动画
            raf() {
                this.render();
                requestAnimationFrame(this.raf.bind(this));
            }
    
            render() {}
    
            //获取元素距离顶部高度
            getTop(element) {
                var top;
                while (element.offsetTop === void 0) {
                    element = element.parentNode;
                }
                top = element.offsetTop;
                while (element = element.offsetParent) {
                    top += element.offsetTop;
                }
                return top;
            }
    
            //获取元素数据（长宽高）
            getRect(element) {
                return element.getBoundingClientRect();
            }
    
            //节流
            throttlePro(fn, delay, mustRunDelay) {
                var timer = null;
                var t_start;
                return function () {
                    var context = this,
                        args = arguments,
                        t_curr = +new Date();
                    clearTimeout(timer);
                    if (!t_start) {
                        t_start = t_curr;
                    }
                    if (t_curr - t_start >= mustRunDelay) {
                        fn.apply(context, args);
                        t_start = t_curr;
                    } else {
                        timer = setTimeout(function () {
                            fn.apply(context, args);
                        }, delay);
                    }
                };
            }
    
            on_(el) {
                el.addClass('on').siblings().removeClass('on');
            }
    
            storage() {
                var self = this,
                    stor = JSON.parse(sessionStorage.getItem('key')),
                    info = {
                        call: null
                    }; //对网站浏览次数存储
                if (stor == null) {
                    info.call = 1;
                    sessionStorage.setItem('key', JSON.stringify(info));
                } else {
                    info.call = stor.call + 1;
                    sessionStorage.setItem('key', JSON.stringify(info));
                }
            }
        }
    
        /*
        惯性滚动
        类：scr-el;
        params:
        data-direction="1"//1-横向；0-竖向（默认）
        */
        class UpdateTarget {
            constructor(parent) {
                this.el = parent.item;
                this.parent = parent.parent;
                this.first = true;
                this.rect = this.el.getBoundingClientRect();
                this.top = this.getTop(this.el, this.parent.DOM.direction);
                if (this.parent.DOM.direction === 1) {
                    this.parent.winsize.height = this.parent.winsize.width;
                }
                this.isVisible = (this.parent.docScroll + this.parent.winsize.height > this.top);
                this.abs = this.el.getAttribute('data-abs');
                this.renderedStyles = {
                    y: { //y轴位移
                        current: 0,
                        previous: 0,
                        speed: parseFloat(this.el.getAttribute('data-y') || 0),
                        ease: this.parent.settings.targetSpeed,
                    },
                    x: { //x轴位移
                        current: 0,
                        previous: 0,
                        speed: parseFloat(this.el.getAttribute('data-x') || 0),
                        ease: this.parent.settings.targetSpeed,
                    },
                    z: { //x轴位移
                        current: 0,
                        previous: 0,
                        speed: parseFloat(this.el.getAttribute('data-z') || 0),
                        ease: this.parent.settings.targetSpeed,
                    },
                    s: { //缩放
                        previous: 1,
                        current: 1,
                        ease: this.parent.settings.targetSpeed,
                        maxValue: parseFloat(this.el.getAttribute('data-s') || 1),
                        setValue: () => {
                            const maxValue = this.renderedStyles.s.maxValue;
                            const minValue = 1;
                            return Math.max(Math.min(MathUtils.map(this.top - this.parent.docScroll, this.parent.winsize.height, -1 * this.rect.height, minValue, maxValue), maxValue), minValue)
                        },
                        setMap: () => {
                            const maxValue = this.renderedStyles.s.maxValue;
                            const minValue = 1;
                            return MathUtils.map(Math.abs(this.parent.distance), 0, 400, minValue, maxValue);
                        }
                    },
                    rx: { //rotateX
                        current: 0,
                        previous: 0,
                        speed: parseFloat(this.el.getAttribute('data-rx') || 0),
                        ease: this.parent.settings.targetSpeed,
                    },
                    ry: { //rotateY
                        current: 0,
                        previous: 0,
                        speed: parseFloat(this.el.getAttribute('data-ry') || 0),
                        ease: this.parent.settings.targetSpeed,
                    },
                    rz: { //rotateX
                        current: 0,
                        previous: 0,
                        speed: parseFloat(this.el.getAttribute('data-rz') || 0),
                        ease: this.parent.settings.targetSpeed,
                    },
                    size: { //字体
                        previous: 1,
                        current: 1,
                        ease: this.parent.settings.targetSpeed,
                        maxValue: parseFloat(this.el.getAttribute('data-size') || 1),
                        setValue: () => {
                            const maxValue = this.renderedStyles.size.maxValue;
                            const minValue = 1;
                            return Math.max(Math.min(MathUtils.map(this.top - this.parent.docScroll, this.parent.winsize.height / 2, -1 * this.rect.height, minValue, maxValue), maxValue), minValue)
                        },
                    },
                }
                let options = {
                    root: null,
                    rootMargin: "0px 0px 0px 0px",
                    threshold: [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
                };
                this.observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        this.isVisible = entry.intersectionRatio > 0
                    });
                }, options);
                if (this.parent.DOM.direction === 0) {
                    this.observer.observe(this.el.parentNode);
                }
            }
    
            getVisible() {
                if (this.parent.DOM.direction === 0) {
                    return false;
                }
                this.isVisible = (this.parent.docScroll + this.parent.winsize.height - this.top > 0 && this.parent.docScroll - this.top < 0);
            }
    
            update() {
                for (const key in this.renderedStyles) {
                    if (key === "s" && this.renderedStyles[key].speed !== 0) {
                        this.renderedStyles[key].current = this.renderedStyles[key].setMap();
                        this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
                        //this.renderedStyles[key].previous = (this.renderedStyles[key].previous > this.renderedStyles[key].maxValue) ? this.renderedStyles[key].maxValue :this.renderedStyles[key].previous;
                    } else if (key === "size" && this.renderedStyles[key].speed !== 0) {
                        this.renderedStyles[key].current = this.renderedStyles[key].setValue();
                        this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
                    } else {
                        if (this.renderedStyles[key].speed !== 0) {
                            this.renderedStyles[key].current = (this.parent.docScroll - this.top + (this.parent.winsize.height - this.rect.height) / 2) * Number(this.parent.settings.targetPercentage) * Number(this.renderedStyles[key].speed);
                            if (this.first) {
                                this.renderedStyles[key].previous = this.renderedStyles[key].current;
                                this.first = false;
                            } else {
                                this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
                                if (this.abs) {
                                    this.renderedStyles[key].previous = (this.renderedStyles[key].previous > 0) ? this.renderedStyles[key].previous : 0;
                                }
                            }
                        }
                    }
                }
                this.layout();
            }
    
            layout() {
                if (this.renderedStyles.size.maxValue !== 1) {
                    this.el.style.fontSize = `${2 - this.renderedStyles.size.previous}rem`;
                }
                this.el.style.transform = `perspective(1200px) translate3D(${this.renderedStyles.x.previous}px,${this.renderedStyles.y.previous}px,${this.renderedStyles.z.previous}px) scaleY(${Math.abs(this.renderedStyles.s.previous)})`;
            }
    
            getTop(element, direction = 0) {
                if (direction === 0) {
                    var top;
                    while (element.offsetTop === void 0) {
                        element = element.parentNode;
                    }
                    top = element.offsetTop;
                    while (element = element.offsetParent) {
                        top += element.offsetTop;
                    }
                    return top;
                } else {
                    var left;
                    while (element.offsetLeft === void 0) {
                        element = element.parentNode;
                    }
                    left = element.offsetLeft;
                    while (element = element.offsetParent) {
                        left += element.offsetLeft;
                    }
                    return left;
                }
            }
    
            resize() {
                this.rect = this.el.getBoundingClientRect();
                this.top = this.getTop(this.el, this.parent.DOM.direction);
            }
        }
    
        class SmoothScroll extends Zhcool {
            constructor(opts) {
                super(name = "SmoothScroll");
                this.shouldRender = false;
                //<main> 元素
                this.opt = opts;
                this.Targets = [];
                this.items = [];
                this.timer = null;
                this.isPlaying = true;
                this.createScrollEvent();
                //存储Y轴值
                this.renderedStyles = {
                    translationY: {
                        previous: 0,
                        current: 0,
                        ease: 0.1,
                        setValue: () => this.docScroll
                    }
                };
            }
    
            init(options) {
                const defaults = {
                    wrapper: '#scrolly',
                    targets: '.scr-el',
                    targets_app: '.scr-app',
                    wrapperSpeed: 0.08,
                    targetSpeed: 0.1,
                    targetPercentage: 0.1,
                    callback: function () {}
                };
                this.settings = Object.assign(defaults, options || {});
                this.DOM = {
                    main: document.querySelector(this.settings.wrapper)
                };
                this.DOM.scrollable = this.DOM.main.querySelector("div[data-scroll]");
                this.DOM.direction = parseInt(this.DOM.scrollable.dataset.direction) || 0;
                this.targets = [];
                if (this.shu) {
                    document.querySelectorAll(this.settings.targets_app).forEach(item => this.targets.push(new UpdateTarget({
                        item: item,
                        parent: this
                    })));
                    this.scrollChildFn();
                } else {
                    document.querySelectorAll(this.settings.targets).forEach(item => this.targets.push(new UpdateTarget({
                        item: item,
                        parent: this
                    })));
                    this.render();
                }
            }
    
            scrollChildFn() {
                this.settings.callback(this.docScroll);
                for (const list of this.targets) {
                    list.getVisible();
                    if (list.isVisible) {
                        list.update();
                    }
                }
            }
        }
    
        /*
        滚动动画
        */
        class scrollTarget {
            constructor(option) {
                this.el = option.elem;
                this.parent = option.parent;
                this.toTop = option.top;
                this.active = false;
                this.isVisible = false;
                this.effect = this.el.getAttribute('data-effect') || 'fadeInUp';
                this.Tclass = this.el.getAttribute('data-Tclass') || 'go';
                this.init()
            }
    
            init() {
                let elem = this.el;
                this.isVisible = (this.parent.docScroll + this.parent.winsize.height > this.toTop);
                if (elem.classList.contains('father')) {
                    var children = elem.querySelectorAll(elem.getAttribute('data-child'));
                    var delay = parseFloat(elem.getAttribute('data-delay'));
                    [].slice.call(children).forEach(function (obj, index) {
                        obj.classList.add('animated');
                        if (obj.getAttribute('data-delay')) {
                            obj.style.animationDelay = obj.getAttribute('data-delay') + 's';
                        } else {
                            obj.style.animationDelay = delay * index + 's';
                        }
                    })
                } else if (elem.classList.contains('font-fadeIn')) {
                    this.fontEffect();
                } else if (this.el.classList.contains('classGo')) {} else {
                    elem.classList.add('animated');
                }
                if (this.isVisible) {
                    this.scrollShow();
                }
            }
    
            scroll_() {
                this.isVisible = (this.parent.docScroll + this.parent.winsize.height > this.toTop);
            }
    
            scrollShow() {
                let self = this;
                if (this.active) return false;
                if (this.el.classList.contains('father')) {
                    var children = this.el.querySelectorAll(this.el.getAttribute('data-child'));
                    [].slice.call(children).forEach(function (item) {
                        TweenMax.set(item, {
                            autoAlpha: 1,
                        });
                        if (item.getAttribute('data-effect')) {
                            item.classList.add(item.getAttribute('data-effect'));
                        } else {
                            item.classList.add(self.effect);
                        }
                    })
                } else if (this.el.classList.contains('font-fadeIn')) {
                    this.show(self.effect);
                } else if (this.el.classList.contains('classGo')) {
                    TweenMax.set(self.el, {
                        autoAlpha: 1
                    });
                    self.el.classList.add(self.Tclass);
                } else {
                    TweenMax.set(this.el, {
                        autoAlpha: 1
                    });
                    self.el.classList.add(self.effect);
                    self.el.style.animationDelay = self.el.getAttribute('data-delay') + 's';
                }
                this.active = !this.active;
            }
    
            scrollHide() {
                let self = this;
                if (!this.active) return false;
                if (this.el.classList.contains('father')) {
                    var children = this.el.querySelectorAll(this.el.getAttribute('data-child'));
                    [].slice.call(children).forEach(function (item) {
                        if (item.getAttribute('data-effect')) {
                            item.classList.remove(item.getAttribute('data-effect'));
                        } else {
                            item.classList.remove(self.effect);
                        }
                        TweenMax.to(item, 0.5, {
                            autoAlpha: 0
                        });
                    })
                } else if (this.el.classList.contains('font-fadeIn')) {
                    this.stop();
                } else if (this.el.classList.contains('classGo')) {
                    TweenMax.to(this.el, 0.5, {
                        autoAlpha: 0,
                        onComplete: function () {
                            self.el.classList.remove(self.Tclass);
                        }
                    });
                } else {
                    TweenMax.to(this.el, 0.5, {
                        autoAlpha: 0,
                        onComplete: function () {
                            self.el.classList.remove(self.effect);
                        }
                    });
                }
                this.active = !this.active;
            }
    
            fontEffect() {
                this.colNum = 1;
                this.el.classList.add('letter-effect');
                this.charming(this.el, 'letter');
                this.letters = [].slice.call(this.el.querySelectorAll('span'));
                this.lettersTotal = this.letters.length;
                this.effects = {
                    'fx1': {
                        in: {
                            duration: 700,
                            delay: function (el, index) {
                                return 100 + index * 50;
                            },
                            easing: 'easeOutCirc',
                            opacity: [0, 1],
                            translateX: function (el, index) {
                                return [(20 + index * 10), 0]
                            }
                        },
                        out: {
                            duration: 700,
                            delay: function (el, index) {
                                return index * 50;
                            },
                            easing: 'easeOutCirc',
                            opacity: [0, 1],
                            direction: 'reverse',
                            translateX: function (el, index) {
                                return [(20 + index * 10), 0]
                            }
                        }
                    },
                    'fx2': {
                        in: {
                            duration: 600,
                            delay: function (el, index) {
                                return index * 30;
                            },
                            easing: 'cubicBezier(0.38, 0, 0, 1)',
                            opacity: [0, 1],
                            translateY: function (el, index) {
                                return ['100%', '0%']
                            }
                        },
                        out: {
                            duration: 700,
                            delay: function (el, index) {
                                return index * 50;
                            },
                            easing: 'easeOutCirc',
                            opacity: [0, 1],
                            direction: 'reverse',
                            translateX: function (el, index) {
                                return [(20 + index * 10), 0]
                            }
                        }
                    },
                };
                this.tx = new TimelineMax();
            }
    
            charming(elem, cls) {
                var self = this,
                    array = elem.getAttribute('data-text').split('');
                elem.innerHTML = '';
                var Fragment = document.createDocumentFragment();
                array.forEach(function (item, i) {
                    var span = document.createElement("span");
                    var str = 'wordLine' + self.colNum;
                    if (item === '/') {
                        span = document.createElement("br");
                        self.colNum++;
                        self.shell.push(i);
                    } else {
                        span.classList.add(cls);
                        span.classList.add(str);
                        span.innerText = item;
                    }
                    Fragment.appendChild(span);
                });
                elem.appendChild(Fragment);
            }
    
            stop() {
                anime.remove(this.letters);
                this.letters.forEach(function (letter) {
                    letter.style.WebkitTransform = letter.style.transform = '';
                });
            }
    
            hide(effect, callback) {
                this.stop();
                this._animate('out', effect, callback)
            }
    
            show(effect, callback) {
                this.stop();
                this._animate('in', effect, callback)
            }
    
            _animate(direction, effect, callback) {
                var effecSettings = typeof effect === 'string' ? this.effects[effect] : effect;
                if (effecSettings.perspective !== undefined) {
                    this.el.style.WebkitPerspective = this.el.style.perspective = effecSettings.perspective + 'px';
                }
                if (effecSettings.origin !== undefined) {
                    this.letters.forEach(function (letter) {
                        letter.style.WebkitTransformOrigin = letter.style.transformOrigin = effecSettings.origin;
                    });
                }
                var animOpts = effecSettings[direction];
                for (let i = 1; i <= this.colNum; i++) {
                    var target = [].slice.call(this.el.querySelectorAll('.wordLine' + i));
                    target.forEach(function (t, p) {
                        if (t.innerHTML === ' ') {
                            target.splice(p, 1);
                        }
                    });
                    animOpts.targets = target;
                    animOpts.complete = callback;
                    anime(animOpts);
                }
            }
        }
    
        class ScrollAni extends Zhcool {
            constructor(opts) {
                super(name = "ScrollAni");
                const setting = {
                    className: '.scroll-animate',
                    animateClass: 'animated'
                }
    
    
                this.opt = Object.assign(setting, opts);
                this.elem = document.querySelectorAll(this.opt.className);
                this.position = [];
                this.targets = [];
                this.rang = {
                    setValue: () => this.docScroll
                }
                this.createScrollEvent();
                this.init();
            }
    
            init() {
                this.getPosition();
            }
    
            getPosition() {
                let self = this;
                [].slice.call(self.elem).forEach(function (elem) {
                    let offterT = elem.getAttribute('data-offT') || '0';
                    self.targets.push(new scrollTarget({
                        elem: elem,
                        parent: self,
                        top: self.getTop(elem, offterT)
                    }));
                });
    
    
            }
    
            scrollChildFn(distance) {
                for (const list of this.targets) {
                    list.scroll_();
                    if (list.isVisible) {
                        list.scrollShow()
                    } else {
                        list.scrollHide()
                    }
                }
            }
    
            resize() {
                this.getPosition();
            }
        }
    
    
    
    
        //懒加载图片、视频
        class lazyLoadImg {
            constructor(option) {
                this.images = [];
                this.defaults = {
                    el: '.lazy',
                    smooth: true
                };
                this.options = Object.assign(this.defaults, option || {});
                this.imgEl = document.querySelectorAll(this.options.el);
                this.respond = window.matchMedia("(orientation: portrait)").matches;
                this.imgArr = [];
                this.videoArr = [];
                let that = this;
                this.base_();
                this._item = document.querySelectorAll('.yAni');
                this.loadImages(this.imgEl).then((img) => {
                    if (!this.options.smooth) {
                        return false;
                    }
                    window.base = new SmoothScroll({
                        imgArr: img
                    });
    
                    if (that.respond) {
    
    
                        base.init({
                            wrapper: '.wrapper',
                            callback: function (top) {
    
                            }
                        });
    
    
                    } else {
                        base.init({
                            wrapper: '.wrapper',
                            callback: function (top) {
    
                            }
                        });
                    }
    
                    window.alan = new ScrollAni();
                })
            }
    
            loadImages(el) {
                var _this = this;
                var ImgSrcs = [];
                var VideoSrcs = [];
                [].slice.call(el).forEach(function (elem, index) {
                    switch (elem.nodeName) {
                        case "VIDEO":
                            VideoSrcs.push(elem.getAttribute('data-src'));
                            _this.videoArr.push(elem);
                            break;
                        default:
                            ImgSrcs.push(elem.getAttribute('data-src'));
                            _this.imgArr.push(elem);
                    }
                });
                var loadPromise_img = function loadPromise(imgs) {
                    return Promise.all(imgs.map(function (src, index) {
                        return new Promise(function (resolve, reject) {
                            if ($(_this.imgArr[index]).hasClass('pc') && _this.respond) return false;
                            if ($(_this.imgArr[index]).hasClass('app') && !_this.respond) return false;
                            if (index < 5) {
                                var img = new Image();
                                img.src = src;
                                _this.images.push(img);
                                if (img.complete) {
                                    if (_this.imgArr[index].nodeName === 'IMG') {
                                        _this.imgArr[index].setAttribute('src', src);
                                    } else {
                                        _this.imgArr[index].style.backgroundImage = "url(" + src + ")";
                                    }
                                    resolve(_this.imgArr[index]);
                                } else {
                                    img.addEventListener('load', function () {
                                        if (_this.imgArr[index].nodeName === 'IMG') {
                                            _this.imgArr[index].setAttribute('src', src);
                                        } else {
                                            _this.imgArr[index].style.backgroundImage = "url(" + src + ")";
                                        }
                                        resolve(_this.imgArr[index]);
                                    });
                                    img.addEventListener('error', function () {
                                        resolve();
                                    });
                                }
                            } else {
                                if (_this.imgArr[index].nodeName === 'IMG') {
                                    _this.imgArr[index].setAttribute('src', src);
                                } else {
                                    _this.imgArr[index].style.backgroundImage = "url(" + src + ")";
                                }
                                resolve(_this.imgArr[index]);
                            }
                        });
                    }));
                };
                var loadPromise_video = function loadPromise(imgs) {
                    return Promise.all(imgs.map(function (src, index) {
                        return new Promise(function (resolve, reject) {
                            _this.videoArr[index].setAttribute('playsinline', 'true');
                            _this.videoArr[index].src = src;
                            _this.videoArr[index].addEventListener('canplay', function (e) {
                                resolve();
                            });
                        });
                    }));
                };
                if (!_this.respond) {
                    loadPromise_video(VideoSrcs);
                }
                return loadPromise_img(ImgSrcs);
            }
    
            start(fn) {
                if (this.imgEl.length > 0) {
                    this.loadImages(this.imgEl).then((img) => {
                        fn(img)
                    });
                } else {
                    fn([]);
                }
            }
    
            getTop(element, direction = 0) {
                if (direction === 0) {
                    var top;
                    while (element.offsetTop === void 0) {
                        element = element.parentNode;
                    }
                    top = element.offsetTop;
                    while (element = element.offsetParent) {
                        top += element.offsetTop;
                    }
                    return top;
                } else {
                    var left;
                    while (element.offsetLeft === void 0) {
                        element = element.parentNode;
                    }
                    left = element.offsetLeft;
                    while (element = element.offsetParent) {
                        left += element.offsetLeft;
                    }
                    return left;
                }
            }
    
            yGo(y, top, el, offset, to = 1, range = 1, bg = 0) {
                var root = el.style;
                var h = y - (top - (window.innerHeight * offset));
                if (h > 0) {
                    var _num = h / (window.innerHeight * range);
                    var a = _num.toFixed(4);
                    a = a > to ? to : a;
                    if (bg !== 0) {
                        TweenMax.set(el, {
                            y: h
                        });
                    } else {
                        if (h < ($(el).parent().height() - el.clientHeight)) {
                            // root.transform = "translate3d(0,"+h+"px,0)";
                            TweenMax.set(el, {
                                y: h
                            });
                        } else {
                            TweenMax.to(el, 0.1, {
                                y: ($(el).parent().height() - el.clientHeight)
                            });
                        }
                    }
                    root.setProperty('--go', a);
                    // root.setProperty('transform', 'translate3d(0,'+h+',0)');
                } else {
                    TweenMax.set(el, {
                        y: 0
                    });
                }
            }
    
            base_() {
                if (this.respond && $('#business').length > 0) {} else {
                    $('[data-vh]').each(function (index, e) {
                        var wid = window.innerHeight,
                            hei = parseInt(wid * ($(this).attr('data-vh')));
                        $(this).css('height', (hei + 1) + "px");
                    });
                }
            }
        }
    
        new lazyLoadImg({
            smooth: true
        });
    }, 400);

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
   
    // 首页-banner--背景轮播
    function indexBgSlide() {

    }
    indexBgSlide();


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
        var slide = new Swiper('.solutionlist', {
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            speed:1000,
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
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                990: {
                    slidesPerView: 2.8,
                    spaceBetween: 20,
                },
                1280: {
                    slidesPerView: 3,
                    spaceBetween: 40,
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
            // autoplay:true,
            // autoplay: {
            //     delay: 0,//自动播放间隔
            //     disableOnInteraction: false,//用户操作后是否停止自动播放
            // },
            
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
                trigger: box, start: "top top", end: "+=" + height, scrub: true,
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
            loop : true,//可选选项，开启循环
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
            loop : true,//可选选项，开启循环
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


// 鼠标弹窗
// 首页视频弹窗