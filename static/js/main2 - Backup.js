/********** Sidenav Open/Close **********/

document.addEventListener('DOMContentLoaded', function () {
    const openNavElement = document.getElementById('opennav');
    const mySidenavElement = document.getElementById('mySidenav');

    openNavElement.addEventListener('click', function () {
        mySidenavElement.style.width = '100%';
    });
    
    // Add an event listener to close the navigation menu if needed
    const closeNavElement = document.getElementById('closenav');
    closeNavElement.addEventListener('click', function () {
        mySidenavElement.style.width = '0';
    });
});


import { gsap } from "https://cdn.skypack.dev/gsap@3.11.4";
        import splitType from "https://cdn.skypack.dev/split-type@0.3.3";

        // Function to create the animation for a single element
        function createAnimation(element) {
            const ourText = new splitType(element, { types: 'chars' });
            const chars = ourText.chars;

            return gsap.fromTo(
                chars,
                {
                    y: 100,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.01,
                    duration: 1,
                    ease: 'power1.out',
                }
            );
        }

        // Function to check if an element is in the viewport
        function isElementInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        // Function to handle the scroll event
        function handleScroll() {
            const elements = document.querySelectorAll('.text-animate');
            elements.forEach((element) => {
                if (isElementInViewport(element) && !element.hasAttribute('data-animated')) {
                    const animation = createAnimation(element);
                    animation.play();
                    element.setAttribute('data-animated', 'true');
                }
            });
        }

        // Create an Intersection Observer
        const observertext = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const animation = createAnimation(entry.target);
                    animation.play();
                    observertext.unobserve(entry.target);
                }
            });
        });

        // Add elements to the observer
        const elements = document.querySelectorAll('.text-animate');
        elements.forEach((element) => {
            observertext.observe(element);
        });

        // Listen for scroll events
        window.addEventListener('scroll', handleScroll);

gsap.registerPlugin(ScrollTrigger);

        var tl = gsap.timeline();

        gsap.from(".scroll-screen-top", {
            duration: 1,
            ease: "power1.inOut",
            yPercent: 0,
        });

        gsap.to(".scroll-screen-top", {
            duration: 1,
            ease: "power1.inOut",
            yPercent: -100,
            delay: 0.5,
        });

        gsap.from(".scroll-screen-bottom", {
            duration: 1,
            ease: "power1.inOut",
            yPercent: 0,
        });

        gsap.to(".scroll-screen-bottom", {
            duration: 1,
            ease: "power1.inOut",
            yPercent: 100,
            delay: 0.5,
        });

        // Animation 1: On scroll, reduce opacity and translateY
        gsap.from(".scrolleffect-title-ani", {
            duration: 1,
            ease: "power1.inOut",
            scale: 0.5,
            delay: 0.5,
        });

        gsap.to(".scrolleffect-title-ani", {
            scrollTrigger: {
                start: "top top", // Adjust for mobile
                end: "+=199%", // Adjust for mobile
                toggleActions: "play none none reverse",
                // markers: true,
            },
            opacity: 0,
            yPercent: -50,
            duration: 1,
            ease: "power1.inOut",
        });

        gsap.to(".scrolleffect-title-ani-2", {
            scrollTrigger: {
                start: "top top", // Adjust for mobile
                end: "+=199%", // Adjust for mobile
                toggleActions: "play none none reverse",
                // markers: true,
            },
            yPercent: -100,
            duration: 2,
            // delay: 2,
            ease: "power1.inOut",
        });

        gsap.to(".home-scrolleffect-t2", {
            scrollTrigger: {
                start: "top top", // Adjust for mobile
                end: "+=199%", // Adjust for mobile
                toggleActions: "play none none reverse",
                // markers: true,
            },
            yPercent: 0,
            opacity: 1,
            duration: 1,
        });

/********** Video Player and Popup (1) **********/

document.addEventListener('DOMContentLoaded', function () {
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
});

/********** Video Player and Popup (2) **********/

document.addEventListener('DOMContentLoaded', function () {
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
});

/********** Scroll Button Behavior **********/

document.addEventListener('DOMContentLoaded', function () {
    // JavaScript to show/hide the sticky-scroll button
    var scrollButton = document.querySelector('.sticky-scroll');

    function toggleScrollButton() {
        if (window.scrollY > 0) {
            // If scrolled down, display the button
            scrollButton.style.display = 'block';
        } else {
            // If at the top of the page, hide the button
            scrollButton.style.display = 'none';
        }
    }

    // Initial check on page load
    toggleScrollButton();

    // Listen for scroll events on both desktop and mobile devices
    window.addEventListener('scroll', toggleScrollButton);

    // Listen for resize events to handle changes in viewport size on mobile devices
    window.addEventListener('resize', toggleScrollButton);
});

