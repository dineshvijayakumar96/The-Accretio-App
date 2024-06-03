gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Check if it's a touch device
const isTouchDevice = "ontouchstart" in window || navigator.msMaxTouchPoints;

let panels = gsap.utils.toArray(".panel");
let observer2;
let scrollTween;

// Conditionally apply ScrollTrigger.normalizeScroll(true) for touch devices
if (isTouchDevice) {
  observer2 = ScrollTrigger.normalizeScroll(true);
}

// on touch devices, ignore touchstart events if there's an in-progress tween so that touch-scrolling doesn't interrupt and make it wonky
document.addEventListener(
  "touchstart",
  (e) => {
    if (scrollTween) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  },
  { capture: true, passive: false }
);

function goToSection(i) {
  scrollTween = gsap.to(window, {
    scrollTo: { y: i * innerHeight, autoKill: false },
    onStart: () => {
      if (isTouchDevice) {
        observer2.disable(); // Disable normalization for touch devices
        observer2.enable();
      }
    },
    duration: 1, // Adjust the duration for smoother scrolling
    ease: "power1.out", // Use a smoother easing function
    onComplete: () => (scrollTween = null),
    overwrite: false,
  });
}

// Scroll Trigger for Section 1
ScrollTrigger.create({
  trigger: "#home-scroll-section-1",
  start: "top bottom",
  end: "+=199%",
  scrub: false,
  // toggleActions: "play none none reverse",
  markers: false,
  onToggle: (self) => self.isActive && !scrollTween && goToSection(0),
});

// Scroll Trigger for Section 2
ScrollTrigger.create({
  trigger: "#home-scroll-section-2",
  start: "top bottom",
  end: "+=199%",
  scrub: false,
  // toggleActions: "play none none reverse",
  markers: false,
  onToggle: (self) => self.isActive && !scrollTween && goToSection(1),
});

gsap.registerPlugin(ScrollTrigger);

const Scroll = new (function () {
  let sections;
  let page;
  let main;
  let scrollTrigger;
  let tl;
  let win;

  // Init
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

  gsap.to(".panel:not(:last-child)", {
    yPercent: -100,
    ease: "ease-in-out",
    stagger: 0.5,
    scrollTrigger: {
      trigger: "main",
      start: "top",
      end: "+=100%",
      markers: false,
      scrub: true,
      // toggleActions: "play none none reverse",
    },
  });

  // Setup ScrollTrigger
  this.setupScrollTrigger = () => {
    page.style.height = this.getTotalScroll() + win.h + "px";

    scrollTrigger = ScrollTrigger.create({
      id: "mainScroll",
      trigger: "main",
      animation: tl,
      pin: true,
      scrub: true,
      snap: {
        snapTo: (value) => {
          let labels = Object.values(tl.labels);

          const snapPoints = labels.map((x) => x / tl.totalDuration());
          const proximity = 0.1;

          console.log(tl.labels, tl.totalDuration(), labels, snapPoints);

          for (let i = 0; i < snapPoints.length; i++) {
            if (
              value > snapPoints[i] - proximity &&
              value < snapPoints[i] + proximity
            ) {
              return snapPoints[i];
            }
          }
        },
        duration: { min: 0.2, max: 0.6 },
      },
      start: "top top",
      end: "+=100%" + this.getTotalScroll(),
    });
  };

  // Setup timeline
  this.setupTimeline = () => {
    tl = gsap.timeline();
    tl.addLabel("label-initial");

    sections.forEach((section, index) => {
      const nextSection = sections[index + 1];
      if (!nextSection) return;

      tl.to(nextSection, {
        y: -1 * nextSection.offsetHeight,
        duration: nextSection.offsetHeight,
        ease: "power1.out",
      }).addLabel(`label${index}`);
    });
  };

  // Get total scroll
  this.getTotalScroll = () => {
    let totalScroll = 0;
    sections.forEach((section) => {
      totalScroll += section.offsetHeight;
    });
    totalScroll -= win.h;
    return totalScroll;
  };
})();

Scroll.init();

// Add this script after your existing code
gsap.registerPlugin(ScrollTrigger);

const tl2 = gsap.timeline();

tl2.from("#home-scroll-section-2", {
  opacity: 0, // You can customize the animation properties here
});

tl2.to("#home-scroll-section-2", {
  opacity: 1, // You can customize the animation properties here
  duration: 1,
  ease: "power1.out",
});

// Create a ScrollTrigger to trigger the animation
ScrollTrigger.create({
  trigger: "#home-scroll-section-2", // The element that triggers the animation
  start: "top 100%", // Adjust this value based on when you want the animation to start
  end: "bottom 0%", // Adjust this value based on when you want the animation to end
  animation: tl2, // The timeline with your animation
  scrub: true, // Enables scrubbing effect
  markers: true, // Optional: Adds markers for debugging
});

