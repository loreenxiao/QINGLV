"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// ローディング完了時のアニメーション
var loadingInAnimation = function loadingInAnimation() {
  return regeneratorRuntime.async(function loadingInAnimation$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(new Promise(function _callee(resolve) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (document.querySelector(".js-loading") !== null) {
                      setTimeout(function () {
                        document.querySelector(".c-loading__logo").style.opacity = 1; // カウントアップアニメーション

                        var counter = document.querySelector(".js-loading__counter");
                        var counterUnit = 0;
                        var interval = setInterval(function () {
                          counterUnit++;
                          counter.textContent = counterUnit;

                          if (counterUnit === 100) {
                            clearInterval(interval);
                            var tl = gsap.timeline({
                              onComplete: function onComplete() {
                                resolve(true);
                              }
                            });
                            tl.to(".c-loading__logo", {
                              opacity: 0,
                              duration: .4
                            }).to(".c-loading__item", {
                              scaleX: 0,
                              duration: 1,
                              delay: 0.5,
                              ease: " power4.out"
                            }, "+=.5"); //   .to(".c-loading__wrapper", {
                            //     opacity: 0,
                            //       duration: .5,
                            // }, "-=.6");
                          }
                        }, 35);
                      }, 700);
                    } else {
                      resolve(true);
                    }

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var _default = loadingInAnimation;
exports["default"] = _default;