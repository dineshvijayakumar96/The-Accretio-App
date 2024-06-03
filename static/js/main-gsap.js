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