// Add this script after your existing code
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();

tl.from("#home-scroll-section-1", {
  opacity: 1, // You can customize the animation properties here
});

tl.to("#home-scroll-section-1", {
  opacity: 0, // You can customize the animation properties here
  duration: 1,
  ease: "power1.out",
});

// Create a ScrollTrigger to trigger the animation
ScrollTrigger.create({
  trigger: "#home-scroll-section-1", // The element that triggers the animation
  start: "top 0%", // Adjust this value based on when you want the animation to start
  end: "bottom 100%", // Adjust this value based on when you want the animation to end
  animation: tl, // The timeline with your animation
  scrub: true, // Enables scrubbing effect
  markers: false, // Optional: Adds markers for debugging
});

document.addEventListener("DOMContentLoaded", function () {
  var navbar = document.getElementById("navbar");
  var scrollHeightToAddClass = 100; // Adjust this value to your desired scroll height
  var scrolledFlag = false;

  window.addEventListener("scroll", function () {
    if (window.scrollY >= scrollHeightToAddClass && !scrolledFlag) {
      // User has scrolled to the specified height, add the 'scrolled' class
      navbar.classList.add("scrolled");
      scrolledFlag = true;
    } else if (window.scrollY < scrollHeightToAddClass && scrolledFlag) {
      // User has scrolled back up to a height less than the specified height, remove the 'scrolled' class
      navbar.classList.remove("scrolled");
      scrolledFlag = false;
    }
  });
});

// JavaScript to control the video player and popup

const videoPopup = document.getElementById("video-popup");
const closePopup = document.getElementById("close-button");
const showPopupButton = document.getElementById("show-popup");
const videoPlayer = document.getElementById("video-player");
const playPauseButton = document.getElementById("play-pause-button");
const timeline = document.getElementById("timeline");

showPopupButton.addEventListener("click", () => {
  videoPopup.classList.add("show");
});

closePopup.addEventListener("click", () => {
  videoPopup.classList.remove("show");
  videoPlayer.pause();
});

videoPlayer.addEventListener("click", () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
});

playPauseButton.addEventListener("click", () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playPauseButton.innerHTML = '<div class="play-icon2"></div>';
  } else {
    videoPlayer.pause();
    playPauseButton.innerHTML = '<div class="play-icon"></div>';
  }
});

videoPlayer.addEventListener("play", () => {
  playPauseButton.style.display = "none";
});

videoPlayer.addEventListener("pause", () => {
  playPauseButton.style.display = "block";
});

videoPlayer.addEventListener("timeupdate", () => {
  const currentTime = videoPlayer.currentTime;
  const duration = videoPlayer.duration;
  const progress = (currentTime / duration) * 100;
  timeline.value = progress;
});

timeline.addEventListener("input", () => {
  const progress = timeline.value;
  const currentTime = (progress / 100) * videoPlayer.duration;
  videoPlayer.currentTime = currentTime;
});

// JavaScript to control the video player and popup

const videoPopup2 = document.getElementById("video-popup2");
const closePopup2 = document.getElementById("close-button2");
const showPopupButton2 = document.getElementById("show-popup2");
const videoPlayer2 = document.getElementById("video-player2");
const playPauseButton2 = document.getElementById("play-pause-button2");
const timeline2 = document.getElementById("timeline2");

showPopupButton2.addEventListener("click", () => {
  videoPopup2.classList.add("show");
});

closePopup2.addEventListener("click", () => {
  videoPopup2.classList.remove("show");
  videoPlayer2.pause();
});

videoPlayer2.addEventListener("click", () => {
  if (videoPlayer2.paused) {
    videoPlayer2.play();
  } else {
    videoPlayer2.pause();
  }
});

playPauseButton2.addEventListener("click", () => {
  if (videoPlayer2.paused) {
    videoPlayer2.play();
    playPauseButton2.innerHTML = '<div class="play-icon2"></div>';
  } else {
    videoPlayer2.pause();
    playPauseButton2.innerHTML = '<div class="play-icon"></div>';
  }
});

videoPlayer2.addEventListener("play", () => {
  playPauseButton2.style.display = "none";
});

videoPlayer2.addEventListener("pause", () => {
  playPauseButton2.style.display = "block";
});

videoPlayer2.addEventListener("timeupdate", () => {
  const currentTime = videoPlayer2.currentTime;
  const duration = videoPlayer2.duration;
  const progress = (currentTime / duration) * 100;
  timeline2.value = progress;
});

timeline2.addEventListener("input", () => {
  const progress = timeline2.value;
  const currentTime = (progress / 100) * videoPlayer2.duration;
  videoPlayer2.currentTime = currentTime;
});

