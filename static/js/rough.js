// Create a ScrollTrigger for the first animation
gsap.registerPlugin(ScrollTrigger);

// Animation 1: On scroll, reduce opacity and translateY
gsap.from(".home-scrolleffect-t", {
  duration: 1.5,
  ease: "ease-in-out",
  scale: 0.5,
});

gsap.to(".home-scrolleffect-t", {
  scrollTrigger: {
    start: "top top",
    end: "center center",
    toggleActions: "play none none reverse",
  },
  yPercent: -100,
  opacity: 0,
  duration: 1,
});

// Animation 2: When ".home-scrolleffect-t2" reaches 50% of the viewport, increase opacity
gsap.to(".home-scrolleffect-t2", {
  scrollTrigger: {
    start: "top center",
    end: "center center",
    scrub: true,
  },
  opacity: 0,
  duration: 1,
});
