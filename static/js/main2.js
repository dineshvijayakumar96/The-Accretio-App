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

        gsap.to(".careers-scrolleffection-sec1", {
            scrollTrigger: {
                start: "top top", // Adjust for mobile
                end: "+=199%", // Adjust for mobile
                // scrub: true,
                toggleActions: "play none none reverse",
                // markers: true,
            },
            scale: 1.5,
            opacity: 0,
            duration: 2,
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

        // gsap.to(".result-footer", {
        //     scrollTrigger: {
        //         start: "top top", // Adjust for mobile
        //         end: "bottom bottom", // Adjust for mobile
        //         toggleActions: "play none none reverse",
        //         // markers: true,
        //     },
        //     opacity: 1,
        //     xPercent: 100,
        //     duration: 1,
        //     ease: "power1.inOut",
        // });

/********** Our Works Scroll Effect **********/

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('DOMContentLoaded', function () {
        var navbar = document.getElementById('ourworks-scrolleffect');
        var scrollHeightToAddClass = 100; // Adjust this value to your desired scroll height
        var scrolledFlag = false;

        window.addEventListener('scroll', function () {
            if (window.scrollY >= scrollHeightToAddClass && !scrolledFlag) {
                // User has scrolled to the specified height, add the 'scrolled' class
                navbar.classList.add('ourworks-scrolleffection-sec1-m-scroll');
                navbar.classList.remove('ourworks-scrolleffection-sec1-m-offscroll');
                scrolledFlag = true;
            } else if (window.scrollY < scrollHeightToAddClass && scrolledFlag) {
                // User has scrolled back up to a height less than the specified height, remove the 'scrolled' class
                navbar.classList.remove('ourworks-scrolleffection-sec1-m-scroll');
                navbar.classList.add('ourworks-scrolleffection-sec1-m-offscroll');
                scrolledFlag = false;
            }
        });
    });
});

/********** Our Works Scroll Effect 2 **********/

document.addEventListener('DOMContentLoaded', function () {
    // Get a reference to the element with the class name "ourworks-scrolleffection-sec2"
    const element = document.querySelector('.ourworks-scrolleffection-sec2');

    // Function to check if the viewport width is less than or equal to a specified value
    function isMobileViewport() {
        return window.innerWidth <= 768; // Adjust the value as needed
    }

    // Function to handle the scroll event
    function handleScroll() {
        // Check if it's a mobile viewport
        if (isMobileViewport()) {
            // Calculate the 50% of the viewport height
            const viewportHeight = window.innerHeight;
            const scrollThreshold = viewportHeight * 0.5;

            // Get the current scroll position
            const scrollY = window.scrollY || window.pageYOffset;

            // Check if the element's top position is within the 50% of the viewport
            if (element.getBoundingClientRect().top - scrollY <= scrollThreshold) {
                // If it is, add the CSS style
                element.style.animationName = 'ourworks-sec2-offscroll';
            } else {
                // If it's not, remove the CSS style (optional)
                element.style.animationName = '';
            }
        }
    }

    // Add a scroll event listener to the window
    window.addEventListener('scroll', handleScroll);

    // Initial check on page load (in case the page loads at a scrolled position)
    handleScroll();
});

/********** Lazy Loading Images and Quality Adjustment **********/

document.addEventListener('DOMContentLoaded', function () {
    const loadImages = () => {
        const images = document.querySelectorAll("picture img");
            const options = {
                root: null,
                rootMargin: "0px",
                threshold: 0.1,
            };

            const observer = new IntersectionObserver(handleIntersection, options);

            function handleIntersection(entries, observer) {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const source = img.parentElement.querySelector("source");
                        const originalSrc = img.getAttribute("data-original-src");

                        if (source && originalSrc) {
                            // Use "sharp" to adjust image quality (you may need to install this library)
                            sharp(originalSrc)
                                .webp({ quality: 100 }) // Adjust quality as needed
                                .resize(500) // Adjust dimensions as needed
                                .toBuffer()
                                .then((webpBuffer) => {
                                    const webpURL = URL.createObjectURL(new Blob([webpBuffer], { type: "image/webp" }));
                                    source.srcset = webpURL;
                                    img.src = originalSrc;
                                });
                        }

                        // Unobserve the image once loaded
                        observer.unobserve(img);
                    }
                });
            }

            images.forEach((img) => {
                observer.observe(img);
            });
    };

    loadImages();
});

/********** Navbar Scroll Behavior **********/