// JavaScript to show/hide the sticky-scroll button
var scrollButton = document.querySelector(".sticky-scroll");

function toggleScrollButton() {
  if (window.scrollY > 0) {
    // If scrolled down, display the button
    scrollButton.style.display = "block";
  } else {
    // If at the top of the page, hide the button
    scrollButton.style.display = "none";
  }
}

// Initial check on page load
toggleScrollButton();

// Listen for scroll events on both desktop and mobile devices
window.addEventListener("scroll", toggleScrollButton);

// Listen for resize events to handle changes in viewport size on mobile devices
window.addEventListener("resize", toggleScrollButton);

window.addEventListener("load", function () {
  setTimeout(function () {
    var divElement = document.getElementById("section1-text");
    divElement.classList.add("section1-text");
  }, 2000);
});

window.addEventListener("load", function () {
  setTimeout(function () {
    var divElement = document.getElementById("overlay-black");
    divElement.classList.add("overlay-black");
  }, 2000);
});

document.addEventListener("DOMContentLoaded", function () {
  const navbarLinks = document.querySelectorAll(".navlink");
  const currentURL = window.location.pathname;

  function removeActiveClass() {
    navbarLinks.forEach((link) => {
      link.classList.remove("acc-active");
    });
  }

  navbarLinks.forEach((link) => {
    if (link.getAttribute("href") === currentURL) {
      removeActiveClass(); // Remove 'active' class from other tabs (if any)
      link.classList.add("acc-active"); // Add 'active' class to the current tab
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const clickableDiv = document.getElementById("nav-btn-toggle");
  const changableDiv = document.getElementById("navbar");

  clickableDiv.addEventListener("click", function () {
    changableDiv.classList.toggle("white-bg");
  });
});

function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

window.addEventListener("load", function () {
  setTimeout(function () {
    var videoElement = document.getElementById("video-background");
    videoElement.style.opacity = 1;

    // Call the Navbar script here
    var links = document.querySelectorAll(".nav-link");
    links.forEach(function (link) {
      link.classList.add("navlink-w");
    });
  }, 2000);
});

function setupVideoPlayer(videoContainer) {
  var video = videoContainer.querySelector("video");
  var playButton = videoContainer.querySelector(".ai-play-button");

  video.addEventListener("play", function () {
    playButton.style.display = "none";
  });

  video.addEventListener("ended", function () {
    playButton.style.display = "flex";
  });

  playButton.addEventListener("click", function () {
    if (video.paused) {
      video.play();
      playButton.style.display = "none";
    } else {
      video.pause();
      playButton.style.display = "flex";
    }
  });

  // Pause the video when clicking outside the play button
  videoContainer.addEventListener("click", function (event) {
    if (event.target !== playButton) {
      video.pause();
      playButton.style.display = "flex";
    }
  });

  // Show the play button initially (when video is not yet playing)
  playButton.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function () {
  var videoContainers = document.querySelectorAll(".ai-video2-2-2");

  videoContainers.forEach(function (videoContainer) {
    setupVideoPlayer(videoContainer);
  });
});

function playVideoOnScroll(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const video = entry.target.querySelector("video");
      if (video.paused) {
        video.play();
      }
    } else {
      const video = entry.target.querySelector("video");
      if (!video.paused) {
        video.pause();
      }
    }
  });
}

const options = {
  threshold: 0.5, // Change this value to control when the video starts playing.
};

const videoContainers = document.querySelectorAll(".content-video");
const observer = new IntersectionObserver(playVideoOnScroll, options);

videoContainers.forEach((videoContainer) => {
  observer.observe(videoContainer);
});

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      const showBElement = entry.target;
      showBElement.classList.add("show-b"); // Add the 'animate' class
      observer.unobserve(showBElement);
    }
  });
}

const showBElements = document.querySelectorAll(".animate");

// const options = {
//     threshold: 0.5
// };

showBElements.forEach((showBElement) => {
  const showBObserver = new IntersectionObserver(handleIntersection, options);
  showBObserver.observe(showBElement);
});

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      const showBElement = entry.target;
      showBElement.classList.add("show-border2"); // Add the 'animate' class
      observer.unobserve(showBElement);
    }
  });
}

const showBElements2 = document.querySelectorAll(".show-border");

// const options = {
//     threshold: 0.5
// };

showBElements2.forEach((showBElement) => {
  const showBObserver = new IntersectionObserver(handleIntersection, options);
  showBObserver.observe(showBElement);
});

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      const showBElement = entry.target;
      showBElement.classList.add("show-border-f-2"); // Add the 'animate' class
      observer.unobserve(showBElement);
    }
  });
}

const showBElements3 = document.querySelectorAll(".show-border-f");

