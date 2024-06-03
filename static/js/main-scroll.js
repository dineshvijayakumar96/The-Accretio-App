gsap.registerPlugin(ScrollTrigger);

const Scroll = new (function () {
  let sections;
  let page;
  let main;
  let tl;
  let win;

  this.init = () => {
    sections = document.querySelectorAll(".home-scrolleffection-sec1");
    page = document.querySelector("#page");
    main = document.querySelector(".home-scrolleffect");
    win = {
      w: window.innerWidth,
      h: window.innerHeight,
    };

    this.setupTimeline();
    this.setupScrollTrigger();
    window.addEventListener("resize", this.onResize);
  };

  this.setupScrollTrigger = () => {
    page.style.height = this.getTotalScroll() + win.h + "px";

    ScrollTrigger.create({
      id: "mainScroll",
      trigger: "main",
      animation: tl,
      pin: true,
      scrub: true,
      start: "top top",
      end: "+=100%" + this.getTotalScroll(),
      snap: {
        snapTo: "labels",
        duration: { min: 0.2, max: 0.6 },
      },
    });
  };

  this.setupTimeline = () => {
    tl = gsap.timeline({ defaults: { ease: "slow(0.7, 0.7, false)" } });

    sections.forEach((section, index) => {
      const nextSection = sections[index + 1];
      if (!nextSection) return;

      tl.to(nextSection, {
        y: -1 * nextSection.offsetHeight,
        duration: nextSection.offsetHeight,
      });
    });
  };

  this.getTotalScroll = () => {
    return (
      sections.reduce((total, section) => total + section.offsetHeight, 0) -
      win.h
    );
  };
})();

// Additional ScrollTrigger animations
const tl2 = gsap.timeline({
  defaults: { opacity: 0, duration: 1, ease: "slow(0.7, 0.7, false)" },
});
tl2.to("#home-scroll-section-2", { opacity: 1 });

ScrollTrigger.create({
  trigger: "#home-scroll-section-2",
  start: "top 30%",
  end: "bottom 0%",
  animation: tl2,
  scrub: true,
  markers: false,
});

const tl3 = gsap.timeline({
  defaults: { opacity: 1, duration: 1, ease: "slow(0.7, 0.7, false)" },
});
tl3.to("#home-scroll-section-1", { opacity: 0 });

ScrollTrigger.create({
  trigger: "#home-scroll-section-1",
  start: "top 0%",
  end: "bottom 10%",
  animation: tl3,
  scrub: true,
  markers: false,
});

// Initialize Scroll
Scroll.init();
