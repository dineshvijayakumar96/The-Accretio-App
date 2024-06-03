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