document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.getElementById('navbar');
            var scrollHeightToAddClass = 100; // Adjust this value to your desired scroll height
            var scrolledFlag = false;

            window.addEventListener('scroll', function () {
                if (window.scrollY >= scrollHeightToAddClass && !scrolledFlag) {
                    // User has scrolled to the specified height, add the 'scrolled' class
                    navbar.classList.add('scrolled');
                    scrolledFlag = true;
                } else if (window.scrollY < scrollHeightToAddClass && scrolledFlag) {
                    // User has scrolled back up to a height less than the specified height, remove the 'scrolled' class
                    navbar.classList.remove('scrolled');
                    scrolledFlag = false;
                }
            });
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

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('load', function () {
        // Check if it's the home page before adding the class
        if (window.location.pathname === '/about-you') { // Replace '/' with the home page URL if needed
            var animatedText2Elements = document.querySelectorAll('.about-active');
            animatedText2Elements.forEach(function (element) {
                element.classList.add('acc-active');
            });
        }
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

/********** Play Video On Scroll **********/

document.addEventListener('DOMContentLoaded', function () {
    function playVideoOnScroll(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target.querySelector('video');
                if (video.paused) {
                    video.play();
                }
            } else {
                const video = entry.target.querySelector('video');
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }

    const options = {
        threshold: 0.5 // Change this value to control when the video starts playing.
    };

    const videoContainers = document.querySelectorAll('.content-video');
    const observer = new IntersectionObserver(playVideoOnScroll, options);

    videoContainers.forEach(videoContainer => {
        observer.observe(videoContainer);
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

/********** Video Player **********/

function setupVideoPlayer(videoContainer, delay) {
    var video = videoContainer.querySelector("video");
    var playButton = videoContainer.querySelector(".ai-play-button");

    // Hide the play button initially (before the delay)
    playButton.style.display = "none";

    // Add a flag to prevent multiple click listeners
    var isPlaying = false;

    // Function to handle play/pause and show/hide play button
    function togglePlay() {
        if (video.paused) {
            video.play();
            playButton.style.display = "none";
        } else {
            video.pause();
            playButton.style.display = "flex";
        }
    }

    if (delay > 0) {
        // Delay the display of the play button after the specified delay
        setTimeout(function () {
            playButton.style.display = "flex";
        }, delay);
    } else {
        // Show the play button immediately (no delay)
        playButton.style.display = "flex";
    }

    // Toggle play when clicking the play button
    playButton.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent click event propagation to the container
        togglePlay();
    });

    // Toggle play when clicking the video container
    videoContainer.addEventListener("click", function () {
        togglePlay();
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var videoContainers = document.querySelectorAll(".ai-video2-2");

    videoContainers.forEach(function (videoContainer) {
        setupVideoPlayer(videoContainer, 2000); // 2-second delay for .ai-video2-2
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
            } else if (showBElement.classList.contains('show-b-t')) {
                showBElement.classList.add('show-b-t-2');
            } else if (showBElement.classList.contains('section3-text-2')) {
                showBElement.classList.add('section3-text');
            } else if (showBElement.classList.contains('show-border-full')) {
                showBElement.classList.add('show-border2-2');
            } else if (showBElement.classList.contains('animate-2')) {
                showBElement.classList.add('show-b2-2');
            } else if (showBElement.classList.contains('show-border-l-r')) {
                showBElement.classList.add('show-border-l-r-2');
            } else if (showBElement.classList.contains('animate-2-2')) {
                showBElement.classList.add('show-b2-2-2');
            } else if (showBElement.classList.contains('animate-3')) {
                showBElement.classList.add('show-b2-2-3');
            } else if (showBElement.classList.contains('line2-2')) {
                showBElement.classList.add('line2');
            } else if (showBElement.classList.contains('iconic-objects-2')) {
                showBElement.classList.add('iconic-objects');
            } else if (showBElement.classList.contains('star-x-2')) {
                showBElement.classList.add('star-x');
            } else if (showBElement.classList.contains('careers-list-btn-2')) {
                showBElement.classList.add('careers-list-btn');
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
    '.show-border-full',
    '.animate-2',
    '.show-border-l-r',
    '.animate-2-2',
    '.animate-3',
    '.line2-2',
    '.iconic-objects-2',
    '.star-x-2',
    '.careers-list-btn-2',
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

/********** Animate to Top **********/
function handleIntersection2(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const showBElement = entry.target;
            showBElement.classList.add('animate-fadeup');
            observer.unobserve(showBElement);
        }
    });
}

const showBElements20 = document.querySelectorAll('.animate-2-top');

const options2 = {
    threshold: 0.5
};

showBElements20.forEach(showBElement => {
    const showBObserver = new IntersectionObserver(handleIntersection2, options2);
    showBObserver.observe(showBElement);
});