// const options = {
//     threshold: 0.5
// };

showBElements3.forEach((showBElement) => {
  const showBObserver = new IntersectionObserver(handleIntersection, options);
  showBObserver.observe(showBElement);
});

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      const showBElement = entry.target;
      showBElement.classList.add("border-r-2"); // Add the 'animate' class
      observer.unobserve(showBElement);
    }
  });
}

const showBElements4 = document.querySelectorAll(".border-r");

// const options = {
//     threshold: 0.5
// };

showBElements4.forEach((showBElement) => {
  const showBObserver = new IntersectionObserver(handleIntersection, options);
  showBObserver.observe(showBElement);
});

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      const showBElement = entry.target;
      showBElement.classList.add("border-r-p"); // Add the 'animate' class
      observer.unobserve(showBElement);
    }
  });
}

const showBElements5 = document.querySelectorAll(".border-r-p-2");

// const options = {
//     threshold: 0.5
// };

showBElements5.forEach((showBElement) => {
  const showBObserver = new IntersectionObserver(handleIntersection, options);
  showBObserver.observe(showBElement);
});

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      const showBElement = entry.target;
      showBElement.classList.add("border-l-p"); // Add the 'animate' class
      observer.unobserve(showBElement);
    }
  });
}

const showBElements6 = document.querySelectorAll(".border-l-p-2");

// const options = {
//     threshold: 0.5
// };

showBElements6.forEach((showBElement) => {
  const showBObserver = new IntersectionObserver(handleIntersection, options);
  showBObserver.observe(showBElement);
});

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      const showBElement = entry.target;
      showBElement.classList.add("show-b-t-2"); // Add the 'animate' class
      observer.unobserve(showBElement);
    }
  });
}

const showBElements7 = document.querySelectorAll(".show-b-t");

// const options = {
//     threshold: 0.5
// };

showBElements7.forEach((showBElement) => {
  const showBObserver = new IntersectionObserver(handleIntersection, options);
  showBObserver.observe(showBElement);
});

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      const showBElement = entry.target;
      showBElement.classList.add("section3-text"); // Add the 'animate' class
      observer.unobserve(showBElement);
    }
  });
}

const showBElements8 = document.querySelectorAll(".section3-text-2");

// const options = {
//     threshold: 0.5
// };

showBElements8.forEach((showBElement) => {
  const showBObserver = new IntersectionObserver(handleIntersection, options);
  showBObserver.observe(showBElement);
});

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      const showBElement = entry.target;
      showBElement.classList.add("line4"); // Add the 'animate' class
      observer.unobserve(showBElement);
    }
  });
}

const showBElements9 = document.querySelectorAll(".line4-2");

// const options = {
//     threshold: 0.5
// };

showBElements9.forEach((showBElement) => {
  const showBObserver = new IntersectionObserver(handleIntersection, options);
  showBObserver.observe(showBElement);
});

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      const showBElement = entry.target;
      showBElement.classList.add("animate-fadeup"); // Add the 'animate' class
      observer.unobserve(showBElement);
    }
  });
}

const showBElements20 = document.querySelectorAll(".animate-2-top");

// const options = {
//     threshold: 0.5
// };

showBElements20.forEach((showBElement) => {
  const showBObserver = new IntersectionObserver(handleIntersection, options);
  showBObserver.observe(showBElement);
});

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      const showBElement = entry.target;
      showBElement.classList.add("expertise-tab-mob"); // Add the 'animate' class
      observer.unobserve(showBElement);
    }
  });
}

const showBElements21 = document.querySelectorAll(".expertise-tab-2");

// const options = {
//     threshold: 0.5
// };

showBElements21.forEach((showBElement) => {
  const showBObserver = new IntersectionObserver(handleIntersection, options);
  showBObserver.observe(showBElement);
});

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      const showBElement = entry.target;
      showBElement.classList.add("border-bottom-animation-l"); // Add the 'animate' class
      observer.unobserve(showBElement);
    }
  });
}

const showBElements22 = document.querySelectorAll(
  ".border-bottom-animation-l-2"
);

// const options = {
//     threshold: 0.5
// };

showBElements22.forEach((showBElement) => {
  const showBObserver = new IntersectionObserver(handleIntersection, options);
  showBObserver.observe(showBElement);
});

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      const showBElement = entry.target;
      showBElement.classList.add("border-bottom-animation-r"); // Add the 'animate' class
      observer.unobserve(showBElement);
    }
  });
}

const showBElements23 = document.querySelectorAll(
  ".border-bottom-animation-r-2"
);

// const options = {
//     threshold: 0.5
// };

showBElements23.forEach((showBElement) => {
  const showBObserver = new IntersectionObserver(handleIntersection, options);
  showBObserver.observe(showBElement);
});
