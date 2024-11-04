'use client'

import Home from "./components/Home";
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);



function App() {



  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        // Hide the hero image after the animation completes
        document.querySelector('.introimg').style.display = 'none';
        document.querySelector('.image-container').style.display = 'none';
      }
    });

    // Initial fade-in of the image
    timeline
      .fromTo(
        '.introimg',
        { opacity: 1}, // Start slightly smaller and invisible
        {
          opacity: 1,
          duration: 1, // Fade in over 2 seconds
          ease: 'power2.out'
        }
      )
      // Scale animation after fade-in
      .to('.introimg', {
        scale: 8, // Scale up the image
        duration: 4, // Slow scale-up for dramatic effect
        transformOrigin: 'center center',
        ease: 'power2.inOut'
      })
      // Display main site content after the intro animation
      .to('.main-content', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      }, '-=1'); // Start showing main content 1 second before scaling ends

  }, []);




  return (
    <div className="wrapper">
      <div className="image-container">
    <img src="/intro-pic.png" alt="image" className="introimg"/>
  </div>
      <div className="content">
        <Home />
      </div>
      
    </div>

  );
}

export default App;







