


// ローディング完了時のアニメーション
const loadingInAnimation = async () => {
  // プロミスを返す
  return await new Promise(async (resolve) => {
    if (document.querySelector(".js-loading") !== null) {
      setTimeout(() => {
     document.querySelector(".c-loading__logo").style.opacity = 1;
      // カウントアップアニメーション
      const counter = document.querySelector(".js-loading__counter");
      let counterUnit = 0;
        const interval = setInterval(() => {
        counterUnit++;

        counter.textContent = counterUnit;
        if (counterUnit === 100) {
          clearInterval(interval);
          const tl = gsap.timeline({
                onComplete: () => {
              resolve(true);
            }
          });
          tl.to(".c-loading__logo", {
            opacity: 0,
            duration: .4,
          }).to(".c-loading__item", {
            scaleX: 0,
            duration: 1,
            delay: 0.5,
            ease:" power4.out",
          }, "+=.5")
          //   .to(".c-loading__wrapper", {
          //     opacity: 0,
          //       duration: .5,
          // }, "-=.6");
        }
      }, 35);
}, 700)
    } else {
      resolve(true);
    }
  });
};

export default loadingInAnimation;
