
    const video = document.getElementById('heroVideo');
    const playButton = document.getElementById('playButton');
    let isPlaying = false;

    playButton.addEventListener('click', () => {
      if (isPlaying) {
        video.pause();
        isPlaying = false;
      } else {
        video.play();
        isPlaying = true;
      }
    });

    // Optional: Pause video when it goes out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting && isPlaying) {
            video.pause();
            isPlaying = false;
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);




  document.addEventListener('DOMContentLoaded', function () {
    const svg = document.querySelector('.scroll-reveal');
    const svgContainer = document.querySelector('.svg-container');

    // Function to update the clip-path based on scroll position
    const handleScroll = () => {
      const containerRect = svgContainer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the SVG should be revealed based on scroll
      const visiblePercentage = Math.min(
        Math.max(0, (windowHeight - containerRect.top) / windowHeight),
        1
      );

      // Reveal the SVG progressively by adjusting the clip-path
      svg.style.clipPath = `inset(0 ${100 - visiblePercentage * 100}% 0 0)`;
    };

    // Trigger the scroll handler on scroll and on load
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call on load to handle if the element is already in view
  });


  

  