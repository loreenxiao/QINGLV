"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$(function () {
  /* 全局公共属性 */
  var wH = window.innerHeight,
      wW = window.innerWidth,
      c = "active"; // 使用IE浏览器提示

  function hiUpgrade() {
    window.AESKey = ''; // 判断浏览器是否支持placeholder属性

    function isSupportPlaceholder() {
      var input = document.createElement('input');
      return 'placeholder' in input;
    }

    ; //判断是否是IE浏览器，包括Edge浏览器

    function IEVersion() {
      //取得浏览器的userAgent字符串
      var userAgent = navigator.userAgent; //判断是否IE浏览器

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
    var MathUtils = {
      // map number x from range [a, b] to [c, d]
      map: function map(x, a, b, c, d) {
        return (x - a) * (d - c) / (b - a) + c;
      },
      // linear interpolation
      lerp: function lerp(a, b, n) {
        return (1 - n) * a + n * b;
      }
    };

    var clamp = function clamp(min, max) {
      return function (value) {
        return value < min ? min : value > max ? max : value;
      };
    };

    var vertex_img = "uniform float time;\n        uniform float progress;\n        uniform vec4 resolution;\n        varying vec2 vUv;\n        uniform sampler2D texture1;\n        \n        const float pi = 3.1415925;\n        \n        void main() {\n          vUv = uv;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );\n        }\n        ";
    var fragment_img = "uniform float time;\n        uniform float progress;\n        uniform sampler2D texture1;\n        uniform vec4 resolution;\n        varying vec2 vUv;\n        \n        \n        void main(){\n        vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);\n        // newUV.x += 0.02*sin(newUV.y*20. + time);\n        gl_FragColor = texture2D(texture1,newUV);\n        }";
    var postFragemt = "uniform float time;\n        uniform float progress;\n        uniform sampler2D tDiffuse;\n        uniform vec2 resolution;\n        varying vec2 vUv;\n        uniform vec2 uMouse;\n        uniform float uVelo;\n        uniform int uType;\n        \n        \n        \tfloat circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {\n        \t\tuv -= disc_center;\n        \t\tuv*=resolution;\n        \t\tfloat dist = sqrt(dot(uv, uv));\n        \t\treturn smoothstep(disc_radius+border_size, disc_radius-border_size, dist);\n        \t}\n        \n        \tfloat map(float value, float min1, float max1, float min2, float max2) {\n        \t\treturn min2 + (value - min1) * (max2 - min2) / (max1 - min1);\n        \t}\n        \n        \tfloat remap(float value, float inMin, float inMax, float outMin, float outMax) {\n        \t\treturn outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);\n        \t}\n        \n        \tfloat hash12(vec2 p) {\n        \t\tfloat h = dot(p,vec2(127.1,311.7));\t\n        \t\treturn fract(sin(h)*43758.5453123);\n        \t}\n        \n        \t// #define HASHSCALE3 vec3(.1031, .1030, .0973)\n        \tvec2 hash2d(vec2 p)\n        \t{\n        \t\tvec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));\n        \t    p3 += dot(p3, p3.yzx+19.19);\n        \t    return fract((p3.xx+p3.yz)*p3.zy);\n        \t}\n        void main()\t{\n        \tvec2 newUV = vUv;\n        \tvec4 color = vec4(1.,0.,0.,1.);\n        \t\n        \t// colorful\n        \tif(uType==0){\n        \t\tfloat c = circle(newUV, uMouse, 0.0, 0.2);\n        \t\tfloat r = texture2D(tDiffuse, newUV.xy += c * (uVelo * .5)).x;\n        \t\tfloat g = texture2D(tDiffuse, newUV.xy += c * (uVelo * .525)).y;\n        \t\tfloat b = texture2D(tDiffuse, newUV.xy += c * (uVelo * .55)).z;\n        \t\tcolor = vec4(r, g, b, 1.);\n        \t}\n        \t// zoom\n        \tif(uType==1){\n        \t\tfloat c = circle(newUV, uMouse, 0.0, 0.1+uVelo*2.)*70.*uVelo;\n        \t\tvec2 offsetVector = normalize(uMouse - vUv);\n        \t\tvec2 warpedUV = mix(vUv, uMouse, c * 0.29); //power\n        \t\tcolor = texture2D(tDiffuse,warpedUV) + texture2D(tDiffuse,warpedUV)*vec4(vec3(c),1.);\n        \t}\n        \t// zoom\n        \tif(uType==2){\n        \t\tfloat hash = hash12(vUv*10.);\n        \t\t// float c = -circle(newUV, uMouse, 0.0, 0.1+uVelo*2.)*20.*uVelo;\n        \t\t// vec2 offsetVector = -normalize(uMouse - vUv);\n        \t\t// vec2 warpedUV = mix(vUv, uMouse, c * 0.6); //power\n        \t\t// vec2 warpedUV1 = mix(vUv, uMouse, c * 0.3); //power\n        \t\t// vec2 warpedUV2 = mix(vUv, uMouse, c * 0.1); //power\n        \t\t// color = vec4(\n        \t\t// \ttexture2D(tDiffuse,warpedUV ).r,\n        \t\t// \ttexture2D(tDiffuse,warpedUV1 ).g,\n        \t\t// \ttexture2D(tDiffuse,warpedUV2 ).b,\n        \t\t// \t1.);\n        \t\t// color = vec4(,0.,0.,1.);\n        \t\tfloat c = circle(newUV, uMouse, 0.0, 0.1+uVelo*0.01)*10.*uVelo;\n        \t\tvec2 offsetVector = normalize(uMouse - vUv);\n        \t\t// vec2 warpedUV = mix(vUv, uMouse,  20.*hash*c); //power\n        \t\tvec2 warpedUV = vUv + vec2(hash - 0.5)*c; //power\n        \t\tcolor = texture2D(tDiffuse,warpedUV) + texture2D(tDiffuse,warpedUV)*vec4(vec3(c),1.);\n        \t}\n        \tgl_FragColor = color;\n        }"; //base

    var Zhcool =
    /*#__PURE__*/
    function () {
      function Zhcool() {
        var child = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, Zhcool);

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

        this.onEndAnimation = function (el, callback) {
          //动画所属元素，如果不支持animations回调函数。
          var self = this;

          var onEndCallbackFn = function onEndCallbackFn(ev) {
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
        this.calcWinsize(); //滚动位置更新

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

      _createClass(Zhcool, [{
        key: "createScrollEvent",
        value: function createScrollEvent() {
          window.addEventListener("scroll", this.getPageYScroll.bind(this));
        } //窗口宽高数据

      }, {
        key: "calcWinsize",
        value: function calcWinsize() {
          this.winsize = {
            width: window.innerWidth,
            height: window.innerHeight
          };
        }
      }, {
        key: "getPageYScroll",
        value: function getPageYScroll() {
          this.docScroll = window.pageYOffset || document.documentElement.scrollTop;
          this.distance = this.docScroll - this.cache;
          this.cache = this.docScroll;
          this.scrollChildFn();
        } //下级绑定滚动条

      }, {
        key: "scrollChildFn",
        value: function scrollChildFn() {} // 获取浏览器版本

      }, {
        key: "getVersion",
        value: function getVersion() {
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
        } //判断是否为pc端

      }, {
        key: "IsPc",
        value: function IsPc() {
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
      }, {
        key: "extend",
        value: function extend() {
          // Variables
          var extended = {};
          var deep = false;
          var i = 0;
          var length = arguments.length; // Merge the object into the extended object

          var merge = function merge(obj) {
            for (var prop in obj) {
              if (obj.hasOwnProperty(prop)) {
                extended[prop] = obj[prop];
              }
            }
          }; // Loop through each object and conduct a merge


          for (; i < length; i++) {
            var obj = arguments[i];
            merge(obj);
          }

          return extended;
        } //下级绑定逐帧动画

      }, {
        key: "raf",
        value: function raf() {
          this.render();
          requestAnimationFrame(this.raf.bind(this));
        }
      }, {
        key: "render",
        value: function render() {} //获取元素距离顶部高度

      }, {
        key: "getTop",
        value: function getTop(element) {
          var top;

          while (element.offsetTop === void 0) {
            element = element.parentNode;
          }

          top = element.offsetTop;

          while (element = element.offsetParent) {
            top += element.offsetTop;
          }

          return top;
        } //获取元素数据（长宽高）

      }, {
        key: "getRect",
        value: function getRect(element) {
          return element.getBoundingClientRect();
        } //节流

      }, {
        key: "throttlePro",
        value: function throttlePro(fn, delay, mustRunDelay) {
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
      }, {
        key: "on_",
        value: function on_(el) {
          el.addClass('on').siblings().removeClass('on');
        }
      }, {
        key: "storage",
        value: function storage() {
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
      }]);

      return Zhcool;
    }();
    /*
    惯性滚动
    类：scr-el;
    params:
    data-direction="1"//1-横向；0-竖向（默认）
    */


    var UpdateTarget =
    /*#__PURE__*/
    function () {
      function UpdateTarget(parent) {
        var _this2 = this;

        _classCallCheck(this, UpdateTarget);

        this.el = parent.item;
        this.parent = parent.parent;
        this.first = true;
        this.rect = this.el.getBoundingClientRect();
        this.top = this.getTop(this.el, this.parent.DOM.direction);

        if (this.parent.DOM.direction === 1) {
          this.parent.winsize.height = this.parent.winsize.width;
        }

        this.isVisible = this.parent.docScroll + this.parent.winsize.height > this.top;
        this.abs = this.el.getAttribute('data-abs');
        this.renderedStyles = {
          y: {
            //y轴位移
            current: 0,
            previous: 0,
            speed: parseFloat(this.el.getAttribute('data-y') || 0),
            ease: this.parent.settings.targetSpeed
          },
          x: {
            //x轴位移
            current: 0,
            previous: 0,
            speed: parseFloat(this.el.getAttribute('data-x') || 0),
            ease: this.parent.settings.targetSpeed
          },
          z: {
            //x轴位移
            current: 0,
            previous: 0,
            speed: parseFloat(this.el.getAttribute('data-z') || 0),
            ease: this.parent.settings.targetSpeed
          },
          s: {
            //缩放
            previous: 1,
            current: 1,
            ease: this.parent.settings.targetSpeed,
            maxValue: parseFloat(this.el.getAttribute('data-s') || 1),
            setValue: function setValue() {
              var maxValue = _this2.renderedStyles.s.maxValue;
              var minValue = 1;
              return Math.max(Math.min(MathUtils.map(_this2.top - _this2.parent.docScroll, _this2.parent.winsize.height, -1 * _this2.rect.height, minValue, maxValue), maxValue), minValue);
            },
            setMap: function setMap() {
              var maxValue = _this2.renderedStyles.s.maxValue;
              var minValue = 1;
              return MathUtils.map(Math.abs(_this2.parent.distance), 0, 400, minValue, maxValue);
            }
          },
          rx: {
            //rotateX
            current: 0,
            previous: 0,
            speed: parseFloat(this.el.getAttribute('data-rx') || 0),
            ease: this.parent.settings.targetSpeed
          },
          ry: {
            //rotateY
            current: 0,
            previous: 0,
            speed: parseFloat(this.el.getAttribute('data-ry') || 0),
            ease: this.parent.settings.targetSpeed
          },
          rz: {
            //rotateX
            current: 0,
            previous: 0,
            speed: parseFloat(this.el.getAttribute('data-rz') || 0),
            ease: this.parent.settings.targetSpeed
          },
          size: {
            //字体
            previous: 1,
            current: 1,
            ease: this.parent.settings.targetSpeed,
            maxValue: parseFloat(this.el.getAttribute('data-size') || 1),
            setValue: function setValue() {
              var maxValue = _this2.renderedStyles.size.maxValue;
              var minValue = 1;
              return Math.max(Math.min(MathUtils.map(_this2.top - _this2.parent.docScroll, _this2.parent.winsize.height / 2, -1 * _this2.rect.height, minValue, maxValue), maxValue), minValue);
            }
          }
        };
        var options = {
          root: null,
          rootMargin: "0px 0px 0px 0px",
          threshold: [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        };
        this.observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            _this2.isVisible = entry.intersectionRatio > 0;
          });
        }, options);

        if (this.parent.DOM.direction === 0) {
          this.observer.observe(this.el.parentNode);
        }
      }

      _createClass(UpdateTarget, [{
        key: "getVisible",
        value: function getVisible() {
          if (this.parent.DOM.direction === 0) {
            return false;
          }

          this.isVisible = this.parent.docScroll + this.parent.winsize.height - this.top > 0 && this.parent.docScroll - this.top < 0;
        }
      }, {
        key: "update",
        value: function update() {
          for (var key in this.renderedStyles) {
            if (key === "s" && this.renderedStyles[key].speed !== 0) {
              this.renderedStyles[key].current = this.renderedStyles[key].setMap();
              this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease); //this.renderedStyles[key].previous = (this.renderedStyles[key].previous > this.renderedStyles[key].maxValue) ? this.renderedStyles[key].maxValue :this.renderedStyles[key].previous;
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
                    this.renderedStyles[key].previous = this.renderedStyles[key].previous > 0 ? this.renderedStyles[key].previous : 0;
                  }
                }
              }
            }
          }

          this.layout();
        }
      }, {
        key: "layout",
        value: function layout() {
          if (this.renderedStyles.size.maxValue !== 1) {
            this.el.style.fontSize = "".concat(2 - this.renderedStyles.size.previous, "rem");
          }

          this.el.style.transform = "perspective(1200px) translate3D(".concat(this.renderedStyles.x.previous, "px,").concat(this.renderedStyles.y.previous, "px,").concat(this.renderedStyles.z.previous, "px) scaleY(").concat(Math.abs(this.renderedStyles.s.previous), ")");
        }
      }, {
        key: "getTop",
        value: function getTop(element) {
          var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

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
      }, {
        key: "resize",
        value: function resize() {
          this.rect = this.el.getBoundingClientRect();
          this.top = this.getTop(this.el, this.parent.DOM.direction);
        }
      }]);

      return UpdateTarget;
    }();

    var SmoothScroll =
    /*#__PURE__*/
    function (_Zhcool) {
      _inherits(SmoothScroll, _Zhcool);

      function SmoothScroll(opts) {
        var _this3;

        _classCallCheck(this, SmoothScroll);

        _this3 = _possibleConstructorReturn(this, _getPrototypeOf(SmoothScroll).call(this, name = "SmoothScroll"));
        _this3.shouldRender = false; //<main> 元素

        _this3.opt = opts;
        _this3.Targets = [];
        _this3.items = [];
        _this3.timer = null;
        _this3.isPlaying = true;

        _this3.createScrollEvent(); //存储Y轴值


        _this3.renderedStyles = {
          translationY: {
            previous: 0,
            current: 0,
            ease: 0.1,
            setValue: function setValue() {
              return _this3.docScroll;
            }
          }
        };
        return _this3;
      }

      _createClass(SmoothScroll, [{
        key: "init",
        value: function init(options) {
          var _this4 = this;

          var defaults = {
            wrapper: '#scrolly',
            targets: '.scr-el',
            targets_app: '.scr-app',
            wrapperSpeed: 0.08,
            targetSpeed: 0.1,
            targetPercentage: 0.1,
            callback: function callback() {}
          };
          this.settings = Object.assign(defaults, options || {});
          this.DOM = {
            main: document.querySelector(this.settings.wrapper)
          };
          this.DOM.scrollable = this.DOM.main.querySelector("div[data-scroll]");
          this.DOM.direction = parseInt(this.DOM.scrollable.dataset.direction) || 0;
          this.targets = [];

          if (this.shu) {
            document.querySelectorAll(this.settings.targets_app).forEach(function (item) {
              return _this4.targets.push(new UpdateTarget({
                item: item,
                parent: _this4
              }));
            });
            this.scrollChildFn();
          } else {
            document.querySelectorAll(this.settings.targets).forEach(function (item) {
              return _this4.targets.push(new UpdateTarget({
                item: item,
                parent: _this4
              }));
            });
            this.render();
          }
        }
      }, {
        key: "scrollChildFn",
        value: function scrollChildFn() {
          this.settings.callback(this.docScroll);
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var list = _step.value;
              list.getVisible();

              if (list.isVisible) {
                list.update();
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }]);

      return SmoothScroll;
    }(Zhcool);
    /*
    滚动动画
    */


    var scrollTarget =
    /*#__PURE__*/
    function () {
      function scrollTarget(option) {
        _classCallCheck(this, scrollTarget);

        this.el = option.elem;
        this.parent = option.parent;
        this.toTop = option.top;
        this.active = false;
        this.isVisible = false;
        this.effect = this.el.getAttribute('data-effect') || 'fadeInUp';
        this.Tclass = this.el.getAttribute('data-Tclass') || 'go';
        this.init();
      }

      _createClass(scrollTarget, [{
        key: "init",
        value: function init() {
          var elem = this.el;
          this.isVisible = this.parent.docScroll + this.parent.winsize.height > this.toTop;

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
            });
          } else if (elem.classList.contains('font-fadeIn')) {
            this.fontEffect();
          } else if (this.el.classList.contains('classGo')) {} else {
            elem.classList.add('animated');
          }

          if (this.isVisible) {
            this.scrollShow();
          }
        }
      }, {
        key: "scroll_",
        value: function scroll_() {
          this.isVisible = this.parent.docScroll + this.parent.winsize.height > this.toTop;
        }
      }, {
        key: "scrollShow",
        value: function scrollShow() {
          var self = this;
          if (this.active) return false;

          if (this.el.classList.contains('father')) {
            var children = this.el.querySelectorAll(this.el.getAttribute('data-child'));
            [].slice.call(children).forEach(function (item) {
              TweenMax.set(item, {
                autoAlpha: 1
              });

              if (item.getAttribute('data-effect')) {
                item.classList.add(item.getAttribute('data-effect'));
              } else {
                item.classList.add(self.effect);
              }
            });
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
      }, {
        key: "scrollHide",
        value: function scrollHide() {
          var self = this;
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
            });
          } else if (this.el.classList.contains('font-fadeIn')) {
            this.stop();
          } else if (this.el.classList.contains('classGo')) {
            TweenMax.to(this.el, 0.5, {
              autoAlpha: 0,
              onComplete: function onComplete() {
                self.el.classList.remove(self.Tclass);
              }
            });
          } else {
            TweenMax.to(this.el, 0.5, {
              autoAlpha: 0,
              onComplete: function onComplete() {
                self.el.classList.remove(self.effect);
              }
            });
          }

          this.active = !this.active;
        }
      }, {
        key: "fontEffect",
        value: function fontEffect() {
          this.colNum = 1;
          this.el.classList.add('letter-effect');
          this.charming(this.el, 'letter');
          this.letters = [].slice.call(this.el.querySelectorAll('span'));
          this.lettersTotal = this.letters.length;
          this.effects = {
            'fx1': {
              "in": {
                duration: 700,
                delay: function delay(el, index) {
                  return 100 + index * 50;
                },
                easing: 'easeOutCirc',
                opacity: [0, 1],
                translateX: function translateX(el, index) {
                  return [20 + index * 10, 0];
                }
              },
              out: {
                duration: 700,
                delay: function delay(el, index) {
                  return index * 50;
                },
                easing: 'easeOutCirc',
                opacity: [0, 1],
                direction: 'reverse',
                translateX: function translateX(el, index) {
                  return [20 + index * 10, 0];
                }
              }
            },
            'fx2': {
              "in": {
                duration: 600,
                delay: function delay(el, index) {
                  return index * 30;
                },
                easing: 'cubicBezier(0.38, 0, 0, 1)',
                opacity: [0, 1],
                translateY: function translateY(el, index) {
                  return ['100%', '0%'];
                }
              },
              out: {
                duration: 700,
                delay: function delay(el, index) {
                  return index * 50;
                },
                easing: 'easeOutCirc',
                opacity: [0, 1],
                direction: 'reverse',
                translateX: function translateX(el, index) {
                  return [20 + index * 10, 0];
                }
              }
            }
          };
          this.tx = new TimelineMax();
        }
      }, {
        key: "charming",
        value: function charming(elem, cls) {
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
      }, {
        key: "stop",
        value: function stop() {
          anime.remove(this.letters);
          this.letters.forEach(function (letter) {
            letter.style.WebkitTransform = letter.style.transform = '';
          });
        }
      }, {
        key: "hide",
        value: function hide(effect, callback) {
          this.stop();

          this._animate('out', effect, callback);
        }
      }, {
        key: "show",
        value: function show(effect, callback) {
          this.stop();

          this._animate('in', effect, callback);
        }
      }, {
        key: "_animate",
        value: function _animate(direction, effect, callback) {
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

          for (var i = 1; i <= this.colNum; i++) {
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
      }]);

      return scrollTarget;
    }();

    var ScrollAni =
    /*#__PURE__*/
    function (_Zhcool2) {
      _inherits(ScrollAni, _Zhcool2);

      function ScrollAni(opts) {
        var _this5;

        _classCallCheck(this, ScrollAni);

        _this5 = _possibleConstructorReturn(this, _getPrototypeOf(ScrollAni).call(this, name = "ScrollAni"));
        var setting = {
          className: '.scroll-animate',
          animateClass: 'animated'
        };
        _this5.opt = Object.assign(setting, opts);
        _this5.elem = document.querySelectorAll(_this5.opt.className);
        _this5.position = [];
        _this5.targets = [];
        _this5.rang = {
          setValue: function setValue() {
            return _this5.docScroll;
          }
        };

        _this5.createScrollEvent();

        _this5.init();

        return _this5;
      }

      _createClass(ScrollAni, [{
        key: "init",
        value: function init() {
          this.getPosition();
        }
      }, {
        key: "getPosition",
        value: function getPosition() {
          var self = this;
          [].slice.call(self.elem).forEach(function (elem) {
            var offterT = elem.getAttribute('data-offT') || '0';
            self.targets.push(new scrollTarget({
              elem: elem,
              parent: self,
              top: self.getTop(elem, offterT)
            }));
          });
        }
      }, {
        key: "scrollChildFn",
        value: function scrollChildFn(distance) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.targets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var list = _step2.value;
              list.scroll_();

              if (list.isVisible) {
                list.scrollShow();
              } else {
                list.scrollHide();
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }, {
        key: "resize",
        value: function resize() {
          this.getPosition();
        }
      }]);

      return ScrollAni;
    }(Zhcool); //懒加载图片、视频


    var lazyLoadImg =
    /*#__PURE__*/
    function () {
      function lazyLoadImg(option) {
        var _this6 = this;

        _classCallCheck(this, lazyLoadImg);

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
        var that = this;
        this.base_();
        this._item = document.querySelectorAll('.yAni');
        this.loadImages(this.imgEl).then(function (img) {
          if (!_this6.options.smooth) {
            return false;
          }

          window.base = new SmoothScroll({
            imgArr: img
          });

          if (that.respond) {
            base.init({
              wrapper: '.wrapper',
              callback: function callback(top) {}
            });
          } else {
            base.init({
              wrapper: '.wrapper',
              callback: function callback(top) {}
            });
          }

          window.alan = new ScrollAni();
        });
      }

      _createClass(lazyLoadImg, [{
        key: "loadImages",
        value: function loadImages(el) {
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
      }, {
        key: "start",
        value: function start(fn) {
          if (this.imgEl.length > 0) {
            this.loadImages(this.imgEl).then(function (img) {
              fn(img);
            });
          } else {
            fn([]);
          }
        }
      }, {
        key: "getTop",
        value: function getTop(element) {
          var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

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
      }, {
        key: "yGo",
        value: function yGo(y, top, el, offset) {
          var to = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
          var range = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
          var bg = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
          var root = el.style;
          var h = y - (top - window.innerHeight * offset);

          if (h > 0) {
            var _num = h / (window.innerHeight * range);

            var a = _num.toFixed(4);

            a = a > to ? to : a;

            if (bg !== 0) {
              TweenMax.set(el, {
                y: h
              });
            } else {
              if (h < $(el).parent().height() - el.clientHeight) {
                // root.transform = "translate3d(0,"+h+"px,0)";
                TweenMax.set(el, {
                  y: h
                });
              } else {
                TweenMax.to(el, 0.1, {
                  y: $(el).parent().height() - el.clientHeight
                });
              }
            }

            root.setProperty('--go', a); // root.setProperty('transform', 'translate3d(0,'+h+',0)');
          } else {
            TweenMax.set(el, {
              y: 0
            });
          }
        }
      }, {
        key: "base_",
        value: function base_() {
          if (this.respond && $('#business').length > 0) {} else {
            $('[data-vh]').each(function (index, e) {
              var wid = window.innerHeight,
                  hei = parseInt(wid * $(this).attr('data-vh'));
              $(this).css('height', hei + 1 + "px");
            });
          }
        }
      }]);

      return lazyLoadImg;
    }();

    new lazyLoadImg({
      smooth: true
    });
  }, 400); // 导航

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
      }); // 滑块

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
      } // 下拉框导航


      $("#pcmenuBtn").click(function () {
        var c = "active";

        if (!$(this).hasClass(c)) {
          $(this).addClass(c);
          $("#pcHeaderBody").stop().slideDown(500); // 关闭导航栏部分内容

          $(".header-pc .header-wrap .header-right .menudown-show").css("display", "none");
        } else {
          $("#pcHeaderBody").stop().slideUp(300);
          $(this).removeClass(c);
          $(".header-pc .header-wrap .header-right .menudown-show").css("display", "inline-flex");
        }
      });
    } // 返回顶部


    if ($(".backToTopBtn").length) {
      var btnTop = document.getElementById('backToTopBtn');
      btnTop.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    } // 手机


    if ($(".m_header_box").length) {
      var mHeaderBox = function mHeaderBox() {
        var c = "active";
        var mHeader = $('#mHeader'),
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
        var li = nav.children().children();
        li.find('.one.active').siblings().show();
        li.find('ul').siblings('.one').addClass('is_active');
        li.find('ul').siblings('a').attr('href', 'javascript:;');
        li.find('ul').siblings().click(function () {
          $(this).siblings().stop().slideToggle(300).parent().siblings().children('.active').siblings().stop().slideUp(300);
          $(this).toggleClass(c).parent().siblings().children('.active').removeClass(c);
        });
      };

      mHeaderBox();
    }
  }

  headNav(); // 滚轮下滑

  $(window).scroll(function () {
    headInit();
  });

  function headInit() {
    var t = $(window).scrollTop();

    if (t >= 100) {
      $(".header-pc").addClass("pc-active");
    } else {
      $(".header-pc").removeClass("pc-active");
    }
  }

  headInit(); // 窗口发生改变刷新页面

  var windoWidth = $(window).width();
  $(window).resize(function () {
    if (Math.abs($(this).width() - windoWidth) > 20) {
      window.location.href = "";
    }
  }); //数字跳动

  $('.jump-num').countUp({
    delay: 5,
    time: 5000
  }); // 返回顶部

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
  }); // 关于我们--弹窗

  $(document).on("click", "#video-pop", function () {
    $(".bullet_box").addClass('active');
  });
  $(document).on("click", ".bullet_box .close,.bullet_box", function () {
    $(".bullet_box").removeClass('active');
  }); // 点击展开

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
    });
  }

  tabUl(); // 可视化数据滚动

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

  visualData($(".num-move")); // 文字过渡动画

  function aniText() {
    var PC = $(window).width() > 1200,
        mobile = $(window).width() <= 1200,
        winWidth = $(window).width(),
        winHeight = $(window).height();

    if (mobile) {}

    if (PC) {
      var textElements = gsap.utils.toArray('.ani-text-opacity');
      textElements.forEach(function (text) {
        gsap.to(text, {
          backgroundSize: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: text,
            start: 'center 80%',
            end: 'center 50%',
            scrub: true // markers: {startColor: "red", endColor: "red", fontSize: "18px", fontWeight: "bold", indent: 20},

          }
        });
      });
    }
  }

  aniText(); // 首页-banner--背景轮播

  function indexBgSlide() {}

  indexBgSlide(); // 解决方案

  function indexSolution() {
    var box = $('#idx_solution');
    var svg = '<svg width="28" height="28" style="transform: rotate(-90deg)"><circle id="progress" cx="14" cy="14" r="12" fill="transparent" stroke-width="1"  stroke="#fff" stroke-dasharray="314" stroke-dashoffset="314"/></svg>';

    if (box.length) {
      var slide = new Swiper('#idx_solution .center_box', {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        effect: "fade",
        fadeEffect: {
          crossFade: true //开启淡出。过渡时，原slide透明度从1->0（淡出），过渡中的slide透明度从0->1（淡入），其他slide透明度0。

        },
        preventLinksPropagation: false,
        // 阻止点击事件冒泡
        pagination: {
          el: '#idx_solution .banner_sp',
          clickable: true
        },
        allowTouchMove: false,
        on: {
          slideChangeTransitionStart: function slideChangeTransitionStart() {
            //切换时分类也要改变状态
            var d = this.activeIndex;
            $(".idx_solve .swiper_box .topbox .swiper_list .item_box .item").eq(d).addClass("active").siblings().removeClass("active");
          },
          slideChange: function slideChange(mySwiper) {
            $('.banner_sp span.swiper-pagination-bullet-active').html(svg).siblings().empty();
          }
        }
      });
      $(".idx_solve .swiper_box .topbox .swiper_list .item_box .item").click(function () {
        var a = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        slide.slideTo($(this).index());
      });
    }
  }

  indexSolution(); // 首页- 客户案例

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
          crossFade: true
        },
        on: {
          init: function init() {// swiperAnimateCache(this);
            // swiperAnimate(this);
          },
          slideChangeTransitionEnd: function slideChangeTransitionEnd() {
            swiperAnimate(this);
          }
        }
      });
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
          allowTouchMove: false
        });
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
              allowTouchMove: true
            }
          },
          navigation: {
            nextEl: '.pre-next-button .nextbtn',
            prevEl: '.pre-next-button .prebtn'
          },
          on: {
            init: function init() {// swiperAnimateCache(this);
              // swiperAnimate(this);
            },
            // slideChangeTransitionEnd() {
            //     swiperAnimateCache(this);
            //     swiperAnimate(this);
            // },
            slideChangeTransitionStart: function slideChangeTransitionStart() {
              // swiperAnimateCache(this);
              // swiperAnimate(this);
              var index = this.activeIndex;
              s1.slideTo(index);
              item.removeClass("active").eq(index).addClass("active");
            }
          }
        });
        item.click(function () {
          var index = $(this).index();
          s2.slideTo(index);
        });
      });
      $(".idx_solve .idx_title .item_box .item").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(this).index();
        s0.slideTo(index);
      });
    }
  }

  idx_case(); // 解决方案列表

  function solutionList() {
    var slide = new Swiper('.solutionlist', {
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      // speed:1000,
      slidesPerView: 3.3,
      spaceBetween: 22,
      preventLinksPropagation: false,
      // 阻止点击事件冒泡
      pagination: {
        el: '#idx_solution .banner_sp',
        clickable: true
      },
      allowTouchMove: false,
      breakpoints: {
        480: {
          slidesPerView: 1,
          spaceBetween: 15
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        990: {
          slidesPerView: 2.8,
          spaceBetween: 20
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 40
        }
      }
    });
  }

  solutionList(); // 关于我们--发展历程

  function development() {
    var mySwiper = new Swiper('.develoment-wrap .scrollcontent', {
      // loop : true,//可选选项，开启循环
      direction: "vertical",
      spaceBetween: 10,
      slidesPerView: 1.5,
      speed: 1000 // autoplay:true,
      // autoplay: {
      //     delay: 0,//自动播放间隔
      //     disableOnInteraction: false,//用户操作后是否停止自动播放
      // },

    });
    $(".develoment-wrap .info .rightwrap .yeartab li").click(function () {
      $(this).addClass("active").siblings().removeClass("active");
      var index = $(this).index();
      mySwiper.slideTo(index);
    });
  }

  development(); // 关于我们--发展历程线运动轨迹

  function idx_development() {
    var box = $(".develoment-wrap");
    var height = window.innerHeight + window.innerHeight / 5;

    if (box.length) {
      ScrollTrigger.create({
        trigger: box,
        start: "top top",
        end: "+=" + height,
        scrub: true,
        onUpdate: function onUpdate(self) {
          var idx = self.progress;

          if (idx > 0) {
            $(".develoment-wrap .svg_box").addClass("active");
          } else {
            $(".develoment-wrap .svg_box").removeClass("active");
          }
        }
      });
    }
  }

  idx_development(); // 关于我们--合作伙伴1,2

  function cooperationOne() {
    var mySwiper = new Swiper('.cooperation-wrap .cooperate1', {
      loop: true,
      //可选选项，开启循环
      slidesPerView: 5,
      spaceBetween: 20,
      allowTouchMove: false,
      speed: 8000,
      // autoplay:true,
      autoplay: {
        delay: 0,
        //自动播放间隔
        disableOnInteraction: false //用户操作后是否停止自动播放

      },
      breakpoints: {
        768: {
          slidesPerView: 4
        },
        640: {
          slidesPerView: 3
        },
        480: {
          slidesPerView: 2
        }
      }
    });
  }

  cooperationOne();

  function cooperationTwo() {
    var mySwiper = new Swiper('.cooperation-wrap .cooperate2', {
      loop: true,
      //可选选项，开启循环
      slidesPerView: 5,
      spaceBetween: 20,
      allowTouchMove: false,
      speed: 8000,
      // autoplay:true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      },
      breakpoints: {
        768: {
          slidesPerView: 4
        },
        640: {
          slidesPerView: 3
        },
        480: {
          slidesPerView: 2
        }
      }
    });
  }

  cooperationTwo();
}); // 鼠标跟随