/********** Initial Actions on Load **********/

// document.addEventListener('DOMContentLoaded', function () {
//     window.addEventListener('load', function () {
//         setTimeout(function () {
//             var divElement = document.getElementById('section1-text');
//             divElement.classList.add('section1-text');
//         }, 2000);
//     });
// });

/********** Initial Actions on Load **********/

// document.addEventListener('DOMContentLoaded', function () {
//     window.addEventListener('load', function () {
//         setTimeout(function () {
//             var divElement = document.getElementById('overlay-black');
//             divElement.classList.add('overlay-black');
//         }, 2000);
//     });
// });

/********** Highlight Active Navbar Link **********/

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('DOMContentLoaded', function () {
        const navbarLinks = document.querySelectorAll('.navlink');
        const currentURL = window.location.pathname;

        function removeActiveClass() {
            navbarLinks.forEach(link => {
                link.classList.remove('acc-active');
            });
        }

        navbarLinks.forEach(link => {
            if (link.getAttribute('href') === currentURL) {
                removeActiveClass(); // Remove 'active' class from other tabs (if any)
                link.classList.add('acc-active'); // Add 'active' class to the current tab
            }
        });
    });
});

/********** Toggle Navbar Background Color **********/

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('DOMContentLoaded', function () {
        const clickableDiv = document.getElementById('nav-btn-toggle');
        const changableDiv = document.getElementById('navbar');

        clickableDiv.addEventListener('click', function () {
            changableDiv.classList.toggle('white-bg');
        });
    });
});

/********** Toggle Navbar Menu Color **********/

// document.addEventListener('DOMContentLoaded', function () {
//     window.addEventListener('load', function () {
//         setTimeout(function () {
//             var videoElement = document.getElementById('video-background');
//             videoElement.style.opacity = 1;

//             // Call the Navbar script here
//             var links = document.querySelectorAll('.nav-link');
//             links.forEach(function (link) {
//                 link.classList.add('navlink-w');
//             });
//         }, 2000);
//     });
// });

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

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const showBElement = entry.target;

            if (showBElement.classList.contains('animate')) {
                showBElement.classList.add('show-b');
            } else if (showBElement.classList.contains('show-border')) {
                showBElement.classList.add('show-border2');
            } else if (showBElement.classList.contains('show-border-f')) {
                showBElement.classList.add('show-border-f-2');
            } else if (showBElement.classList.contains('border-r')) {
                showBElement.classList.add('border-r-2');
            } else if (showBElement.classList.contains('border-r-p-2')) {
                showBElement.classList.add('border-r-p');
            } else if (showBElement.classList.contains('border-l-p-2')) {
                showBElement.classList.add('border-l-p');
            } else if (showBElement.classList.contains('show-b-t-2')) {
                showBElement.classList.add('show-b-t');
            } else if (showBElement.classList.contains('section3-text-2')) {
                showBElement.classList.add('section3-text');
            } else if (showBElement.classList.contains('line4-2')) {
                showBElement.classList.add('line4');
            } else if (showBElement.classList.contains('animate-2-top')) {
                showBElement.classList.add('animate-fadeup');
            } else if (showBElement.classList.contains('expertise-tab-2')) {
                showBElement.classList.add('expertise-tab-mob');
            } else if (showBElement.classList.contains('border-bottom-animation-l-2')) {
                showBElement.classList.add('border-bottom-animation-l');
            } else if (showBElement.classList.contains('border-bottom-animation-r-2')) {
                showBElement.classList.add('border-bottom-animation-r');
            }

            observer.unobserve(showBElement);
        }
    });
}

const options = {
    threshold: 0.5 // Change this value to control when the video starts playing.
};

const elementsToObserve = [
    '.animate',
    '.show-border',
    '.show-border-f',
    '.border-r',
    '.border-r-p-2',
    '.border-l-p-2',
    '.show-b-t',
    '.section3-text-2',
    '.line4-2',
    '.animate-2-top',
    '.expertise-tab-2',
    '.border-bottom-animation-l-2',
    '.border-bottom-animation-r-2'
];

elementsToObserve.forEach(elementClass => {
    const showBElements = document.querySelectorAll(elementClass);

    showBElements.forEach(showBElement => {
        const showBObserver = new IntersectionObserver(handleIntersection, options);
        showBObserver.observe(showBElement);
    });
});