function imousehover(obj, obj2) {
  // 鼠标跟随效果
  var isPad = navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);

  var CustomCursor =
  /*#__PURE__*/
  function () {
    function CustomCursor(hoverItems) {
      _classCallCheck(this, CustomCursor);

      this.cursor = obj;
      this.cursorInner = $(".inner", this.cursor);
      this.pageX = 0;
      this.pageY = 0;
      this.move = true;
      this.hoverItems = hoverItems;
    }

    _createClass(CustomCursor, [{
      key: "init",
      value: function init() {
        if (this.cursor[0]) {
          this.initCursor();
          this.initHovers();
          this.initMove();
        }
      }
    }, {
      key: "initCursor",
      value: function initCursor() {
        var _this7 = this;

        this.pageX = $(window).width() / 2 - 50;
        this.pageY = $(window).height() / 2 - 50;
        $(document).on("mousemove", function (e) {
          _this7.pageX = e.clientX;
          _this7.pageY = e.clientY;
        });

        var render = function render() {
          if (_this7.move) {
            window.TweenMax.to(_this7.cursor, 0.5, {
              x: _this7.pageX,
              y: _this7.pageY,
              ease: "Power1.easeOut"
            });
          }

          requestAnimationFrame(render);
        };

        render();
      }
    }, {
      key: "initHovers",
      value: function initHovers() {
        var _this8 = this;

        var handleMouseEnter = function handleMouseEnter(e) {
          window.TweenMax.to(_this8.cursor, 0.5, {
            scale: 1,
            opacity: 1,
            ease: "Power1.easeOut"
          });
          e.stopPropagation();
        };

        var handleMouseLeave = function handleMouseLeave() {
          window.TweenMax.to(_this8.cursor, 0.5, {
            scale: 0,
            opacity: 0,
            ease: "Power1.easeOut"
          }); // this.cursor.removeClass(function (i, v) {return v.replace('cursor', '');});
        };

        this.hoverItems.each(function (i, item) {
          $(item).on("mouseenter", handleMouseEnter);
          $(item).on("mouseleave", handleMouseLeave);
        });
      }
    }, {
      key: "initMove",
      value: function initMove() {
        var _this9 = this;

        var handleMouseMove = function handleMouseMove(e) {
          if ($(e.target).closest('.owl-nav')[0]) {
            _this9.initCircle(e.target, "[class*='owl-']");
          } else if ($(e.target).closest('.searchOnOff')[0]) {
            _this9.initCircle(e.target, ".searchOnOff");
          } else {
            window.TweenMax.to(_this9.cursor, 0.5, {
              scale: 1,
              // background: 'yellow',
              ease: "Power1.easeOut"
            });
            window.TweenMax.to(_this9.cursorInner, 0.5, {
              opacity: 1,
              ease: "Power1.easeOut"
            });
            _this9.move = true;
          }

          if ($(e.currentTarget).hasClass('ff_topSlider') || $(e.currentTarget).parents('.mlist.project')[0]) {
            // const sxPos = (e.clientX / window.innerWidth) * 200 - 100;
            // this.cursor.toggleClass("next", sxPos > 0);
            _this9.cursor.addClass('more');
          } else if ($(e.currentTarget).hasClass('videom') || $(e.currentTarget).parents('.bodyvideom')[0]) {
            _this9.cursor.addClass('play');
          } else if ($(e.currentTarget).parents('.team_tabs')[0]) {
            _this9.cursor.addClass('drag');
          } else if ($(e.currentTarget).hasClass('post-next')) {
            _this9.cursor.addClass('next');
          }
        };

        this.hoverItems.each(function (i, item) {
          $(item).on("mousemove", item, handleMouseMove);
        });
      }
    }, {
      key: "initCircle",
      value: function initCircle(target, elm) {
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
          ease: "Power1.easeOut"
        });
        window.TweenMax.to(this.cursorInner, 0.5, {
          opacity: 0,
          ease: "Power1.easeOut"
        });
      }
    }]);

    return CustomCursor;
  }();

  if (!isPad) {
    // $('body').append('<div class="cursor"><div class="inner">More</div></div>');
    var cursor = new CustomCursor(obj2);
    cursor.init();
  }
} // 鼠标弹窗
// 首页视频弹